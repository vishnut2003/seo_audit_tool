import { RiAddLargeLine, RiDownloadLine, RiFilePdf2Line, RiFolder5Line, RiFullscreenLine } from '@remixicon/react'
import Link from 'next/link'
import React from 'react'

const ReportPreview = () => {
    return (
        <div
            className='w-full h-full flex flex-col justify-center items-center'
        >
            <RiFilePdf2Line
                size={50}
                className="text-themesecondary mb-3"
            />

            <h2
                className="text-[25px] md:text-[35px] font-extrabold capitalize text-center"
            >OnSite Analysis PDF Report</h2>

            <p
                className="text-[14px] md:text-base text-foreground opacity-50"
            >Use below links to download or preview PDF Report</p>

            <div
                className='flex items-center gap-3'
            >
                <button
                    className='text-foreground mt-3 text-sm font-medium flex justify-center items-center gap-3 bg-white rounded-md py-3 px-5 shadow-xl shadow-gray-200 hover:bg-gray-50'
                >
                    <RiDownloadLine
                        size={20}
                    />
                    <p className='mt-1'>Download</p>
                </button>
                
                <button
                    className='text-foreground mt-3 text-sm font-medium flex justify-center items-center gap-3 bg-white rounded-md py-3 px-5 shadow-xl shadow-gray-200 hover:bg-gray-50'
                >
                    <RiFullscreenLine
                        size={20}
                    />
                    <p className='mt-1'>PDF Viewer</p>
                </button>
            </div>
        </div>
    )
}

export default ReportPreview