import { RiArrowDownSLine } from '@remixicon/react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import React, { useEffect, useState } from 'react'
import { CompetitorAnalysisRecordModelInterface } from '@/models/CompetitorAnalysisRecordModel';
import axios, { AxiosError } from 'axios';
import { getSession } from 'next-auth/react';
import FormSubmitLoader from '@/Components/CompetitorAnalysisPage/FormSubmitLoader';

const CompetitorReportTab = () => {

    const [error, setError] = useState<string | null>(null);
    const [inProgress, setInProgress] = useState<boolean>(true)
    const [queryStatus, setQueryStatus] = useState<"processing" | "success" | "error">("processing");
    const [limit, setLimit] = useState<number>(5);

    const [reports, setReports] = useState<CompetitorAnalysisRecordModelInterface[]>([])
    const [progressPopup, setProgressPopup] = useState<{
        siteList: string[],
        reportId: string,
        inProgress: boolean,
    } | null>(null)

    useEffect(() => {
        getSession().then(async (session) => {
            try {
                setInProgress(true);
                if (!session || !session.user?.email) {
                    setError("Please login.");
                    return;
                }

                const data = {
                    email: session.user.email,
                    status: queryStatus,
                    limit,
                }

                const response = await axios.post('/api/competitor-analysis/get-report', data);
                const newReports = response.data.reports as CompetitorAnalysisRecordModelInterface[];
                setReports(newReports);
                setInProgress(false);

            } catch (err) {
                if (err instanceof AxiosError) {
                    if (err.response?.data) {
                        setError(err.response.data);
                    } else {
                        setError("Something went wrong!")
                    }
                } else {
                    setError("Something went wrong!");
                }
            }
        })
    }, [queryStatus, limit])

    return (
        <div
            className='w-full flex flex-col'
        >
            <div
                className='mb-3 pb-3 border-b border-gray-100 flex justify-between items-center'
            >
                <p
                    className='text-sm font-semibold'
                >Filter by Status</p>
                <Select
                    onValueChange={(value) => setQueryStatus(value as any)}
                >
                    <SelectTrigger className="w-[150px] h-10 py-2 px-3">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="success">Success</SelectItem>
                        <SelectItem value="error">Failed</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {
                error ?
                    <div
                        className='bg-red-100 text-red-500 py-4 px-5 rounded-md'
                    >
                        {error}
                    </div> :
                    inProgress ?
                        <p>Loading...</p> :
                        reports.length === 0 ?
                            <div
                                className='flex justify-center items-center p-5 text-sm opacity-80'
                            >
                                <p>No Data</p>
                            </div>
                            : reports.map((report, index) => (
                                <div
                                    key={index}
                                    className='pb-3 mb-3 border-b border-gray-100 flex flex-nowrap justify-between items-center'
                                >
                                    <div
                                        className='flex flex-col gap-2 w-full'
                                    >
                                        <p
                                            className='font-medium whitespace-nowrap truncate'
                                        >{URL.canParse(report.website) ? URL.parse(report.website)?.hostname : report.website}</p>
                                        <p
                                            className='text-sm'
                                        >status:
                                            <span
                                                className={`
                                                text-xs ml-2 py-1 px-2 rounded-md capitalize 
                                                ${report.status === "error" && "bg-red-100 text-red-600"}
                                                ${report.status === "success" && "bg-green-100 text-green-600"}
                                                ${report.status === "processing" && "bg-orange-100 text-orange-600"}
                                            `}
                                            >{report.status}</span>
                                        </p>
                                    </div>
                                    <div
                                        className='flex flex-col items-end gap-2 w-full'
                                    >
                                        <p
                                            className='text-sm opacity-60'
                                        >{report.createdAt.split('T')[0].split('-').join('/')}</p>
                                        <button
                                            className='text-sm text-themesecondary underline font-semibold'
                                            onClick={() => {
                                                const domains: string[] = [];
                                                for (const url of [report.website, ...report.competitors]) {
                                                    if (URL.canParse(url)) {
                                                        const currentDomain = URL.parse(url)?.hostname || '';
                                                        domains.push(currentDomain);
                                                    }
                                                }
                                                setProgressPopup({
                                                    inProgress: false,
                                                    reportId: report.recordId,
                                                    siteList: domains,
                                                })
                                            }}
                                        >
                                            View
                                        </button>
                                    </div>
                                </div>
                            ))
            }
            {
                !inProgress &&
                <button
                    disabled={inProgress}
                    className='flex justify-center items-center gap-2 text-sm'
                    onClick={() => setLimit(prev => prev += 5)}
                >
                    <RiArrowDownSLine
                        size={20}
                    />
                    <p>Load more</p>
                </button>
            }

            {
                progressPopup &&
                <FormSubmitLoader
                    inProgress={progressPopup.inProgress}
                    reportId={progressPopup.reportId}
                    siteList={progressPopup.siteList}
                    setShowLoader={() => {
                        setProgressPopup(null);
                    }}
                />
            }
        </div>
    )
}

export default CompetitorReportTab