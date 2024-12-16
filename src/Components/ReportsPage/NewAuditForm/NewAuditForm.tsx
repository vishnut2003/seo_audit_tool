'use client';

import { createNewAudit } from "@/utils/client/auditReport";
import { RiGlobalLine } from "@remixicon/react"
import { FormEvent, useState } from "react"

const NewAuditForm = () => {

  const [domain, setDomain] = useState<string>('');
  const [inProgress, setInProgress] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  async function _submitNewAudit(event: FormEvent) {
    event.preventDefault();

    // return if in progress
    if (inProgress) return;

    // change status to inprogress
    setInProgress(true);

    // Create new Audit
    createNewAudit({ domainName: domain })
      .then(() => {
        setSuccess(true)
        setTimeout(() => setSuccess(false), 3000);
      })
      .catch(() => {
        setIsError(true)
      })
      .finally(() => setInProgress(false))
  }

  return (
    <form
      onSubmit={_submitNewAudit}
      className="flex gap-2 items-center flex-col md:flex-row w-full md:w-max">
      <div className="w-full md:w-max flex gap-2 items-center bg-white py-2 px-4 rounded-lg">
        <RiGlobalLine size={23} color="#00000030" />
        <input
          value={domain}
          onChange={(event) => setDomain(event.target.value)}
          type="text"
          required
          className="outline-none"
          placeholder="Enter Website URL" />
      </div>

      <button
        disabled={inProgress ? true : false}
        type="submit"
        className="bg-secondary py-3 px-4 rounded-lg text-foregroundwhite disabled:opacity-45 w-full md:w-max">Start Audit</button>

      {/* Loading */}
      {
        inProgress ?
          <p className="self-end text-sm font-semibold">Creating Report...</p>
          : isError ? <p className="self-end text-sm font-semibold text-red-500">Something went wrong!</p>
            : success && <p className="self-end text-sm font-semibold text-green-500">Report created successfully.</p>
      }
    </form>
  )
}

export default NewAuditForm