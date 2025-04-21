'use client';

import { useEffect, useState } from 'react';
import SingleToolsLayout from '../LayoutTemplate'
import { AxiosError } from 'axios';
import FileUploadOptions from '@/Components/SmallSEOTools/FileUploadOptions';
import ErrorTemplate from '@/Components/SmallSEOTools/ErrorTemplate';
import MainTextArea from '@/Components/SmallSEOTools/MainTextArea';

const PAGE_TITLE = "Word Counter";
const PAGE_DESC = "To use this online word counter, please copy and paste your content into the box below, and then sit back and watch as Word Count Checker will run a real-time scan to count words."

const WordCounterPage = () => {

    const [error, setError] = useState<string | null>(null);

    const [content, setContent] = useState<string>('');
    const [result, setResult] = useState<{
        words: number,
        chars: number,
    }>({
        chars: 0,
        words: 0,
    });

    useEffect(() => {
        try {
            const trimedText = content.trim();
            const charsCount = trimedText.length;
            const wordCount = trimedText === "" ? 0 : trimedText.split(/\s+/).length;

            setResult({
                chars: charsCount,
                words: wordCount,
            })
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else if (err instanceof AxiosError) {
                setError(err.message);
            } else {
                setError("Something went wrong!");
            }
        }
    }, [content]);

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
                    <MainTextArea
                        content={content}
                        setContent={setContent}
                        contentType='text'
                    />

                    {
                        error &&
                        <ErrorTemplate
                            error={error}
                        />
                    }

                    {/* Other options & Results */}
                    <div
                        className='flex items-center justify-between'
                    >
                        {/* Upload files */}
                        <div>

                            {/* Local file upload */}
                            <FileUploadOptions />
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