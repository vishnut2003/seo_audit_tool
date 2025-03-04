'use client';

import DatePicker from '@/Components/ui/datepicker';
import { getSessionProject } from '@/utils/client/projects';
import React, { useEffect, useRef, useState } from 'react'
import { GoogleSearchConsoleTabsDataFilterInteface } from './Queries_Tab';
import axios from 'axios';
import { GoogleSearchConsoleDataTabsRow } from '@/utils/server/projects/googleSearchConsoleAPI/reports/tabsData';
import TableTemplate from './TableTemplate';
import TableLoading from './TableLoading';

const DateTab = () => {
    const [inProgress, setInProgress] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [report, setReport] = useState<GoogleSearchConsoleDataTabsRow[]>([]);

    // filter options
    const [dateRange, setDateRange] = useState<{
        startDate: Date,
        endDate: Date,
    }>({
        startDate: new Date(new Date().setDate(new Date().getDate() - 30)),
        endDate: new Date(),
    });

    const updateDataRef = useRef(() => {
        updateData();
    })

    useEffect(() => {
        updateDataRef.current();
    }, []);

    async function updateData() {
        try {
            setInProgress(true);
            const project = await getSessionProject();

            if (!project?.projectId) {
                throw new Error("Project is not selected!");
            }

            const requestBody: GoogleSearchConsoleTabsDataFilterInteface = {
                dateRange: {
                    startDate: dateRange.startDate.toISOString().split('T')[0],
                    endDate: dateRange.endDate.toISOString().split('T')[0],
                },
                projectId: project.projectId,
                dimension: "date",
            }

            const response = await axios.post('/api/project/search-console-api/google/tabs-data', requestBody);
            const newReport = response.data.report as GoogleSearchConsoleDataTabsRow[];

            setReport(newReport);

            setInProgress(false);
        } catch (err) {
            if (typeof err === "string") {
                setError(err);
            } else {
                setError("Something went wrong.");
            }

            setInProgress(false);
        }
    }

    return (
        <div
            className='w-full h-full flex flex-col justify-between min-h-[400px]'
        >
            <div
                className='w-full h-full flex justify-center items-center'
            >
                {
                    error ?
                        <p>{error}</p>
                        : inProgress ?
                            <TableLoading />
                            : report ?
                                <TableTemplate
                                    data={report}
                                />
                                : ""
                }
            </div>

            <div>
                {/* date range filter */}
                <div
                    className='flex justify-start items-end gap-5 py-3 px-5'
                >
                    <div>
                        <p
                            className='text-sm font-medium'
                        >Start Date</p>
                        <div
                            className='rounded-md overflow-hidden bg-gray-100'
                        >
                            <DatePicker
                                date={dateRange.startDate}
                                placeholder='Start Date'
                                setDate={(prevDate) => {
                                    setDateRange(prev => ({
                                        ...prev,
                                        startDate: prevDate,
                                    }))
                                }}
                            />
                        </div>
                    </div>

                    <div>
                        <p
                            className='text-sm font-medium'
                        >End Date</p>
                        <div
                            className='rounded-md overflow-hidden bg-gray-100'
                        >
                            <DatePicker
                                date={dateRange.endDate}
                                placeholder='End Date'
                                setDate={(prevDate) => {
                                    setDateRange(prev => ({
                                        ...prev,
                                        endDate: prevDate,
                                    }))
                                }}
                            />
                        </div>
                    </div>

                    {/* filter submit button */}
                    <button
                        className='px-3 py-2 bg-themeprimary text-white rounded-md text-sm disabled:opacity-50'
                        disabled={inProgress}
                        onClick={updateData}
                    >
                        {inProgress ? "Loading..." : "Apply"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DateTab;