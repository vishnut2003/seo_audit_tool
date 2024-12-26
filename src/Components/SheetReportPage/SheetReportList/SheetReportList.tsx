'use client';

import TripleDotLoading from '@/Components/Loaders/TripleDotLoading/TripleDotLoading';
import { sheetReportRecordInterface } from '@/models/SheetReportRecordModel';
import { getAllSheetReport } from '@/utils/client/sheetReport';
import { RiRefreshLine } from '@remixicon/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const SheetReportList = () => {
    const [fetchInProgress, setFetchInProgress] = useState<boolean>(false);
    const [sheetReportRecord, setSheetReportRecord] = useState<sheetReportRecordInterface[] | null>(null);

    const [pageNumber, setPageNumber] = useState<number>(1)

    useEffect(() => {
        setFetchInProgress(true);

        getAllSheetReport({ page: pageNumber }).then((records) => {
            setSheetReportRecord(records);
        })
            .finally(() => setFetchInProgress(false));
    }, [pageNumber])

    return (
        <div className="relative overflow-x-auto shadow-sm sm:rounded-lg bg-white h-full">

            {
                fetchInProgress ?
                    <div className="w-full h-[100%] flex justify-center items-center">
                        <TripleDotLoading />
                    </div>
                    : !sheetReportRecord ?
                        <div className="w-full h-[40dvh] flex justify-center items-center">
                            <p className="opacity-70">No Records found!</p>
                        </div>
                        :
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        <div className="flex items-center">
                                            Report ID
                                        </div>
                                    </th>

                                    <th scope="col" className="px-6 py-3">
                                        Website
                                    </th>
                                    
                                    <th scope="col" className="px-6 py-3">
                                        Status
                                    </th>

                                    <th scope="col" className="px-6 py-3">
                                        Total Page
                                    </th>

                                    <th scope="col" className="px-6 py-3">
                                        Processed Pages
                                    </th>

                                    <th scope="col" className="px-6 py-3">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    sheetReportRecord.map((record, index) => (
                                        <tr key={index} className="bg-white border-b">
                                            <td className="px-6 py-4">
                                                {record.reportId}
                                            </td>

                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                Website URL
                                            </th>
                                            
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                <span
                                                className={
                                                    `text-sm font-semibold text-left text-white py-2 px-3 flex justify-center items-center gap-2 rounded-md w-max 
                                                    ${
                                                        record.status === "processing" ? "bg-orange-500"
                                                        : record.status === "error" ? "bg-red-500"
                                                        : "bg-green-500"
                                                    }
                                                    `
                                                    
                                                }
                                                >{record.status}</span>
                                            </th>

                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                {record.totalPage}
                                            </th>

                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                {record.finishPage}
                                            </th>

                                            <td align="left" className="px-6 py-4 text-right">
                                                <p className="text-left">
                                                    {record.sheetLink && <Link href={record.sheetLink} className="font-medium text-secondary hover:underline">View Sheet</Link>}
                                                </p>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
            }
        </div>

    )
}

export default SheetReportList