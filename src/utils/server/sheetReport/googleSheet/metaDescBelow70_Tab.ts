import { GoogleSpreadsheet } from "google-spreadsheet";
import { metaDescBelow70Interface } from "../sheetReportInterfaces";

export async function metaDescBelow70Tab ({metaDescBelow70Report, sheet}: {
    metaDescBelow70Report: metaDescBelow70Interface[],
    sheet: GoogleSpreadsheet
}) {
    return new Promise <void> ( async (resolve, reject) => {
        try {
            const rows: {
                address: string,
                description: string,
                length: number
            }[] = []

            for (const row of metaDescBelow70Report) {
                rows.push(row);
            }

            const currentTab = await sheet.addSheet({
                title: "meta_desc_below_70_char",
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