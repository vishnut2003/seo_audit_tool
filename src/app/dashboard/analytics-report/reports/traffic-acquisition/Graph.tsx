'use client';

import { AnalyticsTrafficAcquisitionGraphReport } from '@/utils/server/projects/analyticsAPI/google/trafficAcquisitionData';
import React from 'react'

import {
    LineChart,
    Line,
    XAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

const sourcesList: {
    value: string,
    color: string,
}[] = [
        {
            value: "Organic Search",
            color: "#0878B3",
        },
        {
            value: "Direct",
            color: "#1a73e8",
        },
        {
            value: "Organic Social",
            color: "#4747EB",
        },
        {
            value: "Referral",
            color: "#7333CC",
        },
        {
            value: "Unassigned",
            color: "#720796",
        },
    ];

const AnalyticsTrafficAcquisitionGraph = ({
    graphReport,
    children,
}: {
    graphReport: AnalyticsTrafficAcquisitionGraphReport[],
    children: React.ReactNode,
}) => {
    return (
        <div
            className="w-full bg-white py-3 px-5 shadow-xl shadow-gray-200 rounded-md space-y-3"
        >
            {/* Graph Headers */}
            <div
                className="flex items-center justify-between"
            >

                {/* Left Col */}
                <div
                    className="w-full flex flex-col md:flex-row items-center justify-start"
                >
                    {/* Legends */}
                    <div
                        className="flex items-center gap-4"
                    >
                        {sourcesList.map((source, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2"
                            >
                                <div
                                    className="w-[10px] h-[10px] rounded-full"
                                    style={{
                                        backgroundColor: source.color,
                                    }}
                                ></div>
                                <p>{source.value}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Col */}
                <div
                    className="w-max flex flex-col md:flex-row items-center justify-end"
                >
                    {children}
                </div>

            </div>

            {/* Graph ui */}
            <ResponsiveContainer
                width={'100%'}
                aspect={6.0 / 2}
            >
                <LineChart
                    data={graphReport}
                >

                    <XAxis
                        dataKey={'date'}
                        stroke='#00000080'
                        type='category'
                        tickLine={false}
                        strokeWidth={'1px'}
                        strokeOpacity={'15%'}
                        className='text-xs font-semibold'
                        tick={({ x, y, payload }: { x: number; y: number; payload: { value: string } }) => {
                            if (payload.value.includes('/')) {

                                let formattedText;

                                if (payload.value.split('/')[2]) {
                                    formattedText = payload.value.split('/')[2]
                                } else {
                                    formattedText = payload.value.split('/')[1]
                                }

                                return (
                                    <text x={x} y={y + 10} textAnchor="middle" fontSize={12}>
                                        {formattedText}
                                    </text>
                                )
                            } else {
                                return (
                                    <text x={x} y={y + 10} textAnchor="middle" fontSize={12}>
                                        {payload.value}
                                    </text>
                                )
                            }
                        }}
                    />

                    {sourcesList.map((source, index) => {
                        return (
                            <Line
                                key={index}
                                type="linear"
                                dataKey={source.value}
                                stroke={source.color}
                                strokeWidth={'2px'}
                                dot={false}
                            />
                        )
                    })}

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
                                                    className={`flex justify-between gap-4 text-sm font-semibold`}
                                                    style={{
                                                        color: pyl.color,
                                                    }}
                                                >
                                                    <p>{pyl.name}</p>
                                                    <p>{pyl.value}</p>
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
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default AnalyticsTrafficAcquisitionGraph