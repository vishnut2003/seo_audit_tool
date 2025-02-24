export interface DFS_tldComparisonInterface {
    version: string,
    status_code: number,
    status_message: string,
    time: string,
    cost: number,
    tasks_count: number,
    tasks_error: number,
    tasks: [
        {
            id: string,
            status_code: number,
            status_message: string,
            time: string,
            cost: number,
            result_count: number,
            path: string[],
            data: {
                api: string,
                function: string,
                target: string,
                limit: number,
                order_by: string,
                exclude_internal_backlinks: true,
                backlinks_filters: any[],
                filters: any[]
            },
            result: {
                target: string,
                total_count: number,
                items_count: number,
                items: {
                    type: string,
                    domain: string,
                    rank: number,
                    backlinks: number,
                    first_seen: string,
                    lost_date: null,
                    backlinks_spam_score: number,
                    broken_backlinks: number,
                    broken_pages: number,
                    referring_domains: number,
                    referring_domains_nofollow: number,
                    referring_main_domains: number,
                    referring_main_domains_nofollow: number,
                    referring_ips: number,
                    referring_subnets: number,
                    referring_pages: number,
                    referring_links_tld: {
                        net: number
                    },
                    referring_links_types: {
                        anchor: number
                    },
                    referring_links_attributes: null,
                    referring_links_platform_types: {
                        blogs: number,
                        cms: number,
                        ecommerce: number,
                    },
                    referring_links_semantic_locations: {
                        [key: string]: number,
                    },
                    referring_links_countries: {
                        [key: string]: number,
                    },
                    referring_pages_nofollow: number
                }[]
            }[]
        }
    ]
}