import { fetchSitemap } from "./createSheetReport/fetchSitemap"
import { checkTitleAbove60, checkTitleLessThat30 } from "./createSheetReport/titleChecks";
import { ForSheetGroupInterface, titileLessThan30Interface, titileAbove60Interface } from "./sheetReportInterfaces";
import puppeteer from "puppeteer";
import puppeteer_core from "puppeteer-core";
import updateTotalPage from "./databaseActions/updateTotalPage";
import updateFinishPage from "./databaseActions/updateFinishPage";
import updateStatus from "./databaseActions/updateStatus";
import chromium from "@sparticuz/chromium";

export async function createSheetReport({ baseUrl, reportId }: {
    baseUrl: string,
    reportId: string,
}) {
    return new Promise<ForSheetGroupInterface>(async (resolve, reject) => {

        try {
            // fetch sitemap for the site using base url
            const pagesList: string[] = await fetchSitemap({ baseUrl });

            // update total page in database
            await updateTotalPage({
                pageCount: pagesList.length,
                reportId: reportId
            });

            // sheet crietirias
            const titleLessThan30: titileLessThan30Interface[] = [];
            const titleAbove60: titileAbove60Interface[] = [];

            // Lauch puppeteer browser
            console.log("lauching browser!")

            let browser;

            if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
                console.log('Assigning browser for AWS Lambda!')
                browser = await puppeteer_core.launch({
                    args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
                    defaultViewport: chromium.defaultViewport,
                    executablePath: await chromium.executablePath(),
                    headless: true,
                })
            } else {
                console.log('Assigning browser for local run!')
                browser = await puppeteer.launch()
            }

            const page = await browser.newPage();

            for (const url of pagesList) {
                console.log(`Opening ${url}`)
                await page.goto(url, { timeout: 0 });

                // check page title
                const pageTitle = await page.title();

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

                // update finish page count in database
                await updateFinishPage({
                    reportId,
                    count: 1
                })

                // for development purpose
                console.log(pageTitle);
                console.log("\n")

            }

            await page.close()

            // assign to group return
            const groupReturn: ForSheetGroupInterface = {
                titlelessCheck: titleLessThan30,
                titleAboveCheck: titleAbove60,
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