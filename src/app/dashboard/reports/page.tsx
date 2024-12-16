'use client';

import NewAuditForm from "@/Components/ReportsPage/NewAuditForm/NewAuditForm"
import ReportRecordList from "@/Components/ReportsPage/ReportRecordList/ReportRecordList";
import { getReportResponseInterface } from "@/Interfaces/SeoOptimer/GetResponseInterface";
import BasicLayout from "@/layouts/BasicLayout/BasicLayout"
import { useState } from "react";

const Page = () => {

  const [inProgress, setInprogress] = useState<boolean>(false);
  const [auditResult, setAuditResult] = useState<getReportResponseInterface | null>(null);

  return (
    <BasicLayout>
      <div className="w-full flex flex-col gap-5">

        <div className="flex gap-2 items-center flex-col md:flex-row justify-between p-3 bg-white rounded-lg">

          {/* New Audit Form */}
          <NewAuditForm inProgress={inProgress} setInProgress={setInprogress} setAuditResult={setAuditResult} />

        </div>

        <ReportRecordList/>
        
      </div>
    </BasicLayout>
  )
}

export default Page