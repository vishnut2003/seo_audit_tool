import { fetchSitemap } from "./createSheetReport/fetchSitemap"
import { checkTitleLessThat30 } from "./createSheetReport/titleChecks";
import { titileLessThan30Interface } from "./sheetReportInterfaces";
import puppeteer from "puppeteer";

export async function createSheetReport({ baseUrl }: {
    baseUrl: string
}) {
    return new Promise<void>(async (resolve, reject) => {

        try {
            // fetch sitemap for the site using base url
            const pagesList: string[] = await fetchSitemap({ baseUrl });

            // sheet crietirias
            const titileLessThan30: titileLessThan30Interface[] = [];

            // Lauch puppeteer browser
            console.log("lauching browser!")
            const browser = await puppeteer.launch({headless: true});
            const page = await browser.newPage();

            for (const url of pagesList) {
                console.log(`Opening ${url}`)
                await page.goto(url);

                // check page title
                const pageTitle = await page.title();
                const failedTitleL30check = await checkTitleLessThat30({title: pageTitle, url});
                if (failedTitleL30check) {
                    titileLessThan30.push(failedTitleL30check);
                }

                // for development purpose
                console.log(pageTitle);
                console.log("\n")

            }

            console.log("loop finish!");
            console.log(titileLessThan30);

        } catch (err) {
            reject(err)
        }
    })
}