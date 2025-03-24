import BasicLayout from '@/layouts/BasicLayout/BasicLayout';
import { AnalyticsGoogleApiAuth, authorizeWithOAuthClient } from '@/utils/server/projects/analyticsAPI/google/auth';
import { fetchAnalyticsReport } from '@/utils/server/projects/analyticsAPI/google/fetchReport';
import { getOneProject } from '@/utils/server/projects/getOneProject';
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';
import React from 'react'
import GoogleAnalyticsReportChart from './GoogleAnalyticsReportChart';

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

        return (
            <BasicLayout
                pageTitle='Analytics Report'
            >
                <GoogleAnalyticsReportChart
                    analyticsReport={report}
                />
            </BasicLayout>
        )

    } catch (err) {
        console.log(err);
        const error = typeof err === "string" ? err : "Something went wrong"
        return (
            <BasicLayout
                pageTitle='Analytics Reports'
            >
                {error}
            </BasicLayout>
        )
    }
}

export default AnalyticsReportsMain