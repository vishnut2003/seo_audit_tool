'use client';

import NewAuditForm from "@/Components/ReportsPage/NewAuditForm/NewAuditForm"
import ReportRecordList from "@/Components/ReportsPage/ReportRecordList/ReportRecordList";
import BasicLayout from "@/layouts/BasicLayout/BasicLayout"

const Page = () => {

  return (
    <BasicLayout>
      <div className="w-full h-full flex flex-col gap-5">

        <div className="flex gap-2 items-center flex-col md:flex-row justify-between p-3 bg-white rounded-lg">

          {/* New Audit Form */}
          <NewAuditForm/>

        </div>

        <ReportRecordList/>
        
      </div>
    </BasicLayout>
  )
}

export default Page