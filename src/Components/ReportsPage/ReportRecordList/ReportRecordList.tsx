import { createReportMDocInterface } from "@/app/models/ReportRecordModel";
import TripleDotLoading from "@/Components/Loaders/TripleDotLoading/TripleDotLoading";
import { getAllReportRecords } from "@/utils/client/auditReport";
import { useEffect, useState } from "react"

export default function ReportRecordList() {

    const [fetchInProgress, setFetchInProgress] = useState<boolean>(false);
    const [reportRecordDoc, setReportRecordDoc] = useState<createReportMDocInterface | null>(null);

    useEffect(() => {
        setFetchInProgress(true);

        getAllReportRecords().then((records) => {
            setReportRecordDoc(records);
        })
            .finally(() => setFetchInProgress(false));
    }, [])

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-white">

            {
                fetchInProgress ?
                    <div className="w-full h-[40dvh] flex justify-center items-center">
                        <TripleDotLoading />
                    </div>
                    : !reportRecordDoc ?
                        <div className="w-full h-[40dvh] flex justify-center items-center">
                            <p>No Records found!</p>
                        </div>
                        :
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Domain name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        <div className="flex items-center">
                                            Report ID
                                        </div>
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        <div className="flex items-center">
                                            Date
                                        </div>
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        <div className="flex items-center">
                                            Status
                                        </div>
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        <div className="flex items-center">
                                            Actions
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    reportRecordDoc.reportRecord.map((record, index) => (
                                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {record.data?.url}
                                            </th>
                                            <td className="px-6 py-4">
                                                {record.data?.id}
                                            </td>
                                            <td className="px-6 py-4">
                                                11/12/2024
                                            </td>
                                            <td className="px-6 py-4">
                                                Nothing
                                            </td>
                                            <td align="left" className="px-6 py-4 text-right">
                                                <p className="text-left">
                                                    <a href="#" className="font-medium text-primary hover:underline mr-2">Check Status</a>
                                                    <a href="#" className="font-medium text-secondary hover:underline">View</a>
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