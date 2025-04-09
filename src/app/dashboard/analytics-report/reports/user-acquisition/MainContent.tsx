'use client';

import DatePicker from "@/Components/ui/datepicker";
import { AnalyticsUserAcquisitionGraphReport, AnalyticsUserAcquisitionTableDataInterface } from "@/utils/server/projects/analyticsAPI/google/userAcquisitionData";
import { useEffect, useState } from "react";
import AnalyticsUserAcquisitionGraph from "./Graph";
import { RiErrorWarningLine, RiLoader4Line } from "@remixicon/react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select"
import AnalyticsUserAcquisitionTable from "./Table";
import axios, { AxiosError } from "axios";
import { AnalyticsUserAcquisitionApiRouteEntryInterface } from "@/app/api/google-analytics/user-acquisition-report/route";

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

  const [graphTypeState, setGraphTypeState] = useState<"date" | "week" | "month">("date");
  const [dateRange, setDateRange] = useState<{
    startDate: Date,
    endDate: Date,
  }>(passingDateRange);

  const [inProgress, setInProgress] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // reports
  const [passingUserAcquisitionGrapData, setPassingUserAcquisitionGraphData] = useState<AnalyticsUserAcquisitionGraphReport[]>([]);
  const [passingUserAcquisitionTableData, setPassingUserAcquisitionTableData] = useState<AnalyticsUserAcquisitionTableDataInterface[]>([]);

  useEffect(() => {
    setPassingUserAcquisitionGraphData(userAcquisitionGraphData);
    setPassingUserAcquisitionTableData(userAcquisitionTableData);
    setInProgress(false);
  }, [userAcquisitionGraphData, userAcquisitionTableData])

  async function updateAnalyticsData({
    graphType,
  }: {
    graphType: "date" | "week" | "month" | null,
  }) {
    try {

      setInProgress(true);

      if (!graphType) {
        graphType = graphTypeState;
      }

      const apiRequestEntry: AnalyticsUserAcquisitionApiRouteEntryInterface = {
        dateRange: {
          startDate: dateRange.startDate.toISOString().split('T')[0],
          endDate: dateRange.endDate.toISOString().split('T')[0],
        },
        graphType,
      }

      const response = await axios.post<{
        graphReport: [AnalyticsUserAcquisitionGraphReport[]],
        tableReport: [AnalyticsUserAcquisitionTableDataInterface[]],
      }>(
        '/api/google-analytics/user-acquisition-report',
        apiRequestEntry,
      )
      console.log(response.data);

      const {
        graphReport,
        tableReport,
      } = response.data;

      setPassingUserAcquisitionGraphData(graphReport[0]);
      setPassingUserAcquisitionTableData(tableReport[0]);

      setInProgress(false);

    } catch (err: any) {
      setInProgress(false);
      if (err instanceof Error) {
        setError(err.message);
      } else if (err instanceof AxiosError) {
        if (err.response?.data && typeof err.response.data === "string") {
          setError(err.response.data);
        } else {
          setError(err.message);
        }
      } else {
        setError("Something went wrong while updating analytics data!");
      }
    }
  }

  if (error) {
    return (
      <div
        className="flex items-center justify-center gap-3 h-full w-full text-red-500"
      >
        <RiErrorWarningLine
          size={20}
        />
        <p>{error}</p>
      </div>
    )
  }

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
          onClick={() => {
            updateAnalyticsData({
              graphType: null,
            })
          }}
        >
          {inProgress ? "Loading..." : "Apply"}
        </button>
      </div>


      <AnalyticsUserAcquisitionGraph
        graphReport={passingUserAcquisitionGrapData}
      >
        {/* Select Date | Week | Month */}
        <div>

          <Select
            onValueChange={(value) => {
              setGraphTypeState(value as any);
              updateAnalyticsData({
                graphType: value as any,
              });
            }}
          >
            <SelectTrigger className="w-[180px] p-3 h-[40px] bg-gray-100 border border-gray-200 shadow-none capitalize">
              <SelectValue placeholder={graphTypeState} />
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
        tableData={passingUserAcquisitionTableData}
      />
    </div>
  )
}

export default UserAcquisitionMainContent