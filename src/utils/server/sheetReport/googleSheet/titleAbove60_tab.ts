import { GoogleSpreadsheet } from "google-spreadsheet";
import { titileAbove60Interface } from "../sheetReportInterfaces";

export async function titleAbove60Tab ({titleAboveReport, sheet}: {
    titleAboveReport: titileAbove60Interface[],
    sheet: GoogleSpreadsheet,
}) {
    return new Promise<void>( async (resolve, reject) => {
        try {

            const rows: {
                address: string,
                title: string,
                length: number,
            }[] = [];

            const currentTab = await sheet.addSheet({
                title: "title_above_60_char",
                headerValues: [
                    "address",
                    "title",
                    "length",
                ]
            });

            for(const row of titleAboveReport) {
                rows.push(row);
            }

            await currentTab.addRows(rows);

            resolve()
        } catch (err) {
            return reject(err);
        }
    })
}