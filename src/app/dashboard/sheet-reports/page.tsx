import SheetReportForm from '@/Components/SheetReportPage/SheetReportForm/SheetReportForm'
import SheetReportList from '@/Components/SheetReportPage/SheetReportList/SheetReportList'
import BasicLayout from '@/layouts/BasicLayout/BasicLayout'
import React from 'react'

const Page = () => {
  return (
    <BasicLayout>
      <div className="w-full h-full flex flex-col gap-5">

        <div className="flex gap-2 items-center flex-col md:flex-row justify-between p-3 bg-white rounded-lg">

          {/* New Audit Form */}
          <SheetReportForm/>

        </div>

        <SheetReportList/>        

      </div>
    </BasicLayout>
  )
}

export default Page