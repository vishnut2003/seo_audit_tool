import { RiFileChartLine } from '@remixicon/react'
import Link from 'next/link'
import React from 'react'

const PDFReportCol = () => {
    return (
        <>
            <div
                className="text-xl font-semibold flex gap-4 items-center"
            >
                <RiFileChartLine
                    size={38}
                    className="text-themeprimary min-w-[40px]"
                />
                <div
                    className="flex flex-col gap-0 overflow-hidden"
                >
                    <h2 className='truncate'>OnSite PDF Report</h2>
                    <p
                        className="text-sm font-normal opacity-70 truncate"
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
        </>
    )
}

export default PDFReportCol