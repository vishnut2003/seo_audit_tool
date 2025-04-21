'use client';

import Markdown from "markdown-to-jsx";

const MarkDownSeoTools = ({
    children,
}: {
    children: string,
}) => {
    return (
        <Markdown
            options={{
                overrides: {
                    p: {
                        props: {
                            className: 'mb-3'
                        }
                    },
                    ul: {
                        props: {
                            className: 'flex flex-col gap-3 mb-3'
                        }
                    },
                    code: {
                        props: {
                            className: 'py-[3px] px-[5px] bg-gray-200 rounded-md'
                        }
                    },

                    // Table
                    table: {
                        props: {
                            className: 'text-left mb-5 shadow-md shadow-gray-200 rounded-md overflow-hidden'
                        }
                    },
                    tr: {
                        props: {
                            className: 'even:bg-gray-100'
                        }
                    },
                    td: {
                        props: {
                            className: 'py-2 px-3'
                        }
                    },
                    th: {
                        props: {
                            className: 'py-2 px-3'
                        }
                    },
                    thead: {
                        props: {
                            className: 'bg-gray-200 text-sm text-themeprimery'
                        }
                    }
                }
            }}
        >
            {children}
        </Markdown>
    )
}

export default MarkDownSeoTools