import BasicLayout from '@/layouts/BasicLayout/BasicLayout'
import { cookies } from 'next/headers'
import React from 'react'
import SelectProject from './SelectProject';
import { getOneProject } from '@/utils/server/projects/getOneProject';
import SearchConsoleApiKey from './SearchConsoleApiKey';
import { notFound, redirect } from 'next/navigation';

const GoogleSearchConsole = async () => {
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
          <SelectProject />
          : !project.googleSearchConsole || !project.googleSearchConsole.clientEmail || !project.googleSearchConsole.privateKey || !project.googleSearchConsole.property ?
            <SearchConsoleApiKey
              projectId={project.projectId}
              domain={project.domain}
            />
            : redirect('/dashboard/google-search-console/report')
      }
    </BasicLayout>
  )

}

export default GoogleSearchConsole