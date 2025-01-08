'use client';

import TripleDotLoading from "@/Components/Loaders/TripleDotLoading/TripleDotLoading"
import { getCurrentProcessingSheetRecord } from "@/utils/client/sheetReport";
import { RiRefreshLine } from "@remixicon/react";
import { useState } from "react";

export interface ProgressLoaderDataInterface {
  totalPages: number,
  finishPage: number,
  siteUrl: string,
}

const SheetCreationLoader = () => {

  const [progressData, setProgressData] = useState<ProgressLoaderDataInterface | null>(null);
  const [fetchingProgress, setFetchingProgress] = useState<boolean>(false);

  function _getCurrentProcessing () {
    setFetchingProgress(true)
    getCurrentProcessingSheetRecord()
      .then((record) => {
        const ProgressRecords: ProgressLoaderDataInterface | null = !record ? null : {
          finishPage: record.finishPage,
          totalPages: record.totalPage,
          siteUrl: record.websiteUrl,
        }
        setProgressData(ProgressRecords)
        setFetchingProgress(false)
      })
  }

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
              <p>{progressData.siteUrl}</p>
              <p>Pages <strong>{progressData.finishPage}</strong> finished of <strong>{progressData.totalPages}</strong></p>
            </div>
          }
          <button
          type="button"
          disabled={fetchingProgress}
          onClick={_getCurrentProcessing}
          className="flex justify-center items-center gap-1 mt-2 bg-gray-100 active:bg-gray-300 rounded-md py-3 px-5 shadow-md"
          >
            <RiRefreshLine 
            className={`${fetchingProgress && "animate-spin"}`}
            size={15}/>
            <p className="font-semibold">Recheck</p>
          </button>
        </div>

      </div>
    </div>
  )
}

export default SheetCreationLoader