import { generateInteractiveDoc } from "@/utils/server/sheetReport/jsDomValidate";
import { Page } from "puppeteer-core";

export async function getSitesDetails({ page, baseUrl }: {
    page: Page,
    baseUrl: string,
}) {
    return new Promise<void>(async (resolve, reject) => {
        try {

            const checkingEndpoints: string[] = [
                baseUrl,
                baseUrl + "/contact-us",
                baseUrl + "/contact",
                baseUrl + "/contactus",
                baseUrl + "/contacts",
                baseUrl + "/contact-me",
            ];

            for (const url of checkingEndpoints) {
                const response = await page.goto(url);

                if (!response || response.status() < 200 || response.status() > 299) {
                    continue;
                }

                const content = await page.content();

                const DOM = await generateInteractiveDoc({ content });
                const anchorElements = DOM.window.document.querySelector("a");

                if (!anchorElements) {
                    continue;
                }

            }

            return resolve();
        } catch (err) {
            return reject(err);
        }
    })
}