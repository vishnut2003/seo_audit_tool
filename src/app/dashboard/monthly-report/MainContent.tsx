'use client';

import { useEffect, useState } from "react";
import MonthlyReportHeader from "./sections/Header";
import PpcPerformanceMonthlyReport from "./sections/PpcPerformance";
import SeoPerformanceMonthlyReport from "./sections/SeoPerformance";
import TrafficOverviewMonthlyReport from "./sections/TrafficOverview";
import { TotalSessionMonthlyReportInterface } from "@/utils/server/monthlyReport/trafficOverview/totalSession";
import { TotalBounceRateMonthlyReportInterface } from "@/utils/server/monthlyReport/trafficOverview/totalBounceRate";
import { ConversionDataMonthlyReportInterface } from "@/utils/server/monthlyReport/trafficOverview/conversionsData";
import { SessionConversionDataMonthlyReportInterface } from "@/utils/server/monthlyReport/trafficOverview/sessionConversionData";

const MonthlyReportMainContent = ({
    totalSessionData,
    totalBounceRate,
    conversionData,
    sessionConversionData,
}: {
    totalSessionData: TotalSessionMonthlyReportInterface,
    totalBounceRate: TotalBounceRateMonthlyReportInterface,
    conversionData: ConversionDataMonthlyReportInterface,
    sessionConversionData: SessionConversionDataMonthlyReportInterface,
}) => {

    const [passingTotalSessionData, setPassingTotalSessionData] = useState<TotalSessionMonthlyReportInterface | null>(null);
    const [passingTotalBounceData, setPassingTotalBounceData] = useState<TotalBounceRateMonthlyReportInterface | null>(null);
    const [passingConversionData, setPassingConversionData] = useState<ConversionDataMonthlyReportInterface | null>(null);
    const [passingSessionConversionData, setPassingSessionConversionData] = useState<SessionConversionDataMonthlyReportInterface | null>(null);

    useEffect(() => {
        setPassingTotalSessionData(totalSessionData);
        setPassingTotalBounceData(totalBounceRate);
        setPassingConversionData(conversionData);
        setPassingSessionConversionData(sessionConversionData);
    }, [
        totalSessionData,
        totalBounceRate,
        conversionData,
        sessionConversionData,
    ]);

    return (
        <div
            className="flex flex-col items-center justify-start pb-[50px]"
        >
            {/* Heading section */}
            <MonthlyReportHeader />

            {/* Traffic Overview */}
            <TrafficOverviewMonthlyReport
                totalSessionData={passingTotalSessionData}
                totalBounceRate={passingTotalBounceData}
                conversionData={passingConversionData}
                sessionConversionData={passingSessionConversionData}
            />

            {/* SEO Performance */}
            <SeoPerformanceMonthlyReport />

            {/* PPC Performance */}
            <PpcPerformanceMonthlyReport />
        </div>
    )
}

export default MonthlyReportMainContent