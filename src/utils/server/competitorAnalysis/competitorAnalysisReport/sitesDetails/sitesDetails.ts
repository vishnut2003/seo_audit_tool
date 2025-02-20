import { generateInteractiveDoc } from "@/utils/server/sheetReport/jsDomValidate";
import { Page } from "puppeteer-core";
import { sitesDetailsInterface } from "./interfaces";

export async function getSitesDetails({ page, baseUrl }: {
    page: Page,
    baseUrl: string,
}) {
    return new Promise<sitesDetailsInterface>(async (resolve, reject) => {
        try {
            let phoneNumber: string | null = null;
            let emailAddress: string | null = null;

            const telRegex = /^tel:/;
            const mailRegex = /^mailto/;

            const checkingEndpoints: string[] = [
                baseUrl,
                baseUrl + "/contact-us",
                baseUrl + "/contact",
                baseUrl + "/contactus",
                baseUrl + "/contacts",
                baseUrl + "/contact-me",
            ];

            for (const url of checkingEndpoints) {

                if (emailAddress && phoneNumber) {
                    break;
                }

                const response = await page.goto(url);

                if (!response || response.status() < 200 || response.status() > 299) {
                    continue;
                }

                const content = await page.content();

                const DOM = await generateInteractiveDoc({ content });
                const anchorElements = DOM.window.document.querySelectorAll("a");

                if (!anchorElements) {
                    continue;
                }

                for (const anchorElement of anchorElements) {
                    if (telRegex.test(anchorElement.href)) {
                        const decodedTelLink = decodeURIComponent(anchorElement.href);
                        const telArray = decodedTelLink.match(/\d+/g);
                        phoneNumber = telArray ? telArray.join('') : null;
                    } else if (mailRegex.test(anchorElement.href)) {
                        const decodedMailLink = decodeURIComponent(anchorElement.href);
                        const mailMatch = decodedMailLink.match(/mailto:([^?]+)/);
                        emailAddress = mailMatch ? mailMatch[0] : null;
                    }
                }

            }

            const finalData: sitesDetailsInterface = {
                address: baseUrl,
                phone: phoneNumber || "Not Found!",
                email: emailAddress || "Not Found!",
            }

            return resolve(finalData);
        } catch (err) {
            return reject(err);
        }
    })
}