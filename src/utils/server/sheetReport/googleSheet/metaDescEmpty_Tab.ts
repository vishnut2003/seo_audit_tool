import { GoogleSpreadsheet } from "google-spreadsheet";
import { metaDescEmptyInterface } from "../sheetReportInterfaces";

export async function metaDescEmptyTab ({metaDescEmptyReport, sheet}: {
    metaDescEmptyReport: metaDescEmptyInterface[],
    sheet: GoogleSpreadsheet,
}) {
    return new Promise<void>( async (resolve, reject) => {
        try {
            const rows: {
                address: string,
                description: string,
                length: number,
            }[] = [];

            for (const row of metaDescEmptyReport) {
                rows.push(row);
            }

            const currentTab = await sheet.addSheet({
                title: "meta_desc_empty",
                headerValues: [
                    "address",
                    "description",
                    "length",
                ]
            })

            await currentTab.addRows(rows);
            resolve();
        } catch (err) {
            return reject(err);
        }
    })
}