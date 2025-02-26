import BasicLayout from '@/layouts/BasicLayout/BasicLayout'
import { ProjectModelInterface } from '@/models/ProjectsModel';
import { getOneProject } from '@/utils/server/projects/getOneProject';
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation';
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

    return (
        <BasicLayout
            pageTitle='Analytics Report'
        >
            {
                !project ?
                <SelectProject/>
                : !project.analyticsApiEmail || !project.analyticsApiPrivate ?
                <AnalyticsApiKey/>
                : "Opening Charts"
            }
        </BasicLayout>
    )

}

export default AnalyticsReport