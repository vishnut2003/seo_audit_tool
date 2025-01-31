'use client';

import { RiAddLargeLine, RiCheckLine, RiFolder5Line } from '@remixicon/react'
import Link from 'next/link';
import { useEffect, useState } from 'react'
import { motion } from "framer-motion";
import { ProjectModelInterface } from '@/models/ProjectsModel';
import { getSessionProject } from '@/utils/client/projects';
import { Button } from '@/Components/ui/button';

const ProjectDropdown = () => {

    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const [currentProject, setCurrentProject] = useState<ProjectModelInterface | null>(null);

    useEffect(() => {
        (async () => {
            const project = await getSessionProject();
            setCurrentProject(project);
        })();
    }, [])

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
                    <p className='mt-1'>Project</p>
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
                    className='absolute flex flex-col gap-3 top-[80px] md:top-16 left-2 w-[95%] md:w-[350px] min-w-0 bg-white shadow-xl shadow-gray-200 p-4 rounded-md before:w-4 before:h-4 before:bg-white before:hidden md:before:block before:absolute before:-top-2 before:rotate-45'
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
                        >Active Project</label>
                    </div>

                    {/* list all projects */
                        currentProject ?
                            <ul>
                                <li>
                                    <div
                                        className='flex justify-between items-center py-4 px-3 border-t border-gray-100 hover:bg-gray-50'
                                    >
                                        <div
                                            className='flex flex-col items-start'
                                        >
                                            <p
                                                className='text-sm font-medium'
                                            >{currentProject.domain}</p>

                                            <button
                                                className='text-xs opacity-70'
                                            >
                                                Edit Project
                                            </button>
                                        </div>
                                        <button>
                                            <RiCheckLine
                                                size={27}
                                                className='p-[6px] bg-themeprimary text-white rounded-full'
                                            />
                                        </button>
                                    </div>
                                </li>
                            </ul> :
                            <div
                                className="text-sm p-3 font-medium opacity-50"
                            >
                                <p>No Project Selected</p>
                            </div>
                    }
                    <Link href={'/dashboard/projects'}>
                        <Button
                            className='bg-themesecondary hover:bg-themesecondary hover:opacity-80'
                        >View All</Button>
                    </Link>

                </motion.div>
            }

        </div>
    )
}

export default ProjectDropdown