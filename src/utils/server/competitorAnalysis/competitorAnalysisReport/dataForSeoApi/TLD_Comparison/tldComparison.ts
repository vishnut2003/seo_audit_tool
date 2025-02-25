import DFS_test_backlinks_data from "./testData";

export interface DFS_tldComparison_response {
    domain: string,
    tldList: string[],
    tldCount: {
        tld: string,
        count: number,
    }[],
    totalCount: number,
}

// interface APIRequestDataInterface {
//     target: string,
//     internal_list_limit: number,
//     include_subdomains: boolean,
//     backlinks_filters: string[],
//     backlinks_status_type: string,
// }

export async function DFS_tldComparison(domain: string) {
    return new Promise<DFS_tldComparison_response>(async (resolve, reject) => {
        try {
            // fetch from api
            const response = {
                data: DFS_test_backlinks_data,
            }

            // const DFSAxios = await axiosDFSInstance();

            // const requestData: APIRequestDataInterface[] = [];
            // requestData.push({
            //     target: domain,
            //     internal_list_limit: 5,
            //     include_subdomains: true,
            //     backlinks_filters: [],
            //     backlinks_status_type: "all",
            // })

            // const response = await DFSAxios.post("/backlinks/summary/live", requestData);

            const apiResponse = response.data as typeof DFS_test_backlinks_data;

            const finalResponse: DFS_tldComparison_response = {
                domain,
                tldList: [],
                tldCount: [],
                totalCount: 0,
            }

            for (const task of apiResponse.tasks) {
                for (const result of task.result) {
                    const tlds = Object.keys(result.referring_links_tld);
                    finalResponse.tldList = tlds;
                    for (const tld of tlds) {
                        const data = {
                            tld,
                            count: result.referring_links_tld[tld as keyof typeof result.referring_links_tld] || 0,
                        };
                        finalResponse.totalCount += result.referring_links_tld[tld as keyof typeof result.referring_links_tld];
                        finalResponse.tldCount.push(data);
                    }
                }
            }

            return resolve(finalResponse);
        } catch (err) {
            console.log(err);
            return reject(err);
        }
    })
}