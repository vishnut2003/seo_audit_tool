import { Page } from "puppeteer";
import { checkSecurityProtocol } from "./crawlParts/checkSecurityProtocol";
import { generateInteractiveDoc } from "../../sheetReport/jsDomValidate";
import { checkCallToAction } from "./crawlParts/checkCallToAction";

export async function crawlMainWebsite({ page, url }: {
    page: Page,
    url: string,
}) {
    return new Promise<void>(async (resolve, reject) => {
        try {
            console.log(`Opening ${url}`)
            const httpResponse = await page.goto(url, { timeout: 0 });
            const htmlContent = await page.content();
            const DOM = await generateInteractiveDoc({ content: htmlContent });

            // check website security setup
            const siteSecurity = await checkSecurityProtocol({ httpResponse });
            console.log(`Website Security: ${siteSecurity}`);

            // check if site have call to action element
            const callToActionCheck = await checkCallToAction({ DOM });
            console.log(`Call to action: ${callToActionCheck}`)

            resolve()
        } catch (err) {
            return reject(err);
        }
    })
}