'use client';

import { CompetitorAnalysisRecordModelInterface } from '@/models/CompetitorAnalysisRecordModel';
import { getAllCompetitorAnalysisReports } from '@/utils/client/CompetitorAnalysisReport';
import React, { useEffect, useState } from 'react'

const CompetitorAnalysisList = ({refreshTableList}: {
  refreshTableList: number,
}) => {

  const [reports, setReports] = useState<CompetitorAnalysisRecordModelInterface[]>([])
  const [listLoading, setListLoading] = useState<boolean>(true);

  useEffect(() => {
    getAllCompetitorAnalysisReports()
      .then((reports) => {
        setListLoading(false)
        setReports(reports);
      })
  }, [refreshTableList])

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
          {
            listLoading ?
            <tr>
              <td className='px-5 py-4'>Loading...</td>
            </tr> :
            [...reports].reverse().map((report, index) => (
              <tr key={index} className="bg-white border-b">
                <td className="px-6 py-4">
                  {report.createdAt.split("T")[0]}
                </td>

                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {report.recordId}
                </th>

                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {report.website}
                </th>

                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {report.competitors.length}
                </th>

                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${report.status == "completed" ? 'bg-green-100 text-green-500': "bg-orange-100 text-orange-500"}`}>
                    {report.status}
                  </span>
                </th>

                <td align="left" className="px-6 py-4 text-right">
                  <p className="text-left">
                    <a href={`https://docs.google.com/spreadsheets/d/${report.sheetId}`} target='_blank' rel="noopener noreferrer" className="font-medium text-secondary hover:underline">View Sheet</a>
                  </p>
                </td>
              </tr>
            ))
          }

        </tbody>
      </table>
    </div>
  )
}

export default CompetitorAnalysisList