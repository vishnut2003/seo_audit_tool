import { JWT, OAuth2Client } from "google-auth-library";
import { BetaAnalyticsDataClient } from "@google-analytics/data";

export interface AnalyticsUserAcquisitionGraphReport {
    date: string,
    [key: string]: string | number
}

export async function fetchAnalyticsUserAcquisitionData({
    dateRange,
    graphType,
    auth,
    propertyId,
}: {
    dateRange: {
        startDate: string,
        endDate: string,
    },
    graphType: "date" | "week" | "month",
    auth: JWT | OAuth2Client,
    propertyId: string,
}) {
    return new Promise<[AnalyticsUserAcquisitionGraphReport[]]>(async (resolve, reject) => {
        try {

            const sourcesList: string[] = [
                'Organic Search',
                'Direct',
                'Organic Social',
                'Referral',
                'Unassigned',
            ]

            const analyticsClient = new BetaAnalyticsDataClient({
                authClient: (auth as any),
            })

            const [response] = await analyticsClient.runReport({
                property: `properties/${propertyId}`,
                dateRanges: [
                    {
                        ...dateRange,
                    },
                ],
                dimensions: [
                    {
                        name: graphType,
                    },
                    {
                        name: "year",
                    },
                    {
                        name: "sessionDefaultChannelGroup",
                    },
                ],
                metrics: [
                    { name: 'totalUsers' },
                ],
                dimensionFilter: {
                    filter: {
                        fieldName: 'sessionDefaultChannelGroup',
                        inListFilter: {
                            values: sourcesList,
                        },
                    }
                },
                orderBys: [
                    { dimension: { dimensionName: graphType } },
                ],
                limit: 1000,
            })

            const dailyTraffic: {
                [key: string]: {
                    [key: string]: number;
                };
            } = {};

            for (const row of response.rows || []) {
                const users = row.metricValues?.[0].value || '0';
                const usersInt = parseInt(users);

                const date = generateDate({
                    date: row.dimensionValues?.[0].value || "",
                    year: row.dimensionValues?.[1].value || "",
                    graphType,
                });

                const source = row.dimensionValues?.[2].value || "No source";

                if (dailyTraffic[date as keyof typeof dailyTraffic]) {
                    dailyTraffic[date as keyof typeof dailyTraffic][source] += usersInt;
                } else {
                    const data: {
                        [key: string]: number,
                    } = {}

                    for (const source of sourcesList) {
                        data[source] = 0;
                    }

                    data[source] += usersInt;
                    dailyTraffic[date as keyof typeof dailyTraffic] = data;
                    data['date'] = (date as any);
                }
            }

            const graphReport: AnalyticsUserAcquisitionGraphReport[] = []
            for (const date of Object.keys(dailyTraffic)) {
                graphReport.push((dailyTraffic[date as keyof typeof dailyTraffic] as any));
            }

            return resolve([
                graphReport,
            ]);
        } catch (err) {
            return reject(err);
        }
    })
}

function generateDate({
    date,
    year,
    graphType,
}: {
    date: string,
    year: string,
    graphType: "date" | "week" | "month",
}) {
    if (graphType === "date") {
        return `${date.substring(0, 4)}/${date.substring(4, 6)}/${date.substring(6)}`
    } else if (graphType === "week") {
        return `Week ${date}, ${year}`;
    } else if (graphType === "month") {
        return `${year}/${date}`;
    } else {
        return date;
    }
}