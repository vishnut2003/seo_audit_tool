'use client';

import { GoogleAnalyticsDataPoints } from "@/utils/server/projects/analyticsAPI/google/fetchReport";
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import TripleDotLoading from "../Loaders/TripleDotLoading/TripleDotLoading";

const GoogleAnalyticsChart = ({ dataPoints, currentMetrics, inProgress, error }: {
    dataPoints: GoogleAnalyticsDataPoints[] | null | undefined,
    currentMetrics: string,
    inProgress: boolean,
    error: string | null,
}) => {
    return (
        <div
            className="w-full h-full pb-4"
        >
            {
                error ?
                    <div
                        className="h-[400px] flex justify-center items-center"
                    >
                        <p>{error}</p>
                    </div>
                    : inProgress && !dataPoints ?
                        <div
                            className="h-[200px] md:h-[400px] flex justify-center items-center"
                        >
                            <TripleDotLoading />
                        </div>
                        : dataPoints &&
                        <ResponsiveContainer
                            width={'100%'}
                            aspect={6.0 / 2.5}
                        >
                            <LineChart
                                data={dataPoints || []}
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
                                            day = date.split('/')[2]
                                        }
                                        return day;
                                    }}
                                    tickLine={false}
                                    tick={{
                                        fill: "#00000080",
                                        fontSize: 14,
                                        fontWeight: 600,
                                    }}
                                    interval={Math.floor(dataPoints.length! / 7)}
                                />

                                <YAxis
                                    domain={['auto', 'auto']}
                                    tickCount={6}
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

                                <Line
                                    type="linear"
                                    dataKey={currentMetrics}
                                    stroke="#3c50e0"
                                    strokeWidth={'2px'}
                                    dot={false}
                                />
                            </LineChart>
                        </ResponsiveContainer>
            }
        </div>
    )
}

export default GoogleAnalyticsChart