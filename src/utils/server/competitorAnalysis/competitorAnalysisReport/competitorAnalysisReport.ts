import { CompetiotrAnalysisFormSubmitInterface } from "@/Interfaces/CompetitorAnalysisInterface/FormSubmitInterface";
import { initializePuppeteer } from "../../initializePuppeteer";
import { auditSingleSite } from "./auditSingleSite";
import { competitorAnalysisRawInterface } from "./dataInterface";
import { createSheetReport } from "./createSheetReport";

export async function competitorAnalysisReport(reportEntry: CompetiotrAnalysisFormSubmitInterface) {
    return new Promise<void>( async (resolve, reject) => {
        try {
            const browser = await initializePuppeteer();
            
            // open new page
            const page = await browser.newPage();

            // crawl main website
            const mainSiteReport = await auditSingleSite({page, url: reportEntry.website})

            // close browser
            await page.close();
            await browser.close();
            
            // create report for competitor sites
            const competitorReport: competitorAnalysisRawInterface[] = [];

            for (const competitorSite of reportEntry.competitor) {
                const browser = await initializePuppeteer();
                const page = await browser.newPage();
                const report = await auditSingleSite({page, url: competitorSite});
                competitorReport.push(report);
                await browser.close();
            }

            await createSheetReport({
                mainWebsite: reportEntry.website,
                onSiteAnalysis: {
                    mainSite: mainSiteReport,
                    competitors: competitorReport,
                }
            });
            
            resolve()

        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
}