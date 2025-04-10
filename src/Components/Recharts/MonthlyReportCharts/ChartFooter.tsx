import React from 'react'

const ChartFooterMonthlyReport = ({
    prevPeriodPercent,
    prevYearPercent,
    legends,
}: {
    prevPeriodPercent?: number,
    prevYearPercent?: number,
    legends?: {
        name: string,
        color: string,
    }[],
}) => {

    if (legends) {
        return (
            <div>
                {/* Legends */}
                <div
                    className='flex items-center gap-4'
                >
                    {legends.map((legend, index) => (
                        <div
                            className='flex items-center gap-2'
                            key={index}
                        >
                            <div
                                className='w-4 h-4 rounded-sm'
                                style={{
                                    backgroundColor: legend.color,
                                }}
                            ></div>

                            <p
                                className='capitalize opacity-80'
                            >{legend.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div
            className='flex justify-between'
        >
            <div
                className='flex flex-col gap-0'
            >
                <p
                    className='text-sm'
                >Prev Period</p>
                <p
                    className='text-xs text-green-600 font-medium'
                >{prevPeriodPercent}%</p>
            </div>
            <div
                className='space-y-1'
            >
                <p
                    className='text-sm text-right'
                >Prev Year</p>
                <p
                    className='text-xs text-green-600 font-medium text-right'
                >{prevYearPercent}%</p>
            </div>
        </div>
    )
}

export default ChartFooterMonthlyReport;