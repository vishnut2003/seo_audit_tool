import { AnalyticsUserAcquisitionTableDataInterface } from '@/utils/server/projects/analyticsAPI/google/userAcquisitionData'
import React from 'react'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table"

const tableHeadHeadings: string[] = [
    "Total Users",
    "New Users",
    "Returning Users",
    "Average Engagement Time Per Active Users",
    "Engaged Session Per Active Users",
    "Event Count",
    "Key Events",
    "User Key Events Rate",
]

const AnalyticsUserAcquisitionTable = ({
    tableData,
}: {
    tableData: AnalyticsUserAcquisitionTableDataInterface[],
}) => {
    return (
        <div
            className='bg-white rounded-md overflow-hidden shadow-xl shadow-gray-200'
        >
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[200px]"></TableHead>
                        {tableHeadHeadings.map((heading, index) => (
                            <TableHead
                                className="text-right max-w-[100px]"
                                key={index}
                            >{heading}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tableData.map((data, index) => (
                        <TableRow
                            key={index}
                        >
                            <TableCell className="font-medium">{data.source}</TableCell>
                            <TableCell className="text-right">{data.totalUsers}</TableCell>
                            <TableCell className="text-right">{data.newUsers}</TableCell>
                            <TableCell className="text-right">{data.returningUsers}</TableCell>
                            <TableCell className="text-right">{data.averageEngagementTimePerActiveUsers}</TableCell>
                            <TableCell className="text-right">{data.engagedSessionPerActiveUsers}</TableCell>
                            <TableCell className="text-right">{data.eventCount}</TableCell>
                            <TableCell className="text-right">{data.keyEvent}</TableCell>
                            <TableCell className="text-right">{data.userKeyEventRate}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default AnalyticsUserAcquisitionTable