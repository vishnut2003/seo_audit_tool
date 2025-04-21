'use client';

import { useRef, useState } from 'react';
import SingleToolsLayout from '../LayoutTemplate'
import { Textarea } from "@/Components/ui/textarea"
import { RiAttachment2 } from '@remixicon/react';

const PAGE_TITLE = "Word Counter";
const PAGE_DESC = "To use this online word counter, please copy and paste your content into the box below, and then sit back and watch as Word Count Checker will run a real-time scan to count words."

const WordCounterPage = () => {

    const [content, setContent] = useState<string>('');
    const [result] = useState<{
        words: number,
        chars: number,
    }>({
        chars: 0,
        words: 0,
    });

    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const localFileUploadRef = useRef<HTMLInputElement>(null);

    return (
        <SingleToolsLayout
            pageTitle={PAGE_TITLE}
            pageDesc={PAGE_DESC}
        >
            <div>
                {/* Word Counter */}
                <div
                    className='space-y-3'
                >
                    {/* Text Area */}
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

                    {/* Other options & Results */}
                    <div
                        className='flex items-center justify-between'
                    >
                        {/* Upload files */}
                        <div>

                            {/* Local file upload */}
                            <div>
                                <input
                                    type="file"
                                    className='hidden'
                                    ref={localFileUploadRef}
                                />
                                <button
                                    onClick={() => {
                                        localFileUploadRef.current?.click();
                                    }}
                                    className='flex items-center gap-2 py-2 px-4 text-white bg-themeprimary rounded-md shadow-lg'
                                >
                                    <RiAttachment2
                                        size={20}
                                    />
                                    upload
                                </button>
                            </div>
                        </div>

                        {/* Result */}
                        <div>
                            <p
                                className='text-lg font-medium text-themeprimary'
                            >{result.words} words, {result.chars} characters</p>
                        </div>
                    </div>
                </div>
            </div>
        </SingleToolsLayout>
    )
}

export default WordCounterPage