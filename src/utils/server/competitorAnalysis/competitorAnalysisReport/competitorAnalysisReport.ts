import { CompetiotrAnalysisFormSubmitInterface } from "@/Interfaces/CompetitorAnalysisInterface/FormSubmitInterface";
import { initializePuppeteer } from "../../initializePuppeteer";
import { auditSingleSite } from "./auditSingleSite";
import { competitorAnalysisRawInterface } from "./dataInterface";

export async function competitorAnalysisReport(reportEntry: CompetiotrAnalysisFormSubmitInterface) {
    return new Promise<void>( async (resolve, reject) => {
        try {
            const browser = await initializePuppeteer();
            
            // open new page
            const page = await browser.newPage();

            // crawl main website
            const mainSiteReport = await auditSingleSite({page, url: reportEntry.website})
            
            // create report for competitor sites
            const competitorReport: competitorAnalysisRawInterface[] = [];

            for (const competitorSite of reportEntry.competitor) {
                const page = await browser.newPage();
                const report = await auditSingleSite({page, url: competitorSite});
                competitorReport.push(report);
            }

            console.log("Main Site report")
            console.log(mainSiteReport)
            console.log("Competitors report")
            console.log(competitorReport)

            await browser.close()
            resolve()

        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
}