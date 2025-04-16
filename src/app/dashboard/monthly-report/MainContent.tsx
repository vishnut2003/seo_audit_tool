'use client';

import { useEffect, useState } from "react";
import MonthlyReportHeader from "./sections/Header";
import PpcPerformanceMonthlyReport from "./sections/PpcPerformance";
import SeoPerformanceMonthlyReport from "./sections/SeoPerformance";
import TrafficOverviewMonthlyReport from "./sections/TrafficOverview";
import { TotalSessionMonthlyReportInterface } from "@/utils/server/monthlyReport/trafficOverview/totalSession";
import { TotalBounceRateMonthlyReportInterface } from "@/utils/server/monthlyReport/trafficOverview/totalBounceRate";
import { ConversionDataMonthlyReportInterface } from "@/utils/server/monthlyReport/trafficOverview/conversionsData";
import { SessionConversionDataMonthlyReportInterface } from "@/utils/server/monthlyReport/trafficOverview/sessionConversionData";
import { TopChannelsDataMonthlyReportInterface } from "@/utils/server/monthlyReport/trafficOverview/topChannels";
import { NewUsersDataMonthlyReportInterface } from "@/utils/server/monthlyReport/trafficOverview/newUsersData";
import { TotalSessionByCountryMonthlyReportInterface } from "@/utils/server/monthlyReport/trafficOverview/engagedSessionByCountry";
import { SessionFromOrganicMonthlyReportInterface } from "@/utils/server/monthlyReport/seoPerformance/sessionFromOrganic";
import { EngagedSessionOrganicMonthlyReportInterface } from "@/utils/server/monthlyReport/seoPerformance/EngagedSessionOrganic";
import { OrganicConversionMonthlyReportInterface } from "@/utils/server/monthlyReport/seoPerformance/organicConversions";

const MonthlyReportMainContent = ({
    totalSessionData,
    totalBounceRate,
    conversionData,
    sessionConversionData,
    topChannelsData,
    newUsersData,
    sessionByCountryData,
    sessionFromOrganicData,
    engagedSessionOrganicData,
    organicConversionData,
}: {
    totalSessionData: TotalSessionMonthlyReportInterface,
    totalBounceRate: TotalBounceRateMonthlyReportInterface,
    conversionData: ConversionDataMonthlyReportInterface,
    sessionConversionData: SessionConversionDataMonthlyReportInterface,
    topChannelsData: TopChannelsDataMonthlyReportInterface,
    newUsersData: NewUsersDataMonthlyReportInterface,
    sessionByCountryData: TotalSessionByCountryMonthlyReportInterface,
    sessionFromOrganicData: SessionFromOrganicMonthlyReportInterface,
    engagedSessionOrganicData: EngagedSessionOrganicMonthlyReportInterface,
    organicConversionData: OrganicConversionMonthlyReportInterface,
}) => {

    // Traffic Overview
    const [passingTotalSessionData, setPassingTotalSessionData] = useState<TotalSessionMonthlyReportInterface | null>(null);
    const [passingTotalBounceData, setPassingTotalBounceData] = useState<TotalBounceRateMonthlyReportInterface | null>(null);
    const [passingConversionData, setPassingConversionData] = useState<ConversionDataMonthlyReportInterface | null>(null);
    const [passingSessionConversionData, setPassingSessionConversionData] = useState<SessionConversionDataMonthlyReportInterface | null>(null);
    const [passingTopChannelsData, setPassingTopChannelsData] = useState<TopChannelsDataMonthlyReportInterface | null>(null);
    const [passingNewUsersData, setPassingNewUsersData] = useState<NewUsersDataMonthlyReportInterface | null>(null);
    const [passingSessionByCountryData, setPassingSessionByCountryData] = useState<TotalSessionByCountryMonthlyReportInterface | null>(null);

    // Seo Performance
    const [passingSessionFromOrganicData, setPassingSessionFromOrganicData] = useState<SessionFromOrganicMonthlyReportInterface | null>(null);
    const [passingEngagedSessionOrganicData, setPassingEngagedSessionOrganicData] = useState<EngagedSessionOrganicMonthlyReportInterface | null>(null);
    const [passingOrganicConversionData, setPassingOrganicConversionData] = useState<OrganicConversionMonthlyReportInterface | null>(null);

    useEffect(() => {
        // Traffic overview
        setPassingTotalSessionData(totalSessionData);
        setPassingTotalBounceData(totalBounceRate);
        setPassingConversionData(conversionData);
        setPassingSessionConversionData(sessionConversionData);
        setPassingTopChannelsData(topChannelsData);
        setPassingNewUsersData(newUsersData);
        setPassingSessionByCountryData(sessionByCountryData);
        
        // Seo Performance
        setPassingSessionFromOrganicData(sessionFromOrganicData);
        setPassingEngagedSessionOrganicData(engagedSessionOrganicData);
        setPassingOrganicConversionData(organicConversionData);
    }, [
        totalSessionData,
        totalBounceRate,
        conversionData,
        sessionConversionData,
        topChannelsData,
        newUsersData,
        sessionByCountryData,
        sessionFromOrganicData,
        engagedSessionOrganicData,
        organicConversionData,
    ]);

    return (
        <div
            className="flex flex-col items-center justify-start pb-[50px]"
        >
            {/* Heading section */}
            <MonthlyReportHeader />

            {/* Traffic Overview */}
            <TrafficOverviewMonthlyReport
                totalSessionData={passingTotalSessionData}
                totalBounceRate={passingTotalBounceData}
                conversionData={passingConversionData}
                sessionConversionData={passingSessionConversionData}
                topChannelsData={passingTopChannelsData}
                newUsersData={passingNewUsersData}
                sessionByCountry={passingSessionByCountryData}
            />

            {/* SEO Performance */}
            <SeoPerformanceMonthlyReport
                sessionFromOrganicData={passingSessionFromOrganicData}
                engagedSessionOrganicData={passingEngagedSessionOrganicData}
                organicConversionData={passingOrganicConversionData}
            />

            {/* PPC Performance */}
            <PpcPerformanceMonthlyReport />
        </div>
    )
}

export default MonthlyReportMainContent