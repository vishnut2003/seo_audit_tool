import React from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { htmlColorCodes } from './BarChart'

const PieChartMonthlyReport = ({
    data,
}: {
    data: any[],
}) => {
    return (
        <ResponsiveContainer
            className={'flex items-center'}
            width={'100%'}
            height={'100%'}
        >
            <PieChart>

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
                                                <p>{pyl.value}</p>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }}
                />

                <Pie
                    data={data}
                    cx="50%" // center x
                    cy="50%" // center y
                    outerRadius={65}
                    fill="#8884d8"
                    dataKey="value"
                    label
                >
                    {data.map((value, index) => (
                        <Cell
                            key={`cell-${value.date}`}
                            fill={htmlColorCodes[index]}
                            
                        />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    )
}

export default PieChartMonthlyReport