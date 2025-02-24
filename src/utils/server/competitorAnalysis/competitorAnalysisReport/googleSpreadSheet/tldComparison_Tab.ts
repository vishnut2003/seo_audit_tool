import { GoogleSpreadsheet } from "google-spreadsheet";
import { DFS_tldComparison_response, tldLists } from "../dataForSeoApi/TLD_Comparison/tldComparison";

export async function tldComparisonTab({ tldComparisonReport, sheet }: {
    tldComparisonReport: DFS_tldComparison_response[],
    sheet: GoogleSpreadsheet,
}) {
    return new Promise<void>(async (resolve, reject) => {
        try {
            const headerValues: string[] = ["TLDs"]
            const rows = [];

            for (const tldDetail of tldComparisonReport) {
                headerValues.push(tldDetail.domain);
            }

            const totalCountRow: {
                [key: string]: string,
            } = {
                TLDs: "Total",
            }

            for (const tlds of tldComparisonReport[0]?.tldList || []) {
                const row: {
                    [key: string]: string,
                } = {
                    TLDs: tlds,
                }

                for (const tldDetails of tldComparisonReport) {
                    for (const tldCount of tldDetails.tldCount) {
                        if (tldCount.tld === tlds) {
                            row[tldDetails.domain] = tldCount.count.toString();
                        }
                    }

                    totalCountRow[tldDetails.domain] = tldDetails.totalCount.toString();
                }

                rows.push(row);
            }

            rows.push(totalCountRow);

            const currentSheet = await sheet.addSheet({
                title: "TLDs Comparison",
                headerValues,
            })

            await currentSheet.addRows(rows);
            return resolve();

        } catch (err) {
            return reject(err);
        }
    })
}