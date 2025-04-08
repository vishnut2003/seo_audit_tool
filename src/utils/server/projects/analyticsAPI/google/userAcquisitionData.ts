import { JWT, OAuth2Client } from "google-auth-library";
import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { google } from "@google-analytics/data/build/protos/protos";

export interface AnalyticsUserAcquisitionGraphReport {
    date: string,
    [key: string]: string | number
}

const sourcesList: string[] = [
    'Organic Search',
    'Direct',
    'Organic Social',
    'Referral',
    'Unassigned',
]

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

export interface AnalyticsUserAcquisitionTableDataInterface {
    source: string,
    totalUsers: number,
    newUsers: number,
    returningUsers: number,
    averageEngagementTimePerActiveUsers: string,
    engagedSessionPerActiveUsers: number,
    eventCount: number,
    keyEvent: number,
    userKeyEventRate: number,
}

export async function fetchAnalyticsUserAcquisitionTableData({
    auth,
    dateRange,
    propertyId,
}: {
    auth: JWT | OAuth2Client,
    propertyId: string,
    dateRange: {
        startDate: string,
        endDate: string,
    }
}) {
    return new Promise<[AnalyticsUserAcquisitionTableDataInterface[]]>(async (resolve, reject) => {
        try {
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
                        name: "firstUserDefaultChannelGroup",
                    },
                ],
                metrics: [
                    { name: 'totalUsers' },
                    { name: 'newUsers' },
                    { name: 'activeUsers' },
                    { name: 'userEngagementDuration' },
                    { name: 'sessions' },
                    { name: 'engagedSessions' },
                    { name: 'eventCount' },
                    { name: 'keyEvents' },
                    { name: 'userKeyEventRate' },
                ],
                dimensionFilter: {
                    filter: {
                        fieldName: 'firstUserDefaultChannelGroup',
                        inListFilter: {
                            values: sourcesList,
                        },
                    }
                },
                limit: 1000,
            })

            const finalResponse: AnalyticsUserAcquisitionTableDataInterface[] = [];

            for (const row of response.rows || []) {
                const source = row.dimensionValues?.[0].value || "none";
                const [
                    totalUsers,
                    newUsers,
                    activeUsers,
                    userEngagementDuration,
                    sessions,
                    engagedSessions,
                    eventCount,
                    keyEvents,
                    userKeyEventRate,
                ]: (google.analytics.data.v1beta.IMetricValue | null)[] = row.metricValues || []

                const averageEngagementTimePerSession = parseInt(userEngagementDuration.value || '0') / parseInt(sessions.value || '1');
                const returningUsers = parseInt(activeUsers.value || '0') - parseInt(newUsers.value || '0');
                const engagedSessionPerActiveUsers = parseFloat((parseInt(engagedSessions.value || '0') / parseInt(activeUsers.value || '1')).toFixed(2));

                const data: AnalyticsUserAcquisitionTableDataInterface = {
                    source,
                    totalUsers: parseInt(totalUsers.value || '0'),
                    newUsers: parseInt(newUsers.value || '0'),
                    returningUsers,
                    averageEngagementTimePerActiveUsers: formatDuration(averageEngagementTimePerSession),
                    engagedSessionPerActiveUsers,
                    eventCount: parseInt(eventCount.value || '0'),
                    keyEvent: parseInt(keyEvents.value || '0'),
                    userKeyEventRate: parseInt(userKeyEventRate.value || '0'),
                }

                finalResponse.push(data);
            }

            return resolve([finalResponse]);
        } catch (err) {
            return reject(err);
        }
    })
}

function formatDuration(milliseconds: number) {
    // Calculate total seconds
    const totalSeconds = Math.floor(milliseconds / 1000);

    // Calculate minutes and remaining seconds
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    // Construct the formatted string
    return `${minutes}m ${seconds}s`;
}