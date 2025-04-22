'use client';

import { formatBytes } from "@/lib/utils";
import { RiDownloadLine } from "@remixicon/react";
import Image from "next/image";

const SingleImageResultCard = ({
    file,
}: {
    file: File,
}) => {
    return (
        <div
            className="flex items-center w-full justify-between gap-3"
        >
            <div>
                <Image
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    width={100}
                    height={100}
                    className="size-full rounded object-cover w-[60px] h-[40px]"
                />
            </div>
            <div
                className="w-full"
            >
                <p
                    className="text-sm font-semibold"
                >{file.name}</p>
                <p
                    className="text-xs opacity-80"
                >{formatBytes(file.size)}</p>
            </div>
            <div>
                <a
                    rel="noopener"
                    download={true}
                    href={URL.createObjectURL(file)}
                    className="flex items-center gap-2 bg-themesecondary rounded-md text-white py-2 px-4 text-sm font-semibold"
                >
                    <RiDownloadLine
                        size={15}
                    />
                    Download
                </a>
            </div>
        </div>
    )
}

export default SingleImageResultCard