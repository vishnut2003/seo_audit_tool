'use client';

import ChartFooterMonthlyReport from '@/Components/Recharts/MonthlyReportCharts/ChartFooter'
import ChartHeaderMonthlyReport from '@/Components/Recharts/MonthlyReportCharts/ChartHeader'
import ColumnLayoutMonthlyReport from '@/Components/Recharts/MonthlyReportCharts/ColumnLayout'
import LineChartMonthlyReport from '@/Components/Recharts/MonthlyReportCharts/LineChart'
import React, { useState } from 'react'
import SectionTemplateMonthlyReport from '../SectionTemplate'
import BarChartTemplateMonthlyReport, { htmlColorCodes } from '@/Components/Recharts/MonthlyReportCharts/BarChart';
import AreaChartMonthlyReport from '@/Components/Recharts/MonthlyReportCharts/AreaChart';
import EngagedSessionByCountryMonthlyReport from './TrafficOverview/EngagedSessionByCountry';
import { TotalSessionMonthlyReportInterface } from '@/utils/server/monthlyReport/trafficOverview/totalSession';
import { TotalBounceRateMonthlyReportInterface } from '@/utils/server/monthlyReport/trafficOverview/totalBounceRate';
import { ConversionDataMonthlyReportInterface } from '@/utils/server/monthlyReport/trafficOverview/conversionsData';
import { SessionConversionDataMonthlyReportInterface } from '@/utils/server/monthlyReport/trafficOverview/sessionConversionData';
import { TopChannelsDataMonthlyReportInterface } from '@/utils/server/monthlyReport/trafficOverview/topChannels';
import { NewUsersDataMonthlyReportInterface } from '@/utils/server/monthlyReport/trafficOverview/newUsersData';
import { TotalSessionByCountryMonthlyReportInterface } from '@/utils/server/monthlyReport/trafficOverview/engagedSessionByCountry';

