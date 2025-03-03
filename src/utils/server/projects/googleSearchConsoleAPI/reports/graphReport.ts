import { JWT } from "google-auth-library";
import { searchconsole } from "@googleapis/searchconsole";

export interface GoogleSearchConsoleGraphRow {
    date: string,
    clicks: number,
    impression: number,
    ctr: number,
    position: number,
}

export async function graphReports({ auth, property, dateRange }: {
    auth: JWT,
    property: string,
    dateRange: {
        from: string,
        to: string,
    }
}) {
    return new Promise<GoogleSearchConsoleGraphRow[]>(async (resolve, reject) => {
        try {
            const googleSearchConsole = searchconsole({
                version: "v1",
                auth,
            });

            const response = await googleSearchConsole.searchanalytics.query({
                siteUrl: property,
                requestBody: {
                    startDate: dateRange.from,
                    endDate: dateRange.to,
                    dimensions: ['date'], // Group by date
                },
            })

            const rows: GoogleSearchConsoleGraphRow[] = [];
            
            for (const row of response.data.rows || []) {
                rows.push({
                    date: row.keys?.[0] || "no-date",
                    clicks: row.clicks || 0,
                    impression: row.impressions || 0,
                    ctr: row.ctr || 0,
                    position: row.position || 0,
                });
            }

            return resolve(rows);
        } catch (err) {
            console.log(err);
            return reject(err);
        }
    })
}