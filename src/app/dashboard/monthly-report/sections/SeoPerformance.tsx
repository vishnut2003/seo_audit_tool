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
import { OrganicConversionMonthlyReportInterface } from "@/utils/server/monthlyReport/seoPerformance/organicConversions";
import { OrganicRevenueMonthlyReportInterface } from "@/utils/server/monthlyReport/seoPerformance/organicRevenue";
import { TopPagesOrganicMonthlyReport } from "@/utils/server/monthlyReport/seoPerformance/topPagesOrganic";
import { TopBrowsersMonthlyReportInterface } from "@/utils/server/monthlyReport/seoPerformance/topBrowsers";
import { TopLandingPagesMonthlyReport } from "@/utils/server/monthlyReport/seoPerformance/topLandingPages";

const SeoPerformanceMonthlyReport = ({
    sessionFromOrganicData,
    engagedSessionOrganicData,
    organicConversionData,
    organicRevenue,
    topPagesOrganic,
    topBrowsers,
    topLandingPages,
}: {
    sessionFromOrganicData: SessionFromOrganicMonthlyReportInterface | null,
    engagedSessionOrganicData: EngagedSessionOrganicMonthlyReportInterface | null,
    organicConversionData: OrganicConversionMonthlyReportInterface | null,
    organicRevenue: OrganicRevenueMonthlyReportInterface | null,
    topPagesOrganic: TopPagesOrganicMonthlyReport | null,
    topBrowsers: TopBrowsersMonthlyReportInterface | null,
    topLandingPages: TopLandingPagesMonthlyReport | null,
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
                                    graphName="Organic Conversion"
                                    value={organicConversionData?.currentMonthConversion}
                                    prevMonthValue={organicConversionData?.prevMonthConversion}
                                />
                                <LineChartMonthlyReport
                                    data={organicConversionData?.graphTicks || []}
                                    xAxisDataKey={'date'}
                                    yAxisDataKey={'conversion'}
                                    lineValues={[
                                        "conversion",
                                    ]}
                                />
                                <ChartFooterMonthlyReport
                                    prevPeriodPercent={organicConversionData?.percent.prevMonth}
                                    prevYearPercent={organicConversionData?.percent.prevYear}
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
                                    graphName="Organic Revenue"
                                    value={organicRevenue?.currentMonthRevenue}
                                    prevMonthValue={organicRevenue?.prevMonthRevenue}
                                />
                                <LineChartMonthlyReport
                                    data={organicRevenue?.graphTicks || []}
                                    xAxisDataKey={'date'}
                                    yAxisDataKey={'revenue'}
                                    lineValues={[
                                        "revenue",
                                    ]}
                                />
                                <ChartFooterMonthlyReport
                                    prevPeriodPercent={organicRevenue?.percent.prevMonth}
                                    prevYearPercent={organicRevenue?.percent.prevYear}
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
                                noOfCol={2.05}
                            >
                                <ChartHeaderMonthlyReport
                                    graphName="Top landing pages from organic"
                                />
                                <TopLandingPageMonthlyReport
                                    tableData={topPagesOrganic?.tableData || []}
                                />
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
                                noOfCol={2.05}
                            >
                                <ChartHeaderMonthlyReport
                                    graphName="Top browsers"
                                />
                                <TopBrowsersMonthlyReport
                                    graphTableData={topBrowsers?.graphTicks || []}
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
                                <TopPagesBySessionFromOrganic
                                    tableData={topLandingPages?.tableData || []}
                                />
                            </ColumnLayoutMonthlyReport>
                        )
                    },
                ]}
            />

        </div>
    )
}

export default SeoPerformanceMonthlyReport