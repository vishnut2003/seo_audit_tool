'use client';

import { useState } from "react";
import SingleToolsLayout from "../../LayoutTemplate";
import { FileUploadTemplate } from "./FileUploadTemplate";
import ErrorTemplate from "@/Components/SmallSEOTools/ErrorTemplate";
import { Slider } from "@/Components/ui/slider";
import axios from "axios";
import { base64ToFile } from "@/lib/utils";
import SingleImageResultCard from "./SingleImageResultCard";

const PAGE_TITLE = "Image Compressor";
const PAGE_DESC = "Our Image Compressor uses a smart combination of compression algorithms and best optimization to compress the size of your images while keeping the same level of quality. Upload up to 20 photos simultaneously to compress image size and wait for the results."

const ImageCompressorPage = () => {

    const [files, setFiles] = useState<File[]>([]);
    const [quality, setQuality] = useState<number[]>([33]);
    const [resultFiles, setResultFiles] = useState<File[]>([]);

    const [error, setError] = useState<string | null>(null);

    async function handleFileSubmit() {
        setError(null);
        if (files.length === 0) {
            return setError("Atleast one file required!");
        }

        console.log(files);

        const formData = new FormData();
        files.forEach((file) => {
            formData.append('files', file);
        });
        formData.append('quality', `${quality}`);

        const response = await axios.post<string[]>('/api/small-seo-tools/image-compressor/compress', formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }
        );

        const base64Files = response.data;

        const resultFiles: File[] = []

        for (const [index, base64] of base64Files.entries()) {
            const file = base64ToFile(base64, files[index].name, 'image/jpeg');
            resultFiles.push(file);
        }

        setResultFiles(resultFiles);
    }

    return (
        <SingleToolsLayout
            pageTitle={PAGE_TITLE}
            pageDesc={PAGE_DESC}
        >
            <div
                className="space-y-4"
            >
                {/* Image uploader */}
                <div>
                    <FileUploadTemplate
                        files={files}
                        setError={setError}
                        setFiles={setFiles}
                    />
                </div>
                {
                    error &&
                    <ErrorTemplate
                        error={error}
                    />
                }
                <div
                    className="flex items-center justify-between"
                >
                    {/* Quality Range */}
                    <div
                        className="w-[50%]"
                    >
                        <div
                            className="flex items-center justify-between mb-1 font-semibold"
                        >
                            <p>Quality</p>
                            <p>{quality}%</p>
                        </div>
                        <Slider
                            defaultValue={quality}
                            max={100}
                            step={1}
                            value={quality}
                            onValueChange={(e) => setQuality(e)}
                        />
                    </div>
                    <div
                        className="w-full flex justify-end items-center"
                    >
                        <button
                            className="py-2 px-4 bg-themesecondary rounded-md text-white font-semibold"
                            onClick={handleFileSubmit}
                        >
                            Resize Images
                        </button>
                    </div>
                </div>

                {
                    resultFiles.length > 0 &&
                    <div
                        className="space-y-5"
                    >
                        <h2
                            className="font-semibold text-xl"
                        >Result</h2>
                        <div
                            className="flex flex-col gap-4"
                        >
                            {
                                resultFiles.map((file, index) => {
                                    return (
                                        <SingleImageResultCard
                                            file={file}
                                            key={index}
                                        />
                                    )
                                })
                            }
                        </div>
                    </div>
                }
            </div>
        </SingleToolsLayout>
    )
}

export default ImageCompressorPage