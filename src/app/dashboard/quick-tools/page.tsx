'use client';

import BasicLayout from '@/layouts/BasicLayout/BasicLayout'
import { RiCloseLargeLine, RiFileChartLine } from '@remixicon/react'
import Link from 'next/link';
import React, { useState } from 'react'

function QuickTools() {
    const [showDisclaimer, setShowDisclaimer] = useState<boolean>(true);

    return (
        <BasicLayout
            pageTitle='Quick Tools'
        >
            <div
                className='flex flex-col gap-5'
            >
                {/* Disclaimer */
                    showDisclaimer &&
                    <div
                        className='py-4 px-5 bg-yellow-50 text-yellow-600 flex items-start md:items-center justify-between gap-3 rounded-md'
                    >
                        <p
                            className='text-base'
                        ><b>Disclaimer:</b> The data generated on this Quick Tools page will not be saved. If you want to retain your data, please create a project.</p>
                        <button
                            className='flex items-center gap-2'
                            onClick={() => setShowDisclaimer(false)}
                        >
                            <RiCloseLargeLine />
                        </button>
                    </div>
                }

                {/* Tools Items */}
                <div
                    className='grid grid-cols-4'
                >
                    <div
                        className='bg-white py-5 px-6 flex flex-col gap-5 shadow-xl shadow-gray-200 rounded-md'
                    >
                        <div
                            className="text-xl font-semibold flex gap-4 items-center"
                        >
                            <RiFileChartLine
                                size={38}
                                className="text-themeprimary"
                            />
                            <div
                                className="flex flex-col gap-0"
                            >
                                <h2>OnSite PDF Report</h2>
                                <p
                                    className="text-sm font-normal opacity-70 flex items-center gap-1"
                                >Audit Report Export as PDF</p>
                            </div>
                        </div>

                        <p className="opacity-80">Generate an on-site PDF report instantly.</p>

                        <div
                            className="flex gap-2"
                        >
                            <Link
                                href={'/dashboard/quick-tools/pdf-report'}
                                className="flex gap-2 items-center text-xs font-medium py-2 px-4 rounded-md bg-themeprimary text-foregroundwhite disabled:opacity-50"
                            >
                                Create Report
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        </BasicLayout>
    )
}

export default QuickTools