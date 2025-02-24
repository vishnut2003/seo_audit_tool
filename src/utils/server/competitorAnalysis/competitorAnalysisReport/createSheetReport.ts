import { GoogleSpreadsheet } from "google-spreadsheet";
import { googleApiAuth } from "../../sheetReport/googleSheet/auth";
import { competitorAnalysisRawInterface } from "./dataInterface";
import { onSiteAnalysisTab } from "./googleSpreadSheet/onSiteAnalysis_Tab";
import { sitesDetailsTab } from "./googleSpreadSheet/sitesDetails_Tab";
import { sitesDetailsInterface } from "./sitesDetails/interfaces";
import { DFS_tldComparison_response } from "./dataForSeoApi/TLD_Comparison/tldComparison";
import { tldComparisonTab } from "./googleSpreadSheet/tldComparison_Tab";
import { organicKeywordsTab } from "./googleSpreadSheet/organicKeywords_Tab";
import { DFS_organic_keywords } from "./dataForSeoApi/organicKeywords/organicKeywords";

export async function createSheetReport({
    mainWebsite,
    onSiteAnalysis,
    sitesDetails,
    tldComparisonReport,
    organicKeywordsReport,
}: {
    mainWebsite: string,
    onSiteAnalysis: {
        mainSite: competitorAnalysisRawInterface,
        competitors: competitorAnalysisRawInterface[]
    },
    sitesDetails: sitesDetailsInterface[],
    tldComparisonReport: DFS_tldComparison_response[],
    organicKeywordsReport: DFS_organic_keywords[],
}) {
    return new Promise<string>(async (resolve, reject) => {
        try {
            const serviceAccountAuth = googleApiAuth();
            const sheet = await GoogleSpreadsheet.createNewSpreadsheetDocument(
                serviceAccountAuth,
                {
                    title: `Competitor Analysis of ${mainWebsite}`
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

            await tldComparisonTab({
                tldComparisonReport,
                sheet,
            })

            for (const keywordData of organicKeywordsReport) {
                await organicKeywordsTab({
                    organicKeywordsReport: keywordData,
                    sheet,
                })
            }

            const officialGmail = process.env.GOOGLE_OFFICIAL_GMAIL || "vishnu@webspidersolutions.com";
            await sheet.setPublicAccessLevel('writer');
            await sheet.share(officialGmail, {
                emailMessage: `Competitor Analysis ${mainWebsite}`,
                role: "writer",
            })

            resolve(sheet.spreadsheetId);
        } catch (err) {
            return reject(err);
        }
    })
}