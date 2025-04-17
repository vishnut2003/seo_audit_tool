import { JWT, OAuth2Client } from "google-auth-library";
import { MonthlyReportTrafficOverviewFilters } from "../trafficOverview/trafficOverview";
import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { getDateRangeForMonth, getLast12MonthsRanges, getPrevShortMonth } from "../commonUtils";
import { AdvertiserAdsCostMonthlyReportInterface, fetchAdvertiserAdsCostMonthlyReport } from "./advertiserAdsCost";
import { fetchPaidConversionDataMonthlyReport, PaidConversionMonthlyReportInterface } from "./paidConversion";
import { fetchPaidConversionRateMonthlyReport, PaidConversionRateMonthlyReportInterface } from "./PaidConversionRate";
import { fetchPaidRevenueMonthlyReport, PaidRevenueMonthlyReportInterface } from "./paidRevenue";

export interface MonthlyReportPPCPerformanceResponse {
    advertiserAdsCost: AdvertiserAdsCostMonthlyReportInterface,
    paidConversion: PaidConversionMonthlyReportInterface,
    paidConversionRate: PaidConversionRateMonthlyReportInterface,
    paidRevenue: PaidRevenueMonthlyReportInterface,
}

export async function fetchMonthlyReportPpcPerformance({
    auth,
    filters,
    propertyId,
}: {
    auth: JWT | OAuth2Client,
    filters: MonthlyReportTrafficOverviewFilters,
    propertyId: string,
}) {
    return new Promise<MonthlyReportPPCPerformanceResponse>(async (resolve, reject) => {
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
            const prevMonthDateRange = getDateRangeForMonth(prevMonth, (prevMonth === "Dec" ? prevYear : currentYear ));
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

            const advertiserAdsCost = await fetchAdvertiserAdsCostMonthlyReport(requestParameters);
            const paidConversion = await fetchPaidConversionDataMonthlyReport(requestParameters);
            const paidConversionRate = await fetchPaidConversionRateMonthlyReport(requestParameters);
            const paidRevenue = await fetchPaidRevenueMonthlyReport(requestParameters);

            return resolve({
                advertiserAdsCost,
                paidConversion,
                paidConversionRate,
                paidRevenue,
            })
        } catch (err) {
            return reject(err);
        }
    })
}