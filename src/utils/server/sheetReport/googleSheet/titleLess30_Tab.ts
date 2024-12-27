import { GoogleSpreadsheet } from "google-spreadsheet";
import { titileLessThan30Interface } from "../sheetReportInterfaces";

export async function titleLess30Tab ({titleReport, sheet}: {
    titleReport: titileLessThan30Interface[],
    sheet: GoogleSpreadsheet
}) {
    return new Promise <void> ( async (resolve, reject) => {
        try {

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
                await currentTab.addRow({
                    address: row.address,
                    title: row.title,
                    length: row.length
                })
            }

            resolve()
        } catch (err) {
            return reject(err);
        }
    })
}