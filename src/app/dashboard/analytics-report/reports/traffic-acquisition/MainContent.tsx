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
                >
                    {inProgress ? "Loading..." : "Apply"}
                </button>
            </div>


            <AnalyticsTrafficAcquisitionGraph
                graphReport={passingGraphReport}
            >
                {/* Select Date | Week | Month */}
                <div>

                    <Select>
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