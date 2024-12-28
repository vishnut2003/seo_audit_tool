import { fetchSitemap } from "./createSheetReport/fetchSitemap"
import { checkTitleLessThat30 } from "./createSheetReport/titleChecks";
import { ForSheetGroupInterface, titileLessThan30Interface } from "./sheetReportInterfaces";
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
    return new Promise<ForSheetGroupInterface>(async (resolve) => {

        try {
            // fetch sitemap for the site using base url
            const pagesList: string[] = await fetchSitemap({ baseUrl });

            // update total page in database
            await updateTotalPage({
                pageCount: pagesList.length,
                reportId: reportId
            });

            // sheet crietirias
            const titileLessThan30: titileLessThan30Interface[] = [];

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
                const failedTitleL30check = await checkTitleLessThat30({ title: pageTitle, url });
                if (failedTitleL30check) {
                    titileLessThan30.push(failedTitleL30check);
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
                titlelessCheck: titileLessThan30
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
            throw err;
        }
    })
}