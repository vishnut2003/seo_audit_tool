import { createReportMDocInterface } from "@/models/ReportRecordModel";
import TripleDotLoading from "@/Components/Loaders/TripleDotLoading/TripleDotLoading";
import { getAllReportRecords } from "@/utils/client/auditReport";
import Link from "next/link";
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
        <div className="relative overflow-x-auto shadow-sm sm:rounded-lg bg-white h-full">

            {
                fetchInProgress ?
                    <div className="w-full h-[100%] flex justify-center items-center">
                        <TripleDotLoading />
                    </div>
                    : !reportRecordDoc ?
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
                                        Domain name
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
                                        <tr key={index} className="bg-white border-b">
                                            <td className="px-6 py-4">
                                                {record.data?.id}
                                            </td>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                {record.data?.url}
                                            </th>
                                            <td align="left" className="px-6 py-4 text-right">
                                                <p className="text-left">
                                                    <Link href={`/dashboard/reports/${record.data?.id}`} className="font-medium text-secondary hover:underline">View</Link>
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