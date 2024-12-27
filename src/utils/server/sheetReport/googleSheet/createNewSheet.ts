import { googleApiAuth } from "./auth";
import { GoogleSpreadsheet } from "google-spreadsheet";

export async function createNewSpreadSheet({
    websiteUrl,
}: {
    websiteUrl: string
}) {

    const officialGmail = process.env.GOOGLE_OFFICIAL_GMAIL || "vishnu@webspidersolutions.com";

    const serviceAccountAuth = googleApiAuth();

    const sheet = await GoogleSpreadsheet.createNewSpreadsheetDocument(
        serviceAccountAuth,
        {
            title: `Sheet report of ${websiteUrl}`
        }
    )

    await sheet.setPublicAccessLevel('reader');
    await sheet.share(officialGmail, {
        emailMessage: `Report for ${websiteUrl}`,
        role: "writer",
    })
}