const TrafficOverviewMonthlyReport = ({
    totalSessionData,
    totalBounceRate,
    conversionData,
    sessionConversionData,
    topChannelsData,
    newUsersData,
    sessionByCountry,
}: {
    totalSessionData: TotalSessionMonthlyReportInterface | null,
    totalBounceRate: TotalBounceRateMonthlyReportInterface | null,
    conversionData: ConversionDataMonthlyReportInterface | null,
    sessionConversionData: SessionConversionDataMonthlyReportInterface | null,
    topChannelsData: TopChannelsDataMonthlyReportInterface | null,
    newUsersData: NewUsersDataMonthlyReportInterface | null,
    sessionByCountry: TotalSessionByCountryMonthlyReportInterface | null,
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
                >Traffic Overview</h2>
            </div>

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
                                    value={totalSessionData?.currentMonthSession}
                                    prevMonthValue={totalSessionData?.prevMonthSession}
                                />
                                <BarChartTemplateMonthlyReport
                                    data={totalSessionData?.graphTicks || []}
                                    xAxisDataKey={'date'}
                                    yAxisDataKey={'session'}
                                    barValues={[
                                        "session",
                                    ]}
                                />
                                <ChartFooterMonthlyReport
                                    prevPeriodPercent={totalSessionData?.percent.prevMonth}
                                    prevYearPercent={totalSessionData?.percent.prevYear}
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
                                    value={totalBounceRate?.currentMonthBounceRate}
                                    prevMonthValue={totalBounceRate?.prevMonthBounceRate}
                                />
                                <AreaChartMonthlyReport
                                    data={totalBounceRate?.graphTicks || []}
                                    xAxisDataKey={'date'}
                                    yAxisDataKey={'value'}
                                    lineValues={[
                                        "value",
                                    ]}
                                />
                                <ChartFooterMonthlyReport
                                    prevPeriodPercent={totalBounceRate?.percent.prevMonth}
                                    prevYearPercent={totalBounceRate?.percent.prevYear}
                                />
                            </ColumnLayoutMonthlyReport>
                        )
                    },

                    // Conversions
                    {
                        width: "100%",
                        height: "max-content",
                        element: () => (
                            <ColumnLayoutMonthlyReport
                                containerWidth={containerWidth}
                                noOfCol={4.2}
                            >
                                <ChartHeaderMonthlyReport
                                    graphName="Conversions"
                                    value={conversionData?.currentMonthConversion}
                                    prevMonthValue={conversionData?.prevMonthConversion}
                                />
                                <LineChartMonthlyReport
                                    data={conversionData?.graphTicks || []}
                                    xAxisDataKey={'date'}
                                    yAxisDataKey={'conversion'}
                                    lineValues={[
                                        "conversion",
                                    ]}
                                />
                                <ChartFooterMonthlyReport
                                    prevPeriodPercent={conversionData?.percent.prevMonth}
                                    prevYearPercent={conversionData?.percent.prevYear}
                                />
                            </ColumnLayoutMonthlyReport>
                        )
                    },

                    // SESSION CONVERSION RATE
                    {
                        width: "100%",
                        height: "max-content",
                        element: () => (
                            <ColumnLayoutMonthlyReport
                                containerWidth={containerWidth}
                                noOfCol={4.2}
                            >
                                <ChartHeaderMonthlyReport
                                    graphName="Session converstion rate"
                                    value={sessionConversionData?.currentMonthSessionConversion}
                                    prevMonthValue={sessionConversionData?.prevMonthSessionConversion}
                                />
                                <LineChartMonthlyReport
                                    data={sessionConversionData?.graphTicks || []}
                                    xAxisDataKey={'date'}
                                    yAxisDataKey={'conversion'}
                                    lineValues={[
                                        "conversion",
                                    ]}
                                />
                                <ChartFooterMonthlyReport
                                    prevPeriodPercent={sessionConversionData?.percent.prevMonth}
                                    prevYearPercent={sessionConversionData?.percent.prevYear}
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
                                    graphName="Top channels over time"
                                />
                                <BarChartTemplateMonthlyReport
                                    data={topChannelsData?.graphTicks || []}
                                    height='60%'
                                    barSize={10}
                                    xAxisDataKey={'date'}
                                    yAxisDataKey={''}
                                    barValues={Object.keys(topChannelsData?.graphTicks[0].channels || {}).map((channelKey) => `channels.${channelKey}`)}
                                    showXLable={true}
                                    xAxisTickFormatter={(value) => {
                                        const date = new Date(value);
                                        const month = date.toLocaleString('default', { month: "short" })
                                        return month;
                                    }}
                                />
                                <ChartFooterMonthlyReport
                                    prevPeriodPercent={40}
                                    prevYearPercent={200}
                                    legends={Object.keys(topChannelsData?.graphTicks[0].channels || {}).map((value, index) => ({
                                        name: value,
                                        color: htmlColorCodes[index],
                                    }))}
                                />
                            </ColumnLayoutMonthlyReport>
                        )
                    },
                ]}
            />

            {/* Thirs Row */}
            <SectionTemplateMonthlyReport
                setContainerWidth={setContainerWidth}
                elementsData={[
                    // New Users
                    {
                        width: "50%",
                        height: "max-content",
                        element: () => (
                            <ColumnLayoutMonthlyReport
                                containerWidth={containerWidth}
                                noOfCol={4}
                            >
                                <ChartHeaderMonthlyReport
                                    graphName="New users"
                                    value={newUsersData?.currentMonthNewUsers}
                                    prevMonthValue={newUsersData?.prevMonthNewUsers}
                                />
                                <AreaChartMonthlyReport
                                    data={newUsersData?.graphTicks || []}
                                    xAxisDataKey={'date'}
                                    yAxisDataKey={'newUsers'}
                                    lineValues={[
                                        "newUsers",
                                    ]}
                                />
                                <ChartFooterMonthlyReport
                                    prevPeriodPercent={newUsersData?.percent.prevMonth}
                                    prevYearPercent={newUsersData?.percent.prevYear}
                                />
                            </ColumnLayoutMonthlyReport>
                        )
                    },

                    // Engaged Session By Country
                    {
                        width: "100%",
                        height: "max-content",
                        element: () => (
                            <ColumnLayoutMonthlyReport
                                containerWidth={containerWidth}
                                noOfCol={1.35}
                            >
                                <ChartHeaderMonthlyReport
                                    graphName="Engaged session by country"
                                />
                                <EngagedSessionByCountryMonthlyReport
                                    data={sessionByCountry?.graphTicks || []}
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