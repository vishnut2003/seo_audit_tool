import { RiArrowLeftSLine } from '@remixicon/react'
import Link from 'next/link'
import React from 'react'
import MainContentMonthlyReportExportPdf from './MainContent'

const MonthlyReportExportAsPDFPage = () => {
    return (
        <div className="w-dvw h-dvh bg-[#323639] flex flex-col justify-center">

            {/* Page actions */}
            <Link href={'/dashboard/monthly-report'}>
                <button className="flex items-center justify-center gap-2 text-white p-4">
                    <RiArrowLeftSLine size={20} />
                    <p>Go to Report</p>
                </button>
            </Link>

            <div className="h-full relative">
                <MainContentMonthlyReportExportPdf />
            </div>
        </div>
    )
}

export default MonthlyReportExportAsPDFPage