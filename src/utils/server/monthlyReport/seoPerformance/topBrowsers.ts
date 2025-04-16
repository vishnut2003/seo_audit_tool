import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { fetchAnalyticsClient } from "../useAnalyticsClient";

interface DateRangeInterface {
    startDate: string,
    endDate: string,
}

interface GraphTicks {
    session: number,
    browser: string,
}

export interface TopBrowsersMonthlyReportInterface {
    graphTicks: GraphTicks[],
}

export async function fetchTopBrowsersMonthlyReport({
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
    return new Promise<TopBrowsersMonthlyReportInterface>(async (resolve, reject) => {
        try {
            const dimensions: {
                name: string,
            }[] = [
                    { name: "browser", },
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
                const [browser] = tick.dimensions;
                const [session] = tick.metrics;

                return ({
                    browser,
                    session,
                })
            })

            const finalResponse: TopBrowsersMonthlyReportInterface = {
                graphTicks: sortGraphData,
            }
            return resolve(finalResponse)
        } catch (err) {
            return reject(err);
        }
    })
}