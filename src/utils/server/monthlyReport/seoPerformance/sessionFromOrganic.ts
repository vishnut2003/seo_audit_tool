import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { fetchAnalyticsClient } from "../useAnalyticsClient";
import { calculatePercentage } from "../commonUtils";

interface DateRangeInterface {
    startDate: string,
    endDate: string,
}

interface GraphTicks {
    session: number,
    date: Date | string,
}

export interface SessionFromOrganicMonthlyReportInterface {
    graphTicks: GraphTicks[],
    currentMonthSession: number,
    prevMonthSession: number,
    prevYearSession: number,
    percent: {
        prevMonth: number,
        prevYear: number,
    },
}

export async function fetchSessionFromOrganicMonthlyReportData({
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
    return new Promise<SessionFromOrganicMonthlyReportInterface>(async (resolve, reject) => {
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
                dimensionFilter: {
                    filter: {
                        fieldName: 'sessionMedium',
                        stringFilter: {
                            matchType: 'EXACT',
                            value: 'organic',
                        }
                    }
                }
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
                                value: 'organic',
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
                currentMonthSession,
                prevMonthSession,
                prevYearSession,
            ] = comparingValues;

            const prevMonthPercent: number = calculatePercentage({ newValue: currentMonthSession, prevValue: prevMonthSession });
            const prevYearPercent: number = calculatePercentage({ newValue: currentMonthSession, prevValue: prevYearSession });

            const finalResponse: SessionFromOrganicMonthlyReportInterface = {
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