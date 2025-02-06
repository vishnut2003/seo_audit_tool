'use client';

import BasicLayout from '@/layouts/BasicLayout/BasicLayout';
import { RiAddLargeLine, RiErrorWarningLine, RiHistoryLine, RiSearchLine } from '@remixicon/react';
import { useEffect, useState } from 'react';
import ReportLoading from '../reports/ReportLoading';
import { ProjectModelInterface } from '@/models/ProjectsModel';
import EmptyProjectTemplate from '../reports/EmptyProjectTemplate';
import ReportPreview from './ReportPreview';
import { getSessionProject } from '@/utils/client/projects';
import { getSession } from 'next-auth/react';
import { createCompetitorAnalysisReport, generateReportId } from '@/utils/client/CompetitorAnalysisReport';
import { CompetiotrAnalysisFormSubmitInterface } from '@/Interfaces/CompetitorAnalysisInterface/FormSubmitInterface';
import FormSubmitLoader from '@/Components/CompetitorAnalysisPage/FormSubmitLoader';

const CompetitorAnalysis = () => {

    const [showReportHistory, setShowReportHistory] = useState<boolean>(false);
    const [inProgress, setInProgress] = useState<boolean>(true);
    const [currentProject, setCurrentProject] = useState<ProjectModelInterface | null>(null);
    const [reportId, setReportId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setInProgress(true);
        getSessionProject().then((project) => {
            setCurrentProject(project);
            setInProgress(false);
        })
    }, []);

    async function createNewCompetitorReport () {
        try {
            const session = await getSession();

            if (!currentProject || !session?.user?.email) {
                return;
            }

            const reportId = await generateReportId();
            if (!reportId) {
                return;
            }

            setReportId(reportId);
            setInProgress(true);

            const formData: CompetiotrAnalysisFormSubmitInterface = {
                email: session.user.email,
                projectId: currentProject.projectId,
                reportId,
                website: currentProject.domain,
                competitor: currentProject.competitors,
            }
            console.log(reportId)

            await createCompetitorAnalysisReport({formData});

        } catch (err) {
            if (typeof err === "string" && err.length > 2) {
                setError(err);
            } else {
                setError("Something went wrong!");
            }

            setInProgress(false);
            setReportId(null);
        }
    }

    return (
        <BasicLayout>

            <div className="w-full h-full flex flex-col gap-5">

                <div
                    className="flex items-center justify-between"
                >

                    {/* left col */}
                    <div
                        className="flex justify-center items-center gap-3"
                    >
                        <button
                            className='text-foreground text-sm font-medium flex justify-center items-center gap-3 bg-white rounded-md py-3 px-5 shadow-xl shadow-gray-200 hover:bg-gray-50 disabled:opacity-50'
                            onClick={createNewCompetitorReport}
                            disabled={inProgress}
                        >
                            <RiAddLargeLine
                                size={20}
                            />
                            <p className='mt-1 hidden md:flex'>{inProgress && reportId ? "Creating..." : "Create Competitor Analysis"}</p>
                        </button>

                        {/* search by id */
                            showReportHistory &&
                            <div
                                className="flex gap-2 bg-white py-3 px-4 rounded-md shadow-xl shadow-gray-200"
                            >
                                <RiSearchLine
                                    size={20}
                                    className="text-gray-400"
                                />
                                <input
                                    type="text"
                                    placeholder="Search by Report ID"
                                    className="outline-none font-md bg-transparent"
                                />
                            </div>
                        }
                    </div>

                    {/* Right col */}
                    <div>
                        <button
                            className="flex items-center gap-2 font-medium text-sm bg-white hover:bg-gray-50 py-3 px-5 rounded-md shadow-xl shadow-gray-200"
                            onClick={() => setShowReportHistory(prev => !prev)}
                        >
                            <RiHistoryLine
                                size={20}
                            />
                            Report History
                        </button>
                    </div>
                </div>

                {
                    showReportHistory ?
                        <div>
                            show History
                        </div> :
                        inProgress ?
                            <ReportLoading /> :
                            !currentProject ?
                                <EmptyProjectTemplate /> :
                                <ReportPreview
                                    project={currentProject}
                                />
                }

            </div>

            {
                reportId && inProgress &&
                <FormSubmitLoader
                    reportId={reportId}
                    siteList={currentProject?.competitors || []}
                    setShowLoader={(exit) => {
                        setInProgress(exit);
                        setReportId(null);
                    }}
                />
            }

            {
                error &&
                <div
                    className='bg-red-200 text-red-500 font-medium flex gap-2 items-center py-4 px-6 rounded-md'
                >
                    <RiErrorWarningLine
                        size={20}
                    />
                    {error}
                </div>
            }
        </BasicLayout>
    );
};

export default CompetitorAnalysis;