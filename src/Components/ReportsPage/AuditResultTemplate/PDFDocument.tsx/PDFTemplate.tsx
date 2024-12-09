import { Document, Font, Text } from "@react-pdf/renderer";
import React from "react";
import PageTemplate from "./PageTemplate";
import DomainMetrics from "./DomainMetrics";
import HeroTemplate from "./HeroTemplate";

const PDFTemplate = () => {

    Font.register({
        family: 'Open Sans', fonts: [
            { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf' },
            { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf', fontWeight: 600 }
        ]
    })

    return (
        <Document
            style={{
                fontFamily: 'Open Sans'
            }}
            title="Site Audit" >

            {/* Hero Section */}
            <HeroTemplate/>

            {/* Domain Metrics */}
            <PageTemplate>
                <DomainMetrics />
            </PageTemplate>

            <PageTemplate>
                <Text>Second Page</Text>
            </PageTemplate>
        </Document>
    )
}

export default PDFTemplate