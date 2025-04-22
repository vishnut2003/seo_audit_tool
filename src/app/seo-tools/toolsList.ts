
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
            {
                name: "Article Rewriter",
                url: '/seo-tools/article-rewriter',
                imageUrl: '/seo-tools-icons/word-counter.png',
            },
            {
                name: "Image To Text Converter",
                url: '/seo-tools/image-to-text-converter',
                imageUrl: '/seo-tools-icons/word-counter.png',
            },
        ]
    },
    {
        category: "Images Editing Tools",
        desc: "Create a favicon, compress an image or resize a picture with a single click. All essentials for image editing are available in one place.",
        tools: [
            {
                name: "Image Compressor",
                url: '/seo-tools/image-compressor',
                imageUrl: '/seo-tools-icons/word-counter.png',
            },
        ]
    },
]

export default toolsList;