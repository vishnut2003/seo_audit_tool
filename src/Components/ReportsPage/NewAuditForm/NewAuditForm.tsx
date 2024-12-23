'use client';

import { createNewAudit } from "@/utils/client/auditReport";
import { RiGlobalLine } from "@remixicon/react"
import { FormEvent, useState } from "react"
import ValidateDomainInput from "./ValidateDomainInput";

const NewAuditForm = () => {

  const [domain, setDomain] = useState<string>('');
  const [inProgress, setInProgress] = useState<boolean>(false);

  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('')

  const [success, setSuccess] = useState<boolean>(false);

  async function _submitNewAudit(event: FormEvent) {
    event.preventDefault();

    // return if in progress
    if (inProgress) return;

    // change status to inprogress
    setInProgress(true);

    // Validate input
    const valid = await ValidateDomainInput({input: domain});
    if(!valid.success) {
      if (valid.error) setErrorMessage(valid.error);
      setInProgress(false);
      return setIsError(true)
    }

    // Create new Audit
    createNewAudit({ domainName: domain })
      .then(() => {
        setSuccess(true)
        setTimeout(() => setSuccess(false), 3000);
      })
      .catch(() => {
        setIsError(true);
        setErrorMessage('Something went wrong!');
      })
      .finally(() => {
        setInProgress(false);
        setDomain('');
      })
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
          placeholder="Enter Domain Name" />
      </div>

      <button
        disabled={inProgress ? true : false}
        type="submit"
        className="bg-secondary py-3 px-4 rounded-lg text-foregroundwhite disabled:opacity-45 w-full md:w-max">Start Audit</button>

      {/* Loading */}
      {
        inProgress ?
          <p className="self-end text-sm font-semibold">Creating Report...</p>
          : isError ? <p className="self-end text-sm font-semibold text-red-500">{errorMessage}</p>
            : success && <p className="self-end text-sm font-semibold text-green-500">Report created successfully.</p>
      }
    </form>
  )
}

export default NewAuditForm