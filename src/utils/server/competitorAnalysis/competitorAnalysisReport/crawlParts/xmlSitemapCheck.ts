import { Page } from "puppeteer";

export async function checkXmlSitemap({ page, baseUrl }: {
    page: Page,
    baseUrl: string,
}) {
    return new Promise<"PRESENT" | "NOT PRESENT">(async (resolve, reject) => {
        try {
            const sitemapUrl = `${baseUrl}/sitemap.xml`;

            // goto sitemap page
            const httpResponse = await page.goto(sitemapUrl, { timeout: 0 });

            // check if page exist
            if (!httpResponse || httpResponse.status() !== 200) {
                return resolve("NOT PRESENT");
            } else {
                return resolve("PRESENT");
            }

        } catch (err) {
            return reject(err);
        }
    })
}