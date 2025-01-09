import { CompetiotrAnalysisFormSubmitInterface } from "@/Interfaces/CompetitorAnalysisInterface/FormSubmitInterface";
import { initializePuppeteer } from "../../initializePuppeteer";
import { crawlMainWebsite } from "./crawlMainWebsite";

export async function competitorAnalysisReport(reportEntry: CompetiotrAnalysisFormSubmitInterface) {
    return new Promise<void>( async (resolve, reject) => {
        try {
            const browser = await initializePuppeteer();
            
            // open new page
            const page = await browser.newPage();

            // crawl main website
            await crawlMainWebsite({page, url: reportEntry.website})

            await browser.close()
            resolve()

        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
}