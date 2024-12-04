import { RiErrorWarningLine } from "@remixicon/react"

const AuditResultPlaceholder = () => {
  return (
    <div className="w-full h-96 bg-white p-5 flex gap-3 text-slate-500 justify-center items-center rounded-lg">
        <RiErrorWarningLine/>
        <p>Select website or start new audit.</p>
    </div>
  )
}

export default AuditResultPlaceholder