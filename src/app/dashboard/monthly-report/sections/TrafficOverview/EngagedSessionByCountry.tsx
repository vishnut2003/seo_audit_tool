'use client';

import { htmlColorCodes } from "@/Components/Recharts/MonthlyReportCharts/BarChart";
import PieChartMonthlyReport from "@/Components/Recharts/MonthlyReportCharts/PieChart";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table"


const EngagedSessionByCountryMonthlyReport = ({
    data,
}: {
    data: any[],
}) => {

    return (
        <div
            className="flex items-center justify-start"
        >
            <div
                className="w-[300px] h-[200px]"
            >
                <PieChartMonthlyReport
                    data={[data[0], data[1], data[2], data[3]]}
                />
            </div>

            <div
                className="w-full"
            >
                <Table
                    className="border border-gray-100"
                >
                    <TableHeader>
                        <TableRow>
                            <TableHead
                                className="w-[100px] py-3 text-xs"
                            >Country</TableHead>
                            <TableHead
                                className="text-right py-3 text-xs"
                            >Engaged Session</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            [data[0], data[1], data[2], data[3]].map((value, index) => (
                                <TableRow
                                    key={index}
                                >
                                    <TableCell
                                        className="font-medium py-3 text-xs"
                                    >{value.date}</TableCell>
                                    <TableCell
                                        className="text-right py-3 text-xs"
                                    >{value.value}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default EngagedSessionByCountryMonthlyReport