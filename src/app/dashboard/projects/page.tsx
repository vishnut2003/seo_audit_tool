import { Checkbox } from "@/Components/ui/checkbox"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/Components/ui/table"
import BasicLayout from "@/layouts/BasicLayout/BasicLayout"
import { RiArrowLeftSLine, RiArrowRightSLine, RiArrowUpDownLine, RiCalendar2Line, RiLink, RiMoreLine, RiSearchLine } from "@remixicon/react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select"

const Projects = () => {
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

          {/* Date Dange */}
          <div
            className="flex gap-4 items-center"
          >
            <div
              className="py-3 px-4 bg-white rounded-md flex items-center gap-2 shadow-xl shadow-gray-200"
            >
              <RiCalendar2Line
                size={20}
                className="text-gray-400 hidden md:block"
              />
              <input
                type="date"
                placeholder="Start Date"
              />
            </div>

            <RiLink
              size={20}
              className="text-gray-400 hidden md:block"
            />

            <div
              className="py-3 px-4 bg-white rounded-md flex items-center gap-2 shadow-xl shadow-gray-200"
            >
              <RiCalendar2Line
                size={20}
                className="text-gray-400 hidden md:block"
              />
              <input
                type="date"
                placeholder="Start Date"
              />
            </div>
          </div>
        </div>

        {/* Table */}

        <div
          className="bg-white rounded-md overflow-hidden shadow-xl shadow-gray-200"
        >
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

              <TableRow>
                <TableCell className="w-[50px] h-14">
                  <Checkbox />
                </TableCell>
                <TableCell>12/10/2025</TableCell>
                <TableCell>
                  <p className="text-base font-semibold">webspidersolutions.com</p>
                  <button className="text-xs font-medium text-gray-400">Select Project</button>
                </TableCell>
                <TableCell>12/10/2025</TableCell>
                <TableCell>Test Data</TableCell>
                <TableCell>
                  <button
                    className="p-2 hover:bg-gray-100 rounded-md"
                  >
                    <RiMoreLine
                      size={20}
                    />
                  </button>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="w-[50px] h-14">
                  <Checkbox />
                </TableCell>
                <TableCell>12/10/2025</TableCell>
                <TableCell>
                  <p className="text-base font-semibold">webspidersolutions.com</p>
                  <button className="text-xs font-medium text-gray-400">Select Project</button>
                </TableCell>
                <TableCell>12/10/2025</TableCell>
                <TableCell>Test Data</TableCell>
                <TableCell>
                  <button
                    className="p-2 hover:bg-gray-100 rounded-md"
                  >
                    <RiMoreLine
                      size={20}
                    />
                  </button>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="w-[50px] h-14">
                  <Checkbox />
                </TableCell>
                <TableCell>12/10/2025</TableCell>
                <TableCell>
                  <p className="text-base font-semibold">webspidersolutions.com</p>
                  <button className="text-xs font-medium text-gray-400">Select Project</button>
                </TableCell>
                <TableCell>12/10/2025</TableCell>
                <TableCell>Test Data</TableCell>
                <TableCell>
                  <button
                    className="p-2 hover:bg-gray-100 rounded-md"
                  >
                    <RiMoreLine
                      size={20}
                    />
                  </button>
                </TableCell>
              </TableRow>

            </TableBody>
          </Table>
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
            className="flex gap-5"
          >
            <button
              className="bg-white py-3 px-5 rounded-md shadow-xl shadow-gray-200 flex justify-center items-center gap-2 text-sm"
            >
              <RiArrowLeftSLine size={20}/>
              <p>Prev</p>
            </button>
            
            <button
              className="bg-white py-3 px-5 rounded-md shadow-xl shadow-gray-200 flex justify-center items-center gap-2 text-sm"
            >
              <p>Next</p>
              <RiArrowRightSLine size={20}/>
            </button>
          </div>
        </div>

      </div>
    </BasicLayout>
  )
}

export default Projects