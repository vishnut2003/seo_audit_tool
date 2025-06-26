import BasicLayout from '@/layouts/BasicLayout/BasicLayout'
import { cookies } from 'next/headers'
import React from 'react'
import SelectProject from './SelectProject';
import { getOneProject } from '@/utils/server/projects/getOneProject';
import SearchConsoleApiKey from './SearchConsoleApiKey';
import { notFound, redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

const GoogleSearchConsole = async () => {
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
    project?.googleSearchConsole?.token &&
    project.googleSearchConsole.property ||
    project?.googleSearchConsole &&
    project?.googleSearchConsole?.clientEmail &&
    project?.googleSearchConsole?.privateKey &&
    project?.googleSearchConsole?.property
  ) {
    console.log("Redirecing...")
    redirect('/dashboard/google-search-console/report');
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