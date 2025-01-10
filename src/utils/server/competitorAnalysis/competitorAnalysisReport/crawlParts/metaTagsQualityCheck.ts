import { Page } from "puppeteer";
import { JSDOM } from "jsdom";
import { generateInteractiveDoc } from "@/utils/server/sheetReport/jsDomValidate";

export async function checkMetaTagsQuality({ page, DOM, pageCount, baseUrl }: {
    page: Page,
    DOM: JSDOM,
    pageCount: number,
    baseUrl: string,
}) {
    return new Promise<"HIGH" | "MEDIUM" | "LOW">(async (resolve, reject) => {
        try {

            // if page count is 1 then check only home page
            if (pageCount === 1) {
                const metaTagQuality = await checkCharLengthQuality({ DOM });
                return resolve(metaTagQuality);
            }

            // if count more than 1, then crawl home page and get valid url from home page
            const anchorElements: HTMLCollectionOf<HTMLAnchorElement> = DOM.window.document.getElementsByTagName("a");

            // filter the links
            let pagesAdded = 0;
            const validUrlLength = baseUrl.length + 4;
            const validUrls: string[] = [];
            for (const anchorElement of anchorElements) {
                const href = anchorElement.href;
                if (href.includes(baseUrl) && href.length >= validUrlLength) {
                    validUrls.push(href);
                    pagesAdded++
                    if (pagesAdded === pageCount) {
                        break;
                    }
                }
            }

            // create overall quality of pages as an array
            type qualityOptions = "HIGH" | "MEDIUM" | "LOW";
            const overallQuality: qualityOptions[] = [];
            for (const validUrl of validUrls) {
                await page.goto(validUrl);
                const content = await page.content();
                const innerPageDom = await generateInteractiveDoc({ content })
                const pageMetaQuality = await checkCharLengthQuality({ DOM: innerPageDom })
                overallQuality.push(pageMetaQuality);
            }

            // get count of qualities
            const highCount = overallQuality.filter((value) => value === "HIGH").length;
            const mediumCount = overallQuality.filter((value) => value === "MEDIUM").length;
            const lowCount = overallQuality.filter((value) => value === "LOW").length;

            if (lowCount > mediumCount) {
                if (lowCount > highCount) {
                    return resolve("LOW");
                } else {
                    return resolve("HIGH");
                }
            } else {
                if (mediumCount > highCount) {
                    return resolve("MEDIUM");
                } else {
                    return resolve("HIGH");
                }
            }

        } catch (err) {
            return reject(err);
        }
    })
}

function checkCharLengthQuality({ DOM }: { DOM: JSDOM }) {
    return new Promise<"HIGH" | "MEDIUM" | "LOW">((resolve, reject) => {
        try {
            const titleElement = DOM.window.document.querySelector("title");
            const metaTitle: string = titleElement ? titleElement.textContent ? titleElement.textContent : "" : "";

            const metaDescElement: HTMLMetaElement | null = DOM.window.document.querySelector("head > meta[name='description']");
            const metaDesc: string = metaDescElement ? metaDescElement.content : "";

            let titleStatus: "PASSED" | "FAILED";
            let descStatus: "PASSED" | "FAILED";

            if (metaTitle.length > 30 && metaTitle.length < 65) {
                titleStatus = "PASSED";
            } else {
                titleStatus = "FAILED";
            }

            if (metaDesc.length > 90 && metaDesc.length < 130) {
                descStatus = "PASSED";
            } else {
                descStatus = "FAILED";
            }

            if (descStatus === "PASSED" && titleStatus === "PASSED") {
                return resolve("HIGH");
            } else if (descStatus === "PASSED" && titleStatus === "FAILED" || descStatus === "FAILED" && titleStatus === "PASSED") {
                return resolve("MEDIUM");
            } else {
                return resolve("LOW");
            }

        } catch (err) {
            return reject(err);
        }
    })
}