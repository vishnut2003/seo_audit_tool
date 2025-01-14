import { GoogleSpreadsheet } from "google-spreadsheet";
import { competitorAnalysisRawInterface } from "../dataInterface";

export async function onSiteAnalysisTab({
    mainWebsiteReport,
    competitorsReport,
    sheet,
}: {
    mainWebsiteReport: competitorAnalysisRawInterface,
    competitorsReport: competitorAnalysisRawInterface[],
    sheet: GoogleSpreadsheet,
}) {
    return new Promise<void>(async (resolve, reject) => {
        try {

            // create header with initial values
            const headerValues: string[] = [
                "competitor_analysis",
                mainWebsiteReport.website,
            ];

            for (const competitor of competitorsReport) {
                headerValues.push(competitor.website);
            }

            // create row base
            const rows: {
                competitor_analysis: string,
                [key: string]: string,
            }[] = [];

            // Take cateory strings
            const categories: string[] = Object.keys(mainWebsiteReport).filter(key => key !== "website");
            for (const category of categories) {
                const row = { competitor_analysis: category }
                rows.push(row);

                // add test labels with value
                const testKeys: string[] = Object.keys(mainWebsiteReport[category as keyof competitorAnalysisRawInterface]);
                for (const testKey of testKeys) {
                    const categoryItems = mainWebsiteReport[category as keyof competitorAnalysisRawInterface]
                    const testKeyItem = categoryItems[testKey as keyof typeof categoryItems] as { label: string, value: string }
                    const row = { competitor_analysis: testKeyItem.label }

                    // travers all competitors
                    for (const report of competitorsReport) {
                        const categoryItems = report[category as keyof typeof report];
                        const testKeyItem = categoryItems[testKey as keyof typeof categoryItems] as { label: string, value: string };
                        row[report.website as keyof typeof row] = testKeyItem.value;
                    }

                    rows.push(row);
                }
            }

            // create new tab
            const currentTab = await sheet.addSheet({
                title: "On Site Analysis",
                headerValues
            })

            await currentTab.addRows(rows);

            resolve()
        } catch (err) {
            return reject(err);
        }
    })
}