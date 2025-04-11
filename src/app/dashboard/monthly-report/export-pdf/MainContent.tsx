'use client';

import { Document, Font, Image, PDFViewer } from '@react-pdf/renderer'
import React, { useState } from 'react'
import PageTemplate from './pdf/PageTemplate'
import Convert2Image from './Convert2Image';
import MonthlyReportMainContent from '../MainContent';

const MainContentMonthlyReportExportPdf = () => {

    const [sectionOneImage, setSectionOneImage] = useState<string | null>(null);

    Font.register({
        family: 'Open Sans', fonts: [
            { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf' },
            { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf', fontWeight: 600 }
        ]
    })

    if (!sectionOneImage) {
        return (
            <Convert2Image
                onCapture={setSectionOneImage}
            >
                <MonthlyReportMainContent/>
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
                    <Image
                        src={sectionOneImage}
                        style={{
                            width: "100%",
                        }}
                    />
                </PageTemplate>

            </Document>
        </PDFViewer>
    )
}

export default MainContentMonthlyReportExportPdf