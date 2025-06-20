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
import { fetchMonthlyReportPpcPerformance } from '@/utils/server/monthlyReport/ppcPerformance/ppcPerformance';

const MonthlyReportPage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    month: string,
    year: string,
  }>,
}) => {

  console.log("1")

  const cookieStore = await cookies();
  const projectId = cookieStore.get('projectId');

  console.log("2")

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

  console.log("3")

  const project = await getOneProject(projectId.value);

  if (!project) {
    redirect('/dashboard/projects');
  }

  if (!project.googleAnalytics?.clientEmail || !project.googleAnalytics.privateKey || !project.googleAnalytics.propertyId) {
    if (!project.googleAnalytics?.token) {
      redirect('/dashboard/analytics-report');
    }
  }

  console.log("4")

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

    console.log("5")

    // Get current month and year
    const [currentMonth, currentYear] = [
      new Date().toLocaleString('default', {
        month: "short",
      }),
      new Date().getFullYear(),
    ];

    let selectedMonth = currentMonth;
    let selectedYear = currentYear;

    const queryMonth = (await searchParams).month;
    const queryYear = (await searchParams).year;

    if (queryMonth && queryYear) {
      selectedMonth = queryMonth;
      selectedYear = parseInt(queryYear);
    }

    const requestParameter = {
      auth,
      filters: {
        currentMonth: selectedMonth,
        currentYear: selectedYear,
      },
      propertyId: project.googleAnalytics.propertyId,
    }

    console.log("6")
    
    const {
      totalSessions,
      totalBounceRate,
      conversionData,
      sessionConversionData,
      topChannelsData,
      newUsersData,
      sessionByCountry,
    } = await fetchMonthlyReportTrafficOverview(requestParameter);

    console.log("7")
    
    const {
      sessionFromOrganic,
      engagedSessionOrganic,
      organicConversion,
      organicRevenue,
      topPagesOrganic,
      topBrowsers,
      topLandingPages,
    } = await fetchMonthlyReportSeoPerformance(requestParameter)

    console.log("8")
    
    const {
      advertiserAdsCost,
      paidConversion,
      paidConversionRate,
      paidRevenue,
    } = await fetchMonthlyReportPpcPerformance(requestParameter)

    console.log("9")

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
          topBrowsersData={topBrowsers}
          topLandingPagesData={topLandingPages}
          advertiserAdsCostData={advertiserAdsCost}
          paidConversionData={paidConversion}
          paidConversionRateData={paidConversionRate}
          paidRevenueData={paidRevenue}

          // Component props
          defaultDate={`${selectedMonth}/${selectedYear}`}
        />
      </BasicLayout>
    )

  } catch (err: any) {
    console.log(err);
    let error = "Something went wrong!";

    if (err?.details && typeof err.details === "string") {
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