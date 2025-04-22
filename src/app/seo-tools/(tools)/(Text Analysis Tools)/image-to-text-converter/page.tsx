'use client';

import { FileUploadTemplate } from '@/Components/SmallSEOTools/FileUploadTemplate'
import React, { useState } from 'react'
import SingleToolsLayout from '../../LayoutTemplate';
import ErrorTemplate from '@/Components/SmallSEOTools/ErrorTemplate';
import Tesseract from "tesseract.js";
import { RiCheckboxMultipleLine, RiFileCopy2Line, RiLoader4Line } from '@remixicon/react';

const PAGE_TITLE = "Copy Text From Image";
const PAGE_DESC = "Image to text converter lets you copy text from an image in a few clicks, saving you the hassle of typing. Whether you need to extract text from a photo, scanned document, or handwritten note, it ensures precision and speed. Find out how to copy text from images online and improve your productivity today.";

const ImageToTextConvertorPage = () => {

    const [files, setFiles] = useState<File[]>([]);
    const [resultText, setResultText] = useState<string | null>(null);

    const [error, setError] = useState<string | null>(null);
    const [inProgress, setInProgress] = useState<boolean>(false);

    async function extractTextFromImage() {
        setInProgress(true);
        setError(null);
        try {
            const file: File | null = files[0];
            if (!file) {
                throw new Error("Please upload a image to extract!");
            }

            const formData = new FormData();
            formData.append('file', file);

            const worker = await Tesseract.createWorker('eng', 1, {})

            const {
                data: {
                    text,
                }
            } = await worker.recognize(file);

            setResultText(text);
            setInProgress(false);

        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else if (typeof err === "string") {
                setError(err);
            } else {
                setError("Something went wrong!");
            }

            setInProgress(false);
        }
    }

    return (
        <SingleToolsLayout
            pageTitle={PAGE_TITLE}
            pageDesc={PAGE_DESC}
        >
            <div>
                <div
                    className='space-y-5'
                >
                    <FileUploadTemplate
                        files={files}
                        setError={setError}
                        setFiles={setFiles}
                        noOfFiles={1}
                        acceptedFiles='image/*'
                        maxSize={5}
                    />
                    {
                        error &&
                        <ErrorTemplate
                            error={error}
                        />
                    }

                    <div
                        className='flex items-center justify-center'
                    >
                        <button
                            className='py-2 px-4 bg-themeprimary rounded-md text-white font-semibold text-sm flex items-center gap-2'
                            onClick={extractTextFromImage}
                            disabled={inProgress}
                        >
                            {
                                inProgress &&
                                <RiLoader4Line
                                    size={20}
                                    className='animate-spin'
                                />
                            }
                            {inProgress ? "Extracting..." : "Extract Text"}
                        </button>
                    </div>

                    {/* Result */}
                    {
                        resultText && <ResultTemplate result={resultText}/>
                    }

                </div>
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
            <div>
                {result}
            </div>
        </div>
    )
}

export default ImageToTextConvertorPage