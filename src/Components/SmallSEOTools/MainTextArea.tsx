'use client';

import React, { Dispatch, SetStateAction, useRef } from 'react'
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

const MainTextArea = ({
    content,
    setContent,
    contentType,
}: {
    content: string,
    setContent: Dispatch<SetStateAction<string>>,
    contentType?: "html" | "json" | "text",
}) => {

    const editor = useEditor({
        content,
        extensions: [StarterKit],
        editorProps: {
            attributes: () => ({
                class: "min-h-[400px] outline-none py-2 px-4"
            }),
        },
        onUpdate: ({ editor }) => {
            if (contentType === "html") {
                const html = editor.getHTML();
                if (html === "<p></p>") {
                    setContent("");
                } else {
                    setContent(html)
                }
            } else if (contentType === "json") {
                const json = editor.getJSON();
                setContent(JSON.stringify(json));
            } else {
                const textContent = editor.getText();
                setContent(textContent);
            }
        }
    });

    return (
        <div
            className='relative bg-gray-50 min-h-[420px] max-h-[400px] border border-gray-200 rounded-md overflow-auto'
        >
            <EditorContent
                editor={editor}
            />
            {
                !content &&
                <button
                    className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center'
                    onClick={() => {
                        editor?.commands.focus();
                    }}
                >
                    <p
                        className='text-2xl font-semibold opacity-20'
                    >Enter Text Here for Word Count</p>
                </button>
            }
        </div>
    )
}

export default MainTextArea