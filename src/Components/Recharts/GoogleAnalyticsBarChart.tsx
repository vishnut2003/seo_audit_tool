import { AnalyticsReportByNewUsersSourceDataInterface } from '@/utils/server/projects/analyticsAPI/google/fetchReport'
import React from 'react'
import TripleDotLoading from '../Loaders/TripleDotLoading/TripleDotLoading'
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
} from 'recharts'


const GoogleAnalyticsBarChart = ({
    newUserSourceData,
    inProgress,
    error,
}: {
    newUserSourceData: AnalyticsReportByNewUsersSourceDataInterface[],
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
                        className="flex justify-center items-center"
                    >
                        <p>{error}</p>
                    </div>
                    : !newUserSourceData || inProgress ?
                        <div
                            className="flex justify-center items-center"
                        >
                            <TripleDotLoading />
                        </div>
                        : newUserSourceData &&
                        <ResponsiveContainer
                            className={'flex items-center'}
                        >
                            <BarChart
                                data={newUserSourceData || []}
                                layout='horizontal'
                                margin={{
                                    left: 30,
                                }}
                                width={500}
                                height={200}
                            >
                                <XAxis
                                    dataKey={'source'}
                                    stroke='#000000'
                                    type='category'
                                    tickLine={false}
                                    strokeWidth={'1px'}
                                    strokeOpacity={'15%'}
                                    className='text-sm font-semibold'
                                />

                                <YAxis
                                    dataKey={'newUsers'}
                                    type='number'
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

                                <Bar
                                    type="linear"
                                    dataKey={"newUsers"}
                                    strokeWidth={'0px'}
                                    fill='#3c50e0'
                                    barSize={50}
                                />
                                <Bar
                                    type="linear"
                                    dataKey={"activeUsers"}
                                    strokeWidth={'0px'}
                                    fill='#3c50e0'
                                    barSize={50}
                                />

                            </BarChart>
                        </ResponsiveContainer>
            }
        </div>
    )
}

export default GoogleAnalyticsBarChart