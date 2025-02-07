import { createReportMDocInterface } from "@/models/ReportRecordModel";
import { getCurrentProjectLatestReport } from "@/utils/client/auditReport";
import { getSessionProject } from "@/utils/client/projects";
import { RiArrowRightSLine, RiDownloadLine, RiFileChartLine, RiFileExcel2Line, RiFullscreenLine, RiLineChartLine } from "@remixicon/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function PDFReportColumn() {

    const [report, setReport] = useState<createReportMDocInterface | null>(null);
    const [noReports, setNoReports] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        (async () => {
            const project = await getSessionProject();
            if (!project) {
                return;
            }

            const report = await getCurrentProjectLatestReport(project.projectId);
            if (!report) {
                setNoReports(true)
            } else {
                setReport(report);
            }
        })();
    }, [])

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
                    <h2 className="truncate">OnSite PDF Report</h2>
                    <p
                        className="text-sm font-normal opacity-70 truncate"
                    >OnSite Analysis export as PDF</p>
                </div>
            </div>

            <div className="flex flex-col gap-2">

                <p className="opacity-80">View detailed report history</p>

                <Link
                    href={'/dashboard/reports'}
                    className="flex gap-2 items-center font-medium"
                >
                    More detail
                    <RiArrowRightSLine size={15} />
                </Link>
            </div>

            <div
                className="flex gap-2"
            >
                {
                    noReports ?
                        <Link
                            href={'/dashboard/reports'}
                            className="flex gap-2 items-center text-xs font-medium py-2 px-4 rounded-md bg-themeprimary text-foregroundwhite"
                        >
                            Create New Report
                        </Link> :
                        <>
                            <button
                                className="flex gap-2 items-center text-xs font-medium py-2 px-4 rounded-md bg-themeprimary text-foregroundwhite disabled:opacity-50"
                                disabled={!report ? true : false}
                                onClick={() => {
                                    if (report) {
                                        router.push(`dashboard/reports/${report.reportRecord.data?.id}`)
                                    } else {
                                        return;
                                    }
                                }}
                            >
                                <RiFullscreenLine
                                    size={17}
                                />
                                {report ? 'Preview' : 'Loading...'}
                            </button>

                            <button
                                className="flex gap-2 items-center text-xs font-medium py-2 px-4 rounded-md bg-themeprimary text-foregroundwhite"
                            >
                                <RiDownloadLine
                                    size={17}
                                />
                                Download
                            </button>
                        </>
                }
            </div>
        </>
    )
}

export function SheetReportColumn() {
    return (
        <>
            <div
                className="text-xl font-semibold flex gap-4 items-center"
            >
                <RiFileExcel2Line
                    size={38}
                    className="text-themeprimary min-w-[40px]"
                />
                <div
                    className="flex flex-col gap-0 overflow-hidden"
                >
                    <h2 className="truncate">OnSite Sheet Report</h2>
                    <p
                        className="text-sm font-normal opacity-70 truncate"
                    >OnSite Analysis export as SpreadSheet</p>
                </div>
            </div>

            <div className="flex flex-col gap-2">

                <p className="opacity-80">View detailed report history</p>

                <Link
                    href={'/dashboard/sheet-report'}
                    className="flex gap-2 items-center font-medium"
                >
                    More detail
                    <RiArrowRightSLine size={15} />
                </Link>
            </div>

            <div
                className="flex gap-2"
            >
                <>
                    <button
                        className="flex gap-2 items-center text-xs font-medium py-2 px-4 rounded-md bg-themeprimary text-foregroundwhite disabled:opacity-50"
                        disabled={true}
                    >
                        <RiFullscreenLine
                            size={17}
                        />
                        Loading
                    </button>

                    <button
                        className="flex gap-2 items-center text-xs font-medium py-2 px-4 rounded-md bg-themeprimary text-foregroundwhite"
                    >
                        <RiDownloadLine
                            size={17}
                        />
                        Download
                    </button>
                </>
            </div>
        </>
    )
}

export function CompetitorAnalysisColumn() {
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
                    <h2 className="truncate">Competitor Analysis Report</h2>
                    <p
                        className="text-sm font-normal opacity-70 truncate"
                    >Compare performance with competitors</p>
                </div>
            </div>

            <div className="flex flex-col gap-2">

                <p className="opacity-80">View detailed report history</p>

                <Link
                    href={'/dashboard/competitor-analysis'}
                    className="flex gap-2 items-center font-medium"
                >
                    More detail
                    <RiArrowRightSLine size={15} />
                </Link>
            </div>

            <div
                className="flex gap-2"
            >
                <>
                    <button
                        className="flex gap-2 items-center text-xs font-medium py-2 px-4 rounded-md bg-themeprimary text-foregroundwhite disabled:opacity-50"
                        disabled={true}
                    >
                        <RiFullscreenLine
                            size={17}
                        />
                        Loading
                    </button>

                    <button
                        className="flex gap-2 items-center text-xs font-medium py-2 px-4 rounded-md bg-themeprimary text-foregroundwhite"
                    >
                        <RiDownloadLine
                            size={17}
                        />
                        Download
                    </button>
                </>
            </div>
        </>
    )
}