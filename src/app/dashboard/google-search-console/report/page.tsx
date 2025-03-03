import BasicLayout from '@/layouts/BasicLayout/BasicLayout'
import { getOneProject } from '@/utils/server/projects/getOneProject';
import { GoogleSearchConsoleAuth } from '@/utils/server/projects/googleSearchConsoleAPI/auth';
import { graphReports } from '@/utils/server/projects/googleSearchConsoleAPI/reports/graphReport';
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';
import React from 'react'
import GoogleSearchConsoleGraph from './GraphData';

const GoogleSearchConsoleReports = async () => {

    const cookieStore = await cookies();
    const projectId = cookieStore.get('projectId');

    if (!projectId) {
        redirect('/dashboard/google-search-console');
    }

    const project = await getOneProject(projectId.value);

    if (
        !project ||
        !project.googleSearchConsole?.property ||
        !project.googleSearchConsole?.clientEmail ||
        !project.googleSearchConsole?.privateKey
    ) {
        redirect('/dashboard/google-search-console');
    }

    try {
        const auth = await GoogleSearchConsoleAuth({
            clientEmail: project.googleSearchConsole.clientEmail,
            privateKey: project.googleSearchConsole.privateKey,
        })

        // set date range
        const daysAgo = 8;

        const dateObject = new Date();
        dateObject.setDate(dateObject.getDate() - daysAgo);

        const startDate = dateObject.toISOString().split('T')[0];
        const endDate = new Date().toISOString().split('T')[0];

        const graphData = await graphReports({
            auth,
            property: project.googleSearchConsole.property,
            dateRange: {
                from: startDate,
                to: endDate,
            },
        });

        return (
            <BasicLayout
                pageTitle='Google Search Console'
            >
                <div
                    className='h-max'
                >
                    <GoogleSearchConsoleGraph
                        graphData={graphData}
                    />
                </div>
            </BasicLayout>
        )

    } catch (err) {
        console.log(err);
        return (
            <BasicLayout
                pageTitle='Google Search Console'
            >
                Something went wrong
            </BasicLayout>
        )
    }
}

export default GoogleSearchConsoleReports;