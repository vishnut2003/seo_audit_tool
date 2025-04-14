'use client';

import { useEffect, useState } from "react";
import MonthlyReportHeader from "./sections/Header";
import PpcPerformanceMonthlyReport from "./sections/PpcPerformance";
import SeoPerformanceMonthlyReport from "./sections/SeoPerformance";
import TrafficOverviewMonthlyReport from "./sections/TrafficOverview";
import { TotalSessionMonthlyReportInterface } from "@/utils/server/monthlyReport/trafficOverview/totalSession";

const MonthlyReportMainContent = ({
    totalSessionData,
}: {
    totalSessionData: TotalSessionMonthlyReportInterface,
}) => {

    const [passingTotalSessionData, setPassingTotalSessionData] = useState<TotalSessionMonthlyReportInterface | null>(null);

    useEffect(() => {
        setPassingTotalSessionData(totalSessionData);
    }, [
        totalSessionData
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
            />

            {/* SEO Performance */}
            <SeoPerformanceMonthlyReport />

            {/* PPC Performance */}
            <PpcPerformanceMonthlyReport />
        </div>
    )
}

export default MonthlyReportMainContent