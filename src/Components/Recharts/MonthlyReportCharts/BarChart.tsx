import { RiErrorWarningLine } from '@remixicon/react'
import React from 'react'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const htmlColorCodes: string[] = [
    "#3c50e0",
    "#db3511",
    "#7f28dc",
    "#289ddc",
    "#28dc6f",
]

export { htmlColorCodes }

const BarChartTemplateMonthlyReport = ({
    data,
    barValues,
    xAxisDataKey,
    yAxisDataKey,
    showXLable,
    height,
    barSize,
    xAxisTickFormatter,
}: {
    data: any[],
    xAxisDataKey: string,
    yAxisDataKey: string,
    barValues: string[],
    showXLable?: boolean,
    height?: string,
    barSize?: number,
    xAxisTickFormatter?: (value: string) => string,
}) => {

    if (data.length === 0) {
        return (
            <div
                className='flex gap-1 justify-center items-center opacity-50 text-sm'
            >
                <RiErrorWarningLine
                    size={15}
                />
                <p>No data</p>
            </div>
        )
    }

    return (
        <ResponsiveContainer
            className={'flex items-center bg-white'}
            width={'100%'}
            height={height || "40%"}
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
                    hide={showXLable ? false : true}
                    tickFormatter={xAxisTickFormatter}
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
                        fill={htmlColorCodes[index]}
                        barSize={barSize || 10}
                        stackId={index}
                    />
                ))}

            </BarChart>
        </ResponsiveContainer>
    )
}

export default BarChartTemplateMonthlyReport