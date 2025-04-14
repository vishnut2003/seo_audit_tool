'use client';

import MonthlyReportHeader from "./sections/Header";
import PpcPerformanceMonthlyReport from "./sections/PpcPerformance";
import SeoPerformanceMonthlyReport from "./sections/SeoPerformance";
import TrafficOverviewMonthlyReport from "./sections/TrafficOverview";

const MonthlyReportMainContent = () => {
    return (
        <div
            className="flex flex-col items-center justify-start pb-[50px]"
        >
            {/* Heading section */}
            <MonthlyReportHeader/>

            {/* Traffic Overview */}
            <TrafficOverviewMonthlyReport/>

            {/* SEO Performance */}
            <SeoPerformanceMonthlyReport/>

            {/* PPC Performance */}
            <PpcPerformanceMonthlyReport/>
        </div>
    )
}

export default MonthlyReportMainContent