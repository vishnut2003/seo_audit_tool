import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { fetchAnalyticsClient } from "../useAnalyticsClient";
import { calculatePercentage } from "../commonUtils";

interface DateRangeInterface {
    startDate: string,
    endDate: string,
}

interface GraphTicks {
    revenue: number,
    date: Date | string,
}

export interface PaidRevenueMonthlyReportInterface {
    graphTicks: GraphTicks[],
    currentMonthRevenue: number,
    prevMonthRevenue: number,
    prevYearRevenue: number,
    percent: {
        prevMonth: number,
        prevYear: number,
    },
}

export async function fetchPaidRevenueMonthlyReport({
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
    return new Promise<PaidRevenueMonthlyReportInterface>(async (resolve, reject) => {
        try {
            const dimensions: {
                name: string,
            }[] = [
                    { name: "year", },
                    { name: "month", },
                    { name: "sessionMedium", }
                ];

            const metrics: {
                name: string,
            }[] = [
                    {
                        name: "purchaseRevenue",
                    }
                ]

            let validDate: string | null = null;
            const endDate = new Date(dateFilters.currentMonth.endDate);
            const today = new Date();

            if (endDate > today) {
                validDate = today.toISOString().split('T')[0];
            } else {
                validDate = endDate.toISOString().split('T')[0];
            }

            // Fetch ticks data for graph
            const graphData = await fetchAnalyticsClient({
                propertyId,
                analyticsClient,
                dateRange: {
                    startDate: dateFilters.dateRangeStart,
                    endDate: validDate,
                },
                dimensions,
                metrics,
                dimensionFilter: {
                    filter: {
                        fieldName: 'sessionMedium',
                        stringFilter: {
                            matchType: 'EXACT',
                            value: 'paid',
                        }
                    }
                }
            })

            const sortGraphData: GraphTicks[] = graphData.map((tick) => {
                const [year, month] = tick.dimensions;
                const [revenue] = tick.metrics;

                const date = new Date(`${year}-${month.padStart(2, '0')}-01`);
                return ({
                    date,
                    revenue,
                })
            }).sort((a, b) => a.date.getTime() - b.date.getTime())
                .map((tick) => {
                    return ({
                        date: tick.date.toLocaleString('default', { month: "short" }),
                        revenue: tick.revenue,
                    })
                })

            // Calculate sessions

            const comparingValues: number[] = [];

            for (const dateRange of [
                dateFilters.currentMonth,
                dateFilters.prevMonth,
                dateFilters.currentMonthPrevYear,
            ]) {

                const endDate = new Date(dateRange.endDate);
                const today = new Date();

                if (endDate > today) {
                    dateRange.endDate = today.toISOString().split('T')[0];
                }

                const report = await fetchAnalyticsClient({
                    analyticsClient,
                    propertyId,
                    dateRange,
                    dimensions,
                    metrics,
                    dimensionFilter: {
                        filter: {
                            fieldName: 'sessionMedium',
                            stringFilter: {
                                matchType: 'EXACT',
                                value: 'paid',
                            }
                        }
                    }
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
                currentMonthRevenue,
                prevMonthRevenue,
                prevYearRevenue,
            ] = comparingValues;

            const prevMonthPercent: number = calculatePercentage({ newValue: currentMonthRevenue, prevValue: prevMonthRevenue });
            const prevYearPercent: number = calculatePercentage({ newValue: currentMonthRevenue, prevValue: prevYearRevenue });

            const finalResponse: PaidRevenueMonthlyReportInterface = {
                graphTicks: sortGraphData,
                currentMonthRevenue,
                prevMonthRevenue,
                prevYearRevenue,
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