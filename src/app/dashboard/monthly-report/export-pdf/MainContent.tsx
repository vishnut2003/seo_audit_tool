'use client';

import { Document, Font, Image, PDFViewer } from '@react-pdf/renderer'
import React, { useState } from 'react'
import PageTemplate from './pdf/PageTemplate'
import Convert2Image from './Convert2Image';
import MonthlyReportHeader from '../sections/Header';
import TrafficOverviewMonthlyReport from '../sections/TrafficOverview';
import SeoPerformanceMonthlyReport from '../sections/SeoPerformance';

const MainContentMonthlyReportExportPdf = () => {

    const [reportHeader, setReportHeader] = useState<string | null>(null);
    const [trafficOverview, setTrafficOverview] = useState<string | null>(null);
    const [seoPerformance, setSeoPerformance] = useState<string | null>(null);

    Font.register({
        family: 'Open Sans', fonts: [
            { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf' },
            { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf', fontWeight: 600 }
        ]
    })

    if (!reportHeader) {
        return (
            <Convert2Image
                onCapture={setReportHeader}
            >
                <MonthlyReportHeader />
            </Convert2Image>
        )
    }

    if (!trafficOverview) {
        return (
            <Convert2Image
                onCapture={setTrafficOverview}
            >
                <TrafficOverviewMonthlyReport />
            </Convert2Image>
        )
    }

    if (!seoPerformance) {
        return (
            <Convert2Image
                onCapture={setSeoPerformance}
            >
                <SeoPerformanceMonthlyReport />
            </Convert2Image>
        )
    }

    return (
        <PDFViewer
            className="w-full h-[100%] absolute top-0 left-0"
        >
            <Document
                style={{
                    fontFamily: 'Open Sans',
                }}
                title="Monthly Report" >

                <PageTemplate>
                    {[
                        reportHeader,
                        trafficOverview,
                    ].map((section, index) => (
                        <Image
                            key={index}
                            src={section}
                            style={{
                                width: "100%",
                            }}
                        />
                    ))}
                </PageTemplate>
                
                <PageTemplate>
                    {[
                        seoPerformance,
                    ].map((section, index) => (
                        <Image
                            key={index}
                            src={section}
                            style={{
                                width: "100%",
                            }}
                        />
                    ))}
                </PageTemplate>

            </Document>
        </PDFViewer>
    )
}

export default MainContentMonthlyReportExportPdf