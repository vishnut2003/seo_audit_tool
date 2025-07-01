'use client';

import { useState } from "react";
import AiChatLayout from "../layout/Layout";
import { RiCheckLine, RiLoader4Line } from "@remixicon/react";
import DateRangeAIBotWidget from "../layout/Widgets/DateRange";
import { AnalyticsDataByCountryInterface, AnalyticsReportByNewUsersSourceDataInterface, AnalyticsReportTopPagesTitle, GoogleAnalyticsReportFilterInterface, GoogleAnalyticsReportResponse } from "@/utils/server/projects/analyticsAPI/google/fetchReport";
import { ConversationDataInterface } from "../layout/ChatPopup/Conversation";
import axios from "axios";
import { GAChatBotPromptSubmitionRequestDataInterface } from "@/app/api/ai-chatbot/ga-bot/submit-prompt/route";
import { GoogleAnalyticsReportByCountryRequestInterface } from "@/app/api/google-analytics/get-report-by-country/route";
import { GoogleAnalyticsReportByUsersSourceRequestInterface } from "@/app/api/google-analytics/get-report-by-users-source/route";
import { GoogleAnalyticsReportTopPagesViewsRequestInterface } from "@/app/api/google-analytics/get-report-by-top-page-titles/route";

export interface GA_ChatBotFetchedData {
    graphData: GoogleAnalyticsReportResponse,
    byCountryData: AnalyticsDataByCountryInterface[],
    newUsersSourceData: AnalyticsReportByNewUsersSourceDataInterface[],
    topPageViews: AnalyticsReportTopPagesTitle[],
}

