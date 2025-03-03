'use client';

import TripleDotLoading from '@/Components/Loaders/TripleDotLoading/TripleDotLoading';
import DatePicker from '@/Components/ui/datepicker';
import { GoogleSearchConsoleGraphRow } from '@/utils/server/projects/googleSearchConsoleAPI/reports/graphReport'
import React, { useEffect, useState } from 'react'
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

const GoogleSearchConsoleGraph = ({ graphData }: {
    graphData: GoogleSearchConsoleGraphRow[],
}) => {

    const [data, setData] = useState<GoogleSearchConsoleGraphRow[] | null>(null);
    const [inProgress, setInProgress] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null)
    const [activeTabs, setActiveTabs] = useState<string[]>(["clicks", "impression"]);

    // filter options
    const [dateRange, setDateRange] = useState<{
        startDate: Date,
        endDate: Date,
    }>({
        startDate: new Date(new Date().setDate(new Date().getDate() - 7)),
        endDate: new Date(),
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

    useEffect(() => {
        try {
            setData(graphData)
            setInProgress(false);
        } catch (err) {
            if (typeof err === "string") {
                setError(err);
            } else {
                setError("something went wrong")
            }
        }
    }, [graphData]);

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
                            >{index}</p>

                        </button>
                    ))
                }
            </div>

            {/* Graph */}
            <div
                className='min-h-[400px]'
            >
                {
                    inProgress ?
                        <div
                            className='w-full h-full flex justify-center items-center'
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

                                            <Tooltip />
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
                                                tabs.map((line, index) => (
                                                    <YAxis
                                                        domain={['dataMin - 10', 'dataMax + 10']}
                                                        hide={true}
                                                        yAxisId={line.value}
                                                        tickCount={10}
                                                        key={index}
                                                    />
                                                ))
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

            {/* date range filter */}
            <div
                className='flex justify-start items-end gap-5 py-3 px-5'
            >
                <div>
                    <p
                        className='text-sm font-medium'
                    >Start Date</p>
                    <div
                        className='rounded-md overflow-hidden bg-gray-100'
                    >
                        <DatePicker
                            date={dateRange.startDate}
                            placeholder='Start Date'
                            setDate={(prevDate) => {
                                setDateRange(prev => {
                                    return {
                                        ...prev,
                                        startDate: prevDate,
                                    }
                                })
                            }}
                        />
                    </div>
                </div>

                <div>
                    <p
                        className='text-sm font-medium'
                    >End Date</p>
                    <div
                        className='rounded-md overflow-hidden bg-gray-100'
                    >
                        <DatePicker
                            date={dateRange.endDate}
                            placeholder='End Date'
                            setDate={(prevDate) => {
                                setDateRange(prev => {
                                    return {
                                        ...prev,
                                        endDate: prevDate,
                                    }
                                })
                            }}
                        />
                    </div>
                </div>

                {/* filter submit button */}
                <button
                    className='px-3 py-2 bg-themeprimary text-white rounded-md text-sm'
                    disabled={inProgress}
                >
                    {inProgress ? "Loading..." : "Apply"}
                </button>
            </div>
        </div>
    )
}

export default GoogleSearchConsoleGraph