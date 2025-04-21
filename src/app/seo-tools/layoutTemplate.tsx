import React from 'react'

const SEOToolsLayout = ({
    children,
    pageTitle,
}: {
    children: React.ReactNode,
    pageTitle: string,
}) => {
    return (
        <div
            className='bg-gray-50 w-screen h-screen'
        >

            {/* Main Content */}
            <div
                className='flex flex-col justify-start items-center py-8 gap-3'
            >
                <h1
                    className='text-2xl font-bold'
                >{pageTitle}</h1>
                <div
                    className='max-w-screen-xl w-full flex items-start gap-2'
                >
                    {/* Main content */}
                    <div
                        className='w-full py-7 px-7 bg-white shadow-lg shadow-gray-100 border border-gray-100'
                    >{children}</div>

                    {/* Sidebar */}
                    <div
                        className='w-[500px] py-3 px-5 bg-white shadow-lg shadow-gray-100 border border-gray-100'
                    ></div>
                </div>
            </div>
        </div>
    )
}

export default SEOToolsLayout