import { JWT, OAuth2Client } from "google-auth-library";
import { MonthlyReportTrafficOverviewFilters } from "../trafficOverview/trafficOverview";
import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { getDateRangeForMonth, getLast12MonthsRanges, getPrevShortMonth } from "../commonUtils";
import { fetchSessionFromOrganicMonthlyReportData, SessionFromOrganicMonthlyReportInterface } from "./sessionFromOrganic";
import { EngagedSessionOrganicMonthlyReportInterface, fetchEngagedSessionOrganicMonthlyReport } from "./EngagedSessionOrganic";
import { fetchOrganicConversionDataMonthlyReport, OrganicConversionMonthlyReportInterface } from "./organicConversions";
import { fetchOrganicRevenueMonthlyReport, OrganicRevenueMonthlyReportInterface } from "./organicRevenue";
import { fetchTopPagesOrganicMonthlyReport, TopPagesOrganicMonthlyReport } from "./topPagesOrganic";

export interface MonthlyReportSeoPerformanceResponse {
    sessionFromOrganic: SessionFromOrganicMonthlyReportInterface,
    engagedSessionOrganic: EngagedSessionOrganicMonthlyReportInterface,
    organicConversion: OrganicConversionMonthlyReportInterface,
    organicRevenue: OrganicRevenueMonthlyReportInterface,
    topPagesOrganic: TopPagesOrganicMonthlyReport,
}

export async function fetchMonthlyReportSeoPerformance({
    auth,
    filters,
    propertyId,
}: {
    auth: JWT | OAuth2Client,
    filters: MonthlyReportTrafficOverviewFilters,
    propertyId: string,
}) {
    return new Promise<MonthlyReportSeoPerformanceResponse>(async (resolve, reject) => {
        try {
            const analyticsClient = new BetaAnalyticsDataClient({
                authClient: (auth as any),
            })

            // configure date range
            const { currentMonth, currentYear } = filters;
            const {
                month: prevMonth,
                year: prevYear,
            } = getPrevShortMonth(currentMonth, currentYear);

            const currentMonthDateRange = getDateRangeForMonth(currentMonth, currentYear);
            const prevMonthDateRange = getDateRangeForMonth(prevMonth, currentYear);
            const prevYearCurrentMonthDateRange = getDateRangeForMonth(currentMonth, prevYear);

            const prev12MonthList = getLast12MonthsRanges({
                fromDate: currentMonthDateRange.startDate,
            })

            const requestParameters = {
                analyticsClient,
                dateFilters: {
                    currentMonth: currentMonthDateRange,
                    prevMonth: prevMonthDateRange,
                    currentMonthPrevYear: prevYearCurrentMonthDateRange,
                    dateRangeStart: prev12MonthList[0].startDate,
                },
                propertyId,
            }

            const sessionFromOrganic = await fetchSessionFromOrganicMonthlyReportData(requestParameters)
            const engagedSessionOrganic = await fetchEngagedSessionOrganicMonthlyReport(requestParameters);
            const organicConversion = await fetchOrganicConversionDataMonthlyReport(requestParameters);
            const organicRevenue = await fetchOrganicRevenueMonthlyReport(requestParameters);
            const topPagesOrganic = await fetchTopPagesOrganicMonthlyReport(requestParameters);

            return resolve({
                sessionFromOrganic,
                engagedSessionOrganic,
                organicConversion,
                organicRevenue,
                topPagesOrganic,
            })
            
        } catch (err) {
            return reject(err);
        }
    })
}