'use client';

import MonthlyReportHeader from "./sections/Header";
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
        </div>
    )
}

export default MonthlyReportMainContent