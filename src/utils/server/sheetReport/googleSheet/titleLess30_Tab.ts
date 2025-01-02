import { GoogleSpreadsheet } from "google-spreadsheet";
import { titileLessThan30Interface } from "../sheetReportInterfaces";

export async function titleLess30Tab ({titleReport, sheet}: {
    titleReport: titileLessThan30Interface[],
    sheet: GoogleSpreadsheet
}) {
    return new Promise <void> ( async (resolve, reject) => {
        try {

            const rows: {
                address: string,
                title: string,
                length: number,
            }[] = [];

            // create new Tab
            const currentTab = await sheet.addSheet({
                title: "title_less_than_30_char",
                headerValues: [
                    'address',
                    'title',
                    'length',
                ]
            })

            for (const row of titleReport) {
                rows.push(row);
            }

            await currentTab.addRows(rows);

            resolve()
        } catch (err) {
            return reject(err);
        }
    })
}