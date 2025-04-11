'use client';

import SectionTemplateMonthlyReport from "./SectionTemplate";
import { useState } from "react";
import ColumnLayoutMonthlyReport from "@/Components/Recharts/MonthlyReportCharts/ColumnLayout";
import BarChartTemplateMonthlyReport from "@/Components/Recharts/MonthlyReportCharts/BarChart";
import ChartHeaderMonthlyReport from "@/Components/Recharts/MonthlyReportCharts/ChartHeader";
import ChartFooterMonthlyReport from "@/Components/Recharts/MonthlyReportCharts/ChartFooter";
import LineChartMonthlyReport from "@/Components/Recharts/MonthlyReportCharts/LineChart";
import AreaChartMonthlyReport from "@/Components/Recharts/MonthlyReportCharts/AreaChart";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";


const dummyData: {
    date: string,
    value: number,
}[] = [
        {
            date: "Jan",
            value: 10,
        },
        {
            date: "Feb",
            value: 15,
        },
        {
            date: "Mar",
            value: 6,
        },
        {
            date: "Apr",
            value: 3,
        },
        {
            date: "May",
            value: 20,
        },
        {
            date: "Jun",
            value: 5,
        },
        {
            date: "Jul",
            value: 6,
        },
        {
            date: "Aug",
            value: 8,
        },
        {
            date: "Sep",
            value: 12,
        },
        {
            date: "Oct",
            value: 11,
        },
    ];

const MonthlyReportMainContent = () => {

    const [containerWidth, setContainerWidth] = useState<number>(0);

    return (
        <div
            className="flex flex-col items-center justify-start pb-[50px]"
        >

            {/* Heading section */}
            <div
                className="min-w-[1096px] max-w-[1096px] px-4 py-3 flex justify-between items-end"
            >
                <div
                    className="space-y-2"
                >
                    <h2
                        className="text-2xl font-bold"
                    >Digital Marketing Report</h2>
                    <div
                        className="flex items-center justify-start gap-2"
                    >
                        <p
                            className="font-semibold text-sm"
                        >Report For</p>
                        <div>
                            <Select>
                                <SelectTrigger
                                    className="w-max shadow-none h-fit bg-white p-0"
                                >
                                    <SelectValue
                                        className="m-0"
                                        placeholder="Mar 1, 2025 - Mar 31, 2025"
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="light">Light</SelectItem>
                                    <SelectItem value="dark">Dark</SelectItem>
                                    <SelectItem value="system">System</SelectItem>
                                </SelectContent>
                            </Select>

                        </div>
                    </div>
                </div>

                {/* Export options */}
                <div
                    className="flex items-center gap-2"
                >
                    <Select>
                        <SelectTrigger
                            className="w-max shadow-none h-[20px] bg-white"
                        >
                            <SelectValue placeholder={"Export as"} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="pdf">Export PDF</SelectItem>
                            <SelectItem value="link">Share Link</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Charts part */}
            <div
                className="bg-white/10 min-w-[1096px] max-w-[1096px] px-4 py-3"
            >

                {/* First Section */}
                <SectionTemplateMonthlyReport
                    setContainerWidth={setContainerWidth}
                    elementsData={[
                        // TOTAL SESSIONS
                        {
                            width: "100%",
                            height: "max-content",
                            element: () => (
                                <ColumnLayoutMonthlyReport
                                    containerWidth={containerWidth}
                                    noOfCol={4.2}
                                >
                                    <ChartHeaderMonthlyReport
                                        graphName="Total session"
                                        value={118}
                                    />
                                    <BarChartTemplateMonthlyReport
                                        data={dummyData}
                                        xAxisDataKey={'date'}
                                        yAxisDataKey={'value'}
                                        barValues={[
                                            "value",
                                        ]}
                                    />
                                    <ChartFooterMonthlyReport
                                        prevPeriodPercent={40}
                                        prevYearPercent={200}
                                    />
                                </ColumnLayoutMonthlyReport>
                            )
                        },

                        // BOUNCE RATE
                        {
                            width: "100%",
                            height: "max-content",
                            element: () => (
                                <ColumnLayoutMonthlyReport
                                    containerWidth={containerWidth}
                                    noOfCol={4.2}
                                >
                                    <ChartHeaderMonthlyReport
                                        graphName="Bounce rate"
                                        value={118}
                                    />
                                    <AreaChartMonthlyReport
                                        data={dummyData}
                                        xAxisDataKey={'date'}
                                        yAxisDataKey={'value'}
                                        lineValues={[
                                            "value",
                                        ]}
                                    />
                                    <ChartFooterMonthlyReport
                                        prevPeriodPercent={40}
                                        prevYearPercent={200}
                                    />
                                </ColumnLayoutMonthlyReport>
                            )
                        },

                        // BOUNCE RATE
                        {
                            width: "100%",
                            height: "max-content",
                            element: () => (
                                <ColumnLayoutMonthlyReport
                                    containerWidth={containerWidth}
                                    noOfCol={4.2}
                                >
                                    <ChartHeaderMonthlyReport
                                        graphName="Total session"
                                        value={118}
                                    />
                                    <LineChartMonthlyReport
                                        data={dummyData}
                                        xAxisDataKey={'date'}
                                        yAxisDataKey={'value'}
                                        lineValues={[
                                            "value",
                                        ]}
                                    />
                                    <ChartFooterMonthlyReport
                                        prevPeriodPercent={40}
                                        prevYearPercent={200}
                                    />
                                </ColumnLayoutMonthlyReport>
                            )
                        },

                        // BOUNCE RATE
                        {
                            width: "100%",
                            height: "max-content",
                            element: () => (
                                <ColumnLayoutMonthlyReport
                                    containerWidth={containerWidth}
                                    noOfCol={4.2}
                                >
                                    <ChartHeaderMonthlyReport
                                        graphName="Total session"
                                        value={118}
                                    />
                                    <LineChartMonthlyReport
                                        data={dummyData}
                                        xAxisDataKey={'date'}
                                        yAxisDataKey={'value'}
                                        lineValues={[
                                            "value",
                                        ]}
                                    />
                                    <ChartFooterMonthlyReport
                                        prevPeriodPercent={40}
                                        prevYearPercent={200}
                                    />
                                </ColumnLayoutMonthlyReport>
                            )
                        },
                    ]}
                />

            </div>
        </div>
    )
}

export default MonthlyReportMainContent