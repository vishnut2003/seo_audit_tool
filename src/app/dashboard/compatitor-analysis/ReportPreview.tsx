import { CompetitorAnalysisRecordModelInterface } from '@/models/CompetitorAnalysisRecordModel';
import { ProjectModelInterface } from '@/models/ProjectsModel'
import { RiDownloadLine, RiFileExcel2Line, RiLineChartLine } from '@remixicon/react'
import axios from 'axios';
import { getSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'

const ReportPreview = ({ project }: {
    project: ProjectModelInterface,
}) => {

    const [inProgress, setInProgress] = useState<boolean>(true);
    const [report, setReport] = useState<CompetitorAnalysisRecordModelInterface | null>(null);

    useEffect(() => {
        setInProgress(true);
        getSession().then(async (session) => {
            if (!session || !session.user || !session.user.email) {
                return;
            }

            const { data }: {
                data: CompetitorAnalysisRecordModelInterface | null,
            } = await axios.post('/api/competitor-analysis/get-latest-one-report', { email: session.user.email, projectId: project.projectId })
            setReport(data);
            setInProgress(false);
        })
    }, [project.projectId]);

    return (
        <div
            className='w-full h-full flex flex-col justify-center items-center'
        >
            <RiLineChartLine
                size={50}
                className="text-themesecondary mb-3"
            />

            <h2
                className="text-[25px] md:text-[35px] font-extrabold capitalize text-center"
            >Competitor Analysis Report</h2>

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
                                className='text-foreground mt-3 text-sm font-medium flex justify-center items-center gap-3 bg-white rounded-md py-3 px-5 shadow-xl shadow-gray-200 hover:bg-gray-50'
                                href={`https://docs.google.com/spreadsheets/d/${report.sheetId}`}
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