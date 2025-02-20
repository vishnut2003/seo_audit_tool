import { GoogleSpreadsheet } from "google-spreadsheet";
import { sitesDetailsInterface } from "../sitesDetails/interfaces";

export async function sitesDetailsTab({ sitesDetails, sheet }: {
    sitesDetails: sitesDetailsInterface[],
    sheet: GoogleSpreadsheet,
}) {
    return new Promise<void>(async (resolve, reject) => {
        try {
            const workSheet = sheet.sheetsByIndex[0];
            await workSheet.setHeaderRow([
                "address",
                "phone",
                "email",
            ])

            const rows: {
                address: string,
                phone: string,
                email: string,
            }[] = [];

            for (const siteDetail of sitesDetails) {
                rows.push(siteDetail);
            }

            await workSheet.addRows(rows);
            return resolve();
        } catch (err) {
            return reject(err);
        }
    })
}