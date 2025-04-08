'use client';

import DatePicker from "@/Components/ui/datepicker";
import { AnalyticsUserAcquisitionGraphReport, AnalyticsUserAcquisitionTableDataInterface } from "@/utils/server/projects/analyticsAPI/google/userAcquisitionData";
import { useEffect, useState } from "react";
import AnalyticsUserAcquisitionGraph from "./Graph";
import { RiLoader4Line } from "@remixicon/react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select"
import AnalyticsUserAcquisitionTable from "./Table";

const UserAcquisitionMainContent = ({
  passingDateRange,
  userAcquisitionGraphData,
  userAcquisitionTableData,
}: {
  passingDateRange: {
    startDate: Date,
    endDate: Date,
  },
  userAcquisitionGraphData: AnalyticsUserAcquisitionGraphReport[],
  userAcquisitionTableData: AnalyticsUserAcquisitionTableDataInterface[],
}) => {

  const [dateRange, setDateRange] = useState<{
    startDate: Date,
    endDate: Date,
  }>(passingDateRange);

  const [inProgress, setInProgress] = useState<boolean>(true);

  // reports
  const [passingUserAcquisitionGrapData, setPassingUserAcquisitionGraphData] = useState<AnalyticsUserAcquisitionGraphReport[]>([]);

  useEffect(() => {
    setPassingUserAcquisitionGraphData(userAcquisitionGraphData);
    setInProgress(false);
  }, [userAcquisitionGraphData])

  if (inProgress) {
    return (
      <div
        className="flex items-center justify-center gap-3 h-full w-full"
      >
        <RiLoader4Line
          size={20}
          className="animate-spin"
        />
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div
      className='w-full space-y-5 pb-10'
    >
      {/* Filter Date */}
      <div
        className='flex justify-start items-end gap-5'
      >
        <div>
          <p
            className='text-sm font-medium'
          >Start Date</p>
          <div
            className='rounded-md overflow-hidden bg-white shadow-xl shadow-gray-200'
          >
            <DatePicker
              date={dateRange.startDate}
              placeholder='Start Date'
              setDate={value => setDateRange(prev => ({
                ...prev,
                startDate: value,
              }))}
            />
          </div>
        </div>

        <div>
          <p
            className='text-sm font-medium'
          >End Date</p>
          <div
            className='rounded-md overflow-hidden bg-white shadow-xl shadow-gray-200'
          >
            <DatePicker
              date={dateRange.endDate}
              placeholder='End Date'
              setDate={value => setDateRange(prev => ({
                ...prev,
                endDate: value,
              }))}
            />
          </div>
        </div>

        {/* filter submit button */}
        <button
          className='px-3 py-2 bg-themeprimary text-white rounded-md text-sm disabled:opacity-50'
          disabled={inProgress}
        >
          {inProgress ? "Loading..." : "Apply"}
        </button>
      </div>


      <AnalyticsUserAcquisitionGraph
        graphReport={passingUserAcquisitionGrapData}
      >
        {/* Select Date | Week | Month */}
        <div>
          
          <Select>
            <SelectTrigger className="w-[180px] p-3 h-[40px] bg-gray-100 border border-gray-200 shadow-none">
              <SelectValue placeholder="Date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="month">Month</SelectItem>
            </SelectContent>
          </Select>

        </div>
      </AnalyticsUserAcquisitionGraph>

      <AnalyticsUserAcquisitionTable
        tableData={userAcquisitionTableData}
      />
    </div>
  )
}

export default UserAcquisitionMainContent