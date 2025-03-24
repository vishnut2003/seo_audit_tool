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

function formatDate(dateString: string) {
    // Extract year, month, and day from the string
    const year = dateString.slice(0, 4);
    const month = dateString.slice(4, 6);
    const day = dateString.slice(6, 8);
    return `${year}/${month}/${day}`;
};