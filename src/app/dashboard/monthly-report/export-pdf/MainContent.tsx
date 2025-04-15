'use client';

import { Document, Font, Image, PDFViewer } from '@react-pdf/renderer'
import React, { useState } from 'react'
import PageTemplate from './pdf/PageTemplate'
import Convert2Image from './Convert2Image';
import MonthlyReportHeader from '../sections/Header';
import TrafficOverviewMonthlyReport from '../sections/TrafficOverview';
import SeoPerformanceMonthlyReport from '../sections/SeoPerformance';
import PpcPerformanceMonthlyReport from '../sections/PpcPerformance';
import { TotalSessionMonthlyReportInterface } from '@/utils/server/monthlyReport/trafficOverview/totalSession';
import { TotalBounceRateMonthlyReportInterface } from '@/utils/server/monthlyReport/trafficOverview/totalBounceRate';
import { ConversionDataMonthlyReportInterface } from '@/utils/server/monthlyReport/trafficOverview/conversionsData';
import { SessionConversionDataMonthlyReportInterface } from '@/utils/server/monthlyReport/trafficOverview/sessionConversionData';
import { TopChannelsDataMonthlyReportInterface } from '@/utils/server/monthlyReport/trafficOverview/topChannels';

const MainContentMonthlyReportExportPdf = ({
    sessionData,
    bounceRateData,
    conversionData,
    sessionConversionData,
    topChannelsData,
}: {
    sessionData: TotalSessionMonthlyReportInterface,
    bounceRateData: TotalBounceRateMonthlyReportInterface,
    conversionData: ConversionDataMonthlyReportInterface,
    sessionConversionData: SessionConversionDataMonthlyReportInterface,
    topChannelsData: TopChannelsDataMonthlyReportInterface,
}) => {

    const [reportHeader, setReportHeader] = useState<string | null>(null);
    const [trafficOverview, setTrafficOverview] = useState<string | null>(null);
    const [seoPerformance, setSeoPerformance] = useState<string | null>(null);
    const [ppcPerformance, setPpcPerformance] = useState<string | null>(null);

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
                <TrafficOverviewMonthlyReport
                    totalSessionData={sessionData}
                    totalBounceRate={bounceRateData}
                    conversionData={conversionData}
                    sessionConversionData={sessionConversionData}
                    topChannelsData={topChannelsData}
                />
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

    if (!ppcPerformance) {
        return (
            <Convert2Image
                onCapture={setPpcPerformance}
            >
                <PpcPerformanceMonthlyReport/>
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
                        ppcPerformance,
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