import { ConversationDataInterface } from "@/AiChat/layout/ChatPopup/Conversation";
import { Content } from "@google/generative-ai";

export async function stringfyObject({object}: {
    object: object,
}) {
    return new Promise<string>(async (resolve, reject) => {
        try {
            const stringfyObject = JSON.stringify(object);
            return resolve(stringfyObject);
        } catch (err) {
            return reject(err);
        }
    })
}

export async function genarateConversationArray({
    newPrompt,
    prevConversations,
    currentRole,
}: {
    prevConversations: ConversationDataInterface[],
    newPrompt: string,
    currentRole: 'user' | 'model',
}) {
    return new Promise<Content[]>(async (resolve, reject) => {
        try {
            const conversation: Content[] = [];
            
            // Process Prev Conversation
            for (const prevConversation of prevConversations) {
                const singleConversation: Content = {
                    role: prevConversation.role === 'user' ? prevConversation.role : 'model',
                    parts: [
                        {
                            text: prevConversation.message,
                        },
                    ],
                };

                conversation.push(singleConversation);
            }

            // Process New Prompts text
            conversation.push({
                role: currentRole,
                parts: [
                    {
                        text: newPrompt,
                    },
                ]
            })

            return resolve(conversation)
        } catch (err) {
            return reject(err);
        }
    })
}