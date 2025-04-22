


interface ConvertorFileTypesData {
    type: string,
    category: 'image' | 'document',
    canConvertTo: {
        category: ConvertorFileTypesData["category"],
        types: string[],
    }[],
}

const convertorFileTypes: ConvertorFileTypesData[] = [
    {
        type: "png",
        category: "image",
        canConvertTo: [
            {
                category: "document",
                types: ['pdf'],
            },
            {
                category: "image",
                types: ['avif', 'bmp', 'eps', 'gif', 'icns', 'ico', 'jpg', 'odd', 'ps', 'psd', 'tiff', 'webp'],
            },
        ],
    },
    {
        type: "3fr",
        category: "image",
        canConvertTo: [
            {
                category: "document",
                types: ['pdf'],
            },
            {
                category: "image",
                types: ['avif', 'bmp', 'eps', 'gif', 'ico', 'jpg', 'odd', 'png', 'ps', 'psd', 'tiff', 'webp'],
            },
        ]
    },
    {
        type: "pdf",
        category: "document",
        canConvertTo: [
            {
                category: "document",
                types: ['pdf'],
            },
            {
                category: "image",
                types: ['avif', 'bmp', 'eps', 'gif', 'icns', 'ico', 'jpg', 'odd', 'ps', 'psd', 'tiff', 'webp'],
            },
        ],
    },
]

export { convertorFileTypes, type ConvertorFileTypesData }