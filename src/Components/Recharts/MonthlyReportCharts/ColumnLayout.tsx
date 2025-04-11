import { RiLoader4Line } from '@remixicon/react'
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

    if (containerWidth === 0) {
        return (
            <div
                className='w-full p-2 h-[200px]'
            >
                <div
                    className='h-full w-full flex flex-col gap-3 items-center justify-center bg-white'
                >
                    <RiLoader4Line
                        size={20}
                        className='animate-spin'
                    />
                    <p>Fetching Data...</p>
                </div>
            </div>
        )
    }

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