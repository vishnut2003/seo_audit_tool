import { ForSheetGroupInterface } from "../sheetReportInterfaces";
import { googleApiAuth } from "./auth";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { titleLess30Tab } from "./titleLess30_Tab";
import { titleAbove60Tab } from "./titleAbove60_tab";
import { metaDescBelow70Tab } from "./metaDescBelow70_Tab";
import { metaDescAbove155Tab } from "./metaDescAbove155_Tab";
import { metaDescEmptyTab } from "./metaDescEmpty_Tab";
import { imagesAltMissingTab } from "./imagesAltMissing_Tab";
import { imageFileSizeOver100KBTab } from "./imageFileSizeOver100Kb_Tab";
import { h1MissingTab } from "./h1Missing_Tab";
import { pageDetailsListTab } from "./pageDetailsLIst_Tab";

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

            // add first tab of list of all pages
            await pageDetailsListTab({
                pageDetailsList: report.pageDetailsList,
                sheet,
            })

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

            // add: meta description below 70 char
            await metaDescBelow70Tab({
                sheet,
                metaDescBelow70Report: report.metaDescBelowCheck
            })

            // add: meta description over 155 char
            await metaDescAbove155Tab({
                metaDescAboveReport: report.metaDescOverCheck,
                sheet
            })

            // add: meta description empty
            await metaDescEmptyTab({
                metaDescEmptyReport: report.metaDescEmpty,
                sheet
            })

            // add: images alt text missing
            await imagesAltMissingTab({
                imageAltMissingReport: report.imageAltMissing,
                sheet
            })

            // add: image file size over 100 kb
            await imageFileSizeOver100KBTab({
                imageOver100KbReport: report.imageOver100Kb,
                sheet
            })

            // add: h1 tag missing
            await h1MissingTab({
                h1MissingReport: report.h1Missing,
                sheet
            })

            await sheet.setPublicAccessLevel('writer');
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