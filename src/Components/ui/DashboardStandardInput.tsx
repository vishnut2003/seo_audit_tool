'use client';

import { ChangeEvent } from "react"

const DashboardStandardInput = ({
    label,
    subLabel,
    inputValue,
    inputPlaceholder,
    inputOnChange,
    name
}: {
    label: string,
    subLabel: string,
    inputValue: string,
    inputPlaceholder: string,
    inputOnChange: (e: ChangeEvent<HTMLInputElement>) => any,
    name: string,
}) => {
  return (
    <div 
        className="px-7 py-6 rounded-md flex md:flex-row flex-col justify-center items-start gap-4"
    >
        
        {/* first col */}
        <div
            className="md:w-[400px] flex flex-col gap-2"
        >
            <label
               className="text-lg font-bold"
            >
                {label}
            </label>
            <label
                className="leading-[20px] opacity-60"
            >
                {subLabel}
            </label>
        </div>

        {/* second col */}
        <div
            className="w-full flex flex-col gap-2 items-end"
        >
            <input
                className="text-md w-full py-3 px-5 border border-gray-200 rounded-md"
                placeholder={inputPlaceholder}
                value={inputValue}
                onChange={inputOnChange}
                name={name}
            />
        </div>
    </div>
  )
}

export default DashboardStandardInput