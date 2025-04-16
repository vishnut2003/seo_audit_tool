import BasicLayout from '@/layouts/BasicLayout/BasicLayout'
import React from 'react'
import MonthlyReportMainContent from './MainContent'
import { cookies } from 'next/headers';
import { RiErrorWarningLine, RiFolder5Line } from '@remixicon/react';
import Link from 'next/link';
import { getOneProject } from '@/utils/server/projects/getOneProject';
import { redirect } from 'next/navigation';
import { AnalyticsGoogleApiAuth, authorizeWithOAuthClient } from '@/utils/server/projects/analyticsAPI/google/auth';
import ResetConnectionButton from '../analytics-report/reports/ResetConnectionButton';
import { fetchMonthlyReportTrafficOverview } from '@/utils/server/monthlyReport/trafficOverview/trafficOverview';
import { fetchMonthlyReportSeoPerformance } from '@/utils/server/monthlyReport/seoPerformance/seoPerformance';

const MonthlyReportPage = async () => {

  const cookieStore = await cookies();
  const projectId = cookieStore.get('projectId');

  if (!projectId) {
    return (
      <BasicLayout
        pageTitle="Monthly Report"
      >
        <div
          className="w-full h-full flex flex-col gap-4"
        >
          <div
            className='py-4 px-5 bg-yellow-50 text-yellow-600 flex items-start md:items-center justify-between gap-3 rounded-md'
          >
            <p
              className='text-base flex items-center gap-2'
            >
              <RiErrorWarningLine
                size={17}
              />
              You must select a project to access analytics.
            </p>
          </div>

          <Link
            className="text-sm flex items-center gap-3 py-4 px-5 bg-background w-max shadow-xl shadow-gray-200 rounded-md"
            href={`/dashboard/projects?redirect=${encodeURIComponent('/dashboard/monthly-report')}`}
          >
            <RiFolder5Line
              size={20}
            />
            Select Project
          </Link>
        </div>
      </BasicLayout>
    )
  }

  const project = await getOneProject(projectId.value);

  if (!project) {
    redirect('/dashboard/projects');
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
      topPagesOrganic,
    } = await fetchMonthlyReportSeoPerformance(requestParameter)

    return (
      <BasicLayout
        pageTitle='Monthly Report'
      >
        <MonthlyReportMainContent
          totalSessionData={totalSessions}
          totalBounceRate={totalBounceRate}
          conversionData={conversionData}
          sessionConversionData={sessionConversionData}
          topChannelsData={topChannelsData}
          newUsersData={newUsersData}
          sessionByCountryData={sessionByCountry}
          sessionFromOrganicData={sessionFromOrganic}
          engagedSessionOrganicData={engagedSessionOrganic}
          organicConversionData={organicConversion}
          organicRevenueData={organicRevenue}
          topPagesOrganicData={topPagesOrganic}
        />
      </BasicLayout>
    )

  } catch (err: any) {
    console.log(err);
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

export default MonthlyReportPage