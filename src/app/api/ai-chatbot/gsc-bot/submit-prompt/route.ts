import { GSC_ChatbotFetchedData } from "@/AiChat/GSC_ChatBot/GSC_ChatBot";
import { ConversationDataInterface } from "@/AiChat/layout/ChatPopup/Conversation";
import { genarateConversationArray, stringfyObject } from "@/utils/server/ai_chatbot/common";
import { GSC_getGeminiGenerativModel } from "@/utils/server/ai_chatbot/gsc_bot";
import { NextRequest, NextResponse } from "next/server";

export interface GSCChatBotPromptSubmitionRequestDataInterface {
    prompt: string,
    conversationData: ConversationDataInterface[],
    GoogleSearchConsoleData: GSC_ChatbotFetchedData,
}

export async function POST(request: NextRequest) {
    try {
        const {
            conversationData,
            prompt,
            GoogleSearchConsoleData,
        } = (await request.json()) as GSCChatBotPromptSubmitionRequestDataInterface;

        // Stringify Google Search Console data
        const stringifyGSCData = await stringfyObject({ object: GoogleSearchConsoleData });

        // Create prompts to conversation
        const conversation = await genarateConversationArray({
            currentRole: 'user',
            newPrompt: prompt,
            prevConversations: [
                {
                    role: 'user',
                    message: stringifyGSCData,
                },
                ...conversationData,
            ]
        });

        const aiModel = await GSC_getGeminiGenerativModel();
        const result = await aiModel.generateContent({
            contents: conversation,
        })

        const response = result.response.text();

        return NextResponse.json({ response });
    } catch (err) {
        return NextResponse.json(err, { status: 500 });
    }
}