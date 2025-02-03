'use client'

import AditResultError from "@/Components/ReportsPage/AditResultError/AditResultError";
import AuditResultProgress from "@/Components/ReportsPage/AuditResultProgress/AuditResultProgress";
import AuditResultTemplate from "@/Components/ReportsPage/AuditResultTemplate/AuditResultTemplate";
import { getReportResponseInterface } from "@/Interfaces/SeoOptimer/GetResponseInterface";
import { getOneReportById } from "@/utils/client/auditReport";
import { RiArrowLeftSLine } from "@remixicon/react"
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {

    const [inProgress, setInprogress] = useState<boolean>(true);
    const [auditResult, setAuditResult] = useState<getReportResponseInterface | null>(null);
    const [auditError, setAuditError] = useState<boolean>(false)

    const params = useParams<{ reportId: string }>();

    useEffect(() => {
        getOneReportById({ reportId: parseInt(params.reportId) })
            .then((report) => {
                setAuditResult(report);
                setInprogress(false)
            })
            .catch((err) => {
                console.log(err);
                setAuditError(true);
            })
    }, [params])

    return (
        <div className="w-dvw h-dvh bg-[#323639] flex flex-col justify-center">

            {/* Page actions */}
            <Link href={'/dashboard/reports'}>
                <button className="flex items-center justify-center gap-2 text-white p-4">
                    <RiArrowLeftSLine size={20} />
                    <p>Go to Reports</p>
                </button>
            </Link>

            <div className="h-full">
                {/* audit result section layout */
                    auditError ? <AditResultError/> : inProgress ? <AuditResultProgress loadingText="Fetching Report..." /> : auditResult && <AuditResultTemplate fullReport={auditResult} />
                }
            </div>
        </div>
    )
}

export default Page