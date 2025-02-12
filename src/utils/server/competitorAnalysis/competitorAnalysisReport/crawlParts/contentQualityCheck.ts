import { Page } from "puppeteer";
import { generateInteractiveDoc } from "@/utils/server/sheetReport/jsDomValidate";

export async function checkContentQuality({ page, baseUrl }: {
    page: Page,
    baseUrl: string,
}) {
    return new Promise<"LOW" | "MEDIUM" | "HIGH">(async (resolve, reject) => {
        try {

            const quality = await checkSinglePageContentQuality({page, pageUrl: baseUrl});
            return resolve(quality);

            // crawl anchorTags and get quality urls
            // const anchorElements = DOM.window.document.getElementsByTagName("a");
            // const validUrls: string[] = []
            // for (const anchorElement of anchorElements) {
            //     if (anchorElement.href.includes(baseUrl) && anchorElement.href.length > baseUrl.length + 4) {
            //         validUrls.push(anchorElement.href);
            //         if (validUrls.length === 10) {
            //             break;
            //         }
            //     }
            // }

            // type qualityOverallType = "LOW" | "MEDIUM" | "HIGH";
            // const overallQuality: qualityOverallType[] = [];
            // for (const pageUrl of validUrls) {
            //     const quality = await checkSinglePageContentQuality({ pageUrl, page });
            //     overallQuality.push(quality);
            // }

            // const highQuality = overallQuality.filter((quality) => quality === "HIGH");
            // const mediumQuality = overallQuality.filter((quality) => quality === "MEDIUM");
            // const lowQuality = overallQuality.filter((quality) => quality === "LOW");

            // if (lowQuality.length > mediumQuality.length) {
            //     if (lowQuality.length > highQuality.length) {
            //         return resolve("LOW");
            //     } else {
            //         return resolve("HIGH");
            //     }
            // } else {
            //     if (mediumQuality.length > highQuality.length) {
            //         return resolve("MEDIUM");
            //     } else {
            //         return resolve("HIGH");
            //     }
            // }

        } catch (err) {
            return reject(err);
        }
    })
}

function checkSinglePageContentQuality({ pageUrl, page }: {
    pageUrl: string,
    page: Page,
}) {
    return new Promise<"LOW" | "MEDIUM" | "HIGH">(async (resolve, reject) => {
        try {
            await page.goto(pageUrl, { timeout: 0 });
            const content = await page.content();
            const DOM = await generateInteractiveDoc({ content });

            const document = DOM.window.document;
            document.querySelectorAll("script, style").forEach((el) => el.remove());

            const rawTextContent = document.body.textContent ? document.body.textContent : "Content not found";
            const textContent = rawTextContent.trim().replace(/\s+/g, " ");

            if (textContent.length < 300) {
                return resolve("LOW");
            } else if (textContent.length >= 300 && textContent.length < 500) {
                return resolve("MEDIUM");
            } else if (textContent.length >= 500) {
                return resolve("HIGH");
            }

        } catch (err) {
            return reject(err);
        }
    })
}