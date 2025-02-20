import { CompetiotrAnalysisFormSubmitInterface } from "@/Interfaces/CompetitorAnalysisInterface/FormSubmitInterface";
import { initializePuppeteer } from "../../initializePuppeteer";
import { auditSingleSite } from "./auditSingleSite";
import { competitorAnalysisRawInterface } from "./dataInterface";
import { createSheetReport } from "./createSheetReport";
import { createNewCompetitorAnalysisReport } from "./database/createReport";
import { updateReportFinishedSite } from "./database/updateReportFinishedSite";
import { updateReportSheetLink, updateReportStatus } from "./database/updateReportStatusOrSheetLink";
import { sitesDetailsInterface } from "./sitesDetails/interfaces";
import { getSitesDetails } from "./sitesDetails/sitesDetails";

export async function competitorAnalysisReport(reportEntry: CompetiotrAnalysisFormSubmitInterface) {
    return new Promise<void>( async (resolve, reject) => {
        try {
            // create report in database
            await createNewCompetitorAnalysisReport({
                reportId: reportEntry.reportId,
                mainSite: reportEntry.website,
                competitors: reportEntry.competitor,
                email: reportEntry.email,
                projectId: reportEntry.projectId,
            });

            // Report Variables
            const sitesDetailsList: sitesDetailsInterface[] = [];

            const browser = await initializePuppeteer();
            
            // open new page
            const page = await browser.newPage();
            const page2 = await browser.newPage();

            // crawl main website
            const mainSiteReport = await auditSingleSite({page, url: reportEntry.website});
            const sitesDetails = await getSitesDetails({
                baseUrl: reportEntry.website,
                page: (page2 as any),
            })
            sitesDetailsList.push(sitesDetails);
            
            // add mainsite to finishedsite list in database
            await updateReportFinishedSite({
                reportId: reportEntry.reportId,
                site: reportEntry.website,
            })

            // close browser
            await page.close();
            await browser.close();
            
            // create report for competitor sites
            const competitorReport: competitorAnalysisRawInterface[] = [];

            for (const competitorSite of reportEntry.competitor) {
                const browser = await initializePuppeteer();
                const page = await browser.newPage();
                const page2 = await browser.newPage();

                // create data for onsite tab
                const report = await auditSingleSite({page, url: competitorSite});
                competitorReport.push(report);

                // create data for sites details tab
                const sitesDetails = await getSitesDetails({
                    baseUrl: competitorSite,
                    page: (page2 as any),
                })
                sitesDetailsList.push(sitesDetails);

                // update in finished site list in database
                await updateReportFinishedSite({
                    reportId: reportEntry.reportId,
                    site: competitorSite,
                })

                await browser.close();
            }

            const sheetId = await createSheetReport({
                mainWebsite: reportEntry.website,
                onSiteAnalysis: {
                    mainSite: mainSiteReport,
                    competitors: competitorReport,
                },
                sitesDetails: sitesDetailsList,
            });

            await updateReportSheetLink({
                reportId: reportEntry.reportId,
                sheetId,
            });

            await updateReportStatus({
                reportId: reportEntry.reportId,
                status: "success",
            })
            
            resolve()

        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
}