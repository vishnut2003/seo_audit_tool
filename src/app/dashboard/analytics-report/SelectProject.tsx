import { RiErrorWarningLine, RiFolder5Line } from "@remixicon/react"
import Link from "next/link"

const SelectProject = () => {
    return (
        <div
            className="w-full h-full flex flex-col gap-4"
        >
            <div
                className='py-4 px-5 bg-yellow-50 text-yellow-600 flex items-start md:items-center justify-between gap-3 rounded-md'
            >
                <p
                    className='text-base flex items-center gap-2'
                >
                    <RiErrorWarningLine
                        size={17}
                    />
                    You must select a project to access analytics.
                </p>
            </div>

            <Link
                className="text-sm flex items-center gap-3 py-4 px-5 bg-background w-max shadow-xl shadow-gray-200 rounded-md"
                href={`/dashboard/projects?redirect=${encodeURIComponent('/dashboard/analytics-report')}`}
            >
                <RiFolder5Line
                    size={20}
                />
                Select Project
            </Link>


        </div>
    )
}

export default SelectProject