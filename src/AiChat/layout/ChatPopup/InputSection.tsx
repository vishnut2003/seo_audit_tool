'use client';

import { RiBardFill, RiLoader4Line } from "@remixicon/react"
import { Dispatch, FormEvent, ReactNode, SetStateAction } from "react"

const InputSection = ({
    children,
    inProgress,
    onSubmit,
    prompt,
    setPrompt,
}: {
    children: ReactNode,
    prompt: string,
    setPrompt: Dispatch<SetStateAction<string>>,
    inProgress: boolean,
    onSubmit: (event: FormEvent) => void,
}) => {
    return (
        <div
            className="flex flex-col justify-between"
        >
            {/* Prompt input */}
            <div
                className="w-full py-4 px-6 border-t border-gray-100"
            >
                {children}
                <form
                    className="w-full flex items-center gap-2"
                    onSubmit={onSubmit}
                >
                    <input
                        type="text"
                        name="prompt"
                        id="prompt"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="w-full shadow-xl shadow-gray-200 border border-gray-100 py-3 px-6 rounded-full bg-gray-50 outline-themesecondary"
                        placeholder="Ask Questions..."
                    />
                    <button
                        className={`py-3 ${inProgress ? "px-3" : "px-6"} bg-themesecondary rounded-full text-white flex items-center gap-3 shadow-lg shadow-themesecondary disabled:opacity-70`}
                        disabled={inProgress}
                    >
                        {
                            inProgress ?
                                <RiLoader4Line
                                    size={20}
                                    className="animate-spin"
                                />
                                : <>
                                    <RiBardFill
                                        size={20}
                                    />
                                    Ask
                                </>
                        }
                    </button>
                </form>
            </div>
        </div>
    )
}

export default InputSection