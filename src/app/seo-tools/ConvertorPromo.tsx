'use client';

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";
import { RiArrowRightLine } from "@remixicon/react";
import FileTypePopover from "./(tools)/(Convertor)/FileTypePopover";
import { useEffect, useState } from "react";
import { convertorFileTypes } from "./(tools)/(Convertor)/fileTypes";
import { useRouter } from "next/navigation";

interface ForPopoverData {
    [category: string]: string[],
}

const ConvertorPromo = () => {

    const [fromPopoverOpen, setFromPopoverOpen] = useState<boolean>(false);
    const [currentFromCategory, setCurrentFromCategory] = useState('image');
    const [FromTypePopoverData, setFromTypePopoverData] = useState<ForPopoverData>({});

    const [toPopoverOpen, setToPopoverOpen] = useState<boolean>(false);
    const [toTypeLoading, setToTypeLoading] = useState<boolean>(false);
    const [ToTypePopoverData, setToTypePopoverData] = useState<ForPopoverData>({});
    const [currentToCategory, setCurrentToCategory] = useState<string>('image');

    const [fromType, setFromType] = useState<string | null>(null);
    const [toType, setToType] = useState<string | null>(null);

    const [fromTypeFieldError, setFromTypeFieldError] = useState<boolean>(false);
    const [toTypeFieldError, setToTypeFieldError] = useState<boolean>(false);

    const router = useRouter()

    useEffect(() => {
        const data: ForPopoverData = {};
        for (const fileType of convertorFileTypes) {
            if (data[fileType.category]) {
                data[fileType.category].push(fileType.type);
            } else {
                data[fileType.category] = [fileType.type]
            }
        }

        setFromTypePopoverData(data);
    }, [])

    async function updateToTypeData({ fromType }: {
        fromType: string,
    }) {
        setToTypeLoading(true);

        const selectedFileType = convertorFileTypes.find(fileType => fileType.type === fromType);

        if (!selectedFileType) {
            return;
        }

        const data: ForPopoverData = {};
        for (const item of selectedFileType.canConvertTo || []) {
            data[item.category] = item.types;
        }
        setCurrentToCategory(Object.keys(data)[0])
        setToTypePopoverData(data);
        setToTypeLoading(false);
    }

    async function convertButtonAction() {
        setFromTypeFieldError(false);
        setToTypeFieldError(false);
        if (!fromType && !toType) {
            setFromTypeFieldError(true)
            setToTypeFieldError(true)
            return;
        } else if (!fromType) {
            setFromTypeFieldError(true)
            return;
        } else if (!toType) {
            setToTypeFieldError(true);
            return;
        }

        const targetUrl = `/seo-tools/convertor?from=${fromType}&to=${toType}`;
        router.push(targetUrl)
    }

    return (
        <div
            className="flex flex-col md:flex-row gap-3 items-center bg-gradient-to-r from-themesecondary to-white py-4 px-6 text-white rounded-lg"
        >
            <div
                className="w-full md:w-[80%] space-y-2"
            >
                <h2
                    className="text-2xl font-semibold drop-shadow-md"
                >Convert to anything</h2>
                <p
                    className="text-base drop-shadow-md"
                >Convert any image or document file effortlessly into your desired format with speed, precision, and ease.</p>
            </div>
            <div
                className="w-full flex flex-col gap-3 items-center"
            >
                <div
                    className="flex flex-col gap-3 items-center"
                >
                    <div
                        className="flex items-center gap-2"
                    >
                        <Popover
                            open={fromPopoverOpen}
                            onOpenChange={setFromPopoverOpen}
                        >
                            <PopoverTrigger
                                className={`bg-gradient-to-r from-gray-200 to-white shadow-md py-2 px-6 rounded-md uppercase font-medium text-sm ${fromTypeFieldError ? "border border-red-500 text-red-500" : "text-themeprimary"}`}
                            >{fromType || "Select"}</PopoverTrigger>
                            <PopoverContent
                                className="w-[400px]"
                            >
                                <FileTypePopover
                                    categories={Object.keys(FromTypePopoverData)}
                                    types={FromTypePopoverData[currentFromCategory] || []}
                                    currentCategory={currentFromCategory}
                                    setCategory={setCurrentFromCategory}
                                    onSelection={(value) => {
                                        setFromType(value);
                                        setFromPopoverOpen(false);
                                        updateToTypeData({ fromType: value });
                                    }}
                                />
                            </PopoverContent>
                        </Popover>
                        <RiArrowRightLine
                            size={30}
                        />
                        <Popover
                            open={toPopoverOpen}
                            onOpenChange={setToPopoverOpen}
                        >
                            <PopoverTrigger
                                className={`bg-gradient-to-r from-gray-200 to-white shadow-md py-2 px-6 rounded-md uppercase font-medium text-sm ${toTypeFieldError ? "border border-red-500 text-red-500" : "text-themeprimary"}`}
                                disabled={toTypeLoading}
                            >{toTypeLoading ? "Loading..." : toType || "Select"}</PopoverTrigger>
                            <PopoverContent
                                className="w-[400px]"
                            >
                                <FileTypePopover
                                    categories={Object.keys(ToTypePopoverData)}
                                    currentCategory={currentToCategory}
                                    setCategory={setCurrentToCategory}
                                    types={ToTypePopoverData[currentToCategory]}
                                    onSelection={(value) => {
                                        setToType(value)
                                        setToPopoverOpen(false)
                                    }}
                                />
                            </PopoverContent>
                        </Popover>

                    </div>
                    <button
                        className="bg-themesecondary py-3 px-6 text-base font-semibold w-full rounded-lg"
                        type="button"
                        onClick={convertButtonAction}
                    >
                        Convert
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConvertorPromo