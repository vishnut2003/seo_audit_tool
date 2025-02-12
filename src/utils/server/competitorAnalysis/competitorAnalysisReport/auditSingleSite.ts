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
import { checkImageAltText } from "./crawlParts/imageAltTextCheck";
import { checkH1TitleTag } from "./crawlParts/H1TitleCheck";
import { checkContentQuality } from "./crawlParts/contentQualityCheck";
import { checkStructureDataError } from "./crawlParts/structureDataErrorCheck";
import { competitorAnalysisRawInterface } from "./dataInterface";

export async function auditSingleSite({ page, url }: {
    page: Page,
    url: string,
}) {
    return new Promise<competitorAnalysisRawInterface>(async (resolve, reject) => {
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
            const metaTagCheck = await checkMetaTagsQuality({ DOM, page, pageCount: 1, baseUrl: url });
            console.log(`MetaTag Quality: ${metaTagCheck}`);

            // check image alt text in home page
            const imageAltCheck = await checkImageAltText({ DOM });
            console.log(`Image Alt Text Check: ${imageAltCheck}`);

            // check H1 tag existence
            const h1TagCheck = await checkH1TitleTag({ DOM });
            console.log(`H1 tag check: ${h1TagCheck}`);

            // check content quality
            const contentQualityCheck = await checkContentQuality({ baseUrl: url, page });
            console.log(`Content quality check: ${contentQualityCheck}`);

            // check structure data (Schema JSON)
            const structureDataCheck = await checkStructureDataError({ DOM })
            console.log(`Structure Data check: ${structureDataCheck}`);

            resolve({
                website: url,
                overview: {
                    siteSecurity: {
                        label: "HTTP/HTTPS",
                        value: siteSecurity,
                    },
                    callToAction: {
                        label: "Call to action",
                        value: callToActionCheck,
                    },
                    niche: {
                        label: "Niche",
                        value: siteNiche,
                    },
                    siteCategory: {
                        label: "Site category",
                        value: siteCategory,
                    },
                    validBlogPage: {
                        label: "Company Blog/ News",
                        value: blogsPageCheck,
                    },
                    socialConnection: {
                        label: "Social Connectivity [Instgram,Twitter,FB]",
                        value: socialCheck,
                    }
                },
                websiteIssues: {
                    mainDomainCanonical: {
                        label: "Canonical Issue (Main Domain)",
                        value: mainDomainCanonicalIssue,
                    }
                },
                crawlAccess: {
                    xmlSitemap: {
                        label: "XML Sitemap Exist?",
                        value: xmlSitemapCheck,
                    },
                    htmlSitemap: {
                        label: "HTML Sitemap Exist?",
                        value: htmlSitemapCheck,
                    },
                    robotTxt: {
                        label: "Robots.txt fle Exist?",
                        value: robotTxtStatus,
                    }
                },
                optimization: {
                    metaQuality: {
                        label: "Meta tags quality etc. - High, Medium, Low",
                        value: metaTagCheck,
                    },
                    imageAltText: {
                        label: "Images Alt Tags Exist?",
                        value: imageAltCheck,
                    },
                    h1Tag: {
                        label: "<h1> tags Exist?",
                        value: h1TagCheck,
                    },
                    contentOptimization: {
                        label: "Content optimization - High, Medium, Low",
                        value: contentQualityCheck,
                    },
                    structureDataError: {
                        label: "Structured Data Errors (if any)",
                        value: structureDataCheck,
                    }
                }
            })
        } catch (err) {
            return reject(err);
        }
    })
}