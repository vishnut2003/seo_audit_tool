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
        <motion.div
            initial={{ x: '150%' }}
            animate={{ x: 0 }}
            transition={{
                ease: [0.01, 0.01, 0.01, 0.01],
            }}
            className='fixed top-0 right-0 z-50 bg-white h-full w-[90%] md:w-full md:max-w-[390px] shadow-xl shadow-gray-200 py-5 px-7 flex flex-col gap-5'
        >
            {/* Header section */}
            <div
                className='w-full flex justify-between items-center gap-4 py-4 border-b border-gray-200'
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
    )
}

export default NotificationSidebar