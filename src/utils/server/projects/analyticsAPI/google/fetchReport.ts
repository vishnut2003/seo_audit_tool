import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { JWT, OAuth2Client } from "google-auth-library"

export interface GoogleAnalyticsReportFilterInterface {
    dateRange: {
        from: string,
        to: string,
    },
}

export interface GoogleAnalyticsReportResponse {
    totals: {
        name: string,
        value: number,
    }[],
    dataPoints: GoogleAnalyticsDataPoints[],
}

export interface GoogleAnalyticsDataPoints {
    date: string,
    activeUsers: number,
    newUsers: number,
    eventCount: number,
}

export async function fetchAnalyticsReport({ auth, propertyId, filter }: {
    auth: JWT | OAuth2Client,
    propertyId: string,
    filter: GoogleAnalyticsReportFilterInterface,
}) {
    return new Promise<GoogleAnalyticsReportResponse>(async (resolve, reject) => {
        try {

            let analyticsDataClient;

            if (auth instanceof JWT) {
                analyticsDataClient = new BetaAnalyticsDataClient({
                    authClient: auth,
                });
            } else {
                analyticsDataClient = new BetaAnalyticsDataClient({
                    authClient: (auth as any)
                });
            }

            const [response] = await analyticsDataClient.runReport({
                property: `properties/${propertyId}`,
                dateRanges: [
                    {
                        startDate: filter.dateRange.from,
                        endDate: filter.dateRange.to,
                    },
                ],
                dimensions: [
                    {
                        name: "date",
                    }
                ],
                metrics: [
                    {
                        name: "activeUsers",
                    },
                    {
                        name: "newUsers",
                    },
                    {
                        name: "eventCount"
                    }
                ],
                orderBys: [
                    {
                        dimension: {
                            dimensionName: 'date',
                        },
                    }
                ]
            });

            const finalResponse: GoogleAnalyticsReportResponse = {
                totals: [
                    {
                        name: "activeUsers",
                        value: 0,
                    },
                    {
                        name: "newUsers",
                        value: 0,
                    },
                    {
                        name: "eventCount",
                        value: 0,
                    }
                ],
                dataPoints: [],
            }

            for (const row of response.rows || []) {
                let index = 0;

                let date = row.dimensionValues?.[0].value || "No date";
                date = formatDate(date);

                let data: {
                    [key: string]: number,
                } = {};

                for (const metricValue of row.metricValues || []) {
                    let value: number | null = null;
                    try {
                        value = parseInt(metricValue.value || '0');
                    } catch (err) {
                        console.log(err);
                        value = 0;
                    }

                    // setup totals
                    finalResponse.totals[index].value += value;

                    // Setup metrics
                    data = {
                        ...data,
                        [finalResponse.totals[index].name]: value,
                    }
                    index++;
                }

                finalResponse.dataPoints.push({
                    date,
                    activeUsers: data.activeUsers || 0,
                    newUsers: data.newUsers || 0,
                    eventCount: data.eventCount || 0,
                })
            }

            return resolve(finalResponse);
        } catch (err) {
            return reject(err);
        }
    })
}

export interface AnalyticsDataByCountryInterface {
    country: string,
    activeUsers: number,
    newUsers: number,
    eventCount: number,
}

export async function fetchAnalyticsReportByCountry({
    auth,
    filter,
    propertyId,
}: {
    auth: JWT | OAuth2Client,
    propertyId: string,
    filter: GoogleAnalyticsReportFilterInterface,
}) {
    return new Promise<AnalyticsDataByCountryInterface[]>(async (resolve, reject) => {
        try {
            const analyticsClient = new BetaAnalyticsDataClient({
                authClient: (auth as any),
            });

            const [response] = await analyticsClient.runReport({
                property: `properties/${propertyId}`,
                dateRanges: [
                    {
                        startDate: filter.dateRange.from,
                        endDate: filter.dateRange.to,
                    },
                ],
                dimensions: [
                    {
                        name: "country",
                    }
                ],
                metrics: [
                    {
                        name: "activeUsers",
                    },
                    {
                        name: "newUsers",
                    },
                    {
                        name: "eventCount"
                    }
                ],
            });

            const byCountryData: AnalyticsDataByCountryInterface[] = [];

            for (const row of response.rows || []) {
                const data: AnalyticsDataByCountryInterface = {
                    country: row.dimensionValues?.[0].value || "no country",
                    activeUsers: parseInt(row.metricValues?.[0].value || "0") || 0,
                    newUsers: parseInt(row.metricValues?.[1].value || "0") || 0,
                    eventCount: parseInt(row.metricValues?.[2].value || "0") || 0,
                }

                byCountryData.push(data);
            }

            return resolve(byCountryData);

        } catch (err) {
            return reject(err);
        }
    })
}

