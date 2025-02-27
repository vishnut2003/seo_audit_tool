import BasicLayout from '@/layouts/BasicLayout/BasicLayout';
import { getOneProject } from '@/utils/server/projects/getOneProject';
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';
import React from 'react'

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

    if (!project.googleAnalytics?.clientEmail || !project.googleAnalytics.privateKey) {
        redirect('/dashboard/analytics-report');
    }

    return (
        <BasicLayout
            pageTitle='Analytics Reports'
        >
            Main Reports Data
        </BasicLayout>
    )
}

export default AnalyticsReportsMain