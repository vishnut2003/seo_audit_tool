import BasicLayout from "@/layouts/BasicLayout/BasicLayout"
import { RiCalendar2Line, RiLink, RiSearchLine } from "@remixicon/react"

const Projects = () => {
  return (
    <BasicLayout
      pageTitle="Reports"
    >
      <div>

        {/* Filtering options */}
        <div
          className="flex justify-between items-center"
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
                className="text-gray-400"
              />
              <input
                type="date"
                placeholder="Start Date"
              />
            </div>

            <RiLink
              size={20}
              className="text-gray-400"
            />

            <div
              className="py-3 px-4 bg-white rounded-md flex items-center gap-2 shadow-xl shadow-gray-200"
            >
              <RiCalendar2Line
                size={20}
                className="text-gray-400"
              />
              <input
                type="date"
                placeholder="Start Date"
              />
            </div>
          </div>
        </div>

      </div>
    </BasicLayout>
  )
}

export default Projects