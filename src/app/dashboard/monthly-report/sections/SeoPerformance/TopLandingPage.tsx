'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table"
import { TopPagesOrganicMonthlyReport } from "@/utils/server/monthlyReport/seoPerformance/topPagesOrganic";


const dummyData: {
  pathName: string,
  session: number,
}[] = [
    {
      pathName: "/",
      session: 10,
    },
    {
      pathName: "/test",
      session: 20,
    },
    {
      pathName: "/test2",
      session: 30,
    },
    {
      pathName: "/test2",
      session: 30,
    },
  ]

const TopLandingPageMonthlyReport = ({
  tableData,
}: {
  tableData: TopPagesOrganicMonthlyReport["tableData"],
}) => {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              className="w-[300px] py-2 line-clamp-1"
            >Landing Page</TableHead>
            <TableHead
              className="text-right py-2"
            >Session</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.filter((data, index) => index < 4 && data).map((data, index) => (
            <TableRow
              key={index}
            >
              <TableCell
                className="font-medium py-2"
              >{data.path}</TableCell>
              <TableCell
                className="text-right py-2"
              >{data.session}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default TopLandingPageMonthlyReport