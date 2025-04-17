import BasicLayout from '@/layouts/BasicLayout/BasicLayout'
import { getOneProject } from '@/utils/server/projects/getOneProject';
import { GoogleSearchConsoleAuth, googleSearchConsoleOAuthClient } from '@/utils/server/projects/googleSearchConsoleAPI/auth';
import { graphReports } from '@/utils/server/projects/googleSearchConsoleAPI/reports/graphReport';
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';
import React from 'react';
import { RiErrorWarningLine } from '@remixicon/react';
import GSC_ChatBot from '@/AiChat/GSC_ChatBot/GSC_ChatBot';
import ResetConnectionButton from './ResetConnectionButton';
import MainContent from './MainContent';

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
                <MainContent
                    graphData={graphData}
                    defaultDateRange={{
                        startDate,
                        endDate,
                    }}
                />

                {/* Chat bot */}
                <GSC_ChatBot/>
            </BasicLayout>
        )

    } catch (err: any) {
        let error = 'Something went wrong';

        if (typeof err === "string") {
            error = err;
        } else if (err?.details && typeof err.details === "string") {
            error = err.details;
        } else if (err instanceof Error) {
            error = err.message;
        }

        return (
            <BasicLayout
                pageTitle='Google Search Console'
            >
                <div
                    className='bg-red-500/10 text-red-500 flex items-center gap-3 py-3 px-5 rounded-md'
                >
                    <RiErrorWarningLine
                        size={20}
                    />
                    <p>{error}</p>
                </div>

                <ResetConnectionButton/>
            </BasicLayout>
        )
    }
}

export default GoogleSearchConsoleReports;