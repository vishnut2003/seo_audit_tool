'use client';

import { RiNotification2Line } from '@remixicon/react'
import React, { useState } from 'react'
import NotificationSidebar from '../Notification/Sidebar';

const Notification = () => {

    const [showSidebar, setShowSidebar] = useState<boolean>(false);

    return (
        <div>
            <button
                className='bg-white shadow-xl shadow-gray-200 rounded-full p-3 relative'
                onClick={() => setShowSidebar(true)}
            >
                <RiNotification2Line
                    size={20}
                />
                <div
                    className='w-2 h-2 bg-red-600 rounded-full absolute top-3 right-3'
                ></div>
            </button>

            {
                showSidebar &&
                <NotificationSidebar
                    closeAction={() => setShowSidebar(false)}
                />
            }

        </div>
    )
}

export default Notification