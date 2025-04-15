import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { fetchAnalyticsClient } from "../useAnalyticsClient";

interface DateRangeInterface {
    startDate: string,
    endDate: string,
}

interface GraphTicks {
    session: number,
    country: string,
}

export interface TotalSessionByCountryMonthlyReportInterface {
    graphTicks: GraphTicks[],
}

export async function fetchEngagedSessionByCountryMonthlyReport({
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
    return new Promise<TotalSessionByCountryMonthlyReportInterface>(async (resolve, reject) => {
        try {
            const dimensions: {
                name: string,
            }[] = [
                    { name: "country", },
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
                        metric: {
                            metricName: "sessions",
                        },
                        desc: true,
                    },
                ]
            })

            const sortGraphData: GraphTicks[] = graphData.map((tick) => {
                const [country] = tick.dimensions;
                const [session] = tick.metrics;

                return ({
                    country,
                    session,
                })
            })

            const finalResponse: TotalSessionByCountryMonthlyReportInterface = {
                graphTicks: sortGraphData,
            }
            return resolve(finalResponse)
        } catch (err) {
            return reject(err);
        }
    })
}