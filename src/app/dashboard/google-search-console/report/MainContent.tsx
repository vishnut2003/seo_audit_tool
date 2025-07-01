'use client';

import { GoogleSearchConsoleGraphRow } from "@/utils/server/projects/googleSearchConsoleAPI/reports/graphReport";
import GoogleSearchConsoleGraph, { GoogleSearchConsoleGraphFilterInterface } from "./GraphData";
import OtherDataTabs from "./OtherDataTabs";
import DatePicker from "@/Components/ui/datepicker";
import { useCallback, useEffect, useState } from "react";
import { getSessionProject } from "@/utils/client/projects";
import axios from "axios";
import { GoogleSearchConsoleTabsDataFilterInteface } from "./DataTabs/Queries_Tab";
import { GoogleSearchConsoleDataTabsRow } from "@/utils/server/projects/googleSearchConsoleAPI/reports/tabsData";

const MainContent = ({ graphData, defaultDateRange }: {
    graphData: GoogleSearchConsoleGraphRow[],
    defaultDateRange: {
        startDate: Date,
        endDate: Date,
    }
}) => {

    const [passingGraphData, setPassingGraphData] = useState<GoogleSearchConsoleGraphRow[] | null>(null);

    const [currentActiveTab, setCurrentActiveTab] = useState<string>('query');
    const [tabsDataReport, setTabDataReport] = useState<GoogleSearchConsoleDataTabsRow[]>([]);

    const [inProgress_graph, setInProgress_graph] = useState<boolean>(true);
    const [inProgress_tab, setInProgress_tab] = useState<boolean>(true);
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

            const dateRange: {
                startDate: string,
                endDate: string,
            } = {
                startDate: new Date(Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate())).toISOString(),
                endDate: new Date(Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate())).toISOString(),
            }

            const filterData: GoogleSearchConsoleGraphFilterInterface = {
                projectId: project.projectId,
                dateRange: {
                    startDate: dateRange.startDate.split('T')[0],
                    endDate: dateRange.endDate.split('T')[0],
                },
            }

            setInProgress_graph(true);

            const { data } = await axios.post('/api/project/search-console-api/google/get-report', filterData);
            const newReport = data.report as GoogleSearchConsoleGraphRow[];

            if (!newReport) {
                throw new Error("Report is empty");
            }

            setPassingGraphData(newReport);
            setInProgress_graph(false);

        } catch (err) {
            if (typeof err === "string") {
                setError(err);
            } else {
                setError("Something went wrong!");
            }

            setInProgress_graph(false);
        }
    }, [startDate, endDate]);

    const handleTabDataSubmition = useCallback(async () => {
        try {
            setError(null)
            setInProgress_tab(true);
            const project = await getSessionProject();

            if (!project?.projectId) {
                throw new Error("Project is not selected!");
            }

            const dateRange: {
                startDate: string,
                endDate: string,
            } = {
                startDate: new Date(Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate())).toISOString(),
                endDate: new Date(Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate())).toISOString(),
            }

            const requestBody: GoogleSearchConsoleTabsDataFilterInteface = {
                dateRange: {
                    startDate: dateRange.startDate.split('T')[0],
                    endDate: dateRange.endDate.split('T')[0],
                },
                projectId: project.projectId,
                dimension: currentActiveTab,
            }
            
            const response = await axios.post('/api/project/search-console-api/google/tabs-data', requestBody);
            const newReport = response.data.report as GoogleSearchConsoleDataTabsRow[];
            
            setTabDataReport(newReport);
            setInProgress_tab(false);
        } catch (err) {
            console.log(err)
            if (typeof err === "string") {
                setError(err);
            } else {
                setError("Something went wrong.");
            }

            setInProgress_tab(false);
        }
    }, [startDate, endDate, currentActiveTab])

    useEffect(() => {
        handleTabDataSubmition();
    }, [currentActiveTab, handleTabDataSubmition])

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
                    disabled={inProgress_graph || inProgress_tab}
                    onClick={async () => {
                        await handleGraphDataSubmit();
                        await handleTabDataSubmition();
                    }}
                >
                    {inProgress_graph || inProgress_tab ? "Loading..." : "Apply"}
                </button>
            </div>

            <GoogleSearchConsoleGraph
                graphData={passingGraphData || graphData}
                inProgress={inProgress_graph}
                setInProgress={setInProgress_graph}
                error={error}
                setError={setError}
            />
            <OtherDataTabs
                tabs={[
                    "query",
                    "page",
                    "country",
                    "device",
                    "searchAppearance",
                    "date"
                ]}
                currentActive={currentActiveTab}
                setCurrentActive={setCurrentActiveTab}
                error={error}
                inProgress={inProgress_tab}
                report={tabsDataReport}
            />
        </div>
    )
}

export default MainContent