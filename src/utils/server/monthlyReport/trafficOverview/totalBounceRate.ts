import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { resolve } from "path";
import { fetchAnalyticsClient } from "../useAnalyticsClient";

interface GraphTicks {
    value: number,
    date: Date | string,
}

interface DateRangeInterface {
    startDate: string,
    endDate: string,
}

export interface TotalBounceRateMonthlyReportInterface {
    graphTicks: GraphTicks[],
    currentMonthBounceRate: number,
    prevMonthBounceRate: number,
    prevYearBounceRate: number,
    percent: {
        prevMonth: number,
        prevYear: number,
    },
}

export async function fetchTotalBounceRateMonthlyReport({
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
    return new Promise<TotalBounceRateMonthlyReportInterface>(async (resolve, reject) => {
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
                        name: "bounceRate",
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

            const sortGraphData: GraphTicks[] = graphData.map((tick) => {
                const [year, month] = tick.dimensions;
                const [value] = tick.metrics;

                const date = new Date(`${year}-${month.padStart(2, '0')}-01`);
                return ({
                    date,
                    value,
                })
            }).sort((a, b) => a.date.getTime() - b.date.getTime())
                .map((tick) => {
                    return ({
                        date: tick.date.toLocaleString('default', { month: "short" }),
                        value: tick.value,
                    })
                })

            // Calculate Bounces

            const comparingValues: number[] = [];

            for (const dateRange of [
                dateFilters.currentMonth,
                dateFilters.prevMonth,
                dateFilters.currentMonthPrevYear,
            ]) {
                const report = await fetchAnalyticsClient({
                    analyticsClient,
                    propertyId,
                    dateRange,
                    dimensions: [
                        { name: "month" },
                    ],
                    metrics: [
                        { name: "bounceRate" },
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
                currentMonthBounceRate,
                prevMonthBounceRate,
                prevYearBounceRate,
            ] = comparingValues;

            const prevMonthPercent: number = prevMonthBounceRate === 0 ? 100 : ((currentMonthBounceRate - prevMonthBounceRate) / prevMonthBounceRate) * 100;
            const prevYearPercent: number = prevYearBounceRate === 0 ? 100 : ((currentMonthBounceRate - prevYearBounceRate) / prevYearBounceRate) * 100;

            const finalResponse: TotalBounceRateMonthlyReportInterface = {
                graphTicks: sortGraphData,
                currentMonthBounceRate,
                prevMonthBounceRate,
                prevYearBounceRate,
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