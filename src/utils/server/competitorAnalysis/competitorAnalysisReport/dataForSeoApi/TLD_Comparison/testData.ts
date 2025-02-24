const DFS_test_backlinks_data = {
    "version": "0.1.20230825",
    "status_code": 20000,
    "status_message": "Ok.",
    "time": "1.0162 sec.",
    "cost": 0.02003,
    "tasks_count": 1,
    "tasks_error": 0,
    "tasks": [
        {
            "id": "09291809-1535-0265-0000-8d49256fe2ad",
            "status_code": 20000,
            "status_message": "Ok.",
            "time": "0.9619 sec.",
            "cost": 0.02003,
            "result_count": 1,
            "path": [
                "v3",
                "backlinks",
                "summary",
                "live"
            ],
            "data": {
                "api": "backlinks",
                "function": "summary",
                "target": "explodingtopics.com",
                "internal_list_limit": 10,
                "include_subdomains": true,
                "backlinks_filters": [
                    "dofollow",
                    "=",
                    true
                ],
                "backlinks_status_type": "all"
            },
            "result": [
                {
                    "target": "explodingtopics.com",
                    "first_seen": "2020-01-18 11:50:58 +00:00",
                    "lost_date": null,
                    "rank": 371,
                    "backlinks": 41245,
                    "backlinks_spam_score": 8,
                    "crawled_pages": 2150,
                    "info": {
                        "server": "cloudflare",
                        "cms": null,
                        "platform_type": [
                            "unknown"
                        ],
                        "ip_address": "172.67.129.80",
                        "country": "US",
                        "is_ip": false,
                        "target_spam_score": 0
                    },
                    "internal_links_count": 25507,
                    "external_links_count": 18419,
                    "broken_backlinks": 209,
                    "broken_pages": 265,
                    "referring_domains": 12372,
                    "referring_domains_nofollow": 0,
                    "referring_main_domains": 11438,
                    "referring_main_domains_nofollow": 0,
                    "referring_ips": 10401,
                    "referring_subnets": 6427,
                    "referring_pages": 38786,
                    "referring_links_tld": {
                        "com": 26012,
                        "pics": 1964,
                        "net": 1080,
                        "org": 1031,
                        "info": 670,
                        "hu": 548,
                        "co.uk": 527,
                        "io": 481,
                        "best": 416,
                        "co": 299
                    },
                    "referring_links_types": {
                        "anchor": 36666,
                        "redirect": 1906,
                        "image": 210,
                        "canonical": 4
                    },
                    "referring_links_attributes": {
                        "noopener": 8960,
                        "noreferrer": 3908,
                        "external": 167,
                        "sponsored": 34,
                        "ugc": 20,
                        "alternate": 2
                    },
                    "referring_links_platform_types": {
                        "unknown": 15196,
                        "cms": 13222,
                        "blogs": 12985,
                        "organization": 9525,
                        "message-boards": 2679,
                        "news": 2295,
                        "ecommerce": 36
                    },
                    "referring_links_semantic_locations": {
                        "": 20318,
                        "article": 12403,
                        "section": 3907,
                        "main": 1595,
                        "details": 366,
                        "figcaption": 116,
                        "figure": 38,
                        "header": 28,
                        "aside": 5,
                        "nav": 4
                    },
                    "referring_links_countries": {
                        "": 27445,
                        "US": 3867,
                        "WW": 1439,
                        "IN": 738,
                        "GB": 602,
                        "IO": 440,
                        "CO": 275,
                        "DE": 259,
                        "IT": 196,
                        "BR": 181
                    },
                    "referring_pages_nofollow": 0
                }
            ]
        }
    ]
}

export default DFS_test_backlinks_data;