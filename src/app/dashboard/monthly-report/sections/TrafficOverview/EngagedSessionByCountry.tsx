'use client';

import PieChartMonthlyReport from "@/Components/Recharts/MonthlyReportCharts/PieChart";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table"
import { TotalSessionByCountryMonthlyReportInterface } from "@/utils/server/monthlyReport/trafficOverview/engagedSessionByCountry";


const EngagedSessionByCountryMonthlyReport = ({
    data,
}: {
    data: TotalSessionByCountryMonthlyReportInterface["graphTicks"],
}) => {

    return (
        <div
            className="flex items-center justify-start"
        >
            <div
                className="w-[300px] h-[200px]"
            >
                <PieChartMonthlyReport
                    data={data.filter((value, index) => index < 4 && value)}
                    dataKey="session"
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
                                className="w-[200px] py-3 text-xs"
                            >Country</TableHead>
                            <TableHead
                                className="text-right py-3 text-xs"
                            >Engaged Session</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            data.filter((value, index) => index < 4 && value).map((value, index) => (
                                <TableRow
                                    key={index}
                                >
                                    <TableCell
                                        className="font-medium py-3 text-xs"
                                    >{value.country}</TableCell>
                                    <TableCell
                                        className="text-right py-3 text-xs"
                                    >{value.session}</TableCell>
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