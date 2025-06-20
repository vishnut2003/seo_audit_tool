import React from 'react'

const SingleToolsLayout = ({
    children,
    pageTitle,
    pageDesc,
    disableSidebar,
}: {
    children: React.ReactNode,
    pageTitle: string,
    pageDesc: string,
    disableSidebar?: boolean,
}) => {
    return (
        <div
            className='bg-gray-50 w-screen min-h-screen'
        >

            {/* Main Content */}
            <div
                className='flex flex-col justify-start items-center py-8 gap-3'
            >
                <div
                    className='max-w-screen-xl w-full flex items-start gap-2'
                >
                    {/* Main content */}
                    <div
                        className='w-full py-7 px-7 bg-white shadow-lg shadow-gray-100 border border-gray-100'
                    >
                        <div
                            className='flex flex-col gap-3 items-center border-b border-gray-200 pb-7 mb-7'
                        >
                            <h1
                                className='text-2xl font-bold text-center'
                            >{pageTitle}</h1>
                            <p
                                className='text-xs text-center max-w-[600px] leading-[20px]'
                            >{pageDesc}</p>
                        </div>
                        {children}
                    </div>

                    {/* Sidebar */
                        !disableSidebar &&
                        <div
                            className='w-[500px] py-3 px-5 bg-white shadow-lg shadow-gray-100 border border-gray-100'
                        ></div>
                    }
                </div>
            </div>
        </div>
    )
}

export default SingleToolsLayout;