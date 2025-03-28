'use client';

import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/Components/ui/table"
import BasicLayout from "@/layouts/BasicLayout/BasicLayout"
import { RiAddLargeLine, RiArrowLeftSLine, RiArrowRightSLine, RiArrowUpDownLine, RiLink, RiSearchLine } from "@remixicon/react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select"
import { useEffect, useState } from "react"
import { getSession } from "next-auth/react"
import axios from "axios"
import DatePicker from "@/Components/ui/datepicker";
import { ProjectModelInterface } from "@/models/ProjectsModel";
import EmptyProjectTemplate from "./EmptyProjectTemplate";
import LoadingProjectsTemplate from "./LoadingProjectsTemplate";
import ErrorProjectTemplate from "./ErrorProjectTemplate";
import TableDataRow from "./TableDataRow";
import Link from "next/link";
import { getSessionProject } from "@/utils/client/projects";

interface DateRangeInterface {
  startDate: Date | null,
  endDate: Date | null,
}

const Projects = () => {

  const [projects, setProjects] = useState<ProjectModelInterface[]>([]);
  const [currentProject, setCurrentProject] = useState<ProjectModelInterface | null>(null);

  // fetching projects
  const [inProgress, setInProgress] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  // filter options
  const [tablePage, setTablePage] = useState<number>(1);
  const [projectCount, setProjectCount] = useState<number>(0)
  const [dateRange, setDateRange] = useState<DateRangeInterface>({
    startDate: null,
    endDate: null,
  })

  useEffect(() => {
    setError(false);
    setInProgress(true);
    
    // Fetch current project
    getSessionProject()
      .then((project) => setCurrentProject(project))
      .catch((err) => console.log(err));

    getSession().then(async (session) => {
      if (session && session.user && session.user.email) {
        try {
          const { data }: {
            data: {
              projects: ProjectModelInterface[],
              count: number,
            }
          } = await axios.post('/api/project/get-all', {
            page: tablePage,
            email: session.user.email
          });

          setProjectCount(data.count);
          setProjects(data.projects);

          setInProgress(false);

        } catch (err) {
          setError(true);
          return err;
        }
      }
    });
  }, [tablePage])

  return (
    <BasicLayout
      pageTitle="Projects"
    >
      <div
        className="flex flex-col gap-5"
      >

        {/* Filtering options */}
        <div
          className="flex flex-col md:flex-row gap-4 justify-between items-center"
        >

          <div
            className="flex gap-3"
          >

            {/* Add new button */}
            <Link
              href={'/dashboard/projects/add-new'}
              className='text-foreground text-sm font-medium flex justify-center items-center gap-3 bg-white rounded-md py-3 px-5 shadow-xl shadow-gray-200 hover:bg-gray-50'
            >
              <RiAddLargeLine
                size={20}
              />
              <p className='mt-1 hidden md:flex'>New Project</p>
            </Link>

            {/* Project Search */}
            <div
              className="flex gap-2 bg-white py-3 px-4 rounded-md shadow-xl shadow-gray-200"
            >
              <RiSearchLine
                size={20}
                className="text-gray-400"
              />
              <input
                type="text"
                placeholder="Search Projects"
                className="outline-none font-md bg-transparent"
              />
            </div>
          </div>

          {/* Date Dange */}
          <div
            className="flex gap-4 items-center"
          >
            {/* start date */}
            <div
              className="bg-white rounded-md flex gap-2 shadow-xl shadow-gray-200"
            >
              <DatePicker
                placeholder="Start Date"
                date={dateRange.startDate}
                setDate={(date) => setDateRange(prev => ({
                  ...prev,
                  startDate: date,
                }))}
              />
            </div>

            <RiLink
              size={20}
              className="text-gray-400 hidden md:block"
            />

            {/* End date */}
            <div
              className="bg-white rounded-md flex items-center gap-2 shadow-xl shadow-gray-200"
            >
              <DatePicker
                placeholder="End Date"
                date={dateRange.endDate}
                setDate={(date) => setDateRange(prev => ({
                  ...prev,
                  endDate: date,
                }))}
              />
            </div>
          </div>
        </div>

        {/* Table */}

        <div
          className="bg-white rounded-md overflow-hidden shadow-xl shadow-gray-200"
        >
          {
            inProgress ?
              <LoadingProjectsTemplate /> :
              error ?
                <ErrorProjectTemplate /> :
                projects.length < 1 ?
                  <EmptyProjectTemplate /> :
                  <Table
                    className="space-y-4"
                  >
                    <TableHeader>
                      <TableRow>
                        <TableHead></TableHead>
                        <TableHead className="items-center">
                          Date
                          <RiArrowUpDownLine
                            size={15}
                            className="inline ml-2"
                          />
                        </TableHead>
                        <TableHead>Domain</TableHead>
                        <TableHead>Last Updated</TableHead>
                        <TableHead>No. of Competitors</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>

                    {/* Table Body */}
                    <TableBody>

                      {
                        projects.map((project, index) => (
                          <TableDataRow
                            rowData={project}
                            key={index}
                            isSelected={project.projectId === currentProject?.projectId}
                          />
                        ))
                      }

                    </TableBody>
                  </Table>
          }
        </div>

        {/* Table Footer */}
        <div
          className="flex flex-col md:flex-row gap-4 justify-between items-center"
        >
          <div
            className="flex gap-3 justify-center items-center"
          >
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>

            <button
              className="bg-themeprimary px-6 py-3 text-white text-sm rounded-md shadow-xl shadow-gray-200"
            >
              Apply
            </button>
          </div>

          {/* Pagination */}
          <div
            className="flex gap-5 items-center"
          >
            <button
              className="bg-white disabled:opacity-60 py-3 px-5 rounded-md shadow-xl shadow-gray-200 flex justify-center items-center gap-2 text-sm"
              disabled={tablePage === 1 || inProgress || projects.length === 0}
              onClick={() => setTablePage(prev => --prev)}
            >
              <RiArrowLeftSLine size={20} />
              <p>Prev</p>
            </button>

            <p
              className="text-sm text-gray-500"
            >{tablePage} of {Math.ceil(projectCount / 10) === 0 ? 1 : Math.ceil(projectCount / 10)}</p>

            <button
              className="bg-white disabled:opacity-60 py-3 px-5 rounded-md shadow-xl shadow-gray-200 flex justify-center items-center gap-2 text-sm"
              disabled={tablePage === Math.ceil(projectCount / 10) || inProgress || projects.length === 0}
              onClick={() => setTablePage(prev => ++prev)}
            >
              <p>Next</p>
              <RiArrowRightSLine size={20} />
            </button>
          </div>
        </div>

      </div>
    </BasicLayout>
  )
}

export default Projects