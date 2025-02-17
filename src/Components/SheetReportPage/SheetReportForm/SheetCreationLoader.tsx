'use client';

import TripleDotLoading from "@/Components/Loaders/TripleDotLoading/TripleDotLoading"
import { sheetReportRecordInterface } from "@/models/SheetReportRecordModel";
import { RiCloseLargeLine, RiFileExcel2Line, RiNotification2Line, RiRefreshLine } from "@remixicon/react";
import { useEffect, useState } from "react";

const SheetCreationLoader = ({ reportId, popupClose, inProgress }: {
  reportId?: string,
  popupClose: () => void,
  inProgress: boolean,
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
      console.log(parsedData);
    }

    // Handle connection errors
    eventSource.onerror = () => {
      eventSource.close()
    }

    // Cleanup on component unmount
    return () => {
      eventSource.close()
    }
  }, [reportId]);

  return (
    <div className="fixed top-0 left-0 w-full h-full p-5 bg-[#ffffff70] flex justify-center items-center z-50">
      <div className="p-5 bg-white rounded-xl drop-shadow-2xl max-w-screen-sm w-full max-h-[500px] h-full flex flex-col justify-center items-center gap-3">

        {
          inProgress ?
            <>
              <TripleDotLoading />
              <h2>Initiating Report...</h2>
            </> :
            <div className="mt-3 text-center flex items-center flex-col gap-3">
              <RiNotification2Line
                size={40}
                className="text-themeprimary p-3 animate-bounce bg-gray-100 rounded-full"
              />
              <div
                className="text-center"
              >
                <p className="text-sm">Report updates will show on Notification bar</p>
                <p className="text-sm">You can safely close </p>
              </div>
            </div>
        }

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

        <div
          className="flex gap-4 items-center justify-center"
        >
          {
            !inProgress &&
            <>
              <button
                className="bg-red-200 text-red-500 py-4 px-6 rounded-sm flex gap-3 items-center"
                onClick={popupClose}
              >
                <RiCloseLargeLine
                  size={20}
                />
                Close
              </button>

              {
                progressData?.sheetLink ?
                  <a
                    className="py-4 px-6 bg-green-200 text-green-600 rounded-sm flex gap-3 items-center"
                    href={progressData.sheetLink}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <RiFileExcel2Line
                      size={20}
                    />
                    Open Report
                  </a> :
                  <button
                    className="py-4 px-6 bg-green-200 text-green-600 opacity-70 rounded-sm flex gap-3 items-center"
                  >
                    <RiRefreshLine
                      className="animate-spin"
                      size={20}
                    />
                    Loading...
                  </button>
              }
            </>
          }
        </div>

      </div>
    </div>
  )
}

export default SheetCreationLoader