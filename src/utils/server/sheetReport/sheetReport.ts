import { fetchSitemap } from "./createSheetReport/fetchSitemap"
import { checkTitleAbove60, checkTitleLessThat30 } from "./createSheetReport/titleChecks";
import { ForSheetGroupInterface, titileLessThan30Interface, titileAbove60Interface, metaDescBelow70Interface, metaDescOver155Interface, metaDescEmptyInterface, imagesAltMissingInterface, imageFileSizeOver100KbInterface, H1MissingInterface, sheetReportTotalPages } from "./sheetReportInterfaces";
import puppeteer from "puppeteer";
import puppeteer_core from "puppeteer-core";
import updateTotalPage from "./databaseActions/updateTotalPage";
import updateFinishPage from "./databaseActions/updateFinishPage";
import updateStatus from "./databaseActions/updateStatus";
import chromium from "@sparticuz/chromium";
import { generateInteractiveDoc } from "./jsDomValidate";
import { validateDescBelow70, validateDescEmpty, validateDescOver155 } from "./createSheetReport/descriptionCheck";
import { checkImagesAlt, checkImagesSizeOver100KB } from "./createSheetReport/imagesCheck";
import { checkH1Missing } from "./createSheetReport/h1Checks";
import { crawlValidLinks } from "./common/crawlValidLinks";
import { getPagesDetails } from "./createSheetReport/getPageDetails";

export async function createSheetReport({ baseUrl, reportId }: {
    baseUrl: string,
    reportId: string,
}) {
    return new Promise<ForSheetGroupInterface>(async (resolve, reject) => {

        try {
            // fetch sitemap for the site using base url
            let pagesList: string[] | null = await fetchSitemap({ baseUrl });

            // Lauch puppeteer browser
            console.log("lauching browser!");

            let browser;

            if (process.env.DEVMODE !== "DEV") {
                console.log('Assigning browser for Production!')
                browser = await puppeteer_core.launch({
                    args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
                    defaultViewport: chromium.defaultViewport,
                    executablePath: await chromium.executablePath(),
                    headless: true,
                    timeout: 0
                })
            } else {
                console.log('Assigning browser for local run!')
                browser = await puppeteer.launch({
                    timeout: 0
                })
            }

            if (!pagesList) {
                pagesList = await crawlValidLinks({ browser: (browser as any), url: baseUrl });
            }

            console.log(pagesList)

            // update total page in database
            await updateTotalPage({
                pageCount: pagesList.length,
                reportId: reportId
            });

            // sheet crietirias
            const pageDetailsList: sheetReportTotalPages[] = [];
            const titleLessThan30: titileLessThan30Interface[] = [];
            const titleAbove60: titileAbove60Interface[] = [];
            const metaDescBelow70: metaDescBelow70Interface[] = [];
            const metaDescOver155: metaDescOver155Interface[] = [];
            const metaDescEmpty: metaDescEmptyInterface[] = [];
            let imageAltMissing: imagesAltMissingInterface[] = [];
            let imageFileSizeOver100Kb: imageFileSizeOver100KbInterface[] = [];
            const h1Missing: H1MissingInterface[] = [];

            const page = await browser.newPage();
            let timeoutCount = 0;

            for (const url of pagesList) {

                let httpResponse = null;

                console.log(`Opening ${url}`)
                try {
                    httpResponse = await page.goto(url, { timeout: 0 });
                } catch (err) {
                    console.log(err);
                    timeoutCount++
                    if (timeoutCount === 3) {
                        break;
                    } else {
                        continue;
                    }
                }

                if (!httpResponse) {
                    continue;
                }

                // fetch page full content
                const content = await page.content();
                const DOM = await generateInteractiveDoc({ content });

                // check page title
                const pageTitle = await page.title();

                // list all pages
                const pageDetails = await getPagesDetails({
                    url,
                    DOM,
                    title: pageTitle,
                    httpResponse: (httpResponse as any),
                })
                pageDetailsList.push(pageDetails);

                // page length < 30
                const failedTitleL30check = await checkTitleLessThat30({ title: pageTitle, url });
                if (failedTitleL30check) {
                    titleLessThan30.push(failedTitleL30check);
                }

                // page length > 60
                const failedTitleAboveCheck = await checkTitleAbove60({ title: pageTitle, url });
                if (failedTitleAboveCheck) {
                    titleAbove60.push(failedTitleAboveCheck)
                }

                // check meta description
                const failedDescEmptyCheck = await validateDescEmpty({ DOM, url })
                if (failedDescEmptyCheck) {
                    metaDescEmpty.push(failedDescEmptyCheck)
                } else {
                    const failedDescBelowCheck = await validateDescBelow70({ DOM, url });
                    if (failedDescBelowCheck) {
                        metaDescBelow70.push(failedDescBelowCheck);
                    } else {
                        const failedDescAboveCheck = await validateDescOver155({ DOM, url })
                        if (failedDescAboveCheck) {
                            metaDescOver155.push(failedDescAboveCheck);
                        }
                    }
                }

                // check images alt
                const failedImageAltList = await checkImagesAlt({ DOM, url, title: pageTitle });
                if (failedImageAltList) {
                    imageAltMissing = [...imageAltMissing, ...failedImageAltList];
                }

                // check image over 100KB
                const failedImageFileSize = await checkImagesSizeOver100KB({ DOM, url, title: pageTitle });
                if (failedImageFileSize) {
                    imageFileSizeOver100Kb = [...imageFileSizeOver100Kb, ...failedImageFileSize];
                }

                // check H1 missing
                const failedH1MissingCheck = await checkH1Missing({DOM, url, pageTitle});
                if (failedH1MissingCheck) {

                }

                // update finish page count in database
                await updateFinishPage({
                    reportId,
                    count: 1
                })

                // for development purpose
                console.log(pageTitle);
                console.log("\n")

            }

            await browser.close();

            // assign to group return
            const groupReturn: ForSheetGroupInterface = {
                titlelessCheck: titleLessThan30,
                titleAboveCheck: titleAbove60,
                metaDescBelowCheck: metaDescBelow70,
                metaDescOverCheck: metaDescOver155,
                metaDescEmpty: metaDescEmpty,
                imageAltMissing: imageAltMissing,
                imageOver100Kb: imageFileSizeOver100Kb,
                h1Missing: h1Missing,
                pageDetailsList,
            }

            // update report record status to success
            await updateStatus({
                reportId,
                status: "success"
            })

            resolve(groupReturn);

        } catch (err) {
            await updateStatus({
                reportId,
                status: "error"
            })
            return reject(err)
        }
    })
}