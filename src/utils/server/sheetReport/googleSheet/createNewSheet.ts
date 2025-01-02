import { ForSheetGroupInterface } from "../sheetReportInterfaces";
import { googleApiAuth } from "./auth";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { titleLess30Tab } from "./titleLess30_Tab";
import { titleAbove60Tab } from "./titleAbove60_tab";

export async function createNewSpreadSheet({
    websiteUrl,
    report,
}: {
    websiteUrl: string,
    report: ForSheetGroupInterface,
}) {

    return new Promise<string>(async (resolve, reject) => {
        try {
            const officialGmail = process.env.GOOGLE_OFFICIAL_GMAIL || "vishnu@webspidersolutions.com";

            const serviceAccountAuth = googleApiAuth();

            const sheet = await GoogleSpreadsheet.createNewSpreadsheetDocument(
                serviceAccountAuth,
                {
                    title: `Sheet report of ${websiteUrl}`
                }
            );

            // add title less than 30 check tab
            await titleLess30Tab({
                sheet,
                titleReport: report.titlelessCheck,
            })

            // add title above 60 check tab
            await titleAbove60Tab({
                sheet,
                titleAboveReport: report.titleAboveCheck
            })

            await sheet.setPublicAccessLevel('reader');
            await sheet.share(officialGmail, {
                emailMessage: `Report for ${websiteUrl}`,
                role: "writer",
            })
            resolve(sheet.spreadsheetId);
        } catch (err) {
            return reject(err);
        }
    })
}