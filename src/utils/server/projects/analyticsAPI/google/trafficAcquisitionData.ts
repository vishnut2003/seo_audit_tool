import { BetaAnalyticsDataClient } from "@google-analytics/data"
import { google } from "@google-analytics/data/build/protos/protos"
import { JWT, OAuth2Client } from "google-auth-library"

export interface AnalyticsTrafficAcquisitionGraphReport {
    date: string,
    [key: string]: string | number,
}

const sourcesList: string[] = [
    'Organic Search',
    'Direct',
    'Organic Social',
    'Referral',
    'Unassigned',
]

export async function fetchAnalyticsTrafficAcquisitionGraphData({
    auth,
    dateRange,
    graphType,
    propertyId,
}: {
    dateRange: {
        startDate: string,
        endDate: string,
    },
    graphType: "date" | "week" | "month",
    propertyId: string,
    auth: JWT | OAuth2Client,
}) {
    return new Promise<AnalyticsTrafficAcquisitionGraphReport[]>(async (resolve, reject) => {
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
                    { name: 'sessions' },
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

            const graphReport: AnalyticsTrafficAcquisitionGraphReport[] = []
            for (const date of Object.keys(dailyTraffic)) {
                graphReport.push((dailyTraffic[date as keyof typeof dailyTraffic] as any));
            }

            return resolve(graphReport)

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

export interface AnalyticsTrafficAcquisitionTableDataInterface {
    source: string,
    sessions: number,
    engagedSessions: number,
    engagementRate: number,
    eventsPerSession: number,
    eventCount: number,
    keyEvents: number,
    sessionKeyEventRate: number,
    averageEngagementTimePerSession: string,
}

export async function fetchAnalyticsTrafficAcquisitionTableData({
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
    return new Promise<AnalyticsTrafficAcquisitionTableDataInterface[]>(async (resolve, reject) => {
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
                        name: "sessionDefaultChannelGroup",
                    },
                ],
                metrics: [
                    { name: "sessions" },
                    { name: "engagedSessions" },
                    { name: "engagementRate" },
                    { name: "userEngagementDuration" },
                    { name: "eventsPerSession" },
                    { name: "eventCount" },
                    { name: "keyEvents" },
                    { name: "sessionKeyEventRate" },
                ],
                dimensionFilter: {
                    filter: {
                        fieldName: 'sessionDefaultChannelGroup',
                        inListFilter: {
                            values: sourcesList,
                        },
                    }
                },
                limit: 1000,
            })

            const finalResponse: AnalyticsTrafficAcquisitionTableDataInterface[] = [];

            for (const row of response.rows || []) {
                const source = row.dimensionValues?.[0].value || "no source";
                const [
                    sessions,
                    engagedSessions,
                    engagementRate,
                    userEngagementDuration,
                    eventsPerSession,
                    eventCount,
                    keyEvents,
                    sessionKeyEventRate,
                ]: (google.analytics.data.v1beta.IMetricValue | null)[] = row.metricValues || []

                const averageEngagementTimePerSession = parseInt(userEngagementDuration.value || '0') / parseInt(sessions.value || '0');
                const formattedAvgTimePerSession = formatDuration(averageEngagementTimePerSession);

                const data: AnalyticsTrafficAcquisitionTableDataInterface = {
                    source,
                    sessions: parseInt(sessions.value || '0'),
                    engagedSessions: parseInt(engagedSessions.value || '0'),
                    averageEngagementTimePerSession: formattedAvgTimePerSession,
                    engagementRate: parseInt(engagementRate.value || '0'),
                    eventCount: parseInt(eventCount.value || '0'),
                    eventsPerSession: parseInt(eventsPerSession.value || '0'),
                    keyEvents: parseInt(keyEvents.value || '0'),
                    sessionKeyEventRate: parseInt(sessionKeyEventRate.value || '0'),
                }

                finalResponse.push(data);
            }

            return resolve(finalResponse);
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