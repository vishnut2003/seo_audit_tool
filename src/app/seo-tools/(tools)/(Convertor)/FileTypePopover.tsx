'use client';

import { RiArrowRightSLine, RiErrorWarningFill } from "@remixicon/react";
import { Dispatch, SetStateAction } from "react";

const FileTypePopover = ({
    categories,
    types,
    currentCategory,
    setCategory,
    onSelection,
}: {
    categories?: string[],
    types?: string[],
    currentCategory: string,
    setCategory: Dispatch<SetStateAction<string>>,
    onSelection: (value: string) => void,
}) => {
    return (
        <div
            className="w-full"
        >
            <div
                className="flex items-start gap-3"
            >
                <div
                    className="w-max px-[3px] space-y-2"
                >
                    {categories?.map((category, index) => (
                        <button
                            key={index}
                            className={`w-full py-[4px] px-[10px] flex items-center justify-between gap-1 text-sm font-semibold rounded-md capitalize ${currentCategory === category && "bg-themesecondary text-white"}`}
                            onMouseEnter={() => setCategory(category)}
                        >
                            {category}
                            <RiArrowRightSLine
                                size={13}
                            />
                        </button>
                    ))}
                </div>
                <div
                    className="w-full bg-gray-100 rounded-md p-2"
                >
                    <div
                        className={!types || types.length === 0 ? "" : "grid grid-cols-4"}
                    >
                        {!types || types.length === 0 ?
                            <div
                                className="rounded-md bg-red-50 text-red-500 flex items-center py-3 px-4"
                            >
                                <RiErrorWarningFill
                                    size={20}
                                />
                                <p
                                    className="text-sm font-semibold"
                                >Please select source file type</p>
                            </div>
                            : types?.map((type, index) => (
                                <button
                                    key={index}
                                    className="text-sm text-left py-1 px-[7px] rounded-md hover:bg-themesecondary hover:text-white uppercase"
                                    onClick={() => onSelection(type)}
                                >
                                    {type}
                                </button>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FileTypePopover