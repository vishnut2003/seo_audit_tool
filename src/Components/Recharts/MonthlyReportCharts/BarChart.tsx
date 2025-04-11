import React from 'react'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const BarChartTemplateMonthlyReport = ({
    data,
    barValues,
    xAxisDataKey,
    yAxisDataKey,
}: {
    data: any[],
    xAxisDataKey: string,
    yAxisDataKey: string,
    barValues: string[],
}) => {
    return (
        <ResponsiveContainer
            className={'flex items-center bg-white'}
            width={'100%'}
            height={'40%'}
        >
            <BarChart
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

                {barValues.map((value, index) => (
                    <Bar
                        key={index}
                        dataKey={value}
                        strokeWidth={'0px'}
                        fill='#3c50e0'
                        barSize={10}
                    />
                ))}

            </BarChart>
        </ResponsiveContainer>
    )
}

export default BarChartTemplateMonthlyReport