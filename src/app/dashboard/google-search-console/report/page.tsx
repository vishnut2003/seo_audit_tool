import BasicLayout from '@/layouts/BasicLayout/BasicLayout'
import { getOneProject } from '@/utils/server/projects/getOneProject';
import { GoogleSearchConsoleAuth, googleSearchConsoleOAuthClient } from '@/utils/server/projects/googleSearchConsoleAPI/auth';
import { graphReports } from '@/utils/server/projects/googleSearchConsoleAPI/reports/graphReport';
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';
import React from 'react'
import GoogleSearchConsoleGraph from './GraphData';
import OtherDataTabs from './OtherDataTabs';

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
        if (!project?.googleSearchConsole?.token) {
            redirect('/dashboard/google-search-console');
        }
    }

    try {
        let auth;

        if (
            project.googleSearchConsole?.clientEmail &&
            project.googleSearchConsole?.privateKey
        ) {
            auth = await GoogleSearchConsoleAuth({
                clientEmail: project.googleSearchConsole.clientEmail,
                privateKey: project.googleSearchConsole.privateKey,
            })
        } else {
            const oauthClient = await googleSearchConsoleOAuthClient({
                token: project.googleSearchConsole.token!,
            });
            auth = oauthClient;
        }

        // set date range
        const daysAgo = 30;

        const dateObject = new Date();
        dateObject.setDate(dateObject.getDate() - daysAgo);

        const startDate = dateObject;
        const endDate = new Date();

        const graphData = await graphReports({
            auth,
            property: project.googleSearchConsole.property,
            dateRange: {
                from: startDate.toISOString().split('T')[0],
                to: endDate.toISOString().split('T')[0],
            },
        });

        return (
            <BasicLayout
                pageTitle='Google Search Console'
            >
                <div
                    className='h-max space-y-5 pb-[40px]'
                >
                    <GoogleSearchConsoleGraph
                        graphData={graphData}
                        defaultDateRange={{
                            startDate,
                            endDate,
                        }}
                    />
                    <OtherDataTabs />
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