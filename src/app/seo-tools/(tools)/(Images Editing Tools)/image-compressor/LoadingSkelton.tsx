import React from 'react'

const LoadingSkelton = () => {
    return (
        <div
            className="flex items-center w-full justify-between gap-3"
        >
            <div>
                <div
                    className='w-[50px] h-[50px] bg-gray-100 rounded-md'
                ></div>
            </div>
            <div
                className="w-full space-y-3"
            >
                <p
                    className='p-1 w-[60%] bg-gray-100 rounded-md'
                ></p>
                <p
                    className='p-1 w-[30%] bg-gray-100 rounded-md'
                ></p>
            </div>
            <div>
                <p
                    className='py-3 px-6 bg-gray-100 rounded-md'
                ></p>
            </div>
        </div>
    )
}

export default LoadingSkelton