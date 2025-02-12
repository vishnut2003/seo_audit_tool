'use client';

import { ChangeEvent } from "react"

const DashboardStandardInput = ({
    label,
    subLabel,
    inputValue,
    inputPlaceholder,
    inputOnChange,
    name,
    domainInput,
}: {
    label: string,
    subLabel: string,
    inputValue: string,
    inputPlaceholder: string,
    inputOnChange: (e: ChangeEvent<HTMLInputElement>) => any,
    name: string,
    domainInput?: boolean,
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
            className="w-full flex items-stretch border border-gray-200 rounded-md"
        >
            <p
                className="bg-gray-200 font-medium text-gray-600 px-4 flex items-center"
            >https://</p>
            <input
                className="text-md w-full py-3 px-5 outline-none"
                placeholder={inputPlaceholder}
                value={inputValue}
                onChange={(e) => {
                    const event = e;
                    if (domainInput && URL.canParse(e.target.value)) {
                        const urlObject = URL.parse(e.target.value);
                        event.target.value = urlObject?.hostname || e.target.value;
                    }

                    inputOnChange(event);
                }}
                name={name}
            />
        </div>
    </div>
  )
}

export default DashboardStandardInput