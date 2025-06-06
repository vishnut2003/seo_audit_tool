import { RemixiconComponentType, RiArrowRightDoubleFill, RiArticleLine } from "@remixicon/react"

export interface SchemaTypesListJsonReturnFunctionArgumentType {
    [key: string]: string | string[]
}

export interface SchemaTypesListInterface {
    typeName: string,
    icon: RemixiconComponentType,
    enableFields: {
        type: "dropdown" | "text" | "list",
        label: string,
        placeholder: string,
        name: string,
        dropdownList?: string[],
        width?: string,
    }[],
    returnJsonSchema: (fieldsValue: SchemaTypesListJsonReturnFunctionArgumentType) => string,
}

const schemaTypesLists: SchemaTypesListInterface[] = [
    {
        typeName: "Article",
        icon: RiArticleLine,
        enableFields: [
            {
                label: "Article @type",
                name: "type",
                placeholder: "Select Article Type",
                type: "dropdown",
                dropdownList: [
                    "Article",
                    "NewsArticle",
                    "BlogPosting",
                ],
                width: "45%"
            },
            {
                label: "URL",
                placeholder: "URL (WebPage)",
                type: "text",
                name: "url",
                width: "45%",
            },
            {
                label: "Headline",
                placeholder: "Headline",
                type: "text",
                name: "headline",
                width: "100%",
            },
        ],
        returnJsonSchema: (fields) => {

            const type = fields.type;
            const url = fields.url;
            const headline = fields.headline;

            return (
                `<script type="application/ld+json">
    {
    "@context": "https://schema.org",
    "@type": "${type || 'Article'}",
    ${
    url &&
    `"mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "${url}"
    },`}
    "headline": "${headline}",
    "image": "",  
    "author": {
        "@type": "",
        "name": ""
    },  
    "publisher": {
            "@type": "Organization",
            "name": "",
            "logo": {
            "@type": "ImageObject",
            "url": ""
        }
    },
    "datePublished": ""
    }
</script>`
            )
        }
    },
    {
        typeName: "Breadcrumb",
        icon: RiArrowRightDoubleFill,
        enableFields: [],
        returnJsonSchema: () => {

            return "<h1>Breadcrumb</h1>"
        }
    }
]

export default schemaTypesLists;