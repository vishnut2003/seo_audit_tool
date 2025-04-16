import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { fetchAnalyticsClient } from "../useAnalyticsClient";

interface DateRangeInterface {
    startDate: string,
    endDate: string,
}

interface TableRowInterface {
    path: string,
    session: number,
    engagedSession: number,
    bounceRate: number,
}

export interface TopLandingPagesMonthlyReport {
    tableData: TableRowInterface[],
}

export async function fetchTopLandingPagesMonthlyReport({
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
    return new Promise<TopLandingPagesMonthlyReport>(async (resolve, reject) => {
        try {
            const dimensions: {
                name: string,
            }[] = [
                    { name: "landingPage", },
                    { name: "sessionMedium", }
                ];

            const metrics: {
                name: string,
            }[] = [
                    { name: "sessions", },
                    { name: "engagedSessions" },
                    { name: "bounceRate" },
                ]

            // Fetch ticks data for graph
            const tableData = await fetchAnalyticsClient({
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
                },
                orderBys: [
                    {
                        metric: {
                            metricName: "sessions",
                        },
                        desc: true,
                    }
                ]
            })

            const tableRows: TableRowInterface[] = [];

            for (const row of tableData) {
                const [pathName] = row.dimensions;
                const [session, engagedSession, bounceRate] = row.metrics;
                const data: TableRowInterface = {
                    path: pathName,
                    session,
                    bounceRate,
                    engagedSession,
                }

                tableRows.push(data);
            }

            const finalResponse: TopLandingPagesMonthlyReport = {
                tableData: tableRows,
            }

            return resolve(finalResponse)
        } catch (err) {
            return reject(err);
        }
    })
}