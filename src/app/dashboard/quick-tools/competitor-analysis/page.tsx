'use client';

import DashboardStandardInput from '@/Components/ui/DashboardStandardInput'
import BasicLayout from '@/layouts/BasicLayout/BasicLayout'
import { RiAddLargeLine, RiArrowLeftSLine } from '@remixicon/react'
import Link from 'next/link'
import React, { FormEvent, useState } from 'react'
import { motion } from "framer-motion";
import FormSubmitLoader from '@/Components/CompetitorAnalysisPage/FormSubmitLoader'
import { CompetiotrAnalysisFormSubmitInterface } from '@/Interfaces/CompetitorAnalysisInterface/FormSubmitInterface';
import { createCompetitorAnalysisReport, generateReportId } from '@/utils/client/CompetitorAnalysisReport';
import { getSession } from 'next-auth/react';

const QuickToolsCompetitorAnalysis = () => {

    const [error, setError] = useState<string | null>(null);
    const [inProgress, setInProgress] = useState<boolean>(false);
    const [showLoader, setShowLoader] = useState<boolean>(false);

    const [reportId, setReportId] = useState<string | null>(null);
    const [domain, setDomain] = useState<string>('');
    const [competitors, setCompetitors] = useState<string[]>(['']);

    async function submitForm (e: FormEvent) {
        e.preventDefault();
        
        setInProgress(true);
        setError(null);
        const domainRegex = /^[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}$/;
        if (!domain || !domainRegex.test(domain)) {
            setError("Domain is not valid");
            return;
        }

        // check id competitor domains is valid
        for (const [index, competitor] of competitors.entries()) {
            if (!competitors || !domainRegex.test(competitor)) {
                setError(`Please enter a valid domain for Competitor ${index + 1}`);
                return;
            }
        }

        try {

            const session = await getSession();
            if (!session?.user?.email) {
                setError("Please login.");
                return;
            }

            const reportId = await generateReportId();
            setReportId(reportId);
            setShowLoader(true);

            const formData: CompetiotrAnalysisFormSubmitInterface = {
                email: session.user.email,
                reportId,
                website: domain,
                competitor: competitors,
            }

            await createCompetitorAnalysisReport({formData});
            setInProgress(false);
            
        } catch (err) {
            console.log(err);
            setInProgress(false);
            setReportId(null);
            setError("Something went wrong!");
        }

    }

    return (
        <BasicLayout
            pageTitle='Competitor Analysis'
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
                >Competitors Analysis Report</h2>
                <p
                    className='text-sm mb-3'
                >The SpreadSheet you generate will not be saved, but the generated link will remain accessible in the future.</p>
                <form
                    className='space-y-4'
                    onSubmit={submitForm}
                >
                    <div
                        className='bg-white rounded-md shadow-xl shadow-gray-200 overflow-hidden'
                    >
                        <DashboardStandardInput
                            label='Domain Name'
                            subLabel='Enter the website domain to generate the Competitor report'
                            name='domain'
                            inputValue={domain}
                            inputPlaceholder='example.com'
                            inputOnChange={(e) => setDomain(e.target.value)}
                            domainInput
                        />
                    </div>

                    <div
                        className='bg-white rounded-md shadow-xl shadow-gray-200 overflow-hidden'
                    >
                        {
                            competitors.map((competitor, index) => (
                                <DashboardStandardInput
                                    key={index}
                                    label={`Competitor ${index + 1}`}
                                    subLabel='Enter your competitor domain for generate the Competitor Analysis'
                                    name={`competitor${index + 1}`}
                                    inputValue={competitor}
                                    inputPlaceholder='example.com'
                                    domainInput
                                    inputOnChange={(e) => {
                                        setCompetitors(prev => {
                                            prev[index] = e.target.value;
                                            return [...prev];
                                        })
                                    }}
                                />
                            ))
                        }

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
                        className='flex justify-end gap-4'
                    >
                        {/* Add more competitors field */}
                        <button
                            className="py-4 px-7 bg-themesecondary text-foregroundwhite rounded-md shadow-xl shadow-gray-200 flex gap-2 items-center font-medium disabled:opacity-60"
                            onClick={() => setCompetitors(prev => [...prev, ''])}
                            type='button'
                        >Add Competitors</button>

                        {/* Remove last competitors field */}
                        <button
                            className="py-4 px-7 bg-red-500 text-foregroundwhite rounded-md shadow-xl shadow-gray-200 flex gap-2 items-center font-medium disabled:opacity-60"
                            onClick={() => {
                                setCompetitors(prev => {

                                    if (prev.length <= 1) {
                                        return prev;
                                    }

                                    const updatedCompetitors = [...prev];
                                    updatedCompetitors.pop();
                                    return updatedCompetitors;
                                })
                            }}
                            type='button'
                        >Remove</button>
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
                    </div>
                </form>
                {
                    reportId && showLoader &&
                    <FormSubmitLoader
                        reportId={reportId}
                        siteList={[domain, ...competitors]}
                        inProgress={inProgress}
                        setShowLoader={() => {
                            setReportId(null);
                            setShowLoader(false);
                            setDomain("");
                            setCompetitors(['']);
                        }}
                    />
                }
            </div>
        </BasicLayout>
    )
}

export default QuickToolsCompetitorAnalysis