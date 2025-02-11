'use client';

import BasicLayout from '@/layouts/BasicLayout/BasicLayout'
import { RiAddLargeLine, RiArrowLeftSLine, RiFileExcel2Line } from '@remixicon/react'
import React, { FormEvent, useState } from 'react';
import { motion } from "framer-motion";
import Link from 'next/link';
import DashboardStandardInput from '@/Components/ui/DashboardStandardInput';
import axios from 'axios';
import SheetCreationLoader from '@/Components/SheetReportPage/SheetReportForm/SheetCreationLoader';

const QuickToolsSheetReport = () => {

    const [domain, setDomain] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [inProgress, setInProgress] = useState<boolean>(false);
    const [reportId, setReportId] = useState<string | null>(null);

    // generated sheet report id
    const [sheetId, setSheetId] = useState<string | null>(null);

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setInProgress(true);
        setError(null);
        if (!domain) {
            setError('Domain field is required.');
            return;
        }

        const domainRegex = /^[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}$/;
        if (!domainRegex.test(domain)) {
            setError("The entered domain is not valid.");
            setInProgress(false);
            return;
        }

        try {
            // generate report id
            const { data }: {
                data: {
                    reportId: string,
                }
            } = await axios.get("/api/sheet-report/generate-report-id");

            setReportId(data.reportId);

            // create sheet report
            const response: {
                data: {
                    sheetId: string,
                }
            } = await axios.post("/api/sheet-report/create", {
                baseUrl: domain,
                reportId: data.reportId
            })

            setSheetId(response.data.sheetId);

            setInProgress(false);
            setReportId(null);
        } catch (err) {
            console.log(err);
            setError("Something went wrong!");
            setInProgress(false);
        }
    }

    return (
        <BasicLayout
            pageTitle='Technical Report'
        >
            <div
                className='w-full max-w-screen-md'
            >
                <Link
                    href={'/dashboard/quick-tools'}
                    className='flex items-center font-medium gap-2 py-3 px-5 rounded-md bg-white shadow-xl shadow-gray-200 w-max mb-5'
                >
                    <RiArrowLeftSLine
                        size={20}
                    />
                    Quick Tools
                </Link>
                <h2
                    className='text-xl mb-1 font-semibold'
                >OnSite Technical Report</h2>
                <p
                    className='text-sm mb-3'
                >The SpreadSheet you generate will not be saved, but the generated link will remain accessible in the future.</p>
                <form
                    className='space-y-4'
                    onSubmit={handleSubmit}
                >
                    <div
                        className='bg-white rounded-md shadow-xl shadow-gray-200 overflow-hidden'
                    >
                        <DashboardStandardInput
                            label='Domain Name'
                            subLabel='Enter the website domain to generate the on-site Sheet report'
                            name='domain'
                            inputValue={domain}
                            inputPlaceholder='example.com'
                            inputOnChange={(e) => setDomain(e.target.value)}
                            domainInput
                        />

                        {
                            // Form error
                            error &&
                            <motion.div
                                className="text-md font-medium bg-red-200 text-red-500 py-4 px-6"
                                initial={{
                                    translateY: 200
                                }}
                                animate={{
                                    translateY: 0
                                }}
                            >
                                <p>{error}</p>
                            </motion.div>
                        }
                    </div>

                    <div
                        className='flex gap-3'
                    >
                        <button
                            className="py-4 px-7 bg-themesecondary text-foregroundwhite rounded-md shadow-xl shadow-gray-200 flex gap-2 items-center font-medium disabled:opacity-60"
                            disabled={inProgress}
                        >
                            <RiAddLargeLine
                                size={20}
                            />
                            {inProgress ? "Creating..." : "Create Report"}
                        </button>
                        {
                            sheetId &&
                            <Link
                                href={`https://docs.google.com/spreadsheets/d/${sheetId}`}
                                className="py-4 px-7 bg-themeprimary text-foregroundwhite rounded-md shadow-xl shadow-gray-200 flex gap-2 items-center font-medium disabled:opacity-60 animate-in"
                                rel='noopener noreferrer'
                                target='_blank'
                            >
                                <RiFileExcel2Line
                                    size={20}
                                />
                                Open Sheeet
                            </Link>
                        }
                    </div>
                </form>
                {
                    reportId && inProgress &&
                    <SheetCreationLoader
                        reportId={reportId}
                    />
                }
            </div>
        </BasicLayout>
    )
}

export default QuickToolsSheetReport