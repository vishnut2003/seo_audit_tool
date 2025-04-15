import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { fetchAnalyticsClient } from "../useAnalyticsClient";
import { calculatePercentage } from "../commonUtils";

interface DateRangeInterface {
    startDate: string,
    endDate: string,
}

interface GraphTicks {
    conversion: number,
    date: Date | string,
}

export interface SessionConversionDataMonthlyReportInterface {
    graphTicks: GraphTicks[],
    currentMonthSessionConversion: number,
    prevMonthSessionConversion: number,
    prevYearSessionConversion: number,
    percent: {
        prevMonth: number,
        prevYear: number,
    },
}

export async function fetchSessionConversionDataMonthlyReport({
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
    return new Promise<SessionConversionDataMonthlyReportInterface>(async (resolve, reject) => {
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
                        name: "sessionConversionRate",
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
                const [conversion] = tick.metrics;

                const date = new Date(`${year}-${month.padStart(2, '0')}-01`);
                return ({
                    date,
                    conversion,
                })
            }).sort((a, b) => a.date.getTime() - b.date.getTime())
                .map((tick) => {
                    return ({
                        date: tick.date.toLocaleString('default', { month: "short" }),
                        conversion: tick.conversion,
                    })
                })

            // Calculate conversions

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
                        { name: "sessionConversionRate" },
                    ],
                })

                if (report.length !== 0) {
                    for (const conversions of report) {
                        for (const metric of conversions.metrics) {
                            comparingValues.push(metric);
                        }
                    }
                } else {
                    comparingValues.push(0);
                }
            }

            const [
                currentMonthSessionConversion,
                prevMonthSessionConversion,
                prevYearSessionConversion,
            ] = comparingValues;

            const prevMonthPercent: number = calculatePercentage({ newValue: currentMonthSessionConversion, prevValue: prevMonthSessionConversion });
            const prevYearPercent: number = calculatePercentage({ newValue: currentMonthSessionConversion, prevValue: prevYearSessionConversion });

            const finalResponse: SessionConversionDataMonthlyReportInterface = {
                graphTicks: sortGraphData,
                currentMonthSessionConversion,
                prevMonthSessionConversion,
                prevYearSessionConversion,
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