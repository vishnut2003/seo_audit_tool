'use client';

import React, { useState } from 'react'
import SingleToolsLayout from '../LayoutTemplate'
import MainTextArea from '@/Components/SmallSEOTools/MainTextArea';
import FileUploadOptions from '@/Components/SmallSEOTools/FileUploadOptions';
import ErrorTemplate from '@/Components/SmallSEOTools/ErrorTemplate';
import axios, { AxiosError } from 'axios';
import { RiLoader4Line } from '@remixicon/react';
import { SeoToolsArticleRewriteToolsEntry } from '@/app/api/small-seo-tools/article-rewriter/rewrite/route';

const PAGE_TITLE = "Article Rewriter";
const PAGE_DESC = "Article rewriter or article spinner helps you rewrite articles or any type of content."

const ArticleRewriterPage = () => {

    const [content, setContent] = useState<string>('');

    const [inProgress, setInProgress] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [result, setResult] = useState<string | null>(null);

    async function updateResult() {

        setInProgress(true);
        setError(null);

        try {
            if (!content) {
                throw new Error("Please enter text");
            }

            const requestData: SeoToolsArticleRewriteToolsEntry = {
                content,
            }

            const response = await axios.post<string>('/api/small-seo-tools/article-rewriter/rewrite', requestData);

            const modelResponse = response.data;

            setResult(modelResponse);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else if (err instanceof AxiosError) {
                setError(err.message);
            } else if (typeof err === "string") {
                setError(err);
            } else {
                setError("Something went wrong!");
            }
        }

        setInProgress(false);
    }

    return (
        <SingleToolsLayout
            pageTitle={PAGE_TITLE}
            pageDesc={PAGE_DESC}
        >
            <div
                className='space-y-7'
            >
                <MainTextArea
                    content={content}
                    setContent={setContent}
                />

                {
                    error &&
                    <ErrorTemplate
                        error={error}
                    />
                }

                <div
                    className='flex items-center justify-between'
                >
                    <div>
                        <FileUploadOptions />
                    </div>
                    <div>
                        <button
                            className='flex items-center gap-2 py-2 px-4 text-white bg-themesecondary rounded-md shadow-lg'
                            onClick={updateResult}
                        >
                            Rewrite Article
                        </button>
                    </div>
                </div>

                {
                    inProgress ?
                        <div
                            className='flex items-center gap-2 justify-center min-h-[300px] bg-gray-50 rounded-md border border-gray-300'
                        >
                            <RiLoader4Line
                                size={20}
                                className='animate-spin'
                            />
                            <p>Rewriting Article</p>
                        </div>
                        : result ? <ResultTemplate result={result} /> : null

                }
            </div>
        </SingleToolsLayout>
    )
}

function ResultTemplate({ result }: { result: string }) {
    return (
        <div
            className='space-y-3'
        >
            <h2
                className='font-semibold text-xl'
            >Result:</h2>
            <p>{result}</p>
        </div>
    )
}

export default ArticleRewriterPage