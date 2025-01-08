import { GoogleSpreadsheet } from "google-spreadsheet";
import { imagesAltMissingInterface } from "../sheetReportInterfaces";

export async function imagesAltMissingTab ({imageAltMissingReport, sheet}: {
    imageAltMissingReport: imagesAltMissingInterface[],
    sheet: GoogleSpreadsheet,
}) {
    return new Promise<void>( async (resolve, reject) => {
        try {
            const rows: {
                title: string,
                address: string,
                image_url: string,
            }[] = [];

            for (const row of imageAltMissingReport) {
                rows.push(row);
            }

            const currentTab = await sheet.addSheet({
                title: "images_missing_alt_text",
                headerValues: [
                    "title",
                    "address",
                    "image_url",
                ]
            });

            await currentTab.addRows(rows);
            resolve();
        } catch (err) {
            return reject(err);
        }
    })
}