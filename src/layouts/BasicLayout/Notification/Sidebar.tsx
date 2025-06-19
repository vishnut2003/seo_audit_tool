'use client';

import React from 'react'
import { motion } from "framer-motion";
import { RiCloseLargeLine } from '@remixicon/react';
import notificationItems from './SidebarItems';
import TabTemplate from './TabTemplate';

const NotificationSidebar = ({ closeAction }: {
    closeAction: () => void,
}) => {
    return (
        <>
            {/* BG Overlay effect */}
            <div
                className='fixed top-0 left-0 w-full h-full bg-black/40 z-50'
            ></div>

            {/* Sidebar */}
            <motion.div
                initial={{ x: '150%' }}
                animate={{ x: 0 }}
                transition={{
                    ease: [0.01, 0.01, 0.01, 0.01],
                }}
                className='fixed top-0 right-0 z-50 bg-white h-full w-[90%] md:w-full md:max-w-[390px] shadow-xl shadow-black/45 py-5 px-7 flex flex-col gap-5 overflow-auto'
            >
                {/* Header section */}
                <div
                    className='w-full flex justify-between items-center gap-4 pb-4 border-b border-gray-100'
                >
                    <h2
                        className='text-lg font-semibold'
                    >Notifications</h2>
                    <button
                        onClick={closeAction}
                    >
                        <RiCloseLargeLine
                            size={20}
                            className='opacity-60'
                        />
                    </button>
                </div>
                <div
                    className='flex flex-col gap-5'
                >
                    {
                        notificationItems.map((tab, index) => (
                            <TabTemplate
                                currentTab={tab}
                                key={index}
                            />
                        ))
                    }
                </div>
            </motion.div>
        </>
    )
}

export default NotificationSidebar