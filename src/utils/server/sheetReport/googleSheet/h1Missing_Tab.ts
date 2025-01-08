import { GoogleSpreadsheet } from "google-spreadsheet";
import { H1MissingInterface } from "../sheetReportInterfaces";

export async function h1MissingTab({ h1MissingReport, sheet }: {
    h1MissingReport: H1MissingInterface[],
    sheet: GoogleSpreadsheet,
}) {
    return new Promise<void>( async (resolve, reject) => {
        try {
            const rows: {
                address: string,
                title: string
            }[] = [];

            for (const row of h1MissingReport) {
                rows.push(row);
            }

            const currentTab = await sheet.addSheet({
                title: "h1_missing",
                headerValues: [
                    "address",
                    "title",
                ]
            })

            await currentTab.addRows(rows);
            return resolve();

        } catch (err) {
            return reject(err);
        }
    })
}