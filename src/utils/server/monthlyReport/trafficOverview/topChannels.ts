import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { fetchAnalyticsClient } from "../useAnalyticsClient";

interface DateRangeInterface {
    startDate: string,
    endDate: string,
}

interface GraphTicks {
    date: string,
    channels: {
        "Organic Search": number,
        "Direct": number,
        "Referral": number,
        "Organic Social": number,
        "others": number,
    },
}

export interface TopChannelsDataMonthlyReportInterface {
    graphTicks: GraphTicks[],
}

export async function fetchTopChannelsOverTimeMonthlyReport({
    analyticsClient,
    dateFilters,
    propertyId,
}: {
    analyticsClient: BetaAnalyticsDataClient,
    dateFilters: {
        currentMonth: DateRangeInterface,
        prevMonth: DateRangeInterface,
        currentMonthPrevYear: DateRangeInterface,
        dateRangeStart: string,
    }
    propertyId: string,
}) {
    return new Promise<TopChannelsDataMonthlyReportInterface>(async (resolve, reject) => {
        try {
            const dimensions: {
                name: string,
            }[] = [
                    { name: "year", },
                    { name: "month", },
                    { name: "sessionDefaultChannelGroup", },
                ];

            const metrics: {
                name: string,
            }[] = [
                    {
                        name: "sessions",
                    }
                ]

            // Fetch ticks data for graph
            const graphData = await fetchAnalyticsClient({
                propertyId,
                analyticsClient,
                dateRange: {
                    startDate: dateFilters.dateRangeStart,
                    endDate: dateFilters.currentMonth.endDate,
                },
                dimensions,
                metrics,
                orderBys: [
                    {
                        dimension: {
                            dimensionName: "month",
                        },
                        desc: false,
                    },
                    {
                        dimension: {
                            dimensionName: "year",
                        },
                        desc: false,
                    },
                ]
            })

            const groupedData: {
                [key: string]: GraphTicks
            } = {}

            for (const { dimensions, metrics } of graphData) {
                const [year, month, channel] = dimensions;
                const [session] = metrics;

                const date = new Date(`${year}-${month.padStart(2, '0')}-01`);

                if (!groupedData[month]) {
                    groupedData[month] = {
                        date: date.toISOString().split('T')[0],
                        channels: {
                            "Organic Search": 0,
                            "Organic Social": 0,
                            Direct: 0,
                            Referral: 0,
                            "others": 0,
                        },
                    }
                }

                const channelKeys: string[] = Object.keys(groupedData[month].channels);

                if (channelKeys.includes(channel)) {
                    groupedData[month].channels[channel as keyof GraphTicks["channels"]] = session;
                } else {
                    groupedData[month].channels["others"] = session;
                }
            }

            const graphTicks: GraphTicks[] = [...Object.values(groupedData)];
            const finalResponse: TopChannelsDataMonthlyReportInterface = {
                graphTicks,
            }

            return resolve(finalResponse)
        } catch (err) {
            return reject(err);
        }
    })
}