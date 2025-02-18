import { GoogleSpreadsheet } from "google-spreadsheet";
import { sheetReportTotalPages } from "../sheetReportInterfaces";

export async function pageDetailsListTab({ pageDetailsList, sheet }: {
    pageDetailsList: sheetReportTotalPages[],
    sheet: GoogleSpreadsheet,
}) {
    return new Promise<void>(async (resolve, reject) => {
        try {

            const rows: {
                address: string,
                title: string,
                description: string,
                status: number,
            }[] = [];

            // create new Tab
            const currentTab = sheet.sheetsByIndex[0];
            currentTab.setHeaderRow([
                "address",
                "title",
                "description",
                "status",
            ])

            for (const row of pageDetailsList) {
                rows.push(row);
            }

            await currentTab.addRows(rows);
            resolve()

        } catch (err) {
            reject(err);
        }
    })
}