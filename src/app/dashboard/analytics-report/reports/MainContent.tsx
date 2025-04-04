'use client';

import { AnalyticsDataByCountryInterface, AnalyticsReportByNewUsersSourceDataInterface, AnalyticsReportTopPagesTitle, GoogleAnalyticsReportResponse } from "@/utils/server/projects/analyticsAPI/google/fetchReport";
import GoogleAnalyticsReportChart from "./GoogleAnalyticsReportChart";
import { useEffect, useState } from "react";
import DatePicker from "@/Components/ui/datepicker";
import { handleAnlyticsUpdateData } from "./handleUpdateAnlyticsData";

const MainContent = ({
    analyticsReport,
    countryAnalyticsData,
    newUsersSourceReport,
    topPagesViewsReport,
}: {
    analyticsReport: GoogleAnalyticsReportResponse | null,
    countryAnalyticsData: AnalyticsDataByCountryInterface[],
    newUsersSourceReport: AnalyticsReportByNewUsersSourceDataInterface[],
    topPagesViewsReport: AnalyticsReportTopPagesTitle[],
}) => {

    const [mainGraphReport, setMainGraphReport] = useState<GoogleAnalyticsReportResponse | null>(null);
    const [passingCountryAnalyticsData, setPassingCountryAnalyticsData] = useState<AnalyticsDataByCountryInterface[]>([])
    const [passingNewUsersSourceReport, setPassingNewUsersSourceReport] = useState<AnalyticsReportByNewUsersSourceDataInterface[]>([])
    const [passingTopPagesViewReport, setPassingTopPagesViewsReport] = useState<AnalyticsReportTopPagesTitle[]>([]);

    const [inProgress, setInProgress] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Date range
    const [dateRange, setDateRange] = useState<{
        startDate: Date,
        endDate: Date,
    }>({
        startDate: new Date(new Date().setDate(new Date().getDate() - 30)),
        endDate: new Date(),
    });

    useEffect(() => {
        setMainGraphReport(analyticsReport);
        setPassingCountryAnalyticsData(countryAnalyticsData);
        setPassingNewUsersSourceReport(newUsersSourceReport);
        setPassingTopPagesViewsReport(topPagesViewsReport);
        setInProgress(false);
    }, [analyticsReport, countryAnalyticsData, newUsersSourceReport, topPagesViewsReport])

    return (
        <div
            className="w-full space-y-5"
        >
            {/* Filter Date */}
            <div
                className='flex justify-start items-end gap-5'
            >
                <div>
                    <p
                        className='text-sm font-medium'
                    >Start Date</p>
                    <div
                        className='rounded-md overflow-hidden bg-white shadow-xl shadow-gray-200'
                    >
                        <DatePicker
                            date={dateRange.startDate}
                            placeholder='Start Date'
                            setDate={value => setDateRange(prev => ({
                                ...prev,
                                startDate: value,
                            }))}
                        />
                    </div>
                </div>

                <div>
                    <p
                        className='text-sm font-medium'
                    >End Date</p>
                    <div
                        className='rounded-md overflow-hidden bg-white shadow-xl shadow-gray-200'
                    >
                        <DatePicker
                            date={dateRange.endDate}
                            placeholder='End Date'
                            setDate={value => setDateRange(prev => ({
                                ...prev,
                                endDate: value,
                            }))}
                        />
                    </div>
                </div>

                {/* filter submit button */}
                <button
                    className='px-3 py-2 bg-themeprimary text-white rounded-md text-sm disabled:opacity-50'
                    disabled={inProgress}
                    onClick={() => {
                        handleAnlyticsUpdateData({
                            setInProgress,
                            setError,
                            filterDate: {
                                from: dateRange.startDate,
                                to: dateRange.endDate,
                            },

                            // Reports
                            setReport: setMainGraphReport,
                            setCountryAnalyticsData: setPassingCountryAnalyticsData,
                            setNewUsersSourceReport: setPassingNewUsersSourceReport,
                            setTopPagesViewsReport: setPassingTopPagesViewsReport,
                        })
                    }}
                >
                    {inProgress ? "Loading..." : "Apply"}
                </button>
            </div>

            <GoogleAnalyticsReportChart
                analyticsReport={mainGraphReport}
                error={error}
                inProgress={inProgress}
                countryAnalyticsReport={passingCountryAnalyticsData}
                newUsersSourceReport={passingNewUsersSourceReport}
                topPagesViewReport={passingTopPagesViewReport}
            />
        </div>
    )
}

export default MainContent