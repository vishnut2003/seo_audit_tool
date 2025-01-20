'use client';

import TripleDotLoading from "@/Components/Loaders/TripleDotLoading/TripleDotLoading"
import { RiCheckboxCircleLine, RiGlobalLine, RiRefreshLine } from "@remixicon/react";
import { useEffect, useState } from "react"

const FormSubmitLoader = ({ siteList, reportId }: {
    siteList: string[],
    reportId: string,
}) => {

    const [completedSites, setCompletedSites] = useState<string[]>([])

    useEffect(() => {
        // Create EventSource connection
        const eventSource = new EventSource(`/api/competitor-analysis/create-report/sse-progress?reportid=${reportId}`)

        // Handle incoming messages
        eventSource.onmessage = (event) => {
            const parsedData = JSON.parse(event.data)
            console.log(parsedData);
        }

        // Handle connection errors
        eventSource.onerror = (error) => {
            console.error('EventSource failed:', error)
            eventSource.close()
        }

        // Cleanup on component unmount
        return () => {
            eventSource.close()
        }
    }, [reportId])

    return (
        <div className="absolute top-0 left-0 w-full h-full bg-white rounded-md flex flex-col gap-3 justify-center items-center p-10">
            <div className="flex flex-col gap-1 text-center">
                <TripleDotLoading />
                <p className="text-foreground mt-3">Competitor Analysis in Progress...</p>
                <p className="text-foreground">Last updated: <span className="font-semibold">00:05:00</span></p>
            </div>
            <div
                className="bg-white border px-6 rounded-md py-4 w-max h-max flex flex-col gap-5"
            >
                <p className="font-semibold">Progress</p>
                {
                    siteList.map((site, index) => (
                        <div
                            className="flex gap-5 justify-between items-center"
                            key={index}>
                            <div className="flex gap-2 items-center justify-start">
                                <RiGlobalLine size={18} />
                                <p>{site}</p>
                            </div>
                            <div>
                                {
                                    completedSites.includes(site) ?
                                    <RiCheckboxCircleLine size={30} className="text-green-500 p-[6px] bg-green-100 rounded-full" />:
                                    <RiRefreshLine size={30} className="text-orange-600 p-[7px] bg-orange-100 rounded-full animate-spin" />
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default FormSubmitLoader