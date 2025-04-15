import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { fetchAnalyticsClient } from "../useAnalyticsClient";
import { calculatePercentage } from "../commonUtils";

interface DateRangeInterface {
    startDate: string,
    endDate: string,
}

interface GraphTicks {
    newUsers: number,
    date: Date | string,
}

export interface NewUsersDataMonthlyReportInterface {
    graphTicks: GraphTicks[],
    currentMonthNewUsers: number,
    prevMonthNewUsers: number,
    prevYearNewUsers: number,
    percent: {
        prevMonth: number,
        prevYear: number,
    },
}

export async function fetchNewUsersDataMonthlyReport({
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
    return new Promise<NewUsersDataMonthlyReportInterface>(async (resolve, reject) => {
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
                        name: "newUsers",
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
                const [newUsers] = tick.metrics;

                const date = new Date(`${year}-${month.padStart(2, '0')}-01`);
                return ({
                    date,
                    newUsers,
                })
            }).sort((a, b) => a.date.getTime() - b.date.getTime())
                .map((tick) => {
                    return ({
                        date: tick.date.toLocaleString('default', { month: "short" }),
                        newUsers: tick.newUsers,
                    })
                })

            // Calculate sessions

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
                currentMonthNewUsers,
                prevMonthNewUsers,
                prevYearNewUsers,
            ] = comparingValues;

            const prevMonthPercent: number = calculatePercentage({ newValue: currentMonthNewUsers, prevValue: prevMonthNewUsers });
            const prevYearPercent: number = calculatePercentage({ newValue: currentMonthNewUsers, prevValue: prevYearNewUsers });

            const finalResponse: NewUsersDataMonthlyReportInterface = {
                graphTicks: sortGraphData,
                currentMonthNewUsers,
                prevMonthNewUsers,
                prevYearNewUsers,
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