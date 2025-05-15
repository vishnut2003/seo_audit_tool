'use client';

import React, { useEffect, useState } from 'react'

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";
import FileTypePopover from './FileTypePopover';
import { convertorFileTypes } from './fileTypes';
import { RiArrowRightLine } from '@remixicon/react';
import { useRouter, useSearchParams } from 'next/navigation';

interface ForPopoverData {
    [category: string]: string[],
}

const SelectTypesPopup = ({
    enableOnchangeRedirect,
    triggerOnRedirect,
}: {
    enableOnchangeRedirect?: boolean,
    triggerOnRedirect?: () => void,
}) => {

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

    const router = useRouter();
    const searchParams = useSearchParams();

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
        
        // access from and to file types from url
        const urlFromType = searchParams.get('from');
        const urlToType = searchParams.get('to');

        if (urlFromType && urlToType) {
            setFromType(urlFromType);
            setToType(urlToType);
        }
    }, [searchParams])

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

    async function convertButtonAction(liveToFileType?: string) {
        setFromTypeFieldError(false);
        setToTypeFieldError(false);

        if (liveToFileType) {
            const targetUrl = `/seo-tools/convertor?from=${fromType}&to=${liveToFileType}`;
            router.push(targetUrl)
            return;
        }

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
                                    setToType(null)
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

                                    // redirect to selected arguments if onchange redirect is enabled
                                    if (enableOnchangeRedirect) {
                                        if (triggerOnRedirect) {
                                            triggerOnRedirect();
                                        }
                                        convertButtonAction(value);
                                    }
                                }}
                            />
                        </PopoverContent>
                    </Popover>

                </div>
                {
                    !enableOnchangeRedirect &&
                    <button
                        className="bg-themesecondary py-3 px-6 text-base font-semibold w-full rounded-lg"
                        type="button"
                        onClick={() => convertButtonAction()}
                    >
                        Convert
                    </button>
                }
            </div>
        </div>
    )
}

export default SelectTypesPopup