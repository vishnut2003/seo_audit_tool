'use client';

import TripleDotLoading from "@/Components/Loaders/TripleDotLoading/TripleDotLoading"
import { RiCheckboxCircleLine, RiCloseLargeLine, RiFileExcel2Line, RiGlobalLine, RiRefreshLine } from "@remixicon/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react"

const FormSubmitLoader = ({ siteList, reportId, setShowLoader, inProgress }: {
    siteList: string[],
    reportId: string,
    setShowLoader: Dispatch<SetStateAction<boolean>>,
    inProgress: boolean,
}) => {

    const [completedSites, setCompletedSites] = useState<string[]>([]);
    const [lastUpdated, setLastUpdated] = useState<string[]>([]);
    const [reportSuccess, setReportSuccess] = useState<boolean>(false);
    const [sheetLink, setSheetLink] = useState<string>("");

    // handle EventSourceError
    const [refeshUseEffect, setRefreshUseEffect] = useState<boolean>(false);

    useEffect(() => {
        // Create EventSource connection
        const eventSource = new EventSource(`/api/competitor-analysis/create-report/sse-progress?reportid=${reportId}`)

        // Handle incoming messages
        eventSource.onmessage = (event) => {
            const parsedData = JSON.parse(event.data) as {
                sites: string[],
                time: string,
                status: "processing" | "success",
                sheetLink: string,
            }
            setLastUpdated(parsedData.time.split(" "))
            // update status if status is completed
            if (parsedData.status === "success") {
                setSheetLink(parsedData.sheetLink);
                setReportSuccess(true);
                eventSource.close();
            }

            // push to completed site
            for (const site of parsedData.sites) {
                if (!completedSites.includes(site)) {
                    setCompletedSites(prev => [...prev, site]);
                }
            }
        }

        // Handle connection errors
        eventSource.onerror = (error) => {
            console.error('EventSource failed:', error)
            eventSource.close()
            setRefreshUseEffect(prev => !prev);
        }

        // Cleanup on component unmount
        return () => {
            eventSource.close()
        }
    }, [reportId, refeshUseEffect, completedSites])

    return (
        <div
            className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-white/50 z-50 px-5"
        >
            <div className="bg-white w-full max-w-screen-sm rounded-md flex flex-col gap-3 justify-center items-center p-20 shadow-xl shadow-gray-200">

                <div className="flex flex-col gap-1 text-center">
                    {
                        inProgress || !reportSuccess &&
                        <TripleDotLoading />
                    }
                    <p className="text-foreground mt-3">{inProgress ? "Initiating Competitor Analysis" : reportSuccess ? "Report is Ready!" : "Competitor Analysis in Progress..."}</p>
                    <p className="text-foreground">Last updated: <span className="font-semibold">{lastUpdated[0]} <span className="uppercase">{lastUpdated[1]}</span></span></p>
                </div>

                <div
                    className="bg-white drop-shadow-2xl px-6 rounded-md py-4 w-max h-max flex flex-col gap-5"
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
                                        completedSites.includes("https://" + site) ?
                                            <RiCheckboxCircleLine size={30} className="text-green-500 p-[6px] bg-green-100 rounded-full" /> :
                                            <RiRefreshLine size={30} className="text-orange-600 p-[7px] bg-orange-100 rounded-full animate-spin" />
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>

                <div className="flex gap-5 mt-5">
                    {
                        sheetLink ?
                            <a target="_blank" rel="noopener noreferrer" href={sheetLink} className="py-3 px-5 bg-green-100 text-green-500 flex gap-2 items-center rounded-md">
                                <RiFileExcel2Line size={19} />
                                <p>View Sheet</p>
                            </a> :
                            <button className="py-3 px-5 bg-green-100 text-green-500 flex gap-2 items-center rounded-md">
                                <RiRefreshLine
                                    size={20}
                                    className="animate-spin"
                                />
                                <p>Loading...</p>
                            </button>
                    }

                    <button
                        onClick={() => setShowLoader(false)}
                        className="py-3 px-5 bg-red-100 text-red-500 flex gap-2 items-center rounded-md">
                        <RiCloseLargeLine size={17} />
                        <p>Close</p>
                    </button>
                </div>


            </div>
        </div>
    )
}

export default FormSubmitLoader