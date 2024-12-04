'use client';

import AuditResultPlaceholder from "@/components/ReportsPage/AuditResultPlaceholder/AuditResultPlaceholder"
import AuditResultProgress from "@/components/ReportsPage/AuditResultProgress/AuditResultProgress";
import NewAuditForm from "@/components/ReportsPage/NewAuditForm/NewAuditForm"
import BasicLayout from "@/layouts/BasicLayout/BasicLayout"
import { useState } from "react";

const Page = () => {

  const [inProgress, setInprogress] = useState<boolean>(false);
  const [auditResult] = useState<object | null>(null);

  return (
    <BasicLayout>
      <div className="w-full flex flex-col gap-5">

        <div className="flex gap-2 items-center justify-between p-3 bg-white rounded-lg">
          {/* New Audit Form */}
          <NewAuditForm inProgress={inProgress} setInProgress={setInprogress} />

          {/* Select exist websites */}
          <div>
            <select className="py-4 px-5 border rounded-lg bg-slate-200 text-slate-600">
              <option value="">Select Exist Website</option>
              <option value="">webspidersolutions.com</option>
              <option value="">wallsanddreams.com</option>
            </select>
          </div>
        </div>

        {/* audit result section layout */
          inProgress ? <AuditResultProgress/> : auditResult ? <div>Result</div> : <AuditResultPlaceholder/>
        }
      </div>
    </BasicLayout>
  )
}

export default Page