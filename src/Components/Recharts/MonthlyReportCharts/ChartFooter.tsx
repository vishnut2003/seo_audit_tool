import React from 'react'

const ChartFooterMonthlyReport = ({
    prevPeriodPercent,
    prevYearPercent,
}: {
    prevPeriodPercent: number,
    prevYearPercent: number,
}) => {
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