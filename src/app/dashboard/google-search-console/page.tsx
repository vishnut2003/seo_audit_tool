import BasicLayout from '@/layouts/BasicLayout/BasicLayout'
import { cookies } from 'next/headers'
import React from 'react'
import SelectProject from './SelectProject';
import { getOneProject } from '@/utils/server/projects/getOneProject';
import SearchConsoleApiKey from './SearchConsoleApiKey';
import { redirect } from 'next/navigation';

const GoogleSearchConsole = async () => {
  try {
    const cookieStore = await cookies();
    const projectId = cookieStore.get('projectId');

    // select project first is not project id found
    if (!projectId) {
      return (
        <BasicLayout
          pageTitle='Google Search Console'
        >
          <SelectProject />
        </BasicLayout>
      )
    }

    const project = await getOneProject(projectId.value);

    if (!project) {
      return (
        <BasicLayout
          pageTitle='Google Search Console'
        >
          <SelectProject />
        </BasicLayout>
      )
    }

    if (
      !project.googleSearchConsole ||
      !project.googleSearchConsole.property ||
      !project.googleSearchConsole.clientEmail ||
      !project.googleSearchConsole.privateKey
    ) {
      return (
        <BasicLayout>
          <SearchConsoleApiKey
            domain={project.domain}
            projectId={project.projectId}
          />
        </BasicLayout>
      )
    }

  } catch (err) {
    if (typeof err === "string") {
      return (
        <BasicLayout
          pageTitle='Google Search Console'
        >
          something went wrong!
        </BasicLayout>
      )
    }
  }

  redirect('/dashboard/google-search-console/report');

}

export default GoogleSearchConsole