import { Page } from "puppeteer";
import { JSDOM } from "jsdom";

export async function checkHtmlSitemap({ page, baseUrl, DOM }: {
    page: Page,
    baseUrl: string,
    DOM: JSDOM,
}) {
    return new Promise<"PRESENT" | "NOT PRESENT">(async (resolve, reject) => {
        try {

            const sitemapEndpoints: string[] = [
                "sitemap",
                "sitemap.html",
                "sitemap_index.html"
            ]

            for (const endpoint of sitemapEndpoints) {
                console.log(`${baseUrl}/${endpoint}`)
                const htmlSitemapUrl = `${baseUrl}/${endpoint}`;

                // check if sitemap exist
                const httpResponse = await page.goto(htmlSitemapUrl, { timeout: 0 });

                if (httpResponse && httpResponse.status() >= 200 && httpResponse.status() < 300) {
                    return resolve("PRESENT");
                }
            }
            console.log("Endpoints not working...");

            // If endpoints not exist then crawl homepage and check if link exist
            const anchorElements: HTMLCollectionOf<HTMLAnchorElement> = DOM.window.document.getElementsByTagName("a");

            for (const anchorElement of anchorElements) {
                console.log("checking anchor tags links")
                if (anchorElement.href.includes("sitemap")) {
                    console.log("Link exist!")
                    return resolve("PRESENT");
                }
            }
            console.log("Link not exist")

            return resolve("NOT PRESENT");

        } catch (err) {
            return reject(err);
        }
    })
}