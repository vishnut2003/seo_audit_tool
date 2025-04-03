import { GoogleAnalyticsReportByCountryRequestInterface } from "@/app/api/google-analytics/get-report-by-country/route";
import { AnalyticsDataByCountryInterface, GoogleAnalyticsReportFilterInterface, GoogleAnalyticsReportResponse } from "@/utils/server/projects/analyticsAPI/google/fetchReport";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";

export async function handleAnlyticsUpdateData({
    setError,
    setInProgress,
    setReport,
    filterDate,
    setCountryAnalyticsData,
}: {
    setInProgress: Dispatch<SetStateAction<boolean>>,

    // Reports
    setReport: Dispatch<SetStateAction<GoogleAnalyticsReportResponse | null>>,
    setCountryAnalyticsData: Dispatch<SetStateAction<AnalyticsDataByCountryInterface[]>>,

    setError: Dispatch<SetStateAction<string | null>>,
    filterDate: {
        from: Date,
        to: Date,
    }
}) {
    setInProgress(true);
    setReport(null);
    setError(null);
    try {
        const data: GoogleAnalyticsReportFilterInterface = {
            dateRange: {
                from: filterDate.from.toISOString().split('T')[0],
                to: filterDate.to.toISOString().split('T')[0],
            },
        }

        const response = await axios.post('/api/google-analytics/get-report', data)
        const body = response.data as {
            report: GoogleAnalyticsReportResponse,
        }

        const countryDataRequestEntry: GoogleAnalyticsReportByCountryRequestInterface = {
            dateRange: {
                from: filterDate.from.toISOString().split('T')[0],
                to: filterDate.to.toISOString().split('T')[0],
            }
        }

        const byCountryApiResponse = await axios.post('/api/google-analytics/get-report-by-country', countryDataRequestEntry);
        const byCountryReport = byCountryApiResponse.data.report as AnalyticsDataByCountryInterface[];

        setReport(body.report);
        setCountryAnalyticsData(byCountryReport);
    } catch (err) {
        if (typeof err === "string") {
            setError(err);
        } else {
            setError("Something went wrong!")
        }
    }

    setInProgress(false);
}