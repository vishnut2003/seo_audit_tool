import { RiAttachment2 } from '@remixicon/react';
import React, { useRef } from 'react'

const FileUploadOptions = () => {

    const localFileUploadRef = useRef<HTMLInputElement>(null);

    return (
        <div>
            <input
                type="file"
                className='hidden'
                ref={localFileUploadRef}
            />
            <button
                onClick={() => {
                    localFileUploadRef.current?.click();
                }}
                className='flex items-center gap-2 py-2 px-4 text-white bg-themeprimary rounded-md shadow-lg'
            >
                <RiAttachment2
                    size={20}
                />
                upload
            </button>
        </div>
    )
}

export default FileUploadOptions