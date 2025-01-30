'use client';

import { RiAddLargeLine, RiCheckLine, RiFolder5Line } from '@remixicon/react'
import Link from 'next/link';
import { useState } from 'react'
import { motion } from "framer-motion";

const ProjectDropdown = () => {

    const [showDropdown, setShowDropdown] = useState<boolean>(false);

    return (
        <div
            className='md:relative z-40'
        >
            <div
                className='flex flex-nowrap gap-3'
            >
                <button
                    className='text-foreground text-sm font-medium flex justify-center items-center gap-3 bg-white rounded-md py-3 px-5 shadow-xl shadow-gray-200 hover:bg-gray-50'
                    onClick={() => setShowDropdown(prev => !prev)}
                >
                    <RiFolder5Line
                        size={20}
                    />
                    <p className='mt-1'>Select Project</p>
                </button>

                {/* Create new Project button */}
                <Link
                    href={'/dashboard/projects/add-new'}
                    className='text-foreground text-sm font-medium hidden md:flex justify-center items-center gap-3 bg-white rounded-md py-3 px-5 shadow-xl shadow-gray-200 hover:bg-gray-50'
                >
                    <RiAddLargeLine
                        size={20}
                    />
                    <p className='mt-1'>New Project</p>
                </Link>
            </div>

            {
                // Project selecting dropdown

                showDropdown &&
                <motion.div
                    className='absolute top-[80px] md:top-16 left-2 w-[95%] md:w-[350px] min-w-0 bg-white shadow-xl shadow-gray-200 p-4 rounded-md before:w-4 before:h-4 before:bg-white before:hidden md:before:block before:absolute before:-top-2 before:rotate-45'
                    initial={{
                        scale: 0.7,
                    }}
                    animate={{
                        scale: 1,
                    }}
                >
                    <div
                        className='flex flex-col gap-3 mb-2'
                    >
                        <label 
                            htmlFor="project-search"
                            className='text-sm font-medium underline underline-offset-8'
                        >Select Project</label>
                        <input
                            type="text"
                            id='project-search'
                            placeholder='Search Projects'
                            className='w-full py-2 px-3 rounded-md border text-sm border-gray-100'
                        />
                    </div>

                    {/* list all projects */}
                    <ul>
                        {
                            [1, 2].map((project, index) => (
                                <li key={index}>
                                    <div
                                        className='flex justify-between items-center py-4 px-3 border-t border-gray-100 hover:bg-gray-50'
                                    >
                                        <div
                                            className='flex flex-col items-start'
                                        >
                                            <p
                                                className='text-sm font-medium'
                                            >webspidersoutions.com</p>

                                            <button
                                                className='text-xs opacity-70'
                                            >
                                                Select Project
                                            </button>
                                        </div>
                                        <button>
                                            <RiCheckLine
                                                size={27}
                                                className='p-[6px] bg-gray-100 text-gray-300 rounded-full'
                                            />
                                        </button>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </motion.div>
            }

        </div>
    )
}

export default ProjectDropdown