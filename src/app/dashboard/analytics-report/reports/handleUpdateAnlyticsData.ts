import { GoogleAnalyticsReportFilterInterface, GoogleAnalyticsReportResponse } from "@/utils/server/projects/analyticsAPI/google/fetchReport";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";

export async function handleAnlyticsUpdateData({
    setError,
    setInProgress,
    setReport,
    filterDate,
}: {
    setInProgress: Dispatch<SetStateAction<boolean>>,
    setReport: Dispatch<SetStateAction<GoogleAnalyticsReportResponse | null>>,
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

        setReport(body.report);
    } catch (err) {
        if (typeof err === "string") {
            setError(err);
        } else {
            setError("Something went wrong!")
        }
    }

    setInProgress(false);
}