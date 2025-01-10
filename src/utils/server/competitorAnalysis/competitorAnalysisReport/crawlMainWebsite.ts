import { Page } from "puppeteer";
import { checkSecurityProtocol } from "./crawlParts/checkSecurityProtocol";
import { generateInteractiveDoc } from "../../sheetReport/jsDomValidate";
import { checkCallToAction } from "./crawlParts/checkCallToAction";
import { generateNiche } from "./crawlParts/generateNiche";
import { chooseSiteCategory } from "./crawlParts/chooseCategory";
import { checkBlogPageExist } from "./crawlParts/checkBlogPageExist";
import { socialConnectivityCheck } from "./crawlParts/socialConnectivityCheck";
import { checkMainDomainCanonical } from "./crawlParts/canonicalCheck";
import { checkXmlSitemap } from "./crawlParts/xmlSitemapCheck";
import { checkHtmlSitemap } from "./crawlParts/htmlSitemapCheck";
import { robotTxtCheck } from "./crawlParts/robotTxtCheck";
import { checkMetaTagsQuality } from "./crawlParts/metaTagsQualityCheck";

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

            // check blogs page exist
            const blogsPageCheck = await checkBlogPageExist({ page, baseUrl: url });
            console.log(`Blogs page status: ${blogsPageCheck}`);

            // check social connectivity
            const socialCheck = await socialConnectivityCheck({ DOM });
            console.log(`Social connectivity: ${socialCheck}`);

            // check main domain canonical link
            const mainDomainCanonicalIssue = await checkMainDomainCanonical({ DOM, page, url });
            console.log(`Main domain canonical issue: ${mainDomainCanonicalIssue}`);

            // check if xmlSitemap exist
            const xmlSitemapCheck = await checkXmlSitemap({ baseUrl: url, page })
            console.log(`XML sitemap status: ${xmlSitemapCheck}`);

            // check if HTML Sitemap exist
            const htmlSitemapCheck = await checkHtmlSitemap({ baseUrl: url, DOM, page })
            console.log(`HTML Sitemap Check: ${htmlSitemapCheck}`)

            // check if robots.txt file exist
            const robotTxtStatus = await robotTxtCheck({ baseUrl: url, page });
            console.log(`Robot.txt file status: ${robotTxtStatus}`)

            // check meta tags quality
            const metaTagCheck = await checkMetaTagsQuality({DOM, page, pageCount: 10, baseUrl: url});
            console.log(`MetaTag Quality: ${metaTagCheck}`);

            resolve()
        } catch (err) {
            return reject(err);
        }
    })
}