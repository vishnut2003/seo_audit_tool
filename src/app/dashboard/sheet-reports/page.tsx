'use client';

import BasicLayout from '@/layouts/BasicLayout/BasicLayout'
import { RiAddLargeLine, RiErrorWarningLine, RiHistoryLine, RiSearchLine } from '@remixicon/react'
import React, { useEffect, useState } from 'react'
import ReportLoading from '../reports/ReportLoading'
import EmptyProjectTemplate from '../reports/EmptyProjectTemplate'
import { ProjectModelInterface } from '@/models/ProjectsModel'
import ReportPreview from './ReportPreview'
import { getSessionProject } from '@/utils/client/projects';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { getLatestOneReport } from '@/utils/client/sheetReport';
import { sheetReportRecordInterface } from '@/models/SheetReportRecordModel';
import axios from 'axios';
import SheetCreationLoader from '@/Components/SheetReportPage/SheetReportForm/SheetCreationLoader';

const Page = () => {

  const [showReportHistory, setShowReportHistory] = useState<boolean>(false);
  const [inProgress, setInProgress] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentProject, setCurrentProject] = useState<ProjectModelInterface | null>(null);
  const [reportId, setReportId] = useState<string | null>(null);

  useEffect(() => {
    setInProgress(true);
    getSessionProject().then((project) => {
      setCurrentProject(project);
      setInProgress(false);
    })
  }, []);

  async function createNewSheetReport() {
    try {

      const session = await getSession();

      if (!currentProject || !session || !session.user || !session.user.email) {
        return;
      }

      setInProgress(true);

      // generate report id
      const { data }: {
        data: {
          reportId: string,
        }
      } = await axios.get("/api/sheet-report/generate-report-id");
      setReportId(data.reportId);

      // create sheet report
      await axios.post("/api/sheet-report/create", {
        baseUrl: currentProject.domain,
        reportId: data.reportId,
        projectId: currentProject.projectId,
        email: session.user.email,
      })

      setInProgress(false);
      setReportId(null);
    } catch (err) {
      console.log(err);
      setError('Something went wrong!');
      setReportId(null);
      setInProgress(false);
    }
  }

  return (
    <BasicLayout>

      <div className="w-full h-full flex flex-col gap-5">

        <div
          className="flex items-center justify-between"
        >

          {/* left col */}
          <div
            className="flex justify-center items-center gap-3"
          >
            <button
              className='text-foreground text-sm font-medium flex justify-center items-center gap-3 bg-white rounded-md py-3 px-5 shadow-xl shadow-gray-200 hover:bg-gray-50 disabled:opacity-50'
              disabled={inProgress}
              onClick={createNewSheetReport}
            >
              <RiAddLargeLine
                size={20}
              />
              <p className='mt-1 hidden md:flex'>Create Sheet Report</p>
            </button>

            {/* search by id */
              showReportHistory &&
              <div
                className="flex gap-2 bg-white py-3 px-4 rounded-md shadow-xl shadow-gray-200"
              >
                <RiSearchLine
                  size={20}
                  className="text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search by Report ID"
                  className="outline-none font-md bg-transparent"
                />
              </div>
            }
          </div>

          {/* Right col */}
          <div>
            <button
              className="flex items-center gap-2 font-medium text-sm bg-white hover:bg-gray-50 py-3 px-5 rounded-md shadow-xl shadow-gray-200"
              onClick={() => setShowReportHistory(prev => !prev)}
            >
              <RiHistoryLine
                size={20}
              />
              Report History
            </button>
          </div>
        </div>

        {
          showReportHistory ?
            <div>
              show History
            </div> :
            inProgress ?
              <ReportLoading /> :
              !currentProject ?
                <EmptyProjectTemplate /> :
                <ReportPreview
                  project={currentProject}
                />
        }

      </div>

      {
        reportId && inProgress &&
        <SheetCreationLoader
          reportId={reportId}
        />
      }

      {
        error &&
        <div
          className='bg-red-200 text-red-500 font-medium flex gap-2 items-center py-4 px-6 rounded-md'
        >
          <RiErrorWarningLine
            size={20}
          />
          {error}
        </div>
      }


      {/* no use below */}

      {/* <div className="flex gap-2 items-center flex-col md:flex-row justify-between p-3 bg-white rounded-lg">

          New Audit Form
          <SheetReportForm/>

        </div> */}

      {/* <SheetReportList/> */}
    </BasicLayout>
  )
}

export default Page