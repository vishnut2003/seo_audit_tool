'use client';

import { RiErrorWarningLine, RiLoader4Line } from "@remixicon/react";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import Image from "next/image";
import { ComponentType, useEffect, useRef, useState } from "react";
import Markdown from "markdown-to-jsx";

export interface ConversationDataInterface {
    message: string,
    role: 'user' | 'assistant',
}

const Conversation = ({
    conversationData,
    error,
    inProgress,
    LoadingElement,
}: {
    conversationData: ConversationDataInterface[],
    error: string | null,
    LoadingElement: ComponentType,
    inProgress: boolean,
}) => {
    const [userSession, setUserSession] = useState<Session | null>(null);

    useEffect(() => {
        getSession()
            .then((session) => {
                setUserSession(session);
            })

        scrollWrapperRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
        })
    }, [conversationData]);

    const scrollWrapperRef = useRef<HTMLDivElement>(null)

    if (!userSession) {
        return (
            <div
                className="w-full h-full flex justify-center items-center gap-3 opacity-60"
            >
                <RiLoader4Line
                    size={20}
                    className="animate-spin text-themesecondary"
                />
                Please wait...
            </div>
        )
    }

    return (
        <div
            className="py-4 px-6 h-full w-full overflow-auto"
        >
            <div
                className="flex flex-col gap-5 w-full"
                ref={scrollWrapperRef}
            >
                {conversationData.map((chat, index) => (
                    <div
                        key={index}
                        className="flex flex-col gap-4 border-b border-gray-100 pb-5"
                    >
                        <div
                            className={`flex items-end gap-2 ${chat.role === "user" && "flex-row-reverse"}`}
                        >
                            <Image
                                alt="Avatar"
                                src={chat.role === "user" ? userSession.user?.image || '/users/default-avatar.png' : '/users/ai-assistant-avatar.png'}
                                width={100}
                                height={100}
                                style={{
                                    width: '40px',
                                    height: '40px',
                                }}
                                className="shadow-lg rounded-full"
                            />
                            <div
                                className={`${chat.role === "user" && "text-right"}`}
                            >
                                <p
                                    className="text-sm font-medium"
                                >{chat.role === "user" ? userSession.user?.name : "AI Assistant"}</p>
                                <p
                                    className="text-xs"
                                >{chat.role === "user" ? "User" : "By Webspider Solutions"}</p>
                            </div>
                        </div>
                        <div
                            className={`w-full ${chat.role === "user" && "text-right"}`}
                        >
                            <Markdown
                                options={{
                                    overrides: {
                                        p: {
                                            props: {
                                                className: 'mb-3'
                                            }
                                        },
                                        ul: {
                                            props: {
                                                className: 'flex flex-col gap-3 mb-3'
                                            }
                                        },
                                        code: {
                                            props: {
                                                className: 'py-[3px] px-[5px] bg-gray-200 rounded-md'
                                            }
                                        },

                                        // Table
                                        table: {
                                            props: {
                                                className: 'text-left mb-5 shadow-md shadow-gray-200 rounded-md overflow-hidden'
                                            }
                                        },
                                        tr: {
                                            props: {
                                                className: 'even:bg-gray-100'
                                            }
                                        },
                                        td: {
                                            props: {
                                                className: 'py-2 px-3'
                                            }
                                        },
                                        th: {
                                            props: {
                                                className: 'py-2 px-3'
                                            }
                                        },
                                        thead: {
                                            props: {
                                                className: 'bg-gray-200 text-sm text-themeprimery'
                                            }
                                        }
                                    }
                                }}
                            >
                                {chat.message}
                            </Markdown>
                        </div>
                    </div>
                ))}

                {
                    error &&
                    <div
                        className="py-3 px-5 bg-red-50 text-red-600 rounded-md flex items-center gap-3"
                    >
                        <RiErrorWarningLine
                            size={20}
                        />
                        <p>{error}</p>
                    </div>
                }

                {
                    inProgress &&
                    <LoadingElement />
                }
            </div>
        </div>
    )
}

export default Conversation