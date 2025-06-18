import { RemixiconComponentType, RiArrowRightDoubleFill, RiArticleLine, RiCalendarEventLine } from "@remixicon/react"

export interface SchemaTypesListJsonReturnFunctionArgumentType {
    [key: string]: string | string[] | { [key: string]: string, }[]
}

export interface SchemaTypesListInterface {
    typeName: string,
    icon: RemixiconComponentType,
    enableFields: ({
        type: "dropdown" | "text" | "list" | "list-multi-field" | "date" | "time",
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

        // For condition render
        condition?: {
            is: string,
            equalTo: string,
        }[],

    } | string)[],
    returnJsonSchema: (fieldsValue: SchemaTypesListJsonReturnFunctionArgumentType) => string,
}

export interface MultiFieldsListTypeSingleFieldInterface {
    name: string,
    placeholder: string,
    label: string,
}

const NOT_SELECTED = "None";

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
    },
    {
        typeName: "Event",
        icon: RiCalendarEventLine,
        enableFields: [
            {
                label: "Name",
                name: "name",
                placeholder: "Name",
                type: "text",
                width: "45%",
            },
            {
                label: "Event description",
                name: "event_description",
                placeholder: "Event Description",
                type: "text",
                width: "45%",
            },
            {
                label: "Image URL",
                name: "image_url",
                placeholder: "Image URL",
                type: "text",
                width: "100%",
            },
            {
                label: "Start date",
                name: "start_date",
                placeholder: "Start date",
                type: "date",
                width: "45%",
            },
            {
                label: "Start time",
                name: "start_time",
                placeholder: "Start time",
                type: "time",
                width: "45%",
            },
            {
                label: "End date",
                name: "end_date",
                placeholder: "End date",
                type: "date",
                width: "45%",
            },
            {
                label: "End time",
                name: "end_time",
                placeholder: "End time",
                type: "time",
                width: "45%",
            },
            {
                label: "Event status",
                name: "event_status",
                placeholder: "Event status",
                type: "dropdown",
                dropdownList: [
                    "EventScheduled",
                    "EventPostponed",
                    "EventCancelled",
                    "EventMovedOnline",
                    NOT_SELECTED,
                ],
                width: "45%",
            },
            {
                label: "Attendance Mode",
                name: "attendence_mode",
                placeholder: "Attendance Mode",
                type: "dropdown",
                dropdownList: [
                    "Online",
                    "Offline",
                    "Mixed",
                    NOT_SELECTED,
                ],
                width: "45%",
            },

            // START Render if [attendance_mode == Online/Mixed]
            {
                label: "Stream URL",
                name: "stream_url",
                placeholder: "Stream URL",
                type: "text",
                width: "100%",
                condition: [
                    {
                        is: "attendence_mode",
                        equalTo: "Online",
                    },
                    {
                        is: "attendence_mode",
                        equalTo: "Mixed",
                    },
                ]
            },
            // END Render if [attendance_mode == Online/Mixed]

            // START Render if [sttendance_mode == Offline/Mixed]
            {
                label: "Venue's name",
                name: "venue_name",
                placeholder: "Venue's name",
                type: "text",
                width: "45%",
                condition: [
                    {
                        is: "attendence_mode",
                        equalTo: "Offline",
                    },
                    {
                        is: "attendence_mode",
                        equalTo: "Mixed",
                    },
                ],
            },
            {
                label: "Street",
                name: "street",
                placeholder: "street",
                type: "text",
                width: "45%",
                condition: [
                    {
                        is: "attendence_mode",
                        equalTo: "Offline",
                    },
                    {
                        is: "attendence_mode",
                        equalTo: "Mixed",
                    },
                ],
            },
            {
                label: "City",
                name: "city",
                placeholder: "City",
                type: "text",
                width: "45%",
                condition: [
                    {
                        is: "attendence_mode",
                        equalTo: "Offline",
                    },
                ],
            },
            {
                label: "Zip code",
                name: "zip_code",
                placeholder: "Zip code",
                type: "text",
                width: "45%",
                condition: [
                    {
                        is: "attendence_mode",
                        equalTo: "Offline",
                    },
                    {
                        is: "attendence_mode",
                        equalTo: "Mixed",
                    },
                ],
            },
            {
                label: "Country code",
                name: "country_code",
                placeholder: "Country code",
                type: "text",
                width: "45%",
                condition: [
                    {
                        is: "attendence_mode",
                        equalTo: "Offline",
                    },
                    {
                        is: "attendence_mode",
                        equalTo: "Mixed",
                    },
                ],
            },
            // END Render if [sttendance_mode == Offline/Mixed]

            "Performer",
            {
                label: "Performer @type",
                name: "performer_type",
                placeholder: "Performer @type",
                type: "dropdown",
                dropdownList: [
                    "Person",
                    "PerformingGroup",
                    "MusicGroup",
                    "DanceGroup",
                    "TheaterGroup",
                    NOT_SELECTED,
                ],
                width: "45%",
            },
            {
                label: "Performer's name",
                name: "performer_name",
                placeholder: "Performer's name",
                type: "text",
                width: "45%",
            },

            // Offers
            "Offers",
            {
                label: "Currency",
                name: "currency_code",
                placeholder: "Currency code",
                type: "text",
                width: "45%"
            },
            {
                label: "Tickets",
                name: "ticket_offers",
                placeholder: "Tickets",
                type: "list-multi-field",
                addButtonText: "Add Ticket",
                multiField: [
                    {
                        label: "Name",
                        name: "name",
                        placeholder: "Name",
                    },
                    {
                        label: "Price",
                        name: "price",
                        placeholder: "Price",
                    },
                    {
                        label: "Available from",
                        name: "available_from",
                        placeholder: "Available from",
                    },
                    {
                        label: "URL",
                        name: "url",
                        placeholder: "URL",
                    },
                    {
                        label: "Availability",
                        name: "availability",
                        placeholder: "Availability",
                    },
                ]
            }
        ],
        returnJsonSchema: (fieldData) => {

            const name = fieldData["name"];
            const eventDescription = fieldData["event_description"];
            const imageUrl = fieldData["image_url"];

            // Event timing
            const startDate = fieldData["start_date"];
            const startTime = fieldData["start_time"];
            const endDate = fieldData["end_date"];
            const endTime = fieldData["end_time"];

            const eventStatus = fieldData["event_status"];
            const attendanceMode = fieldData["attendence_mode"];

            // Online attendance
            const streamUrl = fieldData["stream_url"];

            // Offline attendance
            const venueName = fieldData["venue_name"];
            const street = fieldData["street"];
            const city = fieldData["city"];
            const zipCode = fieldData["zip_code"];
            const countryCode = fieldData["country_code"];

            // Performer
            const performerType = fieldData["performer_type"];
            const performerName = fieldData["performer_name"];

            // Offers
            const currency = fieldData["currency_code"];
            const ticketsOffers = fieldData["ticket_offers"];

            function eventAttendanceSchema() {
                if (attendanceMode && attendanceMode !== NOT_SELECTED) {
                    console.log("working...")

                    const options = {
                        "Online": "OnlineEventAttendanceMode",
                        "Offline": "OfflineEventAttendanceMode",
                        "Mixed": "MixedEventAttendanceMode",
                    };

                    const initData = `,\n\t"eventAttendanceMode": "https://schema.org/${options[attendanceMode as keyof typeof options]}",`;
                    const onlineData = `{\n\t\t"@type": "VirtualLocation", \n\t\t"url": "${streamUrl || ""}"\n\t}`;
                    const offlineData = `{\n\t\t"@type": "Place", \n\t\t"name": "${venueName || ""}", \n\t\t"address": {\n\t\t\t"@type": "PostalAddress", \n\t\t\t"streetAddress": "${street || ""}", \n\t\t\t"addressLocality": "${city || ""}", \n\t\t\t"postalCode": "${zipCode || ""}", \n\t\t\t"addressCountry": "${countryCode || ""}"\n\t\t}\n\t}`

                    const finalData = `${initData}\n\t"location": ${attendanceMode === "Online" ? onlineData : attendanceMode === "Offline" ? offlineData : `[${onlineData},${offlineData}]`}`

                    return finalData;
                }
            }

            function generatePerformerSchema() {
                if (performerType && performerType !== NOT_SELECTED) {
                    return `,\n\t"performer": {\n\t\t"@type": "${performerType || ""}", \n\t\t"name": "${performerName || ""}"\n\t}`
                }
            }

            function generateOffersSchema() {

                if (ticketsOffers && Array.isArray(ticketsOffers)) {
                    const initData = `,\n\t"offers": `;

                    if (ticketsOffers.length > 0) {
                        return `${initData}${ticketsOffers.length > 1 ? "[" : ""}${ticketsOffers.map((offer) => {
                            const offerObj = offer as { [key: string]: string };
                            return `{\n\t\t"@type": "Offer",\n\t\t"name": "${offerObj["name"] || ""}", \n\t\t"price": "${offerObj["price"] || ""}",\n\t\t"priceCurrency": "${currency || ""}",\n\t\t"validFrom": "${offerObj["available_from"] || ""}", \n\t\t"url": "${offerObj["url"] || ""}", \n\t\t"availability": "${offerObj["availability"] || ""}"\n\t}`
                        })}${ticketsOffers.length > 1 ? "]" : ""}`
                    } else if (ticketsOffers.length === 1) {
                        return `${initData}${ticketsOffers.map((offer) => {
                            const offerObj = offer as { [key: string]: string };
                            return `{\n\t\t"@type": "Offer",\n\t\t"name": "${offerObj["name"] || ""}", \n\t\t"price": "${offerObj["price"]}",\n\t\t"priceCurrency": "${currency}",\n\t\t"validFrom": "${offerObj["available_from"]}", \n\t\t"url": "${offerObj["url"]}", \n\t\t"availability": "${offerObj["availability"]}"\n\t}`
                        })}`
                    }
                }
                
                return ""
            }

            return (`<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "${name || ""}",${eventDescription ? `\n\t"description": "${eventDescription}",` : ""}${imageUrl ? `\n\t"image": "${imageUrl}",` : ""}
    "startDate": "${startDate ? `${startDate}${startTime ? `T${startTime}` : ""}` : ""}"${endDate ? `,\n\t"endDate": "${endDate}${endTime ? `T${endTime}` : ""}"` : ""}${eventStatus && eventStatus !== NOT_SELECTED ? `,\n\t"eventStatus": "${`https://schema.org/${eventStatus}`}"` : ""}${eventAttendanceSchema() || ""}${generatePerformerSchema() || ""}${generateOffersSchema() || ""}
}
</script>`);
        }
    }
]

export default schemaTypesLists;