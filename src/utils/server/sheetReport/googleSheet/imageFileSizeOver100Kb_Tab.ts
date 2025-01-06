import { GoogleSpreadsheet } from "google-spreadsheet";
import { imageFileSizeOver100KbInterface } from "../sheetReportInterfaces";

export async function imageFileSizeOver100KBTab ({imageOver100KbReport, sheet}: {
    imageOver100KbReport: imageFileSizeOver100KbInterface[],
    sheet: GoogleSpreadsheet,
}) {
    return new Promise<void>( async (resolve, reject) => {
        try {
            const rows: {
                title: string,
                address: string,
                image_url: string,
                file_size: string,
            }[] = [];

            for (const row of imageOver100KbReport) {
                rows.push(row);
            }

            const currentTab = await sheet.addSheet({
                title: "images_over_100kb_file_size",
                headerValues: [
                    "address",
                    "title",
                    "image_url",
                    "file_size",
                ]
            })

            await currentTab.addRows(rows);

            return resolve()

        } catch (err) {
            return reject(err);
        }
    })
}