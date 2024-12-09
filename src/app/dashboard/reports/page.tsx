'use client';

import AuditResultPlaceholder from "@/Components/ReportsPage/AuditResultPlaceholder/AuditResultPlaceholder"
import AuditResultProgress from "@/Components/ReportsPage/AuditResultProgress/AuditResultProgress";
import AuditResultTemplate from "@/Components/ReportsPage/AuditResultTemplate/AuditResultTemplate";
import NewAuditForm from "@/Components/ReportsPage/NewAuditForm/NewAuditForm"
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

          {/* Select exist websites */}
          <div className="w-full md:w-max">
            <select className="py-4 px-5 border rounded-lg bg-slate-200 text-slate-600 w-full">
              <option value="">Select Exist Website</option>
              <option value="">webspidersolutions.com</option>
              <option value="">wallsanddreams.com</option>
            </select>
          </div>
        </div>

        {/* audit result section layout */
          inProgress ? <AuditResultProgress/> : auditResult ? <AuditResultTemplate fullReport={auditResult}/> : <AuditResultPlaceholder/>
        }
      </div>
    </BasicLayout>
  )
}

export default Page