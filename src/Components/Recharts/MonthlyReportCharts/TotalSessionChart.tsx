'use client';

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from 'recharts'

const dummyData: {
    date: string,
    value: number,
}[] = [
        {
            date: "Jan",
            value: 10,
        },
        {
            date: "Feb",
            value: 15,
        },
        {
            date: "Mar",
            value: 6,
        },
        {
            date: "Apr",
            value: 3,
        },
        {
            date: "May",
            value: 20,
        },
        {
            date: "Jun",
            value: 5,
        },
        {
            date: "Jul",
            value: 6,
        },
        {
            date: "Aug",
            value: 8,
        },
        {
            date: "Sep",
            value: 12,
        },
        {
            date: "Oct",
            value: 11,
        },
    ];

const TotalSessionChart = ({
    containerWidth,
}: {
    containerWidth: number,
}) => {
    
    return (
        <div
            className='bg-white p-1'
            style={{
                width: `${containerWidth / 4.1}px`,
                height: '150px',
            }}
        >
            <h2
                className='text-base uppercase'
            >Total Session</h2>

            <h2
                className='text-base font-semibold'
            >16</h2>

            <ResponsiveContainer
                className={'flex items-center'}
                width={'100%'}
                height={'100%'}
            >
                <BarChart
                    data={dummyData}
                    layout='horizontal'
                >
                    <XAxis
                        dataKey={'date'}
                        stroke='#000000'
                        tickLine={false}
                        strokeWidth={'1px'}
                        strokeOpacity={'15%'}
                        className='text-xs md:text-sm font-semibold'
                        hide={true}
                    />

                    <YAxis
                        dataKey="value"
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

                    <Bar
                        dataKey="value"
                        strokeWidth={'0px'}
                        fill='#3c50e0'
                        barSize={15}
                    />

                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default TotalSessionChart