import React from 'react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const AreaChartMonthlyReport = ({
    data,
    lineValues,
    xAxisDataKey,
    yAxisDataKey,
}: {
    data: any[],
    xAxisDataKey: string,
    yAxisDataKey: string,
    lineValues: string[],
}) => {
    return (
        <ResponsiveContainer
            className={'flex items-center'}
            width={'100%'}
            height={'40%'}
        >
            <AreaChart
                data={data}
                layout='horizontal'
            >
                <XAxis
                    dataKey={xAxisDataKey}
                    stroke='#000000'
                    tickLine={false}
                    strokeWidth={'1px'}
                    strokeOpacity={'15%'}
                    className='text-xs md:text-sm font-semibold'
                    hide={true}
                />

                <YAxis
                    dataKey={yAxisDataKey}
                    stroke='#00000060'
                    hide={true}
                />

                <Tooltip
                    content={({ active, payload, label }) => {
                        return (
                            <div
                                className='bg-white rounded-md shadow-xl shadow-black/5 py-3 px-5 space-y-3'
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
                                                className={`flex justify-between gap-4 font-medium capitalize`}
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
                    stroke="#00000015"
                    vertical={false}
                />

                {lineValues.map((value, index) => (
                    <Area
                        key={index}
                        dataKey={value}
                        strokeWidth={'1px'}
                        fill='#3c50e0'
                    />
                ))}

            </AreaChart>
        </ResponsiveContainer>
    )
}

export default AreaChartMonthlyReport