import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { fetchAnalyticsClient } from "../useAnalyticsClient";

interface DateRangeInterface {
    startDate: string,
    endDate: string,
}

interface TableRowInterface {
    path: string,
    session: number,
}

export interface TopPagesOrganicMonthlyReport {
    tableData: TableRowInterface[],
}

export async function fetchTopPagesOrganicMonthlyReport({
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
    return new Promise<TopPagesOrganicMonthlyReport>(async (resolve, reject) => {
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
                    {
                        name: "sessions",
                    }
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
                const [session] = row.metrics;
                const data: TableRowInterface = {
                    path: pathName,
                    session,
                }

                tableRows.push(data);
            }

            const finalResponse: TopPagesOrganicMonthlyReport = {
                tableData: tableRows,
            }

            return resolve(finalResponse)
        } catch (err) {
            return reject(err);
        }
    })
}