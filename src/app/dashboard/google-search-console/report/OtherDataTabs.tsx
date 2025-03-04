'use client';

import { useState } from "react";
import Queries_Tab from "./DataTabs/Queries_Tab";
import Pages_Tab from "./DataTabs/Pages_Tab";
import CountryTab from "./DataTabs/Country_Tab";
import DeviceTab from "./DataTabs/Device_Tab";
import SearchAppearanceTab from "./DataTabs/SearchAppearance_Tab";
import DateTab from "./DataTabs/Date_Tab";

const OtherDataTabs = () => {

    const [tabs] = useState<string[]>([
        "queries",
        "pages",
        "countries",
        "devices",
        "search_appearance",
        "dates",
    ]);

    const [currentActive, setCurrentActive] = useState<string>('queries');

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
                {
                    currentActive === "queries" ?
                    <Queries_Tab/>
                    : currentActive === "pages" ?
                    <Pages_Tab/>
                    : currentActive === "countries" ?
                    <CountryTab/>
                    : currentActive === "devices" ?
                    <DeviceTab/>
                    : currentActive === "search_appearance" ?
                    <SearchAppearanceTab/>
                    : currentActive === "dates" ?
                    <DateTab/> : ""
                }
            </div>
        </div>
    )
}

export default OtherDataTabs