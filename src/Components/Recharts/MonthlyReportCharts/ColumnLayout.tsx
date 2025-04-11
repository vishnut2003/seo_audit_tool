import React, { ReactNode } from 'react'

const ColumnLayoutMonthlyReport = ({
    containerWidth,
    children,
    noOfCol,
}: {
    containerWidth: number,
    children: ReactNode,
    noOfCol: number,
}) => {
    return (
        <div
            className='p-3 rounded-md flex flex-col justify-between border-2 border-gray-100 bg-white'
            style={{
                width: `${containerWidth / noOfCol}px`,
                height: `${containerWidth / 4}px`,
            }}
        >
            {children}
        </div>
    )
}

export default ColumnLayoutMonthlyReport