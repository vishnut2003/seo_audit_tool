'use client';

import ChartFooterMonthlyReport from '@/Components/Recharts/MonthlyReportCharts/ChartFooter'
import ChartHeaderMonthlyReport from '@/Components/Recharts/MonthlyReportCharts/ChartHeader'
import ColumnLayoutMonthlyReport from '@/Components/Recharts/MonthlyReportCharts/ColumnLayout'
import LineChartMonthlyReport from '@/Components/Recharts/MonthlyReportCharts/LineChart'
import React, { useState } from 'react'
import SectionTemplateMonthlyReport from '../SectionTemplate'
import BarChartTemplateMonthlyReport from '@/Components/Recharts/MonthlyReportCharts/BarChart';
import AreaChartMonthlyReport from '@/Components/Recharts/MonthlyReportCharts/AreaChart';

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

const TrafficOverviewMonthlyReport = () => {

    const [containerWidth, setContainerWidth] = useState<number>(0);

    return (
        <div
            className="bg-white/10 min-w-[1096px] max-w-[1096px] px-4 py-3 space-y-4"
        >
            {/* First Row */}
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
            
            {/* Second Row */}
            <SectionTemplateMonthlyReport
                setContainerWidth={setContainerWidth}
                elementsData={[
                    // TOP CHANNELS OVER TIME
                    {
                        width: "100%",
                        height: "max-content",
                        element: () => (
                            <ColumnLayoutMonthlyReport
                                containerWidth={containerWidth}
                                noOfCol={1}
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
                ]}
            />

        </div>
    )
}

export default TrafficOverviewMonthlyReport