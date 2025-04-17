import BasicLayout from '@/layouts/BasicLayout/BasicLayout';
import { AnalyticsGoogleApiAuth, authorizeWithOAuthClient } from '@/utils/server/projects/analyticsAPI/google/auth';
import { fetchAnalyticsReport, fetchAnalyticsReportByCountry, fetchAnalyticsReportTopPagesTitle, fetchReportByNewUsersSource } from '@/utils/server/projects/analyticsAPI/google/fetchReport';
import { getOneProject } from '@/utils/server/projects/getOneProject';
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';
import React from 'react'
import { RiErrorWarningLine } from '@remixicon/react';
import ResetConnectionButton from './ResetConnectionButton';
import GA_ChatBot from '@/AiChat/GA_ChatBot/GA_ChatBot';
import MainContent from './MainContent';

const AnalyticsReportsMain = async () => {

    const cookieStore = await cookies();
    const projectId = cookieStore.get('projectId');

    if (!projectId) {
        redirect('/dashboard/projects');
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

        const report = await fetchAnalyticsReport({
            auth,
            propertyId: project.googleAnalytics.propertyId,
            filter: {
                dateRange: {
                    from: "10daysAgo",
                    to: "today",
                },
            }
        });

        const dataByCountry = await fetchAnalyticsReportByCountry({
            auth,
            propertyId: project.googleAnalytics.propertyId,
            filter: {
                dateRange: {
                    from: "10daysAgo",
                    to: "today",
                },
            }
        })

        const newUsersSourceReport = await fetchReportByNewUsersSource({
            auth,
            propertyId: project.googleAnalytics.propertyId,
            filter: {
                dateRange: {
                    from: "10daysAgo",
                    to: "today",
                },
            }
        })

        const topViewPageTitle = await fetchAnalyticsReportTopPagesTitle({
            auth,
            propertyId: project.googleAnalytics.propertyId,
            filter: {
                dateRange: {
                    from: "10daysAgo",
                    to: "today",
                },
            }
        })

        return (
            <BasicLayout
                pageTitle='Analytics Report'
            >
                <MainContent
                    analyticsReport={report}
                    countryAnalyticsData={dataByCountry}
                    newUsersSourceReport={newUsersSourceReport}
                    topPagesViewsReport={topViewPageTitle}
                />

                {/* AI ChatBot */}
                <GA_ChatBot />
            </BasicLayout>
        )

    } catch (err: any) {
        console.log(err);
        let error = "Something went wrong!";

        if (err?.details && typeof err.details === "string") {
            error = err.details;
        }

        return (
            <BasicLayout
                pageTitle='Analytics Reports'
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

export default AnalyticsReportsMain