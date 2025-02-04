import { RiFileChartLine } from '@remixicon/react'
import Link from 'next/link'
import React from 'react'

const SheetReportCol = () => {
    return (
        <>
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
                    <h2>Technical Report</h2>
                    <p
                        className="text-sm font-normal opacity-70 flex items-center gap-1"
                    >Audit Report Export as Sheet</p>
                </div>
            </div>

            <p className="opacity-80">Generate an on-site technical audit.</p>

            <div
                className="flex gap-2"
            >
                <Link
                    href={'/dashboard/quick-tools/sheet-report'}
                    className="flex gap-2 items-center text-xs font-medium py-2 px-4 rounded-md bg-themeprimary text-foregroundwhite disabled:opacity-50"
                >
                    Create Report
                </Link>
            </div>
        </>
    )
}

export default SheetReportCol