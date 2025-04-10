'use client';

import { AnalyticsTrafficAcquisitionTableDataInterface } from "@/utils/server/projects/analyticsAPI/google/trafficAcquisitionData";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table"

const tableHeadHeadings: string[] = [
    "Sessions",
    "Engaged Sessions",
    "Engagement Rate",
    "Average Engagement Time Per Session",
    "Events Per Session",
    "Event Count",
    "Key Events",
    "Session Key Event Rate",
]

const AnalyticsTrafficAcquisitionTable = ({
    tableData,
}: {
    tableData: AnalyticsTrafficAcquisitionTableDataInterface[],
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
                            <TableCell className="text-right">{data.sessions}</TableCell>
                            <TableCell className="text-right">{data.engagedSessions}</TableCell>
                            <TableCell className="text-right">{data.engagementRate}</TableCell>
                            <TableCell className="text-right">{data.averageEngagementTimePerSession}</TableCell>
                            <TableCell className="text-right">{data.eventsPerSession}</TableCell>
                            <TableCell className="text-right">{data.eventCount}</TableCell>
                            <TableCell className="text-right">{data.keyEvents}</TableCell>
                            <TableCell className="text-right">{data.sessionKeyEventRate}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default AnalyticsTrafficAcquisitionTable