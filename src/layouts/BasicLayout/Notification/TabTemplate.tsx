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
                className='flex justify-between items-center gap-3 w-full py-3 px-5 bg-white shadow-md shadow-gray-200 rounded-md'
                onClick={() => setOpen(prev => !prev)}
            >
                <div
                    className='flex justify-start items-center gap-3'
                >
                    <currentTab.icon
                        size={20}
                        className='text-themesecondary'
                    />
                    <p
                        className='font-medium'
                    >{currentTab.title}</p>
                </div>
                <RiArrowDownSLine
                    size={20}
                    className={`${open && "rotate-180"} transition-all`}
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