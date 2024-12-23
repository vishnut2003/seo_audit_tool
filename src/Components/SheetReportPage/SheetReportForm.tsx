'use client';

import { RiGlobalLine } from "@remixicon/react"
import { useState } from "react"

const SheetReportForm = () => {

    const [baseUrl, setBaseUrl] = useState<string>('')

    return (
        <form
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
                className="bg-secondary py-3 px-4 rounded-lg text-foregroundwhite disabled:opacity-45 w-full md:w-max">Start Audit</button>
        </form>
    )
}

export default SheetReportForm