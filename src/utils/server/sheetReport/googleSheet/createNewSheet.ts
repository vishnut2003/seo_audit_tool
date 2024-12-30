import { ForSheetGroupInterface } from "../sheetReportInterfaces";
import { googleApiAuth } from "./auth";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { titleLess30Tab } from "./titleLess30_Tab";

export async function createNewSpreadSheet({
    websiteUrl,
    report,
}: {
    websiteUrl: string,
    report: ForSheetGroupInterface,
}) {

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

    await sheet.setPublicAccessLevel('reader');
    await sheet.share(officialGmail, {
        emailMessage: `Report for ${websiteUrl}`,
        role: "writer",
    })
    console.log(sheet.spreadsheetId);
}