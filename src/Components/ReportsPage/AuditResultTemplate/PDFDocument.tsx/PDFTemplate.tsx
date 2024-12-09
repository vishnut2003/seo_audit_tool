import { Document, Font, Text } from "@react-pdf/renderer";
import React from "react";
import PageTemplate from "./PageTemplate";
import DomainMetrics from "./DomainMetrics";
import HeroTemplate from "./HeroTemplate";
import { getReportResponseInterface } from "@/Interfaces/SeoOptimer/GetResponseInterface";
import PerformanceMetrics from "./PerformanceMetrics/PerformanceMetrics";

const PDFTemplate = ({fullReport}: {
    fullReport: getReportResponseInterface
}) => {

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
            <HeroTemplate fullReport={fullReport}/>

            {/* Domain Metrics */}
            <PageTemplate>
                <DomainMetrics fullReport={fullReport} />
            </PageTemplate>

            {/* performance metrics */}
            <PageTemplate>
                <PerformanceMetrics fullReport={fullReport}/>
            </PageTemplate>
        </Document>
    )
}

export default PDFTemplate