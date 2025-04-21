import { RiErrorWarningLine } from '@remixicon/react'
import React from 'react'

const ErrorTemplate = ({ error }: {
    error: string,
}) => {
    return (
        <div
            className='text-sm bg-red-50 text-red-500 flex gap-2 items-center py-3 px-4 rounded-md'
        >
            <RiErrorWarningLine
                size={20}
            />
            <p>{error}</p>
        </div>
    )
}

export default ErrorTemplate