const GA_ChatBot = () => {

    const [prompt, setPrompt] = useState<string>('');
    const [conversationData, setConversationData] = useState<ConversationDataInterface[]>([
        {
            role: "assistant",
            message: "How can i help you?",
        }
    ]);

    const [error, setError] = useState<string | null>(null);
    const [inProgress, setInProgress] = useState<boolean>(false);

    const [processed, setProcessed] = useState<number>(0)
    const [processingItems] = useState<string[]>([
        "Fetching Google Analytics Data",
        "Creating response",
    ])

    const [gaFetchedData, setGaFetchedData] = useState<GA_ChatBotFetchedData | null>(null);

    // Date range widget
    const [showDateRange, setShowDateRange] = useState<boolean>(true);
    const [dateRange, setDateRange] = useState<{
        startDate: Date,
        endDate: Date,
    }>({
        startDate: new Date(new Date().setDate(new Date().getDate() - 30)),
        endDate: new Date(),
    });

    return (
        <AiChatLayout
            prompt={prompt}
            setPrompt={setPrompt}
            error={error}
            inProgress={inProgress}
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
            conversationData={conversationData}
            onSubmit={async (event) => {
                event.preventDefault();
                setError(null);

                if (!prompt) {
                    return setError("Please enter a prompt!");
                }

                if (dateRange.startDate > dateRange.endDate) {
                    return setError('"From Date" should be less than "To Date".');
                }

                setInProgress(true);

                setConversationData(prev => ([
                    ...prev,
                    {
                        role: "user",
                        message: prompt,
                    }
                ]))

                const tempPrompt = prompt;
                setPrompt('');

                // Fetch Google Analytics Data
                let gaFetchedRequestData: GA_ChatBotFetchedData | null = null;

                if (!gaFetchedData) {
                    let GraphData: GoogleAnalyticsReportResponse | null = null;

                    const startDate = new Date(Date.UTC(dateRange.startDate.getFullYear(), dateRange.startDate.getMonth(), dateRange.startDate.getDate())).toISOString();
                    const endDate = new Date(Date.UTC(dateRange.endDate.getFullYear(), dateRange.endDate.getMonth(), dateRange.endDate.getDate())).toISOString();

                    try {
                        const GraphReportRequestData: GoogleAnalyticsReportFilterInterface = {
                            dateRange: {
                                from: startDate.split('T')[0],
                                to: endDate.split('T')[0],
                            },
                        }

                        const response = await axios.post('/api/google-analytics/get-report', GraphReportRequestData);
                        const report = response.data.report as GoogleAnalyticsReportResponse;

                        GraphData = report;
                    } catch (err) {
                        if (err instanceof Error) {
                            setError(err.message);
                        } else if (typeof err == "string") {
                            setError(err);
                        } else {
                            setError("Fetching analytics data failed!");
                        }
                    }

                    if (!GraphData) {
                        return setError("failed to fetch Analytics Graph data!");
                    }

                    // Fetch analytics data of by country
                    const byCountryAnalyticsRequestEntry: GoogleAnalyticsReportByCountryRequestInterface = {
                        dateRange: {
                            from: dateRange.startDate.toISOString().split('T')[0],
                            to: dateRange.endDate.toISOString().split('T')[0],
                        },
                    }

                    const byCountryAnalyticsApiResponse = await axios.post('/api/google-analytics/get-report-by-country', byCountryAnalyticsRequestEntry);
                    const byCountryReport = byCountryAnalyticsApiResponse.data.report as AnalyticsDataByCountryInterface[];

                    if (!byCountryReport) {
                        return setError("failed to fetch Analytics by Country data!");
                    }

                    // fetch newUsers source report
                    const newUsersSourceReportApiRequestEntry: GoogleAnalyticsReportByUsersSourceRequestInterface = {
                        dateRange: {
                            from: dateRange.startDate.toISOString().split('T')[0],
                            to: dateRange.endDate.toISOString().split('T')[0],
                        },
                    }

                    const newUsersSourceReportApiResponse = await axios.post('/api/google-analytics/get-report-by-users-source', newUsersSourceReportApiRequestEntry);
                    const newUsersSourceReport = newUsersSourceReportApiResponse.data.report as AnalyticsReportByNewUsersSourceDataInterface[];

                    const topPagesViewsApiRequestEntry: GoogleAnalyticsReportTopPagesViewsRequestInterface = {
                        dateRange: {
                            from: dateRange.startDate.toISOString().split('T')[0],
                            to: dateRange.endDate.toISOString().split('T')[0],
                        },
                    }

                    const topPagesViewsApiResponse = await axios.post('/api/google-analytics/get-report-by-top-page-titles', topPagesViewsApiRequestEntry);
                    const topPageViewsReport = topPagesViewsApiResponse.data.report as AnalyticsReportTopPagesTitle[]

                    gaFetchedRequestData = {
                        graphData: GraphData,
                        byCountryData: byCountryReport,
                        newUsersSourceData: newUsersSourceReport,
                        topPageViews: topPageViewsReport,
                    }
                } else {
                    gaFetchedRequestData = gaFetchedData;
                }

                setGaFetchedData(gaFetchedRequestData);
                setProcessed(prev => ++prev);

                const chatSubmitPromptRequestData: GAChatBotPromptSubmitionRequestDataInterface = {
                    prompt: tempPrompt,
                    conversationData,
                    GoogleAnalyticsData: gaFetchedRequestData,
                }

                try {
                    const response = await axios.post('/api/ai-chatbot/ga-bot/submit-prompt', chatSubmitPromptRequestData);
                    const aiResponse = response.data.response as string;

                    setConversationData(prev => ([
                        ...prev,
                        {
                            role: "assistant",
                            message: aiResponse,
                        }
                    ]))

                    setProcessed(0);
                    setInProgress(false);
                } catch (err) {
                    if (err instanceof Error) {
                        setError(err.message);
                    } else if (typeof err === "string") {
                        setError(err);
                    } else {
                        setError("Create Chatbot Response failed!");
                    }
                }
            }}
        >
            <DateRangeAIBotWidget
                toolTipText="You can ask question related to Google Analytics data from specified date range."
                dateRange={dateRange}
                setStartDate={(date) => setDateRange(prev => ({ ...prev, startDate: date }))}
                setEndDate={(date) => setDateRange(prev => ({ ...prev, endDate: date }))}
                closeOrOpenStatus={showDateRange}
                closeOpenAction={() => setShowDateRange(prev => !prev)}
                isResetButtonEnable={gaFetchedData ? true : false}
                resetAction={() => setGaFetchedData(null)}
            />
        </AiChatLayout>
    )
}

export default GA_ChatBot