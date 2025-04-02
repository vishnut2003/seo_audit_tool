'use client';

import { useState } from "react"
import { ConversationDataInterface } from "../layout/ChatPopup/Conversation"
import AiChatLayout from "../layout/Layout"
import { RiCheckLine, RiLoader4Line } from "@remixicon/react";
import { handleGSCPromptSubmition } from "./handlePromptSubmit";
import { GoogleSearchConsoleGraphRow } from "@/utils/server/projects/googleSearchConsoleAPI/reports/graphReport";
import { GoogleSearchConsoleDataTabsRow } from "@/utils/server/projects/googleSearchConsoleAPI/reports/tabsData";
import DateRangeAIBotWidget from "../layout/Widgets/DateRange";


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

                    if (inProgress) {
                        return;
                    }

                    setError(null);
                    setInProgress(true);

                    // Check if prompt is empty
                    if (!prompt) {
                        return setError('Please enter a prompt!');
                    }

                    // Validate Date Range
                    if (dateRangeList.to < dateRangeList.from) {
                        return setError("'From' date should be lower than 'To' date.");
                    }

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
                    setProcessed(0);
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
                                >{index === processed ? "Loading..." : index < processed ? "Completed" : "Pending"}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        >
            <DateRangeAIBotWidget
                dateRange={{
                    startDate: dateRangeList.from,
                    endDate: dateRangeList.to,
                }}
                setStartDate={(date) => {
                    setDateRangeList(prev => ({
                        ...prev,
                        from: date,
                    }))
                }}
                setEndDate={(date) => setDateRangeList(prev => ({
                    ...prev,
                    to: date,
                }))}
                toolTipText="You can ask question related to Google search console data from specified date range."
                isResetButtonEnable={gscFetchedData ? true : false}
                resetAction={() => setGscFetchedData(null)}
                closeOrOpenStatus={showDateRange}
                closeOpenAction={() => setShowDateRange(prev => !prev)}
            />
        </AiChatLayout >
    )
}

export default GSC_ChatBot