'use client';

import { Dispatch, SetStateAction } from "react";
import Queries_Tab from "./DataTabs/Queries_Tab";
import { GoogleSearchConsoleDataTabsRow } from "@/utils/server/projects/googleSearchConsoleAPI/reports/tabsData";

const OtherDataTabs = ({
    tabs,
    currentActive,
    setCurrentActive,
    error,
    inProgress,
    report,
}: {
    tabs: string[],
    currentActive: string,
    setCurrentActive: Dispatch<SetStateAction<string>>,
    inProgress: boolean,
    error: string | null,
    report: GoogleSearchConsoleDataTabsRow[],
}) => {

    return (
        <div
            className="w-full h-max bg-background rounded-md overflow-hidden"
        >
            <div
                className="flex border-b border-gray-100"
            >
                {
                    // Tabs
                    tabs.map((tab, index) => (
                        <button
                            key={index}
                            className={`capitalize py-4 px-5 text-sm ${currentActive === tab && "bg-gray-50 border-b border-themesecondary"}`}
                            onClick={() => {
                                setCurrentActive(tab);
                            }}
                        >
                            {tab.split('_').join(' ')}
                        </button>
                    ))
                }
            </div>

            {/* Data */}
            <div
                className="min-h-[400px]"
            >
                <Queries_Tab
                    error={error}
                    inProgress={inProgress}
                    report={report}
                />
            </div>
        </div>
    )
}

export default OtherDataTabs