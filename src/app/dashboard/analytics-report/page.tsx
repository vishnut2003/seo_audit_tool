import BasicLayout from '@/layouts/BasicLayout/BasicLayout'
import { getOneProject } from '@/utils/server/projects/getOneProject';
import { cookies } from 'next/headers'
import { notFound, redirect } from 'next/navigation';
import React from 'react'
import SelectProject from './SelectProject';
import AnalyticsApiKey from './AnalyticsApiKey';
import { getServerSession } from 'next-auth';

const AnalyticsReport = async () => {

    const cookieStore = await cookies();
    const projectCookie = cookieStore.get('projectId');

    let project = null;

    try {

        const userSession = await getServerSession();

        if (!userSession?.user?.email) {
            throw new Error("Unauthorized user!");
        }

        project = await getOneProject(projectCookie?.value || null, userSession.user.email);
    } catch (err) {
        console.log(err);
        return notFound();
    }

    if (
        project?.googleAnalytics?.token &&
        project.googleAnalytics.propertyId ||
        project?.googleAnalytics &&
        project?.googleAnalytics?.clientEmail &&
        project?.googleAnalytics?.privateKey &&
        project?.googleAnalytics?.propertyId
    ) {
        console.log("Redirecing")
        redirect('/dashboard/analytics-report/reports');
    }

    return (
        <BasicLayout
            pageTitle='Analytics Report'
        >
            {
                !project ?
                    <SelectProject />
                    : !project.googleAnalytics || !project.googleAnalytics.clientEmail || !project.googleAnalytics.privateKey || !project.googleAnalytics.propertyId ?
                        <AnalyticsApiKey
                            projectId={project.projectId}
                        />
                        : redirect('/dashboard/analytics-report/reports')
            }
        </BasicLayout>
    )

}

export default AnalyticsReport