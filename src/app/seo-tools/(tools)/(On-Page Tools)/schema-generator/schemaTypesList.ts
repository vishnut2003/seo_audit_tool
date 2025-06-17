import { RemixiconComponentType, RiArrowRightDoubleFill, RiArticleLine } from "@remixicon/react"

export interface SchemaTypesListJsonReturnFunctionArgumentType {
    [key: string]: string | string[] | {[key: string]: string,}[]
}

export interface SchemaTypesListInterface {
    typeName: string,
    icon: RemixiconComponentType,
    enableFields: ({
        type: "dropdown" | "text" | "list" | "list-multi-field" | "date",
        label: string,
        placeholder: string,
        name: string,
        width?: string,

        // For List type
        addButtonText?: string,

        // For multi field list type
        multiField?: MultiFieldsListTypeSingleFieldInterface[],

        // For dropdown type
        dropdownList?: string[],

    } | string)[],
    returnJsonSchema: (fieldsValue: SchemaTypesListJsonReturnFunctionArgumentType) => string,
}

export interface MultiFieldsListTypeSingleFieldInterface {
    name: string,
    placeholder: string,
    label: string,
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
            {
                label: "Image URL(s)",
                name: "images",
                placeholder: "Image URL",
                addButtonText: "Add Image",
                type: "list",
                width: "100%",
            },
            {
                label: "Short description of the article",
                name: "shortDesc",
                placeholder: "Short Description",
                type: "text",
                width: "100%",
            },
            "Author",
            {
                label: "Author @type",
                name: "authorType",
                placeholder: "Person/Organization",
                type: "dropdown",
                dropdownList: [
                    "Person",
                    "Organization",
                ],
                width: "45%",
            },
            {
                label: "Author",
                name: "author",
                placeholder: "Author",
                type: "text",
                width: "45%",
            },
            {
                label: "Author URL",
                name: "authorUrl",
                placeholder: "Author URL",
                type: "text",
                width: "100%",
            },
            "Publisher",
            {
                label: "Publisher",
                name: "publisher",
                placeholder: "Publisher",
                type: "text",
                width: "45%",
            },
            {
                label: "Publisher Logo URL",
                name: "publisherLogoUrl",
                placeholder: "Publisher Logo URL",
                type: "text",
                width: "45%",
            },
            "Dates",
            {
                label: "Date Published",
                name: "datePublished",
                placeholder: "Date Published",
                type: "date",
                width: "45%",
            },
            {
                label: "Date Modified",
                name: "dateModified",
                placeholder: "Date Modified",
                type: "date",
                width: "45%",
            }
        ],
        returnJsonSchema: (fields) => {

            const type = fields.type || "";
            const url = fields.url || "";
            const headline = fields.headline || "";
            const imageUrls = fields.images as string[] | undefined;
            const shortDesc = fields.shortDesc || "";

            // Author
            const authorType = fields.authorType || "";
            const author = fields.author || "";
            const authorUrl = fields.authorUrl || "";

            // Publisher
            const publisher = fields.publisher || "";
            const publisherLogoUrl = fields.publisherLogoUrl || "";

            // Dates
            const datePublished = fields.datePublished || "";
            const dateModified = fields.dateModified || "";

            return (
                `<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "${type || 'Article'}", ${url && `\n\t"mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "${url}"
    },`}
    "headline": "${headline || ""}", ${shortDesc && `\n\t"description": "${shortDesc}",`}
    "image": ${!imageUrls ? `""` : imageUrls.length === 1 ? `"${imageUrls[0]}"` : `[
        ${imageUrls.map((imageUrl, index) => {
                    if (index === 0) {
                        return `"${imageUrl}"`
                    } else {
                        return `\n \t\t"${imageUrl}"`
                    }
                })}
    ]`},  
    "author": {
        "@type": "${authorType || ""}",
        "name": "${author || ""}", ${authorUrl && `\n\t\t"url": "${authorUrl}"`}
    },  
    "publisher": {
            "@type": "Organization",
            "name": "${publisher}",
            "logo": {
                "@type": "ImageObject",
                "url": "${publisherLogoUrl}"
            }
    },
    "datePublished": "${datePublished}", ${dateModified && `\n\t"dateModified": "${dateModified}"`}
}
</script>`
            )
        }
    },
    {
        typeName: "Breadcrumb",
        icon: RiArrowRightDoubleFill,
        enableFields: [
            {
                type: "list-multi-field",
                label: "Breadcrumb items",
                placeholder: "",
                name: "breadcrumbitems",
                width: "100%",
                addButtonText: "Add URL",
                multiField: [
                    {
                        name: "pagename",
                        label: "Page name",
                        placeholder: "Page name",
                    },
                    {
                        name: "url",
                        label: "Page URL",
                        placeholder: "Page URL",
                    },
                ]
            }
        ],
        returnJsonSchema: (fields) => {

            const breadcrumbItems = fields["breadcrumbitems"] as {
                pagename?: string,
                url?: string,
            }[] || [];

            return (`<script type="application/ld+json">
{
    "@context": "https://schema.org/", 
    "@type": "BreadcrumbList", 
    "itemListElement": [${breadcrumbItems.map((item, index) => (`{
        "@type": "ListItem", 
        "position": ${index + 1}, 
        "name": "${item?.pagename || ""}",
        "item": "${item?.url || ""}"
    }`))}]
}
</script>`)
        }
    }
]

export default schemaTypesLists;