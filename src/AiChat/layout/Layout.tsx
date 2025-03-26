'use client';

import { RiBardFill } from '@remixicon/react'
import React, { Dispatch, FormEvent, ReactNode, SetStateAction, useState } from 'react'
import ChatPopup from './ChatPopup/ChatPopup';
import { ConversationDataInterface } from './ChatPopup/Conversation';

const AiChatLayout = ({
    children, 
    conversationData,
    error,
    inProgress,
    onSubmit,
    prompt,
    setPrompt,
}: {
    children: ReactNode,
    conversationData: ConversationDataInterface[],
    prompt: string,
    setPrompt: Dispatch<SetStateAction<string>>,
    inProgress: boolean,
    onSubmit: (event: FormEvent) => void,
    error: string | null,
}) => {

    const [showPopup, setShowPopup] = useState<boolean>(false);

    return (
        <>
            {/* Chat Toggle Button */}
            <button
                className='fixed right-[20px] bottom-[20px] py-3 px-5 rounded-full bg-themesecondary shadow-2xl shadow-gray-700 flex items-center gap-3 text-lg text-white hover:scale-105 transition-all'
                onClick={() => setShowPopup(prev => !prev)}
            >
                <RiBardFill
                    size={20}
                />
                <p>Ask AI</p>
            </button>

            {/* Chat Popup */
                showPopup &&
                <ChatPopup
                    closeAction={() => setShowPopup(prev => !prev)}
                    conversationData={conversationData}
                    error={error}
                    inProgress={inProgress}
                    onSubmit={onSubmit}
                    prompt={prompt}
                    setPrompt={setPrompt}
                >{children}</ChatPopup>
            }

        </>
    )
}

export default AiChatLayout