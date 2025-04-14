'use client';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table"


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

const TopLandingPageMonthlyReport = () => {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              className="w-[150px] py-2"
            >Landing Page</TableHead>
            <TableHead
              className="text-right py-2"
            >Session</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dummyData.map((data, index) => (
            <TableRow
              key={index}
            >
              <TableCell
                className="font-medium py-2"
              >{data.pathName}</TableCell>
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