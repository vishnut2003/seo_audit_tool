import { RiArrowLeftSLine, RiErrorWarningLine } from '@remixicon/react'
import Link from 'next/link'
import React from 'react'
import MainContentMonthlyReportExportPdf from './MainContent'
import TripleDotLoading from '@/Components/Loaders/TripleDotLoading/TripleDotLoading'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getOneProject } from '@/utils/server/projects/getOneProject'
import BasicLayout from '@/layouts/BasicLayout/BasicLayout'
import ResetConnectionButton from '../../analytics-report/reports/ResetConnectionButton'
import { AnalyticsGoogleApiAuth, authorizeWithOAuthClient } from '@/utils/server/projects/analyticsAPI/google/auth'
import { fetchMonthlyReportTrafficOverview } from '@/utils/server/monthlyReport/trafficOverview/trafficOverview'
import { fetchMonthlyReportSeoPerformance } from '@/utils/server/monthlyReport/seoPerformance/seoPerformance'

const MonthlyReportExportAsPDFPage = async () => {

    const cookieStore = await cookies();
    const projectId = cookieStore.get('projectId');

    if (!projectId) {
        redirect('/dashboard/projects');
    }

    const project = await getOneProject(projectId.value);

    if (!project) {
        redirect(`/dashboard/projects?redirect=${encodeURIComponent('/dashboard/monthly-report')}`);
    }

    if (!project.googleAnalytics?.clientEmail || !project.googleAnalytics.privateKey || !project.googleAnalytics.propertyId) {
        if (!project.googleAnalytics?.token) {
            redirect('/dashboard/analytics-report');
        }
    }

    try {

        let auth;

        if (
            project.googleAnalytics.clientEmail &&
            project.googleAnalytics.privateKey
        ) {
            auth = await AnalyticsGoogleApiAuth({
                clientEmail: project.googleAnalytics.clientEmail,
                privateKey: project.googleAnalytics.privateKey,
            });
        } else {
            auth = await authorizeWithOAuthClient({
                token: project.googleAnalytics.token!,
            })
        }

        // Get current month and year
        const [currentMonth, currentYear] = [
            new Date().toLocaleString('default', {
                month: "short",
            }),
            new Date().getFullYear(),
        ];

        const requestParameter = {
            auth,
            filters: {
                currentMonth,
                currentYear,
            },
            propertyId: project.googleAnalytics.propertyId,
        }

        const {
            totalSessions,
            totalBounceRate,
            conversionData,
            sessionConversionData,
            topChannelsData,
            newUsersData,
            sessionByCountry,
        } = await fetchMonthlyReportTrafficOverview(requestParameter);

        const {
            sessionFromOrganic,
            engagedSessionOrganic,
            organicConversion,
            organicRevenue,
        } = await fetchMonthlyReportSeoPerformance(requestParameter);

        return (
            <div className="w-dvw h-dvh bg-[#323639] flex flex-col justify-center">

                {/* Page actions */}
                <Link href={'/dashboard/monthly-report'}>
                    <button className="flex items-center justify-center gap-2 text-white p-4">
                        <RiArrowLeftSLine size={20} />
                        <p>Go to Report</p>
                    </button>
                </Link>

                <div className="h-full relative">

                    {/* Loading state */}
                    <div
                        className='w-full h-full flex flex-col justify-center items-center text-white gap-2'
                    >
                        <TripleDotLoading
                            lightTheme={true}
                        />
                        <p>Generating PDF Report...</p>
                    </div>

                    <MainContentMonthlyReportExportPdf
                        sessionData={totalSessions}
                        bounceRateData={totalBounceRate}
                        conversionData={conversionData}
                        sessionConversionData={sessionConversionData}
                        topChannelsData={topChannelsData}
                        newUsersData={newUsersData}
                        sessionByCountry={sessionByCountry}
                        sessionFromOrganic={sessionFromOrganic}
                        engagedSessionOrganic={engagedSessionOrganic}
                        organicConversion={organicConversion}
                        organicRevenue={organicRevenue}
                    />
                </div>
            </div>
        )

    } catch (err: any) {
        let error = "Something went wrong!";

        if ('details' in err && typeof err.details === "string") {
            error = err.details;
        } else if (err instanceof Error) {
            error = err.message;
        }

        return (
            <BasicLayout
                pageTitle='Monthly Report'
            >
                <div
                    className='bg-red-500/10 text-red-500 flex items-center gap-3 py-3 px-5 rounded-md'
                >
                    <RiErrorWarningLine
                        size={20}
                    />
                    <p>{error}</p>
                </div>

                <ResetConnectionButton />
            </BasicLayout>
        )
    }
}

export default MonthlyReportExportAsPDFPage