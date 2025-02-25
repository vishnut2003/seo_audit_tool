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

// interface APIRequestDataInterface {
//     target: string,
//     language_name?: string,
//     location_code?: number,
//     filters?: (string | string[])[],
//     limit: number,
// }

export async function DFS_organicKeywords(domain: string) {
    return new Promise<DFS_organic_keywords>(async (resolve, reject) => {
        try {
            // Fetch API
            const response = {
                data: DFS_test_keywords_data,
            }

            // convert url to domain
            let hostname = null;
            if (URL.canParse(domain)) {
                const urlObject = URL.parse(domain);
                hostname = urlObject?.hostname || domain;
            }

            // const DFSAxios = await axiosDFSInstance();

            // const requestData: APIRequestDataInterface[] = [];
            // requestData.push({
            //     target: domain,
            //     limit: 1000,
            // })

            // const response = await DFSAxios.post("/dataforseo_labs/google/ranked_keywords/live", requestData);

            const apiResponse = response.data as typeof DFS_test_keywords_data;

            const finalResponse: DFS_organic_keywords = {
                domain,
                data: [],
            }

            for (const task of apiResponse.tasks) {
                if (!task.result) {
                    continue;
                }
                for (const result of task.result) {
                    if (!result.items) {
                        continue;
                    }
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