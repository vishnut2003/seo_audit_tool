import BasicLayout from '@/layouts/BasicLayout/BasicLayout'
import { getOneProject } from '@/utils/server/projects/getOneProject';
import { cookies } from 'next/headers'
import { notFound, redirect } from 'next/navigation';
import React from 'react'
import SelectProject from './SelectProject';
import AnalyticsApiKey from './AnalyticsApiKey';

const AnalyticsReport = async () => {

    const cookieStore = await cookies();
    const projectCookie = cookieStore.get('projectId');

    let project = null;

    try {
        project = await getOneProject(projectCookie?.value || null)
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