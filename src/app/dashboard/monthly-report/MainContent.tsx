'use client';

import { useEffect, useState } from "react";
import MonthlyReportHeader from "./sections/Header";
import PpcPerformanceMonthlyReport from "./sections/PpcPerformance";
import SeoPerformanceMonthlyReport from "./sections/SeoPerformance";
import TrafficOverviewMonthlyReport from "./sections/TrafficOverview";
import { TotalSessionMonthlyReportInterface } from "@/utils/server/monthlyReport/trafficOverview/totalSession";
import { TotalBounceRateMonthlyReportInterface } from "@/utils/server/monthlyReport/trafficOverview/totalBounceRate";

const MonthlyReportMainContent = ({
    totalSessionData,
    totalBounceRate,
}: {
    totalSessionData: TotalSessionMonthlyReportInterface,
    totalBounceRate: TotalBounceRateMonthlyReportInterface,
}) => {

    const [passingTotalSessionData, setPassingTotalSessionData] = useState<TotalSessionMonthlyReportInterface | null>(null);
    const [passingTotalBounceData, setPassingTotalBounceData] = useState<TotalBounceRateMonthlyReportInterface | null>(null);

    useEffect(() => {
        setPassingTotalSessionData(totalSessionData);
        setPassingTotalBounceData(totalBounceRate);
    }, [
        totalSessionData,
        totalBounceRate,
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
                totalBounceRate={totalBounceRate}
            />

            {/* SEO Performance */}
            <SeoPerformanceMonthlyReport />

            {/* PPC Performance */}
            <PpcPerformanceMonthlyReport />
        </div>
    )
}

export default MonthlyReportMainContent