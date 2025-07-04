'use client';

import { motion } from "framer-motion";
import InputSection from "./InputSection";
import { ComponentType, Dispatch, FormEvent, ReactNode, SetStateAction, useState } from "react";
import { RiChatAiFill, RiCloseLargeLine, RiCollapseDiagonal2Line, RiExpandDiagonal2Line } from "@remixicon/react";
import Conversation, { ConversationDataInterface } from "./Conversation";

const ChatPopup = ({
    closeAction, 
    children, 
    conversationData,
    inProgress,
    onSubmit,
    prompt,
    setPrompt,
    error,
    LoadingElement,
}: {
    closeAction: () => void,
    children: ReactNode,
    conversationData: ConversationDataInterface[],
    prompt: string,
    setPrompt: Dispatch<SetStateAction<string>>,
    inProgress: boolean,
    onSubmit: (event: FormEvent) => void,
    error: string | null,
    LoadingElement: ComponentType,
}) => {

    const [isFullWidth, setIsFullwidth] = useState<boolean>(false);

    return (
        <motion.div
            className="w-max h-full fixed bottom-0 right-0 z-50"
            initial={{
                width: 0,
                height: 0,
            }}
            animate={{
                width: '100%',
                height: '100%',
            }}
        >
            <div
                className="flex justify-end h-full bg-white/50 md:p-5"
            >
                <div
                    className={`${!isFullWidth && "max-w-[500px]"} w-full h-full flex flex-col justify-between shadow-2xl shadow-gray-300 bg-background md:rounded-3xl overflow-hidden`}
                >
                    {/* Input section header */}
                    <div
                        className="flex w-full items-center justify-between py-4 px-6 border-b border-gray-100"
                    >
                        <div
                            className="text-themesecondary flex items-center gap-3"
                        >
                            <RiChatAiFill
                                size={20}
                            />
                            <h2
                                className="text-xl font-semibold text-themeprimary"
                            >Ask AI</h2>
                        </div>

                        <div
                            className="flex items-center gap-5"
                        >

                            {
                                isFullWidth ?
                                    <button
                                        title="Expand Chat Box"
                                        onClick={() => setIsFullwidth(prev => !prev)}
                                    >
                                        <RiCollapseDiagonal2Line
                                            size={20}
                                        />
                                    </button>
                                    : <button
                                        title="Expand Chat Box"
                                        onClick={() => setIsFullwidth(prev => !prev)}
                                    >
                                        <RiExpandDiagonal2Line
                                            size={20}
                                        />
                                    </button>
                            }

                            <button
                                onClick={closeAction}
                                title="Close Chat Box"
                            >
                                <RiCloseLargeLine
                                    size={20}
                                />
                            </button>
                        </div>
                    </div>

                    <div
                        className="h-full overflow-hidden flex flex-col justify-end"
                    >
                        <Conversation
                            conversationData={conversationData}
                            error={error}
                            inProgress={inProgress}
                            LoadingElement={LoadingElement}
                        />

                        <InputSection
                            inProgress={inProgress}
                            onSubmit={onSubmit}
                            prompt={prompt}
                            setPrompt={setPrompt}
                        >
                            {children}
                        </InputSection>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default ChatPopup