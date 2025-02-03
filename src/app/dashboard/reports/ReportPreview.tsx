'use client';

import { createReportMDocInterface } from '@/models/ReportRecordModel';
import { getCurrentProjectLatestReport } from '@/utils/client/auditReport';
import { getSessionProject } from '@/utils/client/projects';
import { RiDownloadLine, RiFilePdf2Line, RiFullscreenLine } from '@remixicon/react'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const ReportPreview = () => {

    const router = useRouter();

    const [inProgress, setInProgress] = useState<boolean>(false);
    const [latestRport, setLatestReport] = useState<createReportMDocInterface | null>(null);

    useEffect(() => {
        setInProgress(true)
        getSessionProject()
            .then(async (project) => {
                if (!project) {
                    router.push('/dashboard/projects');
                    return;
                }

                try {
                    const latestReport = await getCurrentProjectLatestReport(project.projectId);
                    setLatestReport(latestReport);
                    setInProgress(false);
                } catch (err) {
                    console.log(err);
                }
            })
    }, [router]);

    return (
        <div
            className='w-full h-full flex flex-col justify-center items-center'
        >
            <RiFilePdf2Line
                size={50}
                className="text-themesecondary mb-3"
            />

            <h2
                className="text-[25px] md:text-[35px] font-extrabold capitalize text-center"
            >OnSite Analysis PDF Report</h2>

            <p
                className="text-[14px] md:text-base text-foreground opacity-50"
            >{latestRport ? "Use below links to download or preview PDF Report" : inProgress ? "Loading..." : "No report found for this project. please create new"}</p>

            {
                latestRport && !inProgress &&
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
                        href={`/dashboard/reports/${latestRport.reportRecord.data?.id}`}
                        className='text-foreground mt-3 text-sm font-medium flex justify-center items-center gap-3 bg-white rounded-md py-3 px-5 shadow-xl shadow-gray-200 hover:bg-gray-50'
                    >
                        <RiFullscreenLine
                            size={20}
                        />
                        <p className='mt-1'>PDF Viewer</p>
                    </a>
                </div>
            }

        </div>
    )
}

export default ReportPreview