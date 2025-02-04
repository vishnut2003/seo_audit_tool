'use client';

import BasicLayout from '@/layouts/BasicLayout/BasicLayout'
import { RiCloseLargeLine, RiFileChartLine } from '@remixicon/react'
import Link from 'next/link';
import React, { useState } from 'react'
import PDFReportCol from './PDFReportCol';
import SheetReportCol from './SheetReportCol';

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
                    className='grid grid-cols-4 gap-5'
                >
                    {
                        [PDFReportCol, SheetReportCol].map((ColItem, index) => (
                            <div
                                className='bg-white py-5 px-6 flex flex-col gap-5 shadow-xl shadow-gray-200 rounded-md'
                                key={index}
                            >
                                <ColItem />
                            </div>
                        ))
                    }

                </div>
            </div>

        </BasicLayout>
    )
}

export default QuickTools