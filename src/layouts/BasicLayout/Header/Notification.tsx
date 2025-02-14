import { RiNotification2Line } from '@remixicon/react'
import React from 'react'

const Notification = () => {
    return (
        <div>
            <button
                className='bg-white shadow-xl shadow-gray-200 rounded-full p-3 relative'
            >
                <RiNotification2Line
                    size={20}
                />
                <div
                    className='w-2 h-2 bg-red-600 rounded-full absolute top-3 right-3'
                ></div>
            </button>
        </div>
    )
}

export default Notification