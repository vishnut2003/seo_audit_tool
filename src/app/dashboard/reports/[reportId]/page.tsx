'use client'

import AuditResultPlaceholder from "@/Components/ReportsPage/AuditResultPlaceholder/AuditResultPlaceholder";
import AuditResultProgress from "@/Components/ReportsPage/AuditResultProgress/AuditResultProgress";
import AuditResultTemplate from "@/Components/ReportsPage/AuditResultTemplate/AuditResultTemplate";
import { getReportResponseInterface } from "@/Interfaces/SeoOptimer/GetResponseInterface";
import { getOneReportById } from "@/utils/client/auditReport";
import { RiArrowLeftSLine } from "@remixicon/react"
import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";

const page = () => {

    const [inProgress, setInprogress] = useState<boolean>(false);
    const [auditResult, setAuditResult] = useState<getReportResponseInterface | null>(null);

    const params = useParams<{reportId: string}>();

    useEffect(() => {
        getOneReportById({reportId: parseInt(params.reportId)})
            .then((report) => {
                setAuditResult(report);
                setInprogress(false)
            })
            .catch((err) => {
                console.log(err);
                notFound();
            })
    }, [])

    return (
        <div className="w-dvw h-dvh p-4">

            {/* Page actions */}
            <button className="flex items-center justify-center gap-2">
                <RiArrowLeftSLine size={20} />
                <p>Go to Reports</p>
            </button>

            <div>
                {/* audit result section layout */
                    inProgress ? <AuditResultProgress /> : auditResult ? <AuditResultTemplate fullReport={auditResult} /> : <AuditResultPlaceholder />
                }
            </div>
        </div>
    )
}

export default page