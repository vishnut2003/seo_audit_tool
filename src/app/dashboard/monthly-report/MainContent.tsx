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
import { OrganicRevenueMonthlyReportInterface } from "@/utils/server/monthlyReport/seoPerformance/organicRevenue";
import { TopPagesOrganicMonthlyReport } from "@/utils/server/monthlyReport/seoPerformance/topPagesOrganic";
import { TopBrowsersMonthlyReportInterface } from "@/utils/server/monthlyReport/seoPerformance/topBrowsers";
import { TopLandingPagesMonthlyReport } from "@/utils/server/monthlyReport/seoPerformance/topLandingPages";
import { AdvertiserAdsCostMonthlyReportInterface } from "@/utils/server/monthlyReport/ppcPerformance/advertiserAdsCost";
import { PaidConversionMonthlyReportInterface } from "@/utils/server/monthlyReport/ppcPerformance/paidConversion";
import { PaidConversionRateMonthlyReportInterface } from "@/utils/server/monthlyReport/ppcPerformance/PaidConversionRate";
import { PaidRevenueMonthlyReportInterface } from "@/utils/server/monthlyReport/ppcPerformance/paidRevenue";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import LoadingLineMonthlyReport from "./LoadingLine";

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
    organicRevenueData,
    topPagesOrganicData,
    topBrowsersData,
    topLandingPagesData,
    advertiserAdsCostData,
    paidConversionData,
    paidConversionRateData,
    paidRevenueData,
    defaultDate,
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
    organicRevenueData: OrganicRevenueMonthlyReportInterface,
    topPagesOrganicData: TopPagesOrganicMonthlyReport,
    topBrowsersData: TopBrowsersMonthlyReportInterface,
    topLandingPagesData: TopLandingPagesMonthlyReport,
    advertiserAdsCostData: AdvertiserAdsCostMonthlyReportInterface,
    paidConversionData: PaidConversionMonthlyReportInterface,
    paidConversionRateData: PaidConversionRateMonthlyReportInterface,
    paidRevenueData: PaidRevenueMonthlyReportInterface,

    // Component based props
    defaultDate: string,
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
    const [passingOrganicRevenueData, setPassingOrganicRevenueData] = useState<OrganicRevenueMonthlyReportInterface | null>(null);
    const [passingTopPagesOrganicData, setPassingTopPagesOrganicData] = useState<TopPagesOrganicMonthlyReport | null>(null);
    const [passingTopBrowsersData, setPassingTopBrowsersData] = useState<TopBrowsersMonthlyReportInterface | null>(null);
    const [passingTopLandingPagesData, setPassingTopLandingPagesData] = useState<TopLandingPagesMonthlyReport | null>(null);

    // PPC Performance
    const [passingAdvertiserAdsCostData, setPassingAdvertiserAdsCostData] = useState<AdvertiserAdsCostMonthlyReportInterface | null>(null);
    const [passingPaidConversionData, setPassingPaidConversionData] = useState<PaidConversionMonthlyReportInterface | null>(null);
    const [passingPaidConversionRateData, setPassingPaidConversionRateData] = useState<PaidConversionRateMonthlyReportInterface | null>(null);
    const [passingPaidRevenueData, setPassingPaidRevenueData] = useState<PaidRevenueMonthlyReportInterface | null>(null);

    const [selectedDate, setSelectedDate] = useState<string>('');

    const [error, setError] = useState<string | null>(null);
    const [inProgress, setInProgress] = useState<boolean>(false);

    const router = useRouter();

    async function updateReportData() {
        try {

            if (inProgress) {
                return;
            }

            setInProgress(true);

            let dateRange = selectedDate;
            if (!dateRange) {
                const today = new Date();
                const month = today.toLocaleString('default', { month: "short" });
                const year = today.toLocaleString('default', { year: "numeric" });
                dateRange = `${month}/${year}`;
            }

            const [month, year] = dateRange.split('/');

            const reportUrl = `/dashboard/monthly-report?month=${month}&year=${year}`;

            router.push(reportUrl);

        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else if (err instanceof AxiosError) {
                setError(err.message);
            } else if (typeof err === "string") {
                setError(err);
            } else {
                setError("Something went wrong!");
            }
        }
    }

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
        setPassingOrganicRevenueData(organicRevenueData);
        setPassingTopPagesOrganicData(topPagesOrganicData);
        setPassingTopBrowsersData(topBrowsersData);
        setPassingTopLandingPagesData(topLandingPagesData);

        // PPC Performance
        setPassingAdvertiserAdsCostData(advertiserAdsCostData);
        setPassingPaidConversionData(paidConversionData);
        setPassingPaidConversionRateData(paidConversionRateData);
        setPassingPaidRevenueData(paidRevenueData);

        // Component based
        setSelectedDate(defaultDate);
        setInProgress(false);
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
        organicRevenueData,
        topPagesOrganicData,
        topBrowsersData,
        topLandingPagesData,
        advertiserAdsCostData,
        paidConversionData,
        paidConversionRateData,
        paidRevenueData,
        defaultDate,
    ]);

    if (error) {
        return (
            <p>{error}</p>
        )
    }

    return (
        <div
            className="flex flex-col items-center justify-start pb-[50px]"
        >
            {/* Heading section */}
            <MonthlyReportHeader
                setSelectedDate={setSelectedDate}
                updatingReport={inProgress}
                updateReportFunction={updateReportData}
                selectedDate={selectedDate}
            />

            {inProgress && <LoadingLineMonthlyReport/>}

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
                organicRevenue={passingOrganicRevenueData}
                topPagesOrganic={passingTopPagesOrganicData}
                topBrowsers={passingTopBrowsersData}
                topLandingPages={passingTopLandingPagesData}
            />

            {/* PPC Performance */}
            <PpcPerformanceMonthlyReport
                advertiserAdsCostData={passingAdvertiserAdsCostData}
                paidConversionData={passingPaidConversionData}
                paidConversionRateData={passingPaidConversionRateData}
                paidRevenueData={passingPaidRevenueData}
            />
        </div>
    )
}

export default MonthlyReportMainContent