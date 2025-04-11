import React from 'react'

const ChartHeaderMonthlyReport = ({
    graphName,
    value,
}: {
    graphName: string,
    value?: number,
}) => {
    return (
        <div
            className='flex flex-col'
        >
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
    )
}

export default ChartHeaderMonthlyReport