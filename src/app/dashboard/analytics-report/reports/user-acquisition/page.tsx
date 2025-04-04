import BasicLayout from '@/layouts/BasicLayout/BasicLayout'
import { RiErrorWarningLine } from '@remixicon/react'
import React from 'react'
import ResetConnectionButton from '../ResetConnectionButton'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { getOneProject } from '@/utils/server/projects/getOneProject'
import UserAcquisitionMainContent from './MainContent'
import { AnalyticsGoogleApiAuth, authorizeWithOAuthClient } from '@/utils/server/projects/analyticsAPI/google/auth'
import { fetchAnalyticsUserAcquisitionData } from '@/utils/server/projects/analyticsAPI/google/userAcquisitionData'

const UserAcquisition = async () => {

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

        const [graphReport] = await fetchAnalyticsUserAcquisitionData({
            auth,
            dateRange: {
                startDate: startDate.toISOString().split('T')[0],
                endDate: endDate.toISOString().split('T')[0],
            },
            graphType: "date",
            propertyId: project.googleAnalytics.propertyId,
        })

        console.log(graphReport)

        return (
            <BasicLayout
                pageTitle='User Acquisition'
            >
                <UserAcquisitionMainContent />
            </BasicLayout>
        )

    } catch (err: any) {

        console.log(err);
        let error = "Something went wrong!";

        if ('details' in err && typeof err.details === "string") {
            error = err.details;
        }

        return (
            <BasicLayout
                pageTitle='User Acquisition'
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

export default UserAcquisition