import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { fetchAnalyticsClient } from "../useAnalyticsClient";
import { calculatePercentage } from "../commonUtils";

interface DateRangeInterface {
    startDate: string,
    endDate: string,
}

interface GraphTicks {
    date: Date | string,
    cost: number,
}

export interface AdvertiserAdsCostMonthlyReportInterface {
    graphTicks: GraphTicks[],
    currentMonthCost: number,
    prevMonthCost: number,
    prevYearCost: number,
    percent: {
        prevMonth: number,
        prevYear: number,
    },
}

export async function fetchAdvertiserAdsCostMonthlyReport({
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
    return new Promise<AdvertiserAdsCostMonthlyReportInterface>(async (resolve, reject) => {
        try {
            const dimensions: {
                name: string,
            }[] = [
                    { name: "year", },
                    { name: "month", },
                    { name: "sessionCampaignName" }
                ];

            const metrics: {
                name: string,
            }[] = [
                    {
                        name: "advertiserAdCost",
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
            })

            const sortGraphData: GraphTicks[] = graphData.map((tick) => {
                const [year, month] = tick.dimensions;
                const [cost] = tick.metrics;

                const date = new Date(`${year}-${month.padStart(2, '0')}-01`);
                return ({
                    date,
                    cost,
                })
            }).sort((a, b) => a.date.getTime() - b.date.getTime())
                .map((tick) => {
                    return ({
                        date: tick.date.toLocaleString('default', { month: "short" }),
                        cost: tick.cost,
                    })
                })

            // Calculate Costs

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
                currentMonthCost,
                prevMonthCost,
                prevYearCost,
            ] = comparingValues;

            const prevMonthPercent: number = calculatePercentage({ newValue: currentMonthCost, prevValue: prevMonthCost });
            const prevYearPercent: number = calculatePercentage({ newValue: currentMonthCost, prevValue: prevYearCost });

            const finalResponse: AdvertiserAdsCostMonthlyReportInterface = {
                graphTicks: sortGraphData,
                currentMonthCost,
                prevMonthCost,
                prevYearCost,
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