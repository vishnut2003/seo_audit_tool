'use client';

import TotalSessionChart from "@/Components/Recharts/MonthlyReportCharts/TotalSessionChart";
import SectionTemplateMonthlyReport from "./SectionTemplate";
import { useState } from "react";

const MonthlyReportMainContent = () => {

    const [containerWidth, setContainerWidth] = useState<number>(0);

    return (
        <div
            className="flex items-start justify-center pb-[50px]"
        >
            <div
                className="bg-white/10 min-w-[1096px] max-w-[1096px] h-[3000px] px-4 py-3"
            >

                {/* First Section */}
                <SectionTemplateMonthlyReport
                    setContainerWidth={setContainerWidth}
                    elementsData={[
                        // TOTAL SESSIONS 
                        {
                            width: "100%",
                            height: "max-content",
                            element: () => (
                                <TotalSessionChart
                                    containerWidth={containerWidth}
                                />
                            )
                        },
                        {
                            width: "100%",
                            height: "max-content",
                            element: () => (
                                <TotalSessionChart
                                    containerWidth={containerWidth}
                                />
                            )
                        },
                        {
                            width: "100%",
                            height: "max-content",
                            element: () => (
                                <TotalSessionChart
                                    containerWidth={containerWidth}
                                />
                            )
                        },
                        {
                            width: "100%",
                            height: "max-content",
                            element: () => (
                                <TotalSessionChart
                                    containerWidth={containerWidth}
                                />
                            )
                        },
                    ]}
                />

            </div>
        </div>
    )
}

export default MonthlyReportMainContent