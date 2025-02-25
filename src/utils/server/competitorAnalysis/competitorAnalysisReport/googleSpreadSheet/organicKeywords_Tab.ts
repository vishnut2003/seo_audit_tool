import { GoogleSpreadsheet } from "google-spreadsheet";
import { DFS_organic_keywords } from "../dataForSeoApi/organicKeywords/organicKeywords";

export async function organicKeywordsTab ({organicKeywordsReport, sheet, index}: {
    organicKeywordsReport: DFS_organic_keywords,
    sheet: GoogleSpreadsheet,
    index: number,
}) {
    return new Promise<void>(async (resolve, reject) => {
        try {
            const headerValues = [
                "keyword",
                "position",
                "search_volume",
                "url",
            ];

            let domainName: string = "";

            try {
                const urlObject = URL.parse(organicKeywordsReport.domain);
                domainName = urlObject?.hostname || `domain.com ${index}`;
            } catch (error) {
                console.error("Error parsing URL:", error);
                domainName = `domain.com ${index}`;
            }

            const currentSheet = await sheet.addSheet({
                title: `Organic Keywords ${domainName}`,
                headerValues,
            })

            const rows: {
                keyword: string,
                position: number,
                search_volume: number,
                url: string,
            }[] = [];

            for (const data of organicKeywordsReport.data) {
                rows.push(data);
            }

            await currentSheet.addRows(rows);

            return resolve();
        } catch (err) {
            return reject(err);
        }
    })
}