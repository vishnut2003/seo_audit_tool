'use client'

import { ProjectModelInterface } from '@/models/ProjectsModel'
import { sheetReportRecordInterface } from '@/models/SheetReportRecordModel'
import { getLatestOneReport } from '@/utils/client/sheetReport'
import { RiDownloadLine, RiFileExcel2Line } from '@remixicon/react'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const ReportPreview = ({ project }: {
    project: ProjectModelInterface,
}) => {

    const [report, setReport] = useState<sheetReportRecordInterface | null>(null);
    const [inProgress, setInProgress] = useState<boolean>(true);

    const router = useRouter();

    useEffect(() => {
        setInProgress(true);
        getSession().then(async (session) => {
            if (!session || !session.user || !session.user.email) {
                router.push('/');
                return;
            }

            try {
                const report = await getLatestOneReport({
                    projectId: project.projectId,
                    email: session.user.email,
                });
                console.log(report);
                setReport(report);
                setInProgress(false);
            } catch (err) {
                console.log(err);
            }
        });
    }, [project.projectId, router])

    return (
        <div
            className='w-full h-full flex flex-col justify-center items-center'
        >
            <RiFileExcel2Line
                size={50}
                className="text-themesecondary mb-3"
            />

            <h2
                className="text-[25px] md:text-[35px] font-extrabold capitalize text-center"
            >Technical Analysis Report</h2>

            {
                inProgress ?
                    <p
                        className="text-[14px] md:text-base text-foreground opacity-50"
                    >Loading...</p> :
                    report ?
                        <div
                            className='flex items-center gap-3'
                        >
                            <button
                                className='text-foreground mt-3 text-sm font-medium flex justify-center items-center gap-3 bg-white rounded-md py-3 px-5 shadow-xl shadow-gray-200 hover:bg-gray-50'
                            >
                                <RiDownloadLine
                                    size={20}
                                />
                                <p className='mt-1'>Download</p>
                            </button>

                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={report.sheetLink}
                                className='text-foreground mt-3 text-sm font-medium flex justify-center items-center gap-3 bg-white rounded-md py-3 px-5 shadow-xl shadow-gray-200 hover:bg-gray-50'
                            >
                                <RiFileExcel2Line
                                    size={20}
                                />
                                <p className='mt-1'>Open Google Sheet</p>
                            </a>
                        </div> :
                        <p
                            className="text-[14px] md:text-base text-foreground opacity-50"
                        >No report found for this project. please create new.</p>
            }

        </div>
    )
}

export default ReportPreview