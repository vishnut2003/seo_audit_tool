import { Page } from "puppeteer";
import { JSDOM } from "jsdom";
import { generateInteractiveDoc } from "@/utils/server/sheetReport/jsDomValidate";

export async function checkH1TitleTag({ DOM, page, baseUrl }: {
    DOM: JSDOM,
    page: Page,
    baseUrl: string,
}) {
    return new Promise<"PRESENT" | "NOT PRESENT">( async (resolve, reject) => {
        try {
            // check if home page have H1 tag
            const h1Element = DOM.window.document.querySelector("h1");

            // return if no H1 tag
            if (!h1Element) {
                return resolve("NOT PRESENT");
            }

            // If exist the crawl few more pages and check h1 tag
            const anchorElements: HTMLCollectionOf<HTMLAnchorElement> = DOM.window.document.getElementsByTagName("a");
            const validPages: string[] = [];
            for (const anchorElement of anchorElements) {
                if (anchorElement.href.includes(baseUrl) && anchorElement.href.length > (baseUrl.length + 3)) {
                    validPages.push(anchorElement.href);
                    if (validPages.length === 10) {
                        break;
                    }
                }
            }

            for (const pageUrl of validPages) {
                const hasH1Tag = await crawlPageCheckH1Tag({ page, pageUrl });
                if (!hasH1Tag) {
                    return resolve("NOT PRESENT")
                }
            }

            return resolve("PRESENT")

        } catch (err) {
            return reject(err);
        }
    })
}

function crawlPageCheckH1Tag({ pageUrl, page }: {
    pageUrl: string,
    page: Page,
}) {
    return new Promise<boolean>(async (resolve, reject) => {
        try {
            // crawl page content
            await page.goto(pageUrl);
            const content = await page.content();
            const DOM = await generateInteractiveDoc({ content });

            // check if h1 tag exist
            const h1Element = DOM.window.document.querySelector("h1");
            if (!h1Element) {
                return resolve(false);
            } else {
                return resolve(true);
            }

        } catch (err) {
            return reject(err);
        }
    })
}