'use client';

import ColumnLayoutMonthlyReport from "@/Components/Recharts/MonthlyReportCharts/ColumnLayout";
import SectionTemplateMonthlyReport from "../SectionTemplate";
import { useState } from "react";
import ChartHeaderMonthlyReport from "@/Components/Recharts/MonthlyReportCharts/ChartHeader";
import ChartFooterMonthlyReport from "@/Components/Recharts/MonthlyReportCharts/ChartFooter";
import BarChartTemplateMonthlyReport from "@/Components/Recharts/MonthlyReportCharts/BarChart";
import AreaChartMonthlyReport from "@/Components/Recharts/MonthlyReportCharts/AreaChart";
import LineChartMonthlyReport from "@/Components/Recharts/MonthlyReportCharts/LineChart";
import { AdvertiserAdsCostMonthlyReportInterface } from "@/utils/server/monthlyReport/ppcPerformance/advertiserAdsCost";
import { PaidConversionMonthlyReportInterface } from "@/utils/server/monthlyReport/ppcPerformance/paidConversion";
import { PaidConversionRateMonthlyReportInterface } from "@/utils/server/monthlyReport/ppcPerformance/PaidConversionRate";
import { PaidRevenueMonthlyReportInterface } from "@/utils/server/monthlyReport/ppcPerformance/paidRevenue";

const PpcPerformanceMonthlyReport = ({
    advertiserAdsCostData,
    paidConversionData,
    paidConversionRateData,
    paidRevenueData,
}: {
    advertiserAdsCostData: AdvertiserAdsCostMonthlyReportInterface | null,
    paidConversionData: PaidConversionMonthlyReportInterface | null,
    paidConversionRateData: PaidConversionRateMonthlyReportInterface | null,
    paidRevenueData: PaidRevenueMonthlyReportInterface | null,
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
                >PPC Performance</h2>
            </div>

            {/* First Row */}
            <SectionTemplateMonthlyReport
                setContainerWidth={setContainerWidth}
                elementsData={[
                    // ADVERTISER AD COST
                    {
                        width: "100%",
                        height: "max-content",
                        element: () => (
                            <ColumnLayoutMonthlyReport
                                containerWidth={containerWidth}
                                noOfCol={4.2}
                            >
                                <ChartHeaderMonthlyReport
                                    graphName="Advertiser Ads Cost"
                                    value={advertiserAdsCostData?.currentMonthCost}
                                    prevMonthValue={advertiserAdsCostData?.prevMonthCost}
                                />
                                <BarChartTemplateMonthlyReport
                                    data={advertiserAdsCostData?.graphTicks || []}
                                    xAxisDataKey={'date'}
                                    yAxisDataKey={'cost'}
                                    barValues={[
                                        "cost",
                                    ]}
                                />
                                <ChartFooterMonthlyReport
                                    prevPeriodPercent={advertiserAdsCostData?.percent.prevMonth}
                                    prevYearPercent={advertiserAdsCostData?.percent.prevYear}
                                />
                            </ColumnLayoutMonthlyReport>
                        )
                    },

                    // CONVERSION FROM PAID
                    {
                        width: "100%",
                        height: "max-content",
                        element: () => (
                            <ColumnLayoutMonthlyReport
                                containerWidth={containerWidth}
                                noOfCol={4.2}
                            >
                                <ChartHeaderMonthlyReport
                                    graphName="Conversion from paid"
                                    value={paidConversionData?.currentMonthConversion}
                                    prevMonthValue={paidConversionData?.prevMonthConversion}
                                />
                                <AreaChartMonthlyReport
                                    data={paidConversionData?.graphTicks || []}
                                    xAxisDataKey={'date'}
                                    yAxisDataKey={'conversion'}
                                    lineValues={[
                                        "conversion",
                                    ]}
                                />
                                <ChartFooterMonthlyReport
                                    prevPeriodPercent={paidConversionData?.percent.prevMonth}
                                    prevYearPercent={paidConversionData?.percent.prevYear}
                                />
                            </ColumnLayoutMonthlyReport>
                        )
                    },

                    // CONVERSION RATE FROM PAID
                    {
                        width: "100%",
                        height: "max-content",
                        element: () => (
                            <ColumnLayoutMonthlyReport
                                containerWidth={containerWidth}
                                noOfCol={4.2}
                            >
                                <ChartHeaderMonthlyReport
                                    graphName="Conversion rate from paid"
                                    value={paidConversionRateData?.currentMonthConversion}
                                    prevMonthValue={paidConversionRateData?.prevMonthConversion}
                                />
                                <LineChartMonthlyReport
                                    data={paidConversionRateData?.graphTicks || []}
                                    xAxisDataKey={'date'}
                                    yAxisDataKey={'conversion'}
                                    lineValues={[
                                        "conversion",
                                    ]}
                                />
                                <ChartFooterMonthlyReport
                                    prevPeriodPercent={paidConversionRateData?.percent.prevMonth}
                                    prevYearPercent={paidConversionRateData?.percent.prevYear}
                                />
                            </ColumnLayoutMonthlyReport>
                        )
                    },

                    // REVENUE FROM PAID
                    {
                        width: "100%",
                        height: "max-content",
                        element: () => (
                            <ColumnLayoutMonthlyReport
                                containerWidth={containerWidth}
                                noOfCol={4.2}
                            >
                                <ChartHeaderMonthlyReport
                                    graphName="Revenue from paid"
                                    value={paidRevenueData?.currentMonthRevenue}
                                    prevMonthValue={paidRevenueData?.prevMonthRevenue}
                                />
                                <LineChartMonthlyReport
                                    data={paidRevenueData?.graphTicks || []}
                                    xAxisDataKey={'date'}
                                    yAxisDataKey={'revenue'}
                                    lineValues={[
                                        "revenue",
                                    ]}
                                />
                                <ChartFooterMonthlyReport
                                    prevPeriodPercent={paidRevenueData?.percent.prevMonth}
                                    prevYearPercent={paidRevenueData?.percent.prevYear}
                                />
                            </ColumnLayoutMonthlyReport>
                        )
                    },
                ]}
            />

        </div>
    )
}

export default PpcPerformanceMonthlyReport