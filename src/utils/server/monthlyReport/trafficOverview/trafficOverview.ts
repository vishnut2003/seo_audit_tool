import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { OAuth2Client, JWT } from "google-auth-library";
import { fetchTotalSessionMonthlyReport, TotalSessionMonthlyReportInterface } from "./totalSession";
import { getDateRangeForMonth, getLast12MonthsRanges, getPrevShortMonth } from "../commonUtils";
import { fetchTotalBounceRateMonthlyReport, TotalBounceRateMonthlyReportInterface } from "./totalBounceRate";
import { ConversionDataMonthlyReportInterface, fetchConversionDataMonthlyReport } from "./conversionsData";
import { fetchSessionConversionDataMonthlyReport, SessionConversionDataMonthlyReportInterface } from "./sessionConversionData";
import { fetchTopChannelsOverTimeMonthlyReport, TopChannelsDataMonthlyReportInterface } from "./topChannels";
import { fetchNewUsersDataMonthlyReport, NewUsersDataMonthlyReportInterface } from "./newUsersData";
import { fetchEngagedSessionByCountryMonthlyReport, TotalSessionByCountryMonthlyReportInterface } from "./engagedSessionByCountry";

export interface MonthlyReportTrafficOverviewFilters {
    currentMonth: string,
    currentYear: number,
}

export interface MonthlyReportTrafficOverviewResponse {
    totalSessions: TotalSessionMonthlyReportInterface,
    totalBounceRate: TotalBounceRateMonthlyReportInterface,
    conversionData: ConversionDataMonthlyReportInterface,
    sessionConversionData: SessionConversionDataMonthlyReportInterface,
    topChannelsData: TopChannelsDataMonthlyReportInterface,
    newUsersData: NewUsersDataMonthlyReportInterface,
    sessionByCountry: TotalSessionByCountryMonthlyReportInterface,
}

export async function fetchMonthlyReportTrafficOverview({
    auth,
    filters,
    propertyId,
}: {
    auth: JWT | OAuth2Client,
    filters: MonthlyReportTrafficOverviewFilters,
    propertyId: string,
}) {
    return new Promise<MonthlyReportTrafficOverviewResponse>(async (resolve, reject) => {

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

            const sessionData = await fetchTotalSessionMonthlyReport(requestParameters);
            const bounceRateData = await fetchTotalBounceRateMonthlyReport(requestParameters)
            const conversionData = await fetchConversionDataMonthlyReport(requestParameters)
            const sessionConversionData = await fetchSessionConversionDataMonthlyReport(requestParameters)
            const topChannelsData = await fetchTopChannelsOverTimeMonthlyReport(requestParameters)
            const newUsersData = await fetchNewUsersDataMonthlyReport(requestParameters);
            const sessionByCountry = await fetchEngagedSessionByCountryMonthlyReport(requestParameters);

            return resolve({
                totalSessions: sessionData,
                totalBounceRate: bounceRateData,
                conversionData,
                sessionConversionData,
                topChannelsData,
                newUsersData,
                sessionByCountry,
            })

        } catch (err: any) {
            if (err instanceof Error) {
                return reject(err.message);
            } else if (err.detail && typeof err.details === "string") {
                return reject(err.details)
            }
        }

    })
}