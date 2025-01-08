import { GoogleSpreadsheet } from "google-spreadsheet";
import { metaDescOver155Interface } from "../sheetReportInterfaces";

export async function metaDescAbove155Tab ({metaDescAboveReport, sheet}: {
    metaDescAboveReport: metaDescOver155Interface[],
    sheet: GoogleSpreadsheet,
}) {
    return new Promise <void> ( async (resolve, reject) => {
        try {
            const rows: {
                address: string,
                description: string,
                length: number
            }[] = []

            for (const row of metaDescAboveReport) {
                rows.push(row);
            }

            const currentTab = await sheet.addSheet({
                title: "meta_desc_above_155_char",
                headerValues: [
                    "address",
                    "description",
                    "length",
                ]
            })

            await currentTab.addRows(rows)
            resolve()
        } catch (err) {
            return reject(err);
        }
    })
}