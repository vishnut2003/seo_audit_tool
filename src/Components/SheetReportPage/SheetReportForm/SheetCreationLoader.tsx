'use client';

import TripleDotLoading from "@/Components/Loaders/TripleDotLoading/TripleDotLoading"
import { sheetReportRecordInterface } from "@/models/SheetReportRecordModel";
import { getCurrentProcessingSheetRecord } from "@/utils/client/sheetReport";
import { RiRefreshLine } from "@remixicon/react";
import { useEffect, useState } from "react";

const SheetCreationLoader = ({ reportId }: {
  reportId: string,
}) => {

  const [progressData, setProgressData] = useState<sheetReportRecordInterface | null>(null);

  useEffect(() => {
    // Create EventSource connection
    const eventSource = new EventSource(`/api/sheet-report/get-current-processing?reportid=${reportId}`);

    // Handle open connection
    eventSource.onopen = () => {
      console.log("SSE Connected.")
    }

    // Handle incoming messages
    eventSource.onmessage = (event) => {
      const parsedData: sheetReportRecordInterface | null = JSON.parse(event.data);
      setProgressData(parsedData);
    }

    // Handle connection errors
    eventSource.onerror = () => {
      eventSource.close()
    }

    // Cleanup on component unmount
    return () => {
      eventSource.close()
    }
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full p-5 bg-[#ffffff70] flex justify-center items-center z-50">
      <div className="p-5 bg-white rounded-xl drop-shadow-2xl max-w-screen-sm w-full max-h-[500px] h-full flex flex-col justify-center items-center gap-3">
        <TripleDotLoading />
        <h2>Creating Google Sheet...</h2>

        <div className="mt-3 text-center flex flex-col gap-1">
          <p className="text-sm">Creating report can take more time based on pages.</p>
          <p className="text-sm text-red-400">Do not close this tab, or report will fail</p>
        </div>

        {/* progress details */}

        <div className="flex flex-col gap-2 justify-center items-center">
          <h2 className="text-lg mb-2 text-center font-semibold">Crawling in progress</h2>
          {
            !progressData ?
              <p>Might take few seconds for updates...</p> :
              <div className="text-center">
                <p>{progressData.websiteUrl}</p>
                <p>Pages <strong>{progressData.finishPage}</strong> finished of <strong>{progressData.totalPage}</strong></p>
              </div>
          }
        </div>

      </div>
    </div>
  )
}

export default SheetCreationLoader