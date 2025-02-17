import React, { useState } from 'react'
import { NotificationTabInterface } from './SidebarItems'
import { RiArrowDownSLine } from '@remixicon/react'

const TabTemplate = ({ currentTab }: {
    currentTab: NotificationTabInterface,
}) => {

    const [open, setOpen] = useState<boolean>(true)

    return (
        <div
            className='w-full flex flex-col gap-2'
        >
            <button
                className='flex justify-between items-center gap-3 w-full py-3 px-5 shadow-xl shadow-gray-200 rounded-md bg-themeprimary text-white'
                onClick={() => setOpen(prev => !prev)}
            >
                <p>{currentTab.title}</p>
                <RiArrowDownSLine
                    size={20}
                />
            </button>

            {
                open &&
                <div
                    className='p-3'
                >
                    <currentTab.content/>
                </div>
            }

        </div>
    )
}

export default TabTemplate