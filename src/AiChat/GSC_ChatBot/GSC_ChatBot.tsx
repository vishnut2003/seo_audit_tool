'use client';

import { useState } from "react"
import { ConversationDataInterface } from "../layout/ChatPopup/Conversation"
import AiChatLayout from "../layout/Layout"
import DatePicker from "@/Components/ui/datepicker";
import { RiArrowDownSLine, RiCheckLine, RiExpandHorizontalSLine, RiLoader4Line, RiQuestionLine } from "@remixicon/react";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover"
import { handleGSCPromptSubmition } from "./handlePromptSubmit";
import { GoogleSearchConsoleGraphRow } from "@/utils/server/projects/googleSearchConsoleAPI/reports/graphReport";
import { GoogleSearchConsoleDataTabsRow } from "@/utils/server/projects/googleSearchConsoleAPI/reports/tabsData";


export interface GSCDateRangeInterface {
    from: Date,
    to: Date,
}

export interface GSC_ChatbotFetchedData {
    graphData: GoogleSearchConsoleGraphRow[],
    dimensions: DimensionData[]
}

export interface DimensionData {
    dimension: string,
    data: GoogleSearchConsoleDataTabsRow[],
}

const GSC_ChatBot = () => {

    const [showDateRange, setShowDateRange] = useState<boolean>(true);
    const [dateRangeList, setDateRangeList] = useState<GSCDateRangeInterface>({
        from: new Date(new Date().setDate(new Date().getDate() - 30)),
        to: new Date(),
    },);

    const [inProgress, setInProgress] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [processingItems] = useState<string[]>([
        "Fetching Google Search Console Data",
        "Creating response",
    ])
    const [processed, setProcessed] = useState<number>(0)

    const [prompt, setPrompt] = useState<string>('');
    const [conversationData, setConversationData] = useState<ConversationDataInterface[]>([
        {
            message: "Hi there, how can i help you?",
            role: "assistant",
        },
    ]);

    const [gscFetchedData, setGscFetchedData] = useState<GSC_ChatbotFetchedData | null>(null);

    return (
        <AiChatLayout
            conversationData={conversationData}
            prompt={prompt}
            setPrompt={setPrompt}
            inProgress={inProgress}
            error={error}
            onSubmit={async (event) => {
                event.preventDefault();
                try {

                    setConversationData(prev => ([
                        ...prev,
                        {
                            role: 'user',
                            message: prompt,
                        }
                    ]))

                    const modelResponse = await handleGSCPromptSubmition({
                        prompt,
                        setPrompt,
                        dateRange: dateRangeList,
                        setInProgress,
                        setError,
                        inProgress,
                        conversationData,
                        GSCFetchecData: gscFetchedData,
                        setGscFetchedData,
                        setProcessed,
                    })

                    setConversationData(prev => {
                        return [
                            ...prev,
                            {
                                role: 'assistant',
                                message: modelResponse,
                            },
                        ];
                    })
                } catch (err) {
                    if (typeof err === "string") {
                        setError(err)
                    } else {
                        setError("Something went wrong!");
                    }

                    setInProgress(false);
                }
            }}

            LoadingElement={() => (
                <div
                    className="flex flex-col gap-5"
                >
                    {processingItems.map((item, index) => (
                        <div
                            className="flex gap-3 items-center"
                            key={index}
                        >
                            <div
                                className={`p-2 rounded-full shadow-md ${(index + 1) > processed ? "bg-orange-50 text-orange-500" : "bg-green-50 text-green-500"}`}
                            >
                                {
                                    (index + 1) > processed ?
                                        <RiLoader4Line
                                            size={15}
                                            className="animate-spin"
                                        />
                                        : <RiCheckLine
                                            size={15}
                                        />
                                }
                            </div>
                            <div>
                                <p
                                    className="text-sm font-semibold"
                                >{item}</p>
                                <p
                                    className="text-xs"
                                >{index === processed ? "Loading..." : index < processed ? "Compleated" : "Pending"}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        >
            <div
                className="max-h-[250px] overflow-auto"
            >
                <div
                    className="w-full flex items-center justify-between py-2 pr-2 pl-1"
                >
                    <div
                        className="flex gap-2 items-center relative"
                    >
                        <h2
                            className="font-semibold"
                        >Select date range</h2>

                        <Popover>
                            <PopoverTrigger>
                                <RiQuestionLine
                                    size={15}
                                    className="opacity-50"
                                />
                            </PopoverTrigger>
                            <PopoverContent
                                align="start"
                                side="top"
                            >
                                <div
                                    className="absolute z-50 top-0 left-0 py-4 px-6 bg-orange-200 text-orange-500 rounded-lg shadow-xl w-max max-w-[300px]"
                                >
                                    <div
                                        className="w-full flex justify-between mb-3"
                                    >
                                        <p
                                            className="font-semibold"
                                        >How to Use</p>
                                    </div>
                                    <p
                                        className="text-sm text-left"
                                    >You can ask question related to Google search console data from specified date range.</p>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                    <button
                        onClick={() => setShowDateRange(prev => !prev)}
                        className={`p-2 rounded-full shadow-lg shadow-gray-200 text-themesecondary transition-all ${!showDateRange && "rotate-180"}`}
                    >
                        <RiArrowDownSLine
                            size={25}
                        />
                    </button>
                </div>

                {
                    showDateRange &&
                    <div
                        className="flex overflow-auto items-center justify-between w-full py-3 border-t border-gray-100 mb-2"
                    >
                        <div
                            className="w-[45%] truncate"
                        >
                            <p
                                className="text-xs font-medium"
                            >From</p>
                            <div
                                className="bg-gray-100 border border-gray-200 rounded-md overflow-hidden w-full"
                            >
                                <DatePicker
                                    date={dateRangeList.from}
                                    setDate={(date) => {
                                        setDateRangeList(prev => ({
                                            ...prev,
                                            from: date,
                                        }))
                                    }}
                                    placeholder="From Date"
                                />
                            </div>
                        </div>

                        <RiExpandHorizontalSLine
                            size={20}
                            className="min-w-[20px]"
                        />

                        <div
                            className="w-[45%] truncate"
                        >
                            <p
                                className="text-xs font-medium"
                            >To</p>
                            <div
                                className="bg-gray-100 border border-gray-200 rounded-md overflow-hidden w-full"
                            >
                                <DatePicker
                                    date={dateRangeList.to}
                                    setDate={(date) => {
                                        setDateRangeList(prev => ({
                                            ...prev,
                                            to: date,
                                        }))
                                    }}
                                    placeholder="To Date"
                                />
                            </div>
                        </div>
                    </div>
                }

            </div>
        </AiChatLayout >
    )
}

export default GSC_ChatBot