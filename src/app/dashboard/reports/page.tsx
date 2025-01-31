'use client';

import NewAuditForm from "@/Components/ReportsPage/NewAuditForm/NewAuditForm"
import ReportRecordList from "@/Components/ReportsPage/ReportRecordList/ReportRecordList";
import BasicLayout from "@/layouts/BasicLayout/BasicLayout"
import { RiAddLargeLine, RiHistoryLine, RiSearchLine } from "@remixicon/react";
import ReportPreview from "./ReportPreview";
import { useEffect, useState } from "react";
import ReportLoading from "./ReportLoading";
import { createNewAudit } from "@/utils/client/auditReport";
import { getSessionProject } from "@/utils/client/projects";
import { ProjectModelInterface } from "@/models/ProjectsModel";
import EmptyProjectTemplate from "./EmptyProjectTemplate";

const Page = () => {

  const [inProgress, setInProgress] = useState<boolean>(true);
  const [showReportHistory, setShowReportHistory] = useState<boolean>(false);
  const [currentProject, setCurrentProject] = useState<ProjectModelInterface | null>(null)

  useEffect(() => {
    setInProgress(true);
    // set current project
    getSessionProject().then((project) => {
      setCurrentProject(project);
      if (!project) {
        return;
      }

      // get latest report
      
    })
    .finally(() => {
      setInProgress(false);
    })
  }, [])

  return (
    <BasicLayout
      pageTitle="PDF Reports"
    >
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
              disabled={!currentProject ? true : false}
            >
              <RiAddLargeLine
                size={20}
              />
              <p className='mt-1 hidden md:flex'>New PDF Report</p>
            </button>

            {/* search by id */}
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
                <ReportPreview />
        }

        {/* <ReportRecordList/> */}

      </div>
    </BasicLayout>
  )
}

export default Page