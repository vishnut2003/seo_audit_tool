import React, { Dispatch, SetStateAction, useRef } from 'react'
import { Textarea } from '../ui/textarea'

const MainTextArea = ({
    content,
    setContent,
}: {
    content: string,
    setContent: Dispatch<SetStateAction<string>>,
}) => {

    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    return (
        <div
            className='relative bg-gray-50'
        >
            <Textarea
                className='resize-none'
                rows={20}
                ref={textAreaRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                maxLength={-1}
            />
            {
                !content &&
                <button
                    className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center'
                    onClick={() => {
                        textAreaRef.current?.focus()
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