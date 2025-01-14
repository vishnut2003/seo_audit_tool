import { GoogleSpreadsheet } from "google-spreadsheet";
import { googleApiAuth } from "../../sheetReport/googleSheet/auth";
import { competitorAnalysisRawInterface } from "./dataInterface";

export async function createSheetReport({
    mainSiteAnalysisReport, 
    competitorsAnalysisReport
}: {
    mainSiteAnalysisReport: competitorAnalysisRawInterface,
    competitorsAnalysisReport: competitorAnalysisRawInterface[],
}) {
    return new Promise(async (resolve, reject) => {
        try {
            // create header with initial values
            const headerValues: string[] = [
                "Competitor Analysis",
                mainSiteAnalysisReport.website,
            ];

            for (const competitor of competitorsAnalysisReport) {
                headerValues.push(competitor.website);
            }

            const serviceAccountAuth = googleApiAuth();
            const sheet = await GoogleSpreadsheet.createNewSpreadsheetDocument(
                serviceAccountAuth,
                {
                    title: `Sheet report of ${mainSiteAnalysisReport.website}`
                }
            );

        } catch (err) {
            return reject(err);
        }
    })
}