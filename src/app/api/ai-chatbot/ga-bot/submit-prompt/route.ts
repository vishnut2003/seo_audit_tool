import { GA_ChatBotFetchedData } from "@/AiChat/GA_ChatBot/GA_ChatBot";
import { ConversationDataInterface } from "@/AiChat/layout/ChatPopup/Conversation";
import { genarateConversationArray, stringfyObject } from "@/utils/server/ai_chatbot/common";
import { GA_getGeminiGenerativModel } from "@/utils/server/ai_chatbot/ga_bot";
import { NextRequest, NextResponse } from "next/server";

export interface GAChatBotPromptSubmitionRequestDataInterface {
    prompt: string,
    conversationData: ConversationDataInterface[],
    GoogleAnalyticsData: GA_ChatBotFetchedData,
}

export async function POST(request: NextRequest) {
    try {
        const {
            prompt,
            conversationData,
            GoogleAnalyticsData,
        } = (await request.json()) as GAChatBotPromptSubmitionRequestDataInterface;

        const GAStringifyData = await stringfyObject({ object: GoogleAnalyticsData });

        const conversation = await genarateConversationArray({
            currentRole: "user",
            newPrompt: prompt,
            prevConversations: [
                {
                    role: "user",
                    message: GAStringifyData,
                },
                ...conversationData,
            ]
        })

        const model = await GA_getGeminiGenerativModel();
        const result = await model.generateContent({
            contents: conversation,
        })

        const response = result.response.text();
        return NextResponse.json({ response });
    } catch (err) {
        return NextResponse.json(err, { status: 500 });
    }
}