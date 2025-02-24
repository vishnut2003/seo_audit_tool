import DFS_test_keywords_data from "./testData";

export interface DFS_organic_keywords {
    domain: string,
    data: keywords_items[],
}

interface keywords_items {
    keyword: string,
    position: number,
    search_volume: number,
    url: string,
}

export async function DFS_organicKeywords(domain: string) {
    return new Promise<DFS_organic_keywords>(async (resolve, reject) => {
        try {
            // Fetch API
            const response = {
                data: DFS_test_keywords_data,
            }

            const apiResponse = response.data;

            const finalResponse: DFS_organic_keywords = {
                domain,
                data: [],
            }

            for (const task of apiResponse.tasks) {
                for (const result of task.result) {
                    // loop keywords one by one
                    for (const item of result.items) {
                        const data: keywords_items = {
                            keyword: item.keyword_data.keyword,
                            position: item.ranked_serp_element.serp_item.rank_absolute,
                            search_volume: item.keyword_data.keyword_info.search_volume,
                            url: item.ranked_serp_element.serp_item.url,
                        }

                        finalResponse.data.push(data);
                    }
                }
            }

            return resolve(finalResponse);

        } catch (err) {
            return reject(err);
        }
    })
}