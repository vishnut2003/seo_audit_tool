import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { fetchAnalyticsClient } from "../useAnalyticsClient";

interface DateRangeInterface {
    startDate: string,
    endDate: string,
}

interface GraphTicks {
    conversion: number,
    date: Date | string,
}

export interface ConversionDataMonthlyReportInterface {
    graphTicks: GraphTicks[],
    currentMonthConversion: number,
    prevMonthConversion: number,
    prevYearConversion: number,
    percent: {
        prevMonth: number,
        prevYear: number,
    },
}

export async function fetchConversionDataMonthlyReport({
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
    return new Promise<ConversionDataMonthlyReportInterface>(async (resolve, reject) => {
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
                        name: "conversions",
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
                        { name: "conversions" },
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
                currentMonthConversion,
                prevMonthConversion,
                prevYearConversion,
            ] = comparingValues;

            const prevMonthPercent: number = prevMonthConversion === 0 ? 100 : ((currentMonthConversion - prevMonthConversion) / prevMonthConversion) * 100;
            const prevYearPercent: number = prevYearConversion === 0 ? 100 : ((currentMonthConversion - prevYearConversion) / prevYearConversion) * 100;

            const finalResponse: ConversionDataMonthlyReportInterface = {
                graphTicks: sortGraphData,
                currentMonthConversion,
                prevMonthConversion,
                prevYearConversion,
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