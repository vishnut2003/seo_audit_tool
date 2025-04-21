
export interface SmallSEOToolsItemListInterface {
    category: string,
    desc: string,
    tools: ToolItemSEOTool[],
}

export interface ToolItemSEOTool {
    name: string,
    url: string,
    imageUrl: string,
}

const toolsList: SmallSEOToolsItemListInterface[] = [
    {
        category: "Text Analysis Tools",
        desc: "A complete set of text tools is now at your fingertips. Check plagiarism, rewrite an article, run a spell checker, count words or change text case.",
        tools: [
            {
                name: "Word Counter",
                url: '/seo-tools/word-counter',
                imageUrl: '/seo-tools-icons/word-counter.png',
            },
        ]
    },
]

export default toolsList;