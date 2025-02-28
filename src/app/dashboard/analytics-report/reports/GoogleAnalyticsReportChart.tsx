'use client';

import GoogleAnalyticsChart from "@/Components/Recharts/GoogleAnalyticsChart";
import { GoogleAnalyticsReportFilterInterface, GoogleAnalyticsReportResponse } from "@/utils/server/projects/analyticsAPI/google/fetchReport";
import { useEffect, useState } from "react";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select"
import axios from "axios";


const GoogleAnalyticsReportChart = ({ analyticsReport }: {
    analyticsReport: GoogleAnalyticsReportResponse | null,
}) => {

    const [report, setReport] = useState<GoogleAnalyticsReportResponse | null>(null);
    const [inProgress, setInProgress] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [currentMetrics, setCurrentMetrics] = useState("activeUsers")
    const [filterDate, setFilterDate] = useState<{
        from: string,
        to: string,
    }>({
        from: '7daysAgo',
        to: 'today',
    });

    useEffect(() => {
        setInProgress(true);
        setReport(analyticsReport);
        setInProgress(false);
    }, [analyticsReport])

    async function updateAnalyticsReport() {
        setInProgress(true);
        setReport(null);
        setError(null);
        try {
            const data: GoogleAnalyticsReportFilterInterface = {
                dateRange: {
                    from: filterDate.from,
                    to: filterDate.to,
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

    return (
        <div
            className="w-full h-full"
        >
            <div
                className="flex flex-col md:flex-row justify-center gap-5 w-full"
            >

                {/* Chart col */}
                <div
                    className="w-full h-full bg-background rounded-md overflow-hidden shadow-xl shadow-gray-200"
                >
                    {/* Chart metrics tabs */}
                    <div
                        className="border-b border-gray-100 w-full overflow-auto"
                    >
                        <div
                            className="flex justify-start w-max"
                        >
                            {
                                !report && inProgress &&
                                [0, 1, 2].map((index) => (
                                    <div
                                        className={`px-5 md:px-7 py-3 md:py-4 flex flex-col items-start gap-1`}
                                        key={index}
                                    >
                                        <p
                                            className="p-2 bg-gray-100 animate-pulse rounded-md w-[80px]"
                                        ></p>
                                        <p
                                            className="py-[17px] bg-gray-100 animate-pulse rounded-md w-[25px]"
                                        ></p>
                                    </div>
                                ))
                            }

                            {
                                report && !inProgress &&
                                report.totals.map((total, index) => (
                                    <button
                                        className={`px-5 md:px-7 py-3 md:py-4 flex flex-col items-start gap-1 text-left ${total.name === currentMetrics && "bg-[#3c50e020] text-themesecondary border-b-2 border-themesecondary"}`}
                                        key={index}
                                        onClick={() => setCurrentMetrics(total.name)}
                                    >
                                        <p
                                            className="w-[80px] text-sm font-semibold capitalize"
                                        >{total.name}</p>
                                        <p
                                            className="w-[25px] text-2xl font-semibold text-foreground"
                                        >{total.value}</p>
                                    </button>
                                ))
                            }
                        </div>
                    </div>

                    {/* chart */}
                    <div>
                        <GoogleAnalyticsChart
                            dataPoints={report?.dataPoints}
                            currentMetrics={currentMetrics}
                            inProgress={inProgress}
                            error={error}
                        />
                    </div>

                    <div
                        className="py-3 px-5"
                    >
                        {/* Date filter */}
                        <div
                            className="flex justify-start items-center gap-2"
                        >
                            <Select
                                onValueChange={(value) => setFilterDate({
                                    from: value,
                                    to: 'today',
                                })}
                            >
                                <SelectTrigger
                                    className="w-[180px] h-[40px] px-5 shadow-none bg-gray-100"
                                >
                                    <SelectValue placeholder="Last 7 days" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="7daysAgo">Last 7 days</SelectItem>
                                    <SelectItem value="14daysAgo">Last 14 days</SelectItem>
                                    <SelectItem value="30daysAgo">Last 30 days</SelectItem>
                                    <SelectItem value="365daysAgo">Last 365 days</SelectItem>
                                </SelectContent>
                            </Select>

                            <button
                                className="bg-themeprimary rounded-md py-2 px-4 text-white text-sm disabled:opacity-40"
                                onClick={updateAnalyticsReport}
                                disabled={inProgress}
                            >
                                {inProgress ? "Loading..." : "Apply"}
                            </button>

                        </div>
                    </div>
                </div>

                {/* Filter col */}
                <div
                    className="w-[50%] h-full bg-background rounded-md shadow-xl shadow-gray-200 opacity-0"
                >
                    Filter col
                </div>
            </div>
        </div>
    )
}

export default GoogleAnalyticsReportChart