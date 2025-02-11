'use client';

import DashboardStandardInput from '@/Components/ui/DashboardStandardInput'
import BasicLayout from '@/layouts/BasicLayout/BasicLayout'
import { RiAddLargeLine, RiArrowLeftSLine } from '@remixicon/react';
import React, { FormEvent, useState } from 'react';
import { motion } from "framer-motion";
import axios from 'axios';
import Link from 'next/link';

const QuickToolsPDFReport = () => {

    const [domain, setDomain] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [inProgress, setInProgress] = useState<boolean>(false);

    const [reportId, setReportId] = useState<number | null>(null);

    async function handleFormSubmit(e: FormEvent) {
        e.preventDefault();
        setError(null);
        setInProgress(true);
        if (!domain) {
            setError("Domain field is required.");
            setInProgress(false);
            return;
        }

        const domainRegex = /^[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}$/;
        if (!domainRegex.test(domain)) {
            setError("The entered domain is not valid.");
            setInProgress(false);
            return;
        }

        try {
            const { data }: {
                data: {
                    reportId: number
                }
            } = await axios.post('/api/audit-report/quick-tools', { domain });
            console.log(data)
            setReportId(data.reportId);
            setInProgress(false);
        } catch (err) {
            console.log(err);
            setError("Something went wrong!");
            setInProgress(false);
        }

    }

    return (
        <BasicLayout
            pageTitle='PDF Report'
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
                >OnSite Audit Report</h2>
                <p
                    className='text-sm mb-3'
                >The PDF you generate will not be saved, but the generated link will remain accessible in the future.</p>
                <form
                    className='space-y-4'
                    onSubmit={handleFormSubmit}
                >
                    <div
                        className='bg-white rounded-md shadow-xl shadow-gray-200 overflow-hidden'
                    >
                        <DashboardStandardInput
                            label='Domain Name'
                            subLabel='Enter the website domain to generate the on-site PDF report'
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
                            {inProgress ? "Creating Report" : "Generate Report Link"}
                        </button>

                        {
                            reportId &&
                            <a
                                className="py-4 px-7 bg-themesecondary text-foregroundwhite rounded-md shadow-xl shadow-gray-200 flex gap-2 items-center font-medium disabled:opacity-60"
                                href={`/dashboard/reports/${reportId}`}
                                target='_blank'
                                rel='noopener noreferrer'
                            >View Report</a>
                        }
                    </div>
                </form>
            </div>
        </BasicLayout>
    )
}

export default QuickToolsPDFReport