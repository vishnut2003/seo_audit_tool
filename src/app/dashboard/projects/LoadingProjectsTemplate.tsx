import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table"
import { RiArrowUpDownLine } from "@remixicon/react"

const LoadingProjectsTemplate = () => {
    return (
        <Table
            className="space-y-4"
        >
            <TableHeader>
                <TableRow>
                    <TableHead></TableHead>
                    <TableHead className="items-center">
                        Date
                        <RiArrowUpDownLine
                            size={15}
                            className="inline ml-2"
                        />
                    </TableHead>
                    <TableHead>Domain</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>No. of Competitors</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody>

                {
                    [1, 2, 3, 4, 5, 6].map((row) => (
                        <TableRow
                            key={row}
                        >
                            {
                                [1, 2, 3, 4, 5, 6].map((col) => (
                                    <TableCell
                                        className="w-[50px] h-14"
                                        key={col}
                                    >
                                        <AnimateTableCell/>
                                    </TableCell>
                                ))
                            }
                        </TableRow>
                    ))
                }

            </TableBody>
        </Table>
    )
}

function AnimateTableCell() {
    return <div className="animate-pulse bg-gray-200 h-4 w-full rounded"></div>
}

export default LoadingProjectsTemplate