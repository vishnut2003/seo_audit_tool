'use client';

import GoogleAnalyticsChart from "@/Components/Recharts/GoogleAnalyticsChart";
import { AnalyticsDataByCountryInterface, AnalyticsReportByNewUsersSourceDataInterface, GoogleAnalyticsReportResponse } from "@/utils/server/projects/analyticsAPI/google/fetchReport";
import { useEffect, useState } from "react";
// import { VectorMap } from "@react-jvectormap/core";
import { worldMill } from "@react-jvectormap/world";
import dynamic from "next/dynamic";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select"
import countryNameToCode from "./countryCodeNames";
import Image from "next/image";
import { RiLoader4Line } from "@remixicon/react";
import GoogleAnalyticsBarChart from "@/Components/Recharts/GoogleAnalyticsBarChart";

// import map using dynamic
const VectorMap = dynamic(() => import('@react-jvectormap/core').then((mod) => mod.VectorMap), { ssr: false });

const GoogleAnalyticsReportChart = ({
    analyticsReport,
    error,
    inProgress,
    countryAnalyticsReport,
    newUsersSourceReport,
}: {
    analyticsReport: GoogleAnalyticsReportResponse | null,
    inProgress: boolean,
    error: string | null,
    countryAnalyticsReport: AnalyticsDataByCountryInterface[],
    newUsersSourceReport: AnalyticsReportByNewUsersSourceDataInterface[],
}) => {

    const [currentMetrics, setCurrentMetrics] = useState("activeUsers")
    const [mapData, setMapData] = useState<{
        [key: string]: number,
    }>({})

    useEffect(() => {
        console.log(countryAnalyticsReport)
        // convert coutryData to map data
        const countryData: {
            [key: string]: number,
        } = countryAnalyticsReport.reduce((accumulator, currentValue) => {
            const countryCode = countryNameToCode[currentValue.country];
            if (countryCode) {
                console.log(currentMetrics)
                const value = currentValue[currentMetrics as keyof AnalyticsDataByCountryInterface];
                accumulator[countryCode] = typeof value === "number" ? value : 0;
            }

            return accumulator;
        }, {} as { [key: string]: number })
        console.log(countryData)
        setMapData(countryData);
    }, [currentMetrics, countryAnalyticsReport])

    return (
        <div
            className="w-full h-full space-y-7"
        >
            <div
                className="flex flex-col md:flex-row justify-center items-stretch gap-5 w-full"
            >

                {/* Chart col */}
                <div
                    className="w-full bg-background rounded-md overflow-hidden shadow-xl shadow-gray-200 flex flex-col justify-between"
                >
                    {/* Chart metrics tabs */}
                    <div
                        className="border-b border-gray-100 w-full overflow-auto"
                    >
                        <div
                            className="flex justify-start w-max"
                        >
                            {
                                !analyticsReport && inProgress &&
                                [0, 1, 2].map((index) => (
                                    <div
                                        className={`px-5 md:px-7 py-3 md:py-4 flex flex-col items-start gap-1`}
                                        key={index}
                                    >
                                        <p
                                            className="p-2 bg-gray-100 animate-pulse rounded-md w-[80px]"
                                        ></p>
                                        <p
                                            className="py-[17px] bg-gray-100 animate-pulse rounded-md w-[25px]"
                                        ></p>
                                    </div>
                                ))
                            }

                            {
                                analyticsReport && !inProgress &&
                                analyticsReport.totals.map((total, index) => (
                                    <button
                                        className={`px-5 md:px-7 py-3 md:py-4 flex flex-col items-start gap-1 text-left ${total.name === currentMetrics && "bg-[#3c50e020] text-themesecondary border-b-2 border-themesecondary"}`}
                                        key={index}
                                        onClick={() => setCurrentMetrics(total.name)}
                                    >
                                        <p
                                            className="w-[80px] text-sm font-semibold capitalize"
                                        >{total.name}</p>
                                        <p
                                            className="w-[25px] text-2xl font-semibold text-foreground"
                                        >{total.value}</p>
                                    </button>
                                ))
                            }
                        </div>
                    </div>

                    {/* chart */}
                    <div>
                        <GoogleAnalyticsChart
                            dataPoints={analyticsReport?.dataPoints}
                            currentMetrics={currentMetrics}
                            inProgress={inProgress}
                            error={error}
                        />
                    </div>

                    <div
                        className="py-3 px-5"
                    >
                        {/* Date filter */}
                        <div
                            className="flex justify-start items-center gap-2"
                        >
                            <Select>
                                <SelectTrigger
                                    className="w-[180px] h-[40px] px-5 shadow-none bg-gray-100"
                                >
                                    <SelectValue placeholder="Export as" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="gsheet">Google SpreadSheet</SelectItem>
                                    <SelectItem value="excel">Excel File</SelectItem>
                                </SelectContent>
                            </Select>

                            <button
                                className="bg-themeprimary rounded-md py-2 px-4 text-white text-sm disabled:opacity-40"
                            >
                                {inProgress ? "Loading..." : "Export"}
                            </button>

                        </div>
                    </div>
                </div>

                {/* Export Sidebar */}
                <div
                    className="w-full md:w-[50%] p-5 bg-white space-y-3 rounded-md shadow-xl shadow-gray-200 flex flex-col justify-between"
                >
                    {/* Change Current Metrics */}
                    <div
                        className="flex items-center gap-3"
                    >
                        <Select
                            onValueChange={(value) => setCurrentMetrics(value)}
                        >
                            <SelectTrigger
                                className="w-[180px] h-[40px] px-5 shadow-none bg-gray-100 capitalize"
                            >
                                <SelectValue placeholder={currentMetrics} />
                            </SelectTrigger>
                            <SelectContent
                                className="capitalize"
                            >
                                {analyticsReport?.totals.map((value, index) => (
                                    <SelectItem
                                        value={value.name}
                                        key={index}
                                    >{value.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <p
                            className="font-semibold"
                        >by Country</p>
                    </div>

                    {/* World map */

                        Object.keys(mapData).length !== 0 ?
                            <VectorMap
                                map={worldMill}
                                backgroundColor="#ffffff"
                                regionStyle={{
                                    initial: { fill: "#D6D6DA" },
                                    hover: { fill: "#1c2434" },
                                }}
                                style={{
                                    width: "100%",
                                    height: "300px"
                                }}
                                zoomOnScroll={false}
                                series={{
                                    regions: [
                                        {
                                            values: mapData,
                                            attribute: "fill",
                                            scale: ["#d7dcff", "#3c50e0"],
                                            // normalizeFunction: "polynomial",
                                        }
                                    ]
                                }}
                            />
                            : <div
                                className="flex items-center justify-center min-h-[300px] gap-3"
                            >
                                <RiLoader4Line
                                    size={20}
                                    className="animate-spin"
                                />

                                <p>Loading...</p>
                            </div>
                    }

                    {/* Map hover content */}

                    <div
                        className="flex flex-col gap-5"
                    >
                        <p
                            className="capitalize text-left text-lg font-semibold"
                        >{currentMetrics}</p>

                        <div
                            className="flex flex-wrap items-center gap-x-7 gap-y-4"
                        >
                            {Object.keys(mapData).map((key, index) => {
                                if (index <= 10) {
                                    return (
                                        <div
                                            key={index}
                                            className="flex items-center gap-2 font-semibold"
                                        >
                                            <Image
                                                src={`https://flagcdn.com/w40/${key.toLowerCase()}.png`}
                                                alt={key}
                                                width={100}
                                                height={50}
                                                className="w-[25px] border border-gray-200"
                                            />
                                            <p>{mapData[key]}</p>
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Second section */}
            <div
                className="min-h-[400px] flex items-stretch gap-5"
            >

                {/* Col 1 */}
                <div
                    className="w-full py-5 px-6 bg-white rounded-md shadow-lg shadow-gray-200 flex flex-col justify-between gap-5"
                >
                    <div>
                        <h2
                            className="text-lg font-semibold"
                        >Source of Users</h2>
                        <p
                            className="text-sm"
                        >Where do your newUser/activeUsers come from?</p>
                    </div>
                    <GoogleAnalyticsBarChart
                        error={error}
                        inProgress={inProgress}
                        newUserSourceData={newUsersSourceReport}
                    />
                </div>

                {/* Col 2 */}
                <div
                    className="w-[50%] py-5 px-6 bg-white rounded-md shadow-lg shadow-gray-200"
                ></div>
            </div>
        </div>
    )
}

export default GoogleAnalyticsReportChart