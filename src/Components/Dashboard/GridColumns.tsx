import { CompetitorAnalysisRecordModelInterface } from "@/models/CompetitorAnalysisRecordModel";
import { ProjectModelInterface } from "@/models/ProjectsModel";
import { createReportMDocInterface } from "@/models/ReportRecordModel";
import { sheetReportRecordInterface } from "@/models/SheetReportRecordModel";
import { getCurrentProjectLatestReport } from "@/utils/client/auditReport";
import { getLatestOneReport } from "@/utils/client/sheetReport";
import { RiAddLargeLine, RiArrowRightSLine, RiFileChartLine, RiFileExcel2Line, RiFullscreenLine, RiLineChartLine } from "@remixicon/react";
import axios from "axios";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function PDFReportColumn({ project }: {
    project: ProjectModelInterface,
}) {

    const [report, setReport] = useState<createReportMDocInterface | null>(null);
    const [inProgress, setInProgress] = useState<boolean>(true);

    useEffect(() => {
        (async () => {
            setInProgress(true);
            const report = await getCurrentProjectLatestReport(project.projectId);
            setInProgress(false);
            setReport(report);
        })();
    }, [project.projectId])

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
                className="flex gap-2 items-center"
            >
                {
                    inProgress ?
                        <p className="text-sm">Loading...</p> :
                        !report?.reportRecord.data?.id ?
                            <Link
                                href={'/dashboard/reports'}
                                className="flex gap-2 items-center text-xs font-medium py-2 px-4 rounded-md bg-themeprimary text-foregroundwhite"
                            >
                                Create New Report
                            </Link> :
                            <>
                                <a
                                    className="flex gap-2 items-center text-xs font-medium py-2 px-4 rounded-md bg-themeprimary text-foregroundwhite disabled:opacity-50"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                    href={`dashboard/reports/${report.reportRecord.data?.id}`}
                                >
                                    <RiFullscreenLine
                                        size={17}
                                    />
                                    Open Report
                                </a>
                            </>
                }
            </div>
        </>
    )
}

export function SheetReportColumn({ project }: {
    project: ProjectModelInterface,
}) {

    const [report, setReport] = useState<sheetReportRecordInterface | null>(null);
    const [inProgress, setInProgress] = useState<boolean>(true);

    useEffect(() => {
        (async () => {
            setInProgress(true);
            const session = await getSession();
            if (!session || !session?.user?.email) {
                return;
            }
            const report = await getLatestOneReport({
                email: session.user.email,
                projectId: project.projectId,
            })
            setInProgress(false);
            setReport(report);
        })();
    }, [project.projectId])

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
                {
                    inProgress ?
                        <p className="text-sm">Loading...</p> :
                        !report?.sheetLink ?
                            <Link
                                href={'/dashboard/sheet-reports'}
                                className="flex gap-2 items-center text-xs font-medium py-2 px-4 rounded-md bg-themeprimary text-foregroundwhite"
                            >
                                <RiAddLargeLine
                                    size={17}
                                />
                                Create New Report
                            </Link> :
                            <>
                                <a
                                    className="flex gap-2 items-center text-xs font-medium py-2 px-4 rounded-md bg-themeprimary text-foregroundwhite disabled:opacity-50"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                    href={report.sheetLink}
                                >
                                    <RiFileExcel2Line
                                        size={17}
                                    />
                                    Open Report
                                </a>
                            </>
                }
            </div>
        </>
    )
}

export function CompetitorAnalysisColumn({ project }: {
    project: ProjectModelInterface,
}) {

    const [report, setReport] = useState<CompetitorAnalysisRecordModelInterface | null>(null);
    const [inProgress, setInProgress] = useState<boolean>(true);

    useEffect(() => {
        (async () => {
            setInProgress(true);
            const session = await getSession();
            if (!session || !session?.user?.email) {
                return;
            }

            const { data }: {
                data: CompetitorAnalysisRecordModelInterface | null,
            } = await axios.post('/api/competitor-analysis/get-latest-one-report', {
                email: session.user.email,
                projectId: project.projectId
            })

            setInProgress(false);
            setReport(data);
        })();
    }, [project.projectId])

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
                {
                    inProgress ?
                        <p className="text-sm">Loading...</p> :
                        !report?.sheetId ?
                            <Link
                                href={'/dashboard/compatitor-analysis'}
                                className="flex gap-2 items-center text-xs font-medium py-2 px-4 rounded-md bg-themeprimary text-foregroundwhite"
                            >
                                <RiAddLargeLine
                                    size={17}
                                />
                                Create New Report
                            </Link> :
                            <>
                                <a
                                    className="flex gap-2 items-center text-xs font-medium py-2 px-4 rounded-md bg-themeprimary text-foregroundwhite disabled:opacity-50"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                    href={`https://docs.google.com/spreadsheets/d/${report.sheetId}`}
                                >
                                    <RiFileExcel2Line
                                        size={17}
                                    />
                                    Open Report
                                </a>
                            </>
                }
            </div>
        </>
    )
}