import React from 'react'

const CompetitorAnalysisList = () => {
  return (
    <div className="relative overflow-x-auto shadow-sm sm:rounded-lg bg-white h-full">

      {/* Table start */}
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Date
            </th>

            <th scope="col" className="px-6 py-3">
              <div className="flex items-center">
                Report ID
              </div>
            </th>

            <th scope="col" className="px-6 py-3">
              Website
            </th>

            <th scope="col" className="px-6 py-3">
              Number of Competitors
            </th>

            <th scope="col" className="px-6 py-3">
              Status
            </th>

            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b">
            <td className="px-6 py-4">
              2021-09-01
            </td>

            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              123456
            </th>

            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              https://www.example.com
            </th>

            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              5
            </th>

            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              <span
                className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-500">
                Completed
              </span>
            </th>

            <td align="left" className="px-6 py-4 text-right">
              <p className="text-left">
                <a href='#' target='_blank' rel="noopener noreferrer" className="font-medium text-secondary hover:underline">View Sheet</a>
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default CompetitorAnalysisList