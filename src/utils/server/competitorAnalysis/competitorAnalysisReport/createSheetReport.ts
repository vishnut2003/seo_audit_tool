import { GoogleSpreadsheet } from "google-spreadsheet";
import { googleApiAuth } from "../../sheetReport/googleSheet/auth";
import { competitorAnalysisRawInterface } from "./dataInterface";
import { onSiteAnalysisTab } from "./googleSpreadSheet/onSiteAnalysis_Tab";
import { sitesDetailsTab } from "./googleSpreadSheet/sitesDetails_Tab";
import { sitesDetailsInterface } from "./sitesDetails/interfaces";

export async function createSheetReport({
    mainWebsite,
    onSiteAnalysis,
    sitesDetails,
}: {
    mainWebsite: string,
    onSiteAnalysis: {
        mainSite: competitorAnalysisRawInterface,
        competitors: competitorAnalysisRawInterface[]
    },
    sitesDetails: sitesDetailsInterface[],
}) {
    return new Promise<string>(async (resolve, reject) => {
        try {
            const serviceAccountAuth = googleApiAuth();
            const sheet = await GoogleSpreadsheet.createNewSpreadsheetDocument(
                serviceAccountAuth,
                {
                    title: `Competitor Analysis of ${onSiteAnalysis.mainSite}`
                }
            );

            await onSiteAnalysisTab({
                mainWebsiteReport: onSiteAnalysis.mainSite,
                competitorsReport: onSiteAnalysis.competitors,
                sheet
            })

            await sitesDetailsTab({
                sitesDetails,
                sheet
            })

            const officialGmail = process.env.GOOGLE_OFFICIAL_GMAIL || "vishnu@webspidersolutions.com";
            await sheet.setPublicAccessLevel('writer');
            await sheet.share(officialGmail, {
                emailMessage: `Competitor Analysis ${mainWebsite}`,
                role: "writer",
            })

            resolve(sheet.spreadsheetId)
        } catch (err) {
            return reject(err);
        }
    })
}