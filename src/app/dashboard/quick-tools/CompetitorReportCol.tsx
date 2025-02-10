import { RiLineChartLine } from '@remixicon/react'
import Link from 'next/link'
import React from 'react'

const CompetitorReportCol = () => {
    return (
        <>
            <div
                className="text-xl font-semibold flex gap-4 items-center"
            >
                <RiLineChartLine
                    size={38}
                    className="text-themeprimary min-w-[40px]"
                />
                <div
                    className="flex flex-col gap-0 overflow-hidden"
                >
                    <h2 className='truncate'>Competitor Report</h2>
                    <p
                        className="text-sm font-normal opacity-70 truncate"
                    >Competitor Report Export as Sheet</p>
                </div>
            </div>

            <p className="opacity-80">Compare performance with competitors</p>

            <div
                className="flex gap-2"
            >
                <Link
                    href={'/dashboard/quick-tools/competitor-analysis'}
                    className="flex gap-2 items-center text-xs font-medium py-2 px-4 rounded-md bg-themeprimary text-foregroundwhite disabled:opacity-50"
                >
                    Create Report
                </Link>
            </div>
        </>
    )
}

export default CompetitorReportCol