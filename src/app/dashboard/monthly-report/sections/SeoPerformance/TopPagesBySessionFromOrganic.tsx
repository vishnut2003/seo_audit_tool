'use client';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table"
import { TopLandingPagesMonthlyReport } from "@/utils/server/monthlyReport/seoPerformance/topLandingPages";


const dummyData: {
    path: string,
    session: number,
    engagedSession: number,
    bounceRate: number,
}[] = [
        {
            path: "/testing-path-url",
            bounceRate: 10,
            engagedSession: 20,
            session: 30,
        },
        {
            path: "/testing-path-url",
            bounceRate: 10,
            engagedSession: 20,
            session: 30,
        },
        {
            path: "/testing-path-url",
            bounceRate: 10,
            engagedSession: 20,
            session: 30,
        },
        {
            path: "/testing-path-url",
            bounceRate: 10,
            engagedSession: 20,
            session: 30,
        },
    ]

const TopPagesBySessionFromOrganic = ({
    tableData,
}: {
    tableData: TopLandingPagesMonthlyReport["tableData"],
}) => {
    return (
        <div
            className="w-full"
        >
            <Table
                className="border border-gray-100"
            >
                <TableHeader>
                    <TableRow>
                        <TableHead
                            className="w-[100%] py-3 text-xs"
                        >Page Path</TableHead>
                        <TableHead
                            className="text-right py-3 text-xs"
                        >Session</TableHead>
                        <TableHead
                            className="text-right py-3 text-xs"
                        >Engaged Session</TableHead>
                        <TableHead
                            className="text-right py-3 text-xs"
                        >Bounce Rate</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        tableData.filter((data, index) => index < 4 && data).map((value, index) => (
                            <TableRow
                                key={index}
                            >
                                <TableCell
                                    className="font-medium py-3 text-xs"
                                >{value.path}</TableCell>
                                <TableCell
                                    className="text-right py-3 text-xs"
                                >{value.session}</TableCell>
                                <TableCell
                                    className="text-right py-3 text-xs"
                                >{value.engagedSession}</TableCell>
                                <TableCell
                                    className="text-right py-3 text-xs"
                                >{value.bounceRate}</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default TopPagesBySessionFromOrganic