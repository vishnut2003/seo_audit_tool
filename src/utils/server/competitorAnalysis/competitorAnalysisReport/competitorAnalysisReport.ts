import { CompetiotrAnalysisFormSubmitInterface } from "@/Interfaces/CompetitorAnalysisInterface/FormSubmitInterface";
import { initializePuppeteer } from "../../initializePuppeteer";
import { auditSingleSite } from "./auditSingleSite";

export async function competitorAnalysisReport(reportEntry: CompetiotrAnalysisFormSubmitInterface) {
    return new Promise<void>( async (resolve, reject) => {
        try {
            const browser = await initializePuppeteer();
            
            // open new page
            const page = await browser.newPage();

            // crawl main website
            const mainSiteReport = await auditSingleSite({page, url: reportEntry.website})
            console.log(mainSiteReport);

            await browser.close()
            resolve()

        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
}