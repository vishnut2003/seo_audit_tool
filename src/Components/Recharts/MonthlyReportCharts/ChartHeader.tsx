import React from 'react'

const ChartHeaderMonthlyReport = ({
    graphName,
    value,
    prevMonthValue,
}: {
    graphName: string,
    value?: number,
    prevMonthValue?: number,
}) => {
    return (
        <div
            className='flex justify-between'
        >
            <div>
                <p
                    className='text-sm font-light uppercase'
                >{graphName}</p>
                {
                    value &&
                    <p
                        className='text-lg font-semibold'
                    >
                        {value}
                    </p>
                }
            </div>

            {
                prevMonthValue &&
                <div
                    className='flex flex-col gap-1 items-end'
                >
                    <p
                        className='text-xs font-medium uppercase'
                    >Prev Month</p>
                    <p
                        className='text-lg font-semibold'
                    >
                        {prevMonthValue}
                    </p>
                </div>
            }
        </div>
    )
}

export default ChartHeaderMonthlyReport