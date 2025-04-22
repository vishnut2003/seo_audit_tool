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

interface ForPopoverData {
    [category: string]: string[],
}

const ConvertorPromo = () => {

    const [currentCategory, setCurrentCategory] = useState('image');
    const [FromTypePopoverData, setFromTypePopoverData] = useState<ForPopoverData>({});

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
                        <Popover>
                            <PopoverTrigger
                                className="bg-gradient-to-r from-gray-200 to-white shadow-md py-2 px-6 rounded-md text-themeprimary"
                            >Select</PopoverTrigger>
                            <PopoverContent
                                className="w-[400px]"
                            >
                                <FileTypePopover
                                    categories={Object.keys(FromTypePopoverData)}
                                    types={FromTypePopoverData[currentCategory] || []}
                                    currentCategory={currentCategory}
                                    setCategory={setCurrentCategory}
                                    onSelection={(value) => {
                                        console.log(value);
                                    }}
                                />
                            </PopoverContent>
                        </Popover>
                        <RiArrowRightLine
                            size={30}
                        />
                        <Popover>
                            <PopoverTrigger
                                className="bg-gradient-to-r from-gray-200 to-white shadow-md py-2 px-6 rounded-md text-themeprimary"
                            >Select</PopoverTrigger>
                            <PopoverContent>Place content for the popover here.</PopoverContent>
                        </Popover>

                    </div>
                    <button
                        className="bg-themesecondary py-3 px-6 text-base font-semibold w-full rounded-lg"
                    >
                        Convert
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConvertorPromo