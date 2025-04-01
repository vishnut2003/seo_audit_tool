'use client';

import TripleDotLoading from '@/Components/Loaders/TripleDotLoading/TripleDotLoading';
import { GoogleSearchConsoleGraphRow } from '@/utils/server/projects/googleSearchConsoleAPI/reports/graphReport'
import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

export interface GoogleSearchConsoleGraphFilterInterface {
    projectId: string,
    dateRange: {
        startDate: string,
        endDate: string,
    }
}

const GoogleSearchConsoleGraph = ({
    graphData,
    inProgress,
    setInProgress,
    error,
    setError,
}: {
    graphData: GoogleSearchConsoleGraphRow[],
    setInProgress: Dispatch<SetStateAction<boolean>>,
    inProgress: boolean,
    error: string | null,
    setError: Dispatch<SetStateAction<string | null>>,
}) => {

    const [data, setData] = useState<GoogleSearchConsoleGraphRow[] | null>(null);
    const [activeTabs, setActiveTabs] = useState<string[]>(["clicks", "impression"]);

    const [totalCounts, setTotalCounts] = useState<{
        clicks: number,
        impression: number,
        ctr: number,
        position: number,
    }>({
        clicks: 0,
        impression: 0,
        ctr: 0,
        position: 0,
    });

    const tabs: {
        title: string,
        value: string,
        color: string,
        tabColor: string,
    }[] = [
            {
                title: "Total Clicks",
                value: "clicks",
                color: "#4285f4",
                tabColor: "blue",
            },
            {
                title: "Total Impression",
                value: "impression",
                color: "#5e35b1",
                tabColor: "purple",
            },
            {
                title: "Average CTR",
                value: "ctr",
                color: "#00897b",
                tabColor: "green",
            },
            {
                title: "Average Position",
                value: "position",
                color: "#e8710a",
                tabColor: "orange",
            },
        ]

    const calculateSumFromDataPoint = useCallback((dataPoints: GoogleSearchConsoleGraphRow[]) => {
        // Reset the value to 0
        setTotalCounts({
            clicks: 0,
            impression: 0,
            ctr: 0,
            position: 0,
        })

        for (const [index, row] of dataPoints.entries()) {
            setTotalCounts(prev => {
                const temp = { ...prev };
                for (const key of Object.keys(row)) {
                    if (typeof row[key as keyof typeof row] === "number") {
                        if (key === "position" && index === (dataPoints.length - 1)) {
                            temp[key as keyof typeof temp] += row[key as keyof typeof row] as number;
                            temp[key as keyof typeof temp] = roundToThreeDecimals(temp[key as keyof typeof temp] / dataPoints.length);
                        } else if (key === "ctr" && index === (dataPoints.length - 1)) {
                            temp[key as keyof typeof temp] += row[key as keyof typeof row] as number;
                            temp[key as keyof typeof temp] = roundToThreeDecimals((temp[key as keyof typeof temp] / dataPoints.length) * 100);
                        } else {
                            temp[key as keyof typeof temp] += row[key as keyof typeof row] as number;
                            temp[key as keyof typeof temp] = roundToThreeDecimals(temp[key as keyof typeof temp])
                        }
                    }
                }

                return { ...temp };
            })
        }

    }, [])

    useEffect(() => {
        try {
            setData(graphData)
            calculateSumFromDataPoint(graphData);
            setInProgress(false);
        } catch (err) {
            if (typeof err === "string") {
                setError(err);
            } else {
                setError("something went wrong")
            }
        }
    }, [graphData, calculateSumFromDataPoint, setInProgress, setError]);

    function roundToThreeDecimals(num: number): number {
        return Math.round(num * 1000) / 1000;
    }

    return (
        <div
            className='w-full h-max flex flex-col bg-background rounded-md overflow-hidden'
        >
            {/* Tabs */}
            <div
                className='flex justify-start items-center border-b border-gray-100'
            >
                {
                    tabs.map((tab, index) => (
                        <button
                            key={index}
                            className={`py-3 px-4 min-w-[150px] flex flex-col gap-3 items-start ${activeTabs.includes(tab.value) ?
                                tab.tabColor === "blue" ? "bg-[#4285f4] text-white"
                                    : tab.tabColor === "purple" ? "bg-[#5e35b1] text-white"
                                        : tab.tabColor === "green" ? "bg-[#00897b] text-white"
                                            : tab.tabColor === "orange" ? "bg-[#e8710a] text-white" : ""
                                : "hover:bg-gray-100"
                                }`
                            }
                            onClick={() => {
                                if (activeTabs.includes(tab.value)) {
                                    setActiveTabs(prev => {
                                        const tempArray = [...prev];
                                        tempArray.splice(tempArray.indexOf(tab.value), 1);
                                        return tempArray;
                                    })
                                } else {
                                    setActiveTabs(prev => [...prev, tab.value]);
                                }
                            }}
                        >
                            <p
                                className='text-sm'
                            >{tab.title}</p>

                            <p
                                className='text-3xl font-semibold'
                            >{totalCounts[tab.value as keyof typeof totalCounts]}</p>

                        </button>
                    ))
                }
            </div>

            {/* Graph */}
            <div
                className='min-h-[400px] flex flex-col justify-center'
            >
                {
                    inProgress ?
                        <div
                            className='w-full flex justify-center items-center'
                        >
                            <TripleDotLoading />
                        </div>
                        : error ?
                            <div
                                className='flex justify-center items-center w-full h-full'
                            >
                                <p>{error}</p>
                            </div>
                            : data ?
                                <div
                                    className='flex justify-center items-center w-full h-full'
                                >
                                    <ResponsiveContainer
                                        width={'100%'}
                                        aspect={8.0 / 2.5}
                                    >
                                        <LineChart
                                            data={data}
                                            margin={{
                                                top: 0,
                                                left: 15,
                                                right: 15,
                                            }}
                                        >
                                            <XAxis
                                                dataKey={'date'}
                                                stroke='#00000000'
                                                tickFormatter={(date) => {
                                                    let day = 'day'
                                                    if (typeof date === "string") {
                                                        day = date.split('-')[2]
                                                    }
                                                    return day;
                                                }}
                                                tickLine={false}
                                                tick={{
                                                    fill: "#00000080",
                                                    fontSize: 14,
                                                    fontWeight: 600,
                                                }}
                                                interval={Math.floor(data.length! / 7)}
                                            />

                                            <YAxis
                                                domain={['auto', 'auto']}
                                                tickCount={100}
                                                hide={true}
                                            />

                                            <Tooltip
                                                content={({ active, payload, label }) => {
                                                    return (
                                                        <div
                                                            className='bg-white rounded-md shadow-xl shadow-gray-200 py-3 px-5 space-y-3'
                                                        >
                                                            <p
                                                                className='text-base font-semibold'
                                                            >{label}</p>
                                                            <div>
                                                                {
                                                                    active &&
                                                                    payload?.map((pyl, index) => (
                                                                        <div
                                                                            key={index}
                                                                            className={`flex justify-between gap-4 font-medium`}
                                                                            style={{
                                                                                color: pyl.color,
                                                                            }}
                                                                        >
                                                                            <p>{pyl.name}</p>
                                                                            <p>{roundToThreeDecimals((pyl.value as number))}</p>
                                                                        </div>
                                                                    ))
                                                                }
                                                            </div>
                                                        </div>
                                                    )
                                                }}
                                            />
                                            <CartesianGrid
                                                stroke="#00000014"
                                                vertical={false}
                                            />

                                            {
                                                tabs.map((line, index) => {
                                                    if (activeTabs.includes(line.value)) {
                                                        return (
                                                            <Line
                                                                key={index}
                                                                yAxisId={line.value}
                                                                type="linear"
                                                                dataKey={line.value}
                                                                stroke={line.color}
                                                                strokeWidth={'2px'}
                                                                dot={false}
                                                            />
                                                        )
                                                    }
                                                })
                                            }

                                            {
                                                tabs.map((line, index) => {
                                                    if (line.value === "ctr") {
                                                        return (
                                                            <YAxis
                                                                domain={['dataMin - 0.01', 'dataMax + 0.01']}
                                                                hide={true}
                                                                yAxisId={line.value}
                                                                tickCount={10}
                                                                key={index}
                                                            />
                                                        )
                                                    } else {
                                                        return (
                                                            <YAxis
                                                                domain={['dataMin - 10', 'dataMax + 10']}
                                                                hide={true}
                                                                yAxisId={line.value}
                                                                tickCount={10}
                                                                key={index}
                                                            />
                                                        )
                                                    }
                                                })
                                            }
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                                :
                                <div
                                    className='flex justify-center items-center w-full h-full'
                                >
                                    <p>Nothing to show.</p>
                                </div>
                }
            </div>
        </div>
    )
}

export default GoogleSearchConsoleGraph