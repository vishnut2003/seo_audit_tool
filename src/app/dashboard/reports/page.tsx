import AuditResultPlaceholder from "@/Components/ReportsPage/AuditResultPlaceholder/AuditResultPlaceholder"
import NewAuditForm from "@/Components/ReportsPage/NewAuditForm/NewAuditForm"
import BasicLayout from "@/layouts/BasicLayout/BasicLayout"

const page = () => {
  return (
    <BasicLayout>
      <div className="w-full flex flex-col gap-5">

        <div className="flex gap-2 items-center justify-between p-3 bg-white rounded-lg">
          {/* New Audit Form */}
          <NewAuditForm />

          {/* Select exist websites */}
          <div>
            <select className="py-4 px-5 border rounded-lg bg-slate-200 text-slate-600">
              <option value="">Select Exist Website</option>
              <option value="">webspidersolutions.com</option>
              <option value="">wallsanddreams.com</option>
            </select>
          </div>
        </div>

        {/* audit result section layout */}
        <AuditResultPlaceholder/>

      </div>
    </BasicLayout>
  )
}

export default page