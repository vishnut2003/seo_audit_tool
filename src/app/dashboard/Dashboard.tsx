import { CompetitorAnalysisColumn, PDFReportColumn, SheetReportColumn } from "@/Components/Dashboard/GridColumns"
import { ProjectModelInterface } from "@/models/ProjectsModel"
import { RiArrowLeftSLine, RiFolder5Line } from "@remixicon/react"
import Link from "next/link"

const Dashboard = ({ currentProject }: {
    currentProject: ProjectModelInterface | null
}) => {
    return (
        <div
            className="space-y-7 max-w-screen-xl"
        >
            <div
                className="flex items-center gap-1 md:gap-5"
            >
                <Link
                    href={'/dashboard/projects'}
                    className="text-sm text-nowrap py-2 md:py-3 px-4 md:px-5 flex justify-center items-center gap-2 bg-white font-medium rounded-md shadow-xl shadow-gray-200"
                >
                    <RiArrowLeftSLine
                        size={20}
                    />
                    View Projects
                </Link>

                <button
                    className="text-sm py-3 px-5 flex justify-center items-center gap-2 bg-gray-100 text-foreground font-medium"
                >
                    <RiFolder5Line
                        size={33}
                    />
                    <div
                        className="flex gap-0 flex-col text-sm items-start"
                    >
                        <span className="text-xs opacity-70">Active Project</span>
                        {currentProject?.domain}
                    </div>
                </button>
            </div>

            <h2
                className="text-xl font-bold underline underline-offset-8"
            >Report Options</h2>

            {/* Main options */}
            <div
                className="flex justify-center items-center gap-5"
            >

                {/* Left Col */}
                <div
                    className="w-full grid grid-cols-1 md:grid-cols-3 gap-4"
                >

                    {/* PDF Report Option */}
                    <div
                        className="bg-white py-5 px-6 flex flex-col gap-5 shadow-xl shadow-gray-200 rounded-md"
                    >
                        <PDFReportColumn/>
                    </div>
                    
                    {/* Sheet Report Option */}
                    <div
                        className="bg-white py-5 px-6 flex flex-col gap-5 shadow-xl shadow-gray-200 rounded-md"
                    >
                        <SheetReportColumn/>
                    </div>
                    
                    {/* Competitor Analysis Report Option */}
                    <div
                        className="bg-white py-5 px-6 flex flex-col gap-5 shadow-xl shadow-gray-200 rounded-md"
                    >
                        <CompetitorAnalysisColumn/>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Dashboard