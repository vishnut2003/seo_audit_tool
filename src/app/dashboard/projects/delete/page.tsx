import BasicLayout from '@/layouts/BasicLayout/BasicLayout';
import { getOneProject } from '@/utils/server/projects/getOneProject';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import React from 'react'
import ProjectDeleteButton from './DeleteButton';

const DeleteProjectPage = async ({ searchParams }: {
  searchParams: Promise<{
    projectId?: string,
  }>
}) => {

  const projectId = (await searchParams).projectId;

  if (!projectId) {
    notFound()
  }

  const userSession = await getServerSession();

  if (!userSession?.user?.email) {
    notFound();
  }

  const deletingProject = await getOneProject(projectId, userSession.user.email);

  if (!deletingProject) {
    notFound();
  }

  return (
    <BasicLayout>
      <div>
        <div
          className='max-w-[500px] w-full p-5 bg-white space-y-4 rounded-md shadow-2xl shadow-gray-200'
        >
          <div className='space-y-2'>
            <h2
              className='text-base font-medium text-red-500'
            >Confirm delete</h2>

            <p
              className='text-lg font-semibold'
            >Project Name - {deletingProject.domain}</p>
          </div>

          <p
            className='py-3 px-5 rounded-md bg-red-50 text-red-500'
          >all reports will be delete, please confirm to delete the project.</p>
          <ProjectDeleteButton
            projectId={projectId}
          />
        </div>
      </div>
    </BasicLayout>
  )
}

export default DeleteProjectPage