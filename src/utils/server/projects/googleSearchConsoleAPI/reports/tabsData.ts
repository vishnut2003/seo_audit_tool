import { JWT, OAuth2Client } from "google-auth-library";
import { searchconsole } from "@googleapis/searchconsole";

export interface GoogleSearchConsoleDataTabsRow {
    keyWord: string,
    clicks: number,
    impression: number,
}

export async function getGoogleSearchConsoleTabsData({
    auth,
    dateRange,
    property,
    dimension,
}: {
    auth: JWT | OAuth2Client,
    dateRange: {
        startDate: string,
        endDate: string,
    },
    property: string,
    dimension: string,
}) {
    return new Promise<GoogleSearchConsoleDataTabsRow[]>(async (resolve, reject) => {
        try {
            const googleSearchConsole = searchconsole({
                auth,
                version: "v1",
            })

            const response = await googleSearchConsole.searchanalytics.query({
                siteUrl: property,
                requestBody: {
                    startDate: dateRange.startDate,
                    endDate: dateRange.endDate,
                    dimensions: [dimension],
                    rowLimit: 10,
                },
            })

            const finalReponse: GoogleSearchConsoleDataTabsRow[] = []

            for (const row of response.data.rows || []) {
                const newData: GoogleSearchConsoleDataTabsRow = {
                    keyWord: row.keys?.[0] || "",
                    clicks: row.clicks || 0,
                    impression: row.impressions || 0,
                }

                finalReponse.push(newData);
            }

            return resolve(finalReponse);

        } catch (err) {
            console.log(err);
            return reject(err);
        }
    })
}