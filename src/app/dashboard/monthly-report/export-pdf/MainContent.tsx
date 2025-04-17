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
import { NewUsersDataMonthlyReportInterface } from '@/utils/server/monthlyReport/trafficOverview/newUsersData';
import { TotalSessionByCountryMonthlyReportInterface } from '@/utils/server/monthlyReport/trafficOverview/engagedSessionByCountry';
import { SessionFromOrganicMonthlyReportInterface } from '@/utils/server/monthlyReport/seoPerformance/sessionFromOrganic';
import { EngagedSessionOrganicMonthlyReportInterface } from '@/utils/server/monthlyReport/seoPerformance/EngagedSessionOrganic';
import { OrganicConversionMonthlyReportInterface } from '@/utils/server/monthlyReport/seoPerformance/organicConversions';
import { OrganicRevenueMonthlyReportInterface } from '@/utils/server/monthlyReport/seoPerformance/organicRevenue';
import { TopPagesOrganicMonthlyReport } from '@/utils/server/monthlyReport/seoPerformance/topPagesOrganic';
import { TopBrowsersMonthlyReportInterface } from '@/utils/server/monthlyReport/seoPerformance/topBrowsers';
import { TopLandingPagesMonthlyReport } from '@/utils/server/monthlyReport/seoPerformance/topLandingPages';
import { AdvertiserAdsCostMonthlyReportInterface } from '@/utils/server/monthlyReport/ppcPerformance/advertiserAdsCost';
import { PaidConversionMonthlyReportInterface } from '@/utils/server/monthlyReport/ppcPerformance/paidConversion';
import { PaidConversionRateMonthlyReportInterface } from '@/utils/server/monthlyReport/ppcPerformance/PaidConversionRate';
import { PaidRevenueMonthlyReportInterface } from '@/utils/server/monthlyReport/ppcPerformance/paidRevenue';

const MainContentMonthlyReportExportPdf = ({
    sessionData,
    bounceRateData,
    conversionData,
    sessionConversionData,
    topChannelsData,
    newUsersData,
    sessionByCountry,
    sessionFromOrganic,
    engagedSessionOrganic,
    organicConversion,
    organicRevenue,
    topPagesOrganic,
    topBrowsers,
    topLandingPages,
    advertiserAdsCost,
    paidConversionData,
    paidConversionRateData,
    paidRevenueData,
    isPdf,
}: {
    sessionData: TotalSessionMonthlyReportInterface,
    bounceRateData: TotalBounceRateMonthlyReportInterface,
    conversionData: ConversionDataMonthlyReportInterface,
    sessionConversionData: SessionConversionDataMonthlyReportInterface,
    topChannelsData: TopChannelsDataMonthlyReportInterface,
    newUsersData: NewUsersDataMonthlyReportInterface,
    sessionByCountry: TotalSessionByCountryMonthlyReportInterface,
    sessionFromOrganic: SessionFromOrganicMonthlyReportInterface,
    engagedSessionOrganic: EngagedSessionOrganicMonthlyReportInterface,
    organicConversion: OrganicConversionMonthlyReportInterface,
    organicRevenue: OrganicRevenueMonthlyReportInterface,
    topPagesOrganic: TopPagesOrganicMonthlyReport,
    topBrowsers: TopBrowsersMonthlyReportInterface,
    topLandingPages: TopLandingPagesMonthlyReport,
    advertiserAdsCost: AdvertiserAdsCostMonthlyReportInterface,
    paidConversionData: PaidConversionMonthlyReportInterface,
    paidConversionRateData: PaidConversionRateMonthlyReportInterface,
    paidRevenueData: PaidRevenueMonthlyReportInterface,

    // Component based
    isPdf: {
        pdfDateRange: {
            startDate: string, // in formatte: Mar 1, 2025
            endDate: string, // in formatte: Mar 31, 2025
        }
    }
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
                <MonthlyReportHeader
                    isPdf={isPdf}
                />
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
                    newUsersData={newUsersData}
                    sessionByCountry={sessionByCountry}
                />
            </Convert2Image>
        )
    }

    if (!seoPerformance) {
        return (
            <Convert2Image
                onCapture={setSeoPerformance}
            >
                <SeoPerformanceMonthlyReport
                    sessionFromOrganicData={sessionFromOrganic}
                    engagedSessionOrganicData={engagedSessionOrganic}
                    organicConversionData={organicConversion}
                    organicRevenue={organicRevenue}
                    topPagesOrganic={topPagesOrganic}
                    topBrowsers={topBrowsers}
                    topLandingPages={topLandingPages}
                />
            </Convert2Image>
        )
    }

    if (!ppcPerformance) {
        return (
            <Convert2Image
                onCapture={setPpcPerformance}
            >
                <PpcPerformanceMonthlyReport
                    advertiserAdsCostData={advertiserAdsCost}
                    paidConversionData={paidConversionData}
                    paidConversionRateData={paidConversionRateData}
                    paidRevenueData={paidRevenueData}
                />
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

                <PageTemplate
                    pageNo={1}
                    totalPage={2}
                >
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

                <PageTemplate
                    pageNo={2}
                    totalPage={2}
                >
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