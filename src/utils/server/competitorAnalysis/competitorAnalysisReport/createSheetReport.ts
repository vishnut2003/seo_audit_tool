import { GoogleSpreadsheet } from "google-spreadsheet";
import { googleApiAuth } from "../../sheetReport/googleSheet/auth";
import { competitorAnalysisRawInterface } from "./dataInterface";
import { onSiteAnalysisTab } from "./googleSpreadSheet/onSiteAnalysis_Tab";

export async function createSheetReport({
    mainWebsite,
    onSiteAnalysis,
}: {
    mainWebsite: string,
    onSiteAnalysis: {
        mainSite: competitorAnalysisRawInterface,
        competitors: competitorAnalysisRawInterface[]
    },
}) {
    return new Promise<void>(async (resolve, reject) => {
        try {
            const serviceAccountAuth = googleApiAuth();
            const sheet = await GoogleSpreadsheet.createNewSpreadsheetDocument(
                serviceAccountAuth,
                {
                    title: `Competitor Analysis of ${onSiteAnalysis.mainSite.website}`
                }
            );

            await onSiteAnalysisTab({
                mainWebsiteReport: onSiteAnalysis.mainSite,
                competitorsReport: onSiteAnalysis.competitors,
                sheet
            })

            const officialGmail = process.env.GOOGLE_OFFICIAL_GMAIL || "vishnu@webspidersolutions.com";
            await sheet.setPublicAccessLevel('reader');
            await sheet.share(officialGmail, {
                emailMessage: `Competitor Analysis ${mainWebsite}`,
                role: "writer",
            })

            resolve()
        } catch (err) {
            return reject(err);
        }
    })
}