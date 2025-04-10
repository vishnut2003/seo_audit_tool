'use client';

import { AnalyticsTrafficAcquisitionGraphReport, AnalyticsTrafficAcquisitionTableDataInterface } from '@/utils/server/projects/analyticsAPI/google/trafficAcquisitionData';
import { RiErrorWarningLine, RiLoader4Line } from '@remixicon/react';
import React, { useEffect, useState } from 'react'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select"
import DatePicker from '@/Components/ui/datepicker';
import AnalyticsTrafficAcquisitionGraph from './Graph';
import AnalyticsTrafficAcquisitionTable from './Table';
import axios, { AxiosError } from 'axios';
import { AnalyticsTrafficAcquisitionApiRouteEntry } from '@/app/api/google-analytics/traffic-acquisition-report/route';

const AnalyticsTrafficAcquisitionMainContent = ({
    graphReport,
    passingDateRange,
    tableReport,
}: {
    passingDateRange: {
        startDate: Date,
        endDate: Date,
    },
    graphReport: AnalyticsTrafficAcquisitionGraphReport[],
    tableReport: AnalyticsTrafficAcquisitionTableDataInterface[],
}) => {

    const [graphTypeState, setGraphTypeState] = useState<"date" | "week" | "month">("date");
    const [dateRange, setDateRange] = useState<{
        startDate: Date,
        endDate: Date,
    }>(passingDateRange);

    const [inProgress, setInProgress] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Reports
    const [passingGraphReport, setPassingGraphReport] = useState<AnalyticsTrafficAcquisitionGraphReport[]>([]);
    const [passingTableReport, setPassingTableReport] = useState<AnalyticsTrafficAcquisitionTableDataInterface[]>([]);

    useEffect(() => {
        setPassingGraphReport(graphReport);
        setPassingTableReport(tableReport);
        setInProgress(false);
    }, [graphReport, tableReport])

    async function updateAnalyticsData({
        graphType,
    }: {
        graphType: "date" | "week" | "month" | null,
    }) {
        try {

            setInProgress(true);

            if (!graphType) {
                graphType = graphTypeState;
            }

            const apiRequestEntry: AnalyticsTrafficAcquisitionApiRouteEntry = {
                dateRange: {
                    startDate: dateRange.startDate.toISOString().split('T')[0],
                    endDate: dateRange.endDate.toISOString().split('T')[0],
                },
                graphType,
            }

            const response = await axios.post<[
                AnalyticsTrafficAcquisitionGraphReport[],
                AnalyticsTrafficAcquisitionTableDataInterface[],
            ]>(
                '/api/google-analytics/traffic-acquisition-report',
                apiRequestEntry,
            )

            const [graphReport, tableReport] = response.data;

            setPassingGraphReport(graphReport)
            setPassingTableReport(tableReport);

            setInProgress(false);

        } catch (err: any) {
            setInProgress(false);
            if (err instanceof Error) {
                setError(err.message);
            } else if (err instanceof AxiosError) {
                if (err.response?.data && typeof err.response.data === "string") {
                    setError(err.response.data);
                } else {
                    setError(err.message);
                }
            } else {
                setError("Something went wrong while updating analytics data!");
            }
        }
    }

    if (error) {
        return (
            <div
                className="flex items-center justify-center gap-3 h-full w-full text-red-500"
            >
                <RiErrorWarningLine
                    size={20}
                />
                <p>{error}</p>
            </div>
        )
    }

    if (inProgress) {
        return (
            <div
                className="flex items-center justify-center gap-3 h-full w-full"
            >
                <RiLoader4Line
                    size={20}
                    className="animate-spin"
                />
                <p>Loading...</p>
            </div>
        )
    }

    return (
        <div
            className='w-full space-y-5 pb-10'
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
                                updateAnalyticsData({
                                    graphType: null,
                                })
                            }}
                >
                    {inProgress ? "Loading..." : "Apply"}
                </button>
            </div>


            <AnalyticsTrafficAcquisitionGraph
                graphReport={passingGraphReport}
            >
                {/* Select Date | Week | Month */}
                <div>

                    <Select
                        onValueChange={(value) => {
                            setGraphTypeState(value as any);
                            updateAnalyticsData({
                                graphType: value as any,
                            })
                        }}
                    >
                        <SelectTrigger className="w-[180px] p-3 h-[40px] bg-gray-100 border border-gray-200 shadow-none capitalize">
                            <SelectValue placeholder={graphTypeState} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="date">Date</SelectItem>
                            <SelectItem value="week">Week</SelectItem>
                            <SelectItem value="month">Month</SelectItem>
                        </SelectContent>
                    </Select>

                </div>
            </AnalyticsTrafficAcquisitionGraph>

            <AnalyticsTrafficAcquisitionTable
                tableData={passingTableReport}
            />
        </div>
    )
}

export default AnalyticsTrafficAcquisitionMainContent