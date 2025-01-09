import { Page } from "puppeteer";
import { checkSecurityProtocol } from "./crawlParts/checkSecurityProtocol";
import { generateInteractiveDoc } from "../../sheetReport/jsDomValidate";
import { checkCallToAction } from "./crawlParts/checkCallToAction";
import { generateNiche } from "./crawlParts/generateNiche";
import { chooseSiteCategory } from "./crawlParts/chooseCategory";

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

            // generate Niche or about site using AI
            const siteNiche = await generateNiche({ DOM });
            console.log(`Website Niche: ${siteNiche}`);

            // choose category of website
            const siteCategory = await chooseSiteCategory({ DOM });
            console.log(`Site category: ${siteCategory}`);

            resolve()
        } catch (err) {
            return reject(err);
        }
    })
}