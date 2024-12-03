import { RiGlobalLine, RiSearch2Line, RiSendPlaneLine } from "@remixicon/react"

const NewAuditForm = () => {
  return (
    <form className="flex gap-2 items-center">
        <div className="flex gap-2 items-center bg-white py-2 px-4 rounded-lg">
            <RiGlobalLine size={23} color="#00000030"/>
            <input type="text" className="outline-none" placeholder="Enter Website URL"/>
        </div>
        
        <button type="submit" className="bg-secondary py-3 px-4 rounded-lg text-foregroundwhite">Start Audit</button>
    </form>
  )
}

export default NewAuditForm