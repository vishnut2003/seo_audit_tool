'use client';

import { createSheetReport } from "@/utils/client/sheetReport";
import { RiGlobalLine } from "@remixicon/react"
import { FormEvent, useState } from "react"
import { validateSheetReportFormInput } from "./ValidateFormInput";

const SheetReportForm = () => {

    const [baseUrl, setBaseUrl] = useState<string>('')

    const [inProgress, setInProgress] = useState<boolean>(false);
    const [success] = useState<boolean>(false);
    const [error, setError] = useState<{
        status: boolean,
        message?: string,
    }>({
        status: false,
    })

    function _submitSheetReportForm(event: FormEvent) {
        event.preventDefault()
        setInProgress(true);
        const isValid = validateSheetReportFormInput({ baseUrl })
        if (!isValid) {
            setInProgress(false);
            return setError({
                status: true,
                message: "Please enter a valid base URL."
            })
        }

        createSheetReport({baseUrl})
    }

    return (
        <form
            onSubmit={_submitSheetReportForm}
            className="flex gap-2 items-center flex-col md:flex-row w-full md:w-max">
            <div className="w-full md:w-max flex gap-2 items-center bg-white py-2 px-4 rounded-lg">
                <RiGlobalLine size={23} color="#00000030" />
                <input
                    value={baseUrl}
                    onChange={(e) => setBaseUrl(e.target.value)}
                    type="text"
                    required
                    className="outline-none"
                    placeholder="Enter Website Base URL" />
            </div>

            <button
                type="submit"
                className="bg-secondary py-3 px-4 rounded-lg text-foregroundwhite disabled:opacity-45 w-full md:w-max">Create Sheet</button>

            {/* Loading */}
            {
                inProgress ?
                    <p className="self-end text-sm font-semibold">Creating Sheet...</p>
                    : error ? <p className="self-end text-sm font-semibold text-red-500">{error.message}</p>
                        : success && <p className="self-end text-sm font-semibold text-green-500">Sheet created successfully.</p>
            }
        </form>
    )
}

export default SheetReportForm