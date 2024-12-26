import { fetchSitemap } from "./createSheetReport/fetchSitemap"
import { checkTitleLessThat30 } from "./createSheetReport/titleChecks";
import { titileLessThan30Interface } from "./sheetReportInterfaces";
import puppeteer from "puppeteer";
import updateTotalPage from "./databaseActions/updateTotalPage";
import updateFinishPage from "./databaseActions/updateFinishPage";
import updateStatus from "./databaseActions/updateStatus";

export async function createSheetReport({ baseUrl, reportId }: {
    baseUrl: string,
    reportId: string,
}) {
    return new Promise<void>(async (resolve) => {

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
            const browser = await puppeteer.launch({headless: true});
            const page = await browser.newPage();

            for (const url of pagesList) {
                console.log(`Opening ${url}`)
                await page.goto(url, {timeout: 0});

                // check page title
                const pageTitle = await page.title();
                const failedTitleL30check = await checkTitleLessThat30({title: pageTitle, url});
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

            console.log("loop finish!");
            console.log(titileLessThan30);

            // update report record status to success
            await updateStatus({
                reportId,
                status: "success"
            })

            resolve()

        } catch (err) {
            await updateStatus({
                reportId,
                status: "error"
            })
            throw err;
        }
    })
}