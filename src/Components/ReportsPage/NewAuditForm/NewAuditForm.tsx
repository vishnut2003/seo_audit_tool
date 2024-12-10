'use client';

import { getReportResponseInterface } from "@/Interfaces/SeoOptimer/GetResponseInterface";
import { createNewAudit } from "@/utils/client/auditReport";
import { RiGlobalLine } from "@remixicon/react"
import { Dispatch, FormEvent, SetStateAction, useState } from "react"

const NewAuditForm = ({inProgress, setInProgress, setAuditResult}: {
  inProgress: boolean,
  setInProgress: Dispatch<SetStateAction<boolean>>,
  setAuditResult: Dispatch<SetStateAction<getReportResponseInterface | null>>
}) => {

  const [domain, setDomain] = useState<string>('');

  async function _submitNewAudit (event: FormEvent) {
    event.preventDefault();

    // return if in progress
    if(inProgress) return;

    // change status to inprogress
    setInProgress(true);

    // Create new Audit
    createNewAudit({domainName: domain})
      .then((auditReport) => {
        setAuditResult(auditReport)
      })
      .finally(() => {
        setInProgress(false);
      })
  }

  return (
    <form 
    onSubmit={_submitNewAudit}
    className="flex gap-2 items-center flex-col md:flex-row w-full md:w-max">
        <div className="w-full md:w-max flex gap-2 items-center bg-white py-2 px-4 rounded-lg">
            <RiGlobalLine size={23} color="#00000030"/>
            <input 
            value={domain}
            onChange={(event) => setDomain(event.target.value)}
            type="text" 
            required
            className="outline-none" 
            placeholder="Enter Website URL"/>
        </div>
        
        <button 
        disabled={inProgress ? true : false}
        type="submit" 
        className="bg-secondary py-3 px-4 rounded-lg text-foregroundwhite disabled:opacity-45 w-full md:w-max">Start Audit</button>
    </form>
  )
}

export default NewAuditForm