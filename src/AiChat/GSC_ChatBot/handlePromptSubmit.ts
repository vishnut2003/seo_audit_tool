import { Dispatch, SetStateAction } from "react";
import { DimensionData, GSC_ChatbotFetchedData, GSCDateRangeInterface } from "./GSC_ChatBot";
import { ConversationDataInterface } from "../layout/ChatPopup/Conversation";
import { GoogleSearchConsoleGraphFilterInterface } from "@/app/dashboard/google-search-console/report/GraphData";
import { getSessionProject } from "@/utils/client/projects";
import { GoogleSearchConsoleTabsDataFilterInteface } from "@/app/dashboard/google-search-console/report/DataTabs/Queries_Tab";
import axios from "axios";
import { GoogleSearchConsoleGraphRow } from "@/utils/server/projects/googleSearchConsoleAPI/reports/graphReport";
import { GoogleSearchConsoleDataTabsRow } from "@/utils/server/projects/googleSearchConsoleAPI/reports/tabsData";
import { GSCChatBotPromptSubmitionRequestDataInterface } from "@/app/api/ai-chatbot/gsc-bot/submit-prompt/route";

export async function handleGSCPromptSubmition({
    prompt,
    setPrompt,
    dateRange,
    setInProgress,
    setError,
    inProgress,
    conversationData,
    GSCFetchecData,
    setGscFetchedData,
    setProcessed,
}: {
    prompt: string,
    setPrompt: Dispatch<SetStateAction<string>>,
    dateRange: GSCDateRangeInterface,
    setInProgress: Dispatch<SetStateAction<boolean>>,
    setError: Dispatch<SetStateAction<string | null>>,
    inProgress: boolean,
    conversationData: ConversationDataInterface[],
    GSCFetchecData: GSC_ChatbotFetchedData | null,
    setGscFetchedData: Dispatch<SetStateAction<GSC_ChatbotFetchedData | null>>,
    setProcessed: Dispatch<SetStateAction<number>>,
}) {
    return new Promise<string>(async (resolve, reject) => {
        try {

            if (inProgress) {
                return;
            }

            setError(null);
            setInProgress(true);

            // Check if prompt is empty
            if (!prompt) {
                return reject('Please enter a prompt!');
            }

            // Validate Date Range
            if (dateRange.to < dateRange.from) {
                return reject("'From' date should be lower than 'To' date.");
            }

            const tempPrompt = prompt;
            setPrompt('');

            let GoogleSearchConsoleData: GSC_ChatbotFetchedData | null = null;

            if (!GSCFetchecData) {
                // fecth project
                const project = await getSessionProject();
                if (!project?.projectId) {
                    return reject("Project not found!");
                }

                // Fetch GSC Graph data
                let graphData: GoogleSearchConsoleGraphRow[] | null = null;
                try {
                    const graphRequestData: GoogleSearchConsoleGraphFilterInterface = {
                        dateRange: {
                            startDate: dateRange.from.toISOString().split('T')[0],
                            endDate: dateRange.to.toISOString().split('T')[0],
                        },
                        projectId: project.projectId,
                    }

                    const response = await axios.post('/api/project/search-console-api/google/get-report', graphRequestData);
                    const report = response.data.report as GoogleSearchConsoleGraphRow[];
                    graphData = report;
                } catch (err) {
                    console.log(err);
                    return reject("Fetching graph data failed.");
                }

                // Fetch Tabs data
                const dimensions: string[] = [
                    "country",
                    "date",
                    "device",
                    "page",
                    "query",
                    "searchAppearance",
                ];

                const dimensionDatas: DimensionData[] = [];

                for (const dimension of dimensions) {
                    const requestData: GoogleSearchConsoleTabsDataFilterInteface = {
                        projectId: project.projectId,
                        dateRange: {
                            startDate: dateRange.from.toISOString().split('T')[0],
                            endDate: dateRange.to.toISOString().split('T')[0],
                        },
                        dimension,
                    }

                    const response = await axios.post('/api/project/search-console-api/google/tabs-data', requestData);
                    const tabData = response.data.report as GoogleSearchConsoleDataTabsRow[];
                    const dimensionData: DimensionData = {
                        dimension,
                        data: tabData,
                    }

                    dimensionDatas.push(dimensionData);
                }

                const finalGSCFetchedData: GSC_ChatbotFetchedData = {
                    graphData,
                    dimensions: dimensionDatas,
                }

                GoogleSearchConsoleData = finalGSCFetchedData
                setGscFetchedData(finalGSCFetchedData);
            }

            GoogleSearchConsoleData = GSCFetchecData ? GSCFetchecData : GoogleSearchConsoleData;
            if (!GoogleSearchConsoleData) {
                return reject("Google Search Console data not found!");
            }
            setProcessed(prev => ++prev);

            let modelResponse: string | null = null;
            try {
                const chatbotRequestData: GSCChatBotPromptSubmitionRequestDataInterface = {
                    prompt: tempPrompt,
                    GoogleSearchConsoleData,
                    conversationData,
                }

                const { data }: {
                    data: {
                        response: string,
                    }
                } = await axios.post('/api/ai-chatbot/gsc-bot/submit-prompt', chatbotRequestData)
                
                modelResponse = data.response;

            } catch (err) {
                console.log(err);
                return reject("Failed to create response!");
            }

            setInProgress(false);

            if (modelResponse) {
                return resolve(modelResponse);
            } else {
                return setError("Failed to create response!");
            }
        } catch (err) {
            return reject(err);
        }
    })
}