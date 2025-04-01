'use client';

import { GoogleSearchConsoleGraphRow } from "@/utils/server/projects/googleSearchConsoleAPI/reports/graphReport";
import GoogleSearchConsoleGraph, { GoogleSearchConsoleGraphFilterInterface } from "./GraphData";
import OtherDataTabs from "./OtherDataTabs";
import DatePicker from "@/Components/ui/datepicker";
import { useCallback, useState } from "react";
import { getSessionProject } from "@/utils/client/projects";
import axios from "axios";

const MainContent = ({ graphData, defaultDateRange }: {
    graphData: GoogleSearchConsoleGraphRow[],
    defaultDateRange: {
        startDate: Date,
        endDate: Date,
    }
}) => {

    const [passingGraphData, setPassingGraphData] = useState<GoogleSearchConsoleGraphRow[] | null>(null);

    const [inProgress, setInProgress] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [startDate, setStartDate] = useState<Date>(defaultDateRange.startDate);
    const [endDate, setEndDate] = useState<Date>(defaultDateRange.endDate);

    // Graph data
    const handleGraphDataSubmit = useCallback(async () => {
        try {
            const project = await getSessionProject();
            if (!project?.projectId) {
                return;
            }

            const filterData: GoogleSearchConsoleGraphFilterInterface = {
                projectId: project.projectId,
                dateRange: {
                    startDate: startDate.toISOString().split('T')[0],
                    endDate: endDate.toISOString().split('T')[0],
                },
            }

            setInProgress(true);

            const { data } = await axios.post('/api/project/search-console-api/google/get-report', filterData);
            const newReport = data.report as GoogleSearchConsoleGraphRow[];

            if (!newReport) {
                throw new Error("Report is empty");
            }

            setPassingGraphData(newReport);
            setInProgress(false);

        } catch (err) {
            if (typeof err === "string") {
                setError(err);
            } else {
                setError("Something went wrong!");
            }

            setInProgress(false);
        }
    }, [startDate, endDate])

    return (
        <div
            className='h-max space-y-5 pb-[40px]'
        >
            {/* date range filter */}
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
                            date={startDate}
                            placeholder='Start Date'
                            setDate={value => setStartDate(value)}
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
                            date={endDate}
                            placeholder='End Date'
                            setDate={value => setEndDate(value)}
                        />
                    </div>
                </div>

                {/* filter submit button */}
                <button
                    className='px-3 py-2 bg-themeprimary text-white rounded-md text-sm disabled:opacity-50'
                    disabled={inProgress}
                    onClick={handleGraphDataSubmit}
                >
                    {inProgress ? "Loading..." : "Apply"}
                </button>
            </div>

            <GoogleSearchConsoleGraph
                graphData={passingGraphData || graphData}
                inProgress={inProgress}
                setInProgress={setInProgress}
                error={error}
                setError={setError}
            />
            <OtherDataTabs />
        </div>
    )
}

export default MainContent