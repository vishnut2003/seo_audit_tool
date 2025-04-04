'use cient';

import { AnalyticsUserAcquisitionGraphReport } from "@/utils/server/projects/analyticsAPI/google/userAcquisitionData";
import { useEffect } from "react";
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

const AnalyticsUserAcquisitionGraph = ({
    graphReport,
}: {
    graphReport: AnalyticsUserAcquisitionGraphReport[],
}) => {

    useEffect(() => console.log(graphReport))

    return (
        <div
            className="w-full bg-white py-3 px-5 shadow-xl shadow-gray-200 rounded-md"
        >
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

                                const formattedText = payload.value.split('/')[2]

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

export default AnalyticsUserAcquisitionGraph