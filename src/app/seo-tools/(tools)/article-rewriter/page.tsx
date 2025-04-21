'use client';

import React, { useEffect, useRef, useState } from 'react'
import SingleToolsLayout from '../LayoutTemplate'
import MainTextArea from '@/Components/SmallSEOTools/MainTextArea';
import FileUploadOptions from '@/Components/SmallSEOTools/FileUploadOptions';
import ErrorTemplate from '@/Components/SmallSEOTools/ErrorTemplate';
import axios, { AxiosError } from 'axios';
import { RiCheckboxMultipleLine, RiFileCopy2Line, RiLoader4Line } from '@remixicon/react';
import { SeoToolsArticleRewriteToolsEntry } from '@/app/api/small-seo-tools/article-rewriter/rewrite/route';
import MarkDownSeoTools from '@/Components/SmallSEOTools/MarkDown';

const PAGE_TITLE = "Article Rewriter";
const PAGE_DESC = "Article rewriter or article spinner helps you rewrite articles or any type of content."

const ArticleRewriterPage = () => {

    const [content, setContent] = useState<string>('');

    const [inProgress, setInProgress] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [result, setResult] = useState<string | null>(null);

    const progressBarRef = useRef<HTMLDivElement>(null);

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

    useEffect(() => {
        progressBarRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [inProgress]);

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
                            className='flex items-center gap-2 py-2 px-4 text-white bg-themesecondary rounded-md shadow-lg disabled:opacity-50'
                            onClick={updateResult}
                            disabled={inProgress}
                        >
                            {
                                inProgress &&
                                <RiLoader4Line
                                    size={20}
                                    className='animate-spin'
                                />
                            }
                            {inProgress ? "Loading..." : "Rewrite Article"}
                        </button>
                    </div>
                </div>

                {
                    inProgress ?
                        <div
                            className='flex flex-col gap-4'
                            ref={progressBarRef}
                        >
                            {
                                [[100, 150], [100, 10], [70, 10], [50, 10]].map((size, index) => (
                                    <p
                                        key={index}
                                        className='py-2 px-3 bg-gray-200 animate-pulse rounded-md'
                                        style={{
                                            width: `${size[0]}%`,
                                            height: `${size[1]}px`,
                                        }}
                                    ></p>
                                ))
                            }
                        </div>
                        : result ? <ResultTemplate result={result} /> : null

                }
            </div>
        </SingleToolsLayout>
    )
}

function ResultTemplate({ result }: { result: string }) {

    const [copied, setCopied] = useState<boolean>(false);

    async function copyToClipboard() {
        try {
            await navigator.clipboard.writeText(result);
            setCopied(true);

            setTimeout(() => setCopied(false), 5000);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div
            className='space-y-3'
        >
            <div
                className='flex items-center justify-between border-b border-gray-200 pb-3'
            >
                <h2
                    className='font-semibold text-xl'
                >Result</h2>
                <div>
                    <button
                        className='flex items-center gap-2 py-2 px-4 border border-gray-200 rounded-md font-medium hover:bg-gray-100'
                        onClick={copyToClipboard}
                    >
                        {
                            copied ?
                                <>
                                    <RiCheckboxMultipleLine
                                        size={20}
                                    />
                                    Copied
                                </>
                                : <>
                                    <RiFileCopy2Line
                                        size={20}
                                    />
                                    Copy
                                </>
                        }
                    </button>
                </div>
            </div>
            <MarkDownSeoTools>
                {result}
            </MarkDownSeoTools>
        </div>
    )
}

export default ArticleRewriterPage