'use client';

import ChartHeaderMonthlyReport from "@/Components/Recharts/MonthlyReportCharts/ChartHeader";
import ColumnLayoutMonthlyReport from "@/Components/Recharts/MonthlyReportCharts/ColumnLayout";
import { useState } from "react";
import SectionTemplateMonthlyReport from "../SectionTemplate";
import BarChartTemplateMonthlyReport from "@/Components/Recharts/MonthlyReportCharts/BarChart";
import ChartFooterMonthlyReport from "@/Components/Recharts/MonthlyReportCharts/ChartFooter";
import AreaChartMonthlyReport from "@/Components/Recharts/MonthlyReportCharts/AreaChart";
import LineChartMonthlyReport from "@/Components/Recharts/MonthlyReportCharts/LineChart";
import TopLandingPageMonthlyReport from "./SeoPerformance/TopLandingPage";
import TopBrowsersMonthlyReport from "./SeoPerformance/TopBrowsers";
import TopPagesBySessionFromOrganic from "./SeoPerformance/TopPagesBySessionFromOrganic";
import { SessionFromOrganicMonthlyReportInterface } from "@/utils/server/monthlyReport/seoPerformance/sessionFromOrganic";
import { EngagedSessionOrganicMonthlyReportInterface } from "@/utils/server/monthlyReport/seoPerformance/EngagedSessionOrganic";

const dummyData: {
    date: string,
    value: number,
    value2: number,
    value3: number,
}[] = [
        {
            date: "Jan",
            value: 10,
            value2: 10,
            value3: 16,
        },
        {
            date: "Feb",
            value: 15,
            value2: 10,
            value3: 16,
        },
        {
            date: "Mar",
            value: 6,
            value2: 10,
            value3: 16,
        },
        {
            date: "Apr",
            value: 3,
            value2: 10,
            value3: 16,
        },
        {
            date: "May",
            value: 20,
            value2: 10,
            value3: 16,
        },
        {
            date: "Jun",
            value: 5,
            value2: 10,
            value3: 16,
        },
        {
            date: "Jul",
            value: 6,
            value2: 10,
            value3: 16,
        },
        {
            date: "Aug",
            value: 8,
            value2: 10,
            value3: 16,
        },
        {
            date: "Sep",
            value: 12,
            value2: 10,
            value3: 16,
        },
        {
            date: "Oct",
            value: 11,
            value2: 10,
            value3: 16,
        },
        {
            date: "Oct",
            value: 11,
            value2: 10,
            value3: 16,
        },
        {
            date: "Oct",
            value: 11,
            value2: 10,
            value3: 16,
        },
    ];