export interface AnalyticsReportByNewUsersSourceDataInterface {
    source: string,
    activeUsers: number,
    newUsers: number,
}

const sourceMapping: {
    [key: string]: string,
} = {
    "(direct)": "Direct",
    "google": "Google",
    "bing": "Bing",
    "yahoo": "Yahoo",
    "duckduckgo": "DuckDuckGo",
    "baidu": "Baidu",
    "yandex": "Yandex",
    "youtube.com": "YouTube",
    "facebook.com": "Facebook",
    "instagram.com": "Instagram",
    "twitter.com": "Twitter",
    "linkedin.com": "LinkedIn",
    "reddit.com": "Reddit",
    "quora.com": "Quora"
};

export async function fetchReportByNewUsersSource({
    auth,
    filter,
    propertyId,
}: {
    auth: JWT | OAuth2Client,
    propertyId: string,
    filter: GoogleAnalyticsReportFilterInterface,
}) {
    return new Promise<AnalyticsReportByNewUsersSourceDataInterface[]>(async (resolve, reject) => {
        try {
            const analyticsClient = new BetaAnalyticsDataClient({
                authClient: (auth as any),
            });

            const [response] = await analyticsClient.runReport({
                property: `properties/${propertyId}`,
                dateRanges: [
                    {
                        startDate: filter.dateRange.from,
                        endDate: filter.dateRange.to,
                    },
                ],
                dimensions: [
                    {
                        name: "sessionSource",
                    }
                ],
                metrics: [
                    {
                        name: "newUsers",
                    },
                    {
                        name: "activeUsers",
                    },
                ],
                orderBys: [
                    {
                        metric: {
                            metricName: 'newUsers',
                        },
                        desc: true,
                    }
                ]
            });

            const finalResponse: AnalyticsReportByNewUsersSourceDataInterface[] = [];

            for (const row of response.rows || []) {

                const newUserCount = row.metricValues?.[0].value;
                const intNewUserCount = typeof newUserCount === "string" ? parseInt(newUserCount) : 0;

                const activeUsersCount = row.metricValues?.[1].value;
                const intactiveUserCount = typeof activeUsersCount === "string" ? parseInt(activeUsersCount) : 0;

                const data: AnalyticsReportByNewUsersSourceDataInterface = {
                    source: sourceMapping[`${row.dimensionValues?.[0].value}`] || row.dimensionValues?.[0].value || "none",
                    newUsers: intNewUserCount,
                    activeUsers: intactiveUserCount,
                }

                finalResponse.push(data);
            }

            return resolve(finalResponse);
        } catch (err) {
            return reject(err);
        }
    })
}

export interface AnalyticsReportTopPagesTitle {
    pageTitle: string,
    pageUrl: string,
    views: number,
}

export async function fetchAnalyticsReportTopPagesTitle({
    auth,
    filter,
    propertyId,
}: {
    auth: JWT | OAuth2Client,
    propertyId: string,
    filter: GoogleAnalyticsReportFilterInterface,
}) {
    return new Promise<AnalyticsReportTopPagesTitle[]>(async (resolve, reject) => {
        try {
            const analyticsClient = new BetaAnalyticsDataClient({
                authClient: (auth as any),
            });

            const [response] = await analyticsClient.runReport({
                property: `properties/${propertyId}`,
                dateRanges: [
                    {
                        startDate: filter.dateRange.from,
                        endDate: filter.dateRange.to,
                    },
                ],
                dimensions: [
                    {
                        name: "pageTitle",
                    },
                    {
                        name: "pagePath",
                    },
                    {
                        name: "hostname",
                    }
                ],
                metrics: [
                    {
                        name: "screenPageViews",
                    },
                ],
                orderBys: [
                    {
                        dimension: {
                            dimensionName: 'screenPageViews',
                        },
                        desc: true,
                    }
                ]
            });

            const finalResponse: AnalyticsReportTopPagesTitle[] = [];

            for (const row of response.rows || []) {

                const value = row.metricValues?.[0].value
                const intValue: number = typeof value === "string" ? parseInt(value) : 0;

                const hostname = row.dimensionValues?.[2].value;
                const pageUrlPath = row.dimensionValues?.[1].value;

                const data: AnalyticsReportTopPagesTitle = {
                    pageTitle: row.dimensionValues?.[0].value || "No page title",
                    pageUrl: `https://${hostname || "example.com"}${pageUrlPath || '/'}`,
                    views: intValue,
                }

                finalResponse.push(data);
            }

            return resolve(finalResponse);
        } catch (err) {
            return reject(err);
        }
    })
}

function formatDate(dateString: string) {
    // Extract year, month, and day from the string
    const year = dateString.slice(0, 4);
    const month = dateString.slice(4, 6);
    const day = dateString.slice(6, 8);
    return `${year}/${month}/${day}`;
};