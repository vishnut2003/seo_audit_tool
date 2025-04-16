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
import { TopBrowsersMonthlyReportInterface } from "@/utils/server/monthlyReport/seoPerformance/topBrowsers";

const TopBrowsersMonthlyReport = ({
  graphTableData,
}: {
  graphTableData: TopBrowsersMonthlyReportInterface["graphTicks"],
}) => {
  return (
    <div
      className="flex items-center justify-start"
    >
      <div
        className="w-[300px] h-[200px]"
      >
        <PieChartMonthlyReport
          data={graphTableData.filter((data, index) => index < 4 && data)}
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
                className="w-[300px] py-3 text-xs"
              >Browsers</TableHead>
              <TableHead
                className="text-right py-3 text-xs"
              >Session</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              graphTableData.filter((data, index) => index < 4 && data).map((value, index) => (
                <TableRow
                  key={index}
                >
                  <TableCell
                    className="font-medium py-3 text-xs"
                  >{value.browser}</TableCell>
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

export default TopBrowsersMonthlyReport