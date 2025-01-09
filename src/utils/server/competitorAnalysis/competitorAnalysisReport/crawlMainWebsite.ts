import { Page } from "puppeteer";
import { checkSecurityProtocol } from "./crawlParts/checkSecurityProtocol";
import { generateInteractiveDoc } from "../../sheetReport/jsDomValidate";

export async function crawlMainWebsite({ page, url }: {
    page: Page,
    url: string,
}) {
    return new Promise<void>(async (resolve, reject) => {
        try {
            console.log(`Opening ${url}`)
            const httpResponse = await page.goto(url, { timeout: 0 });
            const htmlContent = await page.content();
            const DOM = generateInteractiveDoc({content: htmlContent});
            
            // check website security setup
            const siteSecurity = await checkSecurityProtocol({httpResponse});
            console.log(siteSecurity);

            resolve()
        } catch (err) {
            return reject(err);
        }
    })
}