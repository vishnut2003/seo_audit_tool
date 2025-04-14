import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { useAnalyticsClient } from "../useAnalyticsClient";

interface DateRangeInterface {
    startDate: string,
    endDate: string,
}

interface GraphTicks {
    session: number,
    date: Date | string,
}

export interface TotalSessionMonthlyReportInterface {
    graphTicks: GraphTicks[],
    currentMonthSession: number,
    prevMonthSession: number,
    prevYearSession: number,
    percent: {
        prevMonth: number,
        prevYear: number,
    },
}

export async function fetchTotalSessionMonthlyReport({
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
    return new Promise<TotalSessionMonthlyReportInterface>(async (resolve, reject) => {
        try {

            const dimensions: {
                name: string,
            }[] = [
                    { name: "year", },
                    { name: "month", },
                ];

            const metrics: {
                name: string,
            }[] = [
                    {
                        name: "sessions",
                    }
                ]

            // Fetch ticks data for graph
            const graphData = await useAnalyticsClient({
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

            const sortGraphData: GraphTicks[] = graphData.map((tick) => {
                const [year, month] = tick.dimensions;
                const [session] = tick.metrics;

                const date = new Date(`${year}-${month.padStart(2, '0')}-01`);
                return ({
                    date,
                    session,
                })
            }).sort((a, b) => a.date.getTime() - b.date.getTime())
                .map((tick) => {
                    return ({
                        date: tick.date.toLocaleString('default', { month: "short" }),
                        session: tick.session,
                    })
                })

            // Calculate sessions

            const comparingValues: number[] = [];

            for (const dateRange of [
                dateFilters.currentMonth,
                dateFilters.prevMonth,
                dateFilters.currentMonthPrevYear,
            ]) {
                const report = await useAnalyticsClient({
                    analyticsClient,
                    propertyId,
                    dateRange,
                    dimensions: [
                        { name: "month" },
                    ],
                    metrics: [
                        { name: "sessions" },
                    ],
                })

                if (report.length !== 0) {
                    for (const session of report) {
                        for (const metric of session.metrics) {
                            comparingValues.push(metric);
                        }
                    }
                } else {
                    comparingValues.push(0);
                }
            }

            const [
                currentMonthSession,
                prevMonthSession,
                prevYearSession,
            ] = comparingValues;

            const prevMonthPercent: number = prevMonthSession === 0 ? 100 : ((currentMonthSession - prevMonthSession) / prevMonthSession) * 100;
            const prevYearPercent: number = prevYearSession === 0 ? 100 : ((currentMonthSession - prevYearSession) / prevYearSession) * 100;

            const finalResponse: TotalSessionMonthlyReportInterface = {
                graphTicks: sortGraphData,
                currentMonthSession,
                prevMonthSession,
                prevYearSession,
                percent: {
                    prevMonth: Math.floor(prevMonthPercent),
                    prevYear: Math.floor(prevYearPercent),
                }
            }

            return resolve(finalResponse);

        } catch (err) {
            return reject(err);
        }
    })
}