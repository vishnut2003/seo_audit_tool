import BasicLayout from '@/layouts/BasicLayout/BasicLayout'
import { AnalyticsGoogleApiAuth, authorizeWithOAuthClient } from '@/utils/server/projects/analyticsAPI/google/auth';
import { getOneProject } from '@/utils/server/projects/getOneProject';
import { RiErrorWarningLine } from '@remixicon/react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react'
import ResetConnectionButton from '../ResetConnectionButton';
import { fetchAnalyticsTrafficAcquisitionGraphData, fetchAnalyticsTrafficAcquisitionTableData } from '@/utils/server/projects/analyticsAPI/google/trafficAcquisitionData';
import AnalyticsTrafficAcquisitionMainContent from './MainContent';

const TrafficAcquisitionPage = async () => {
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

        let auth

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

        const startDate = new Date(new Date().setDate(new Date().getDate() - 30));
        const endDate = new Date();

        const graphData = await fetchAnalyticsTrafficAcquisitionGraphData({
            auth,
            dateRange: {
                startDate: startDate.toISOString().split('T')[0],
                endDate: endDate.toISOString().split('T')[0],
            },
            graphType: "date",
            propertyId: project.googleAnalytics.propertyId,
        })

        const tableData = await fetchAnalyticsTrafficAcquisitionTableData({
            auth,
            dateRange: {
                startDate: startDate.toISOString().split('T')[0],
                endDate: endDate.toISOString().split('T')[0],
            },
            propertyId: project.googleAnalytics.propertyId,
        })

        console.log(tableData)

        return (
            <BasicLayout
                pageTitle='Traffic Acquisition'
            >
                <AnalyticsTrafficAcquisitionMainContent
                    passingDateRange={{
                        startDate,
                        endDate,
                    }}
                    graphReport={graphData}
                    tableReport={tableData}
                />
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
                pageTitle='Traffic Acquisition'
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

export default TrafficAcquisitionPage