const SeoPerformanceMonthlyReport = ({
    sessionFromOrganicData,
    engagedSessionOrganicData,
}: {
    sessionFromOrganicData: SessionFromOrganicMonthlyReportInterface | null,
    engagedSessionOrganicData: EngagedSessionOrganicMonthlyReportInterface | null,
}) => {

    const [containerWidth, setContainerWidth] = useState<number>(0);

    return (
        <div
            className="bg-white/10 min-w-[1096px] max-w-[1096px] px-4 py-3 space-y-4"
        >
            {/* Heading */}
            <div
                className='bg-themeprimary border-l-4 border-themesecondary py-3 px-5 text-white flex items-center'
            >
                <h2
                    className='text-2xl font-bold flex items-center'
                >SEO Performance</h2>
            </div>

            {/* First Row */}
            <SectionTemplateMonthlyReport
                setContainerWidth={setContainerWidth}
                elementsData={[
                    // SESSION FROM ORGANIC
                    {
                        width: "100%",
                        height: "max-content",
                        element: () => (
                            <ColumnLayoutMonthlyReport
                                containerWidth={containerWidth}
                                noOfCol={4.2}
                            >
                                <ChartHeaderMonthlyReport
                                    graphName="Organic Sessions"
                                    value={sessionFromOrganicData?.currentMonthSession}
                                    prevMonthValue={sessionFromOrganicData?.prevMonthSession}
                                />
                                <BarChartTemplateMonthlyReport
                                    data={sessionFromOrganicData?.graphTicks || []}
                                    xAxisDataKey={'date'}
                                    yAxisDataKey={'session'}
                                    barValues={[
                                        "session",
                                    ]}
                                />
                                <ChartFooterMonthlyReport
                                    prevPeriodPercent={sessionFromOrganicData?.percent.prevMonth}
                                    prevYearPercent={sessionFromOrganicData?.percent.prevYear}
                                />
                            </ColumnLayoutMonthlyReport>
                        )
                    },

                    // ENGAGED SESSION ORGANIC
                    {
                        width: "100%",
                        height: "max-content",
                        element: () => (
                            <ColumnLayoutMonthlyReport
                                containerWidth={containerWidth}
                                noOfCol={4.2}
                            >
                                <ChartHeaderMonthlyReport
                                    graphName="Engaged session"
                                    value={engagedSessionOrganicData?.currentMonthSession}
                                    prevMonthValue={engagedSessionOrganicData?.prevMonthSession}
                                />
                                <AreaChartMonthlyReport
                                    data={engagedSessionOrganicData?.graphTicks || []}
                                    xAxisDataKey={'date'}
                                    yAxisDataKey={'session'}
                                    lineValues={[
                                        "session",
                                    ]}
                                />
                                <ChartFooterMonthlyReport
                                    prevPeriodPercent={engagedSessionOrganicData?.percent.prevMonth}
                                    prevYearPercent={engagedSessionOrganicData?.percent.prevYear}
                                />
                            </ColumnLayoutMonthlyReport>
                        )
                    },

                    // CONVERSION FROM ORGANIC
                    {
                        width: "100%",
                        height: "max-content",
                        element: () => (
                            <ColumnLayoutMonthlyReport
                                containerWidth={containerWidth}
                                noOfCol={4.2}
                            >
                                <ChartHeaderMonthlyReport
                                    graphName="Conversion from organic"
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

                    // REVENUE FROM ORGANIC
                    {
                        width: "100%",
                        height: "max-content",
                        element: () => (
                            <ColumnLayoutMonthlyReport
                                containerWidth={containerWidth}
                                noOfCol={4.2}
                            >
                                <ChartHeaderMonthlyReport
                                    graphName="Revenue from organic"
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
                    // TOP LANDING PAGES FROM ORGANIC
                    {
                        width: "100%",
                        height: "max-content",
                        element: () => (
                            <ColumnLayoutMonthlyReport
                                containerWidth={containerWidth}
                                noOfCol={3.1}
                            >
                                <ChartHeaderMonthlyReport
                                    graphName="Top landing pages from organic"
                                />
                                <TopLandingPageMonthlyReport/>
                            </ColumnLayoutMonthlyReport>
                        )
                    },

                    // TOP BROWSERS
                    {
                        width: "100%",
                        height: "max-content",
                        element: () => (
                            <ColumnLayoutMonthlyReport
                                containerWidth={containerWidth}
                                noOfCol={1.5}
                            >
                                <ChartHeaderMonthlyReport
                                    graphName="Top browsers"
                                />
                                <TopBrowsersMonthlyReport
                                    data={dummyData}
                                />
                            </ColumnLayoutMonthlyReport>
                        )
                    },
                ]}
            />
            
            {/* Third Row */}
            <SectionTemplateMonthlyReport
                setContainerWidth={setContainerWidth}
                elementsData={[
                    // TOP PAGE BY SESSION FROM ORGANIC
                    {
                        width: "100%",
                        height: "max-content",
                        element: () => (
                            <ColumnLayoutMonthlyReport
                                containerWidth={containerWidth}
                                noOfCol={1}
                            >
                                <ChartHeaderMonthlyReport
                                    graphName="Top landing pages from organic"
                                />
                                <TopPagesBySessionFromOrganic/>
                            </ColumnLayoutMonthlyReport>
                        )
                    },
                ]}
            />

        </div>
    )
}

export default SeoPerformanceMonthlyReport