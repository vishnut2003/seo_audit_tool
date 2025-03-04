import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table'
import { GoogleSearchConsoleDataTabsRow } from '@/utils/server/projects/googleSearchConsoleAPI/reports/tabsData'
import React from 'react'

const TableTemplate = ({ data }: {
    data: GoogleSearchConsoleDataTabsRow[],
}) => {
    return (
        <div
            className='w-full'
        >
            <Table
                className="space-y-4"
            >
                <TableHeader>
                    <TableRow>
                        <TableHead></TableHead>
                        <TableHead>Clicks</TableHead>
                        <TableHead>Impression</TableHead>
                    </TableRow>
                </TableHeader>

                {/* Table Body */}
                <TableBody>

                    {
                        data.length === 0 ?
                            <TableRow>
                                <TableCell>No result found!</TableCell>
                            </TableRow>
                            : data.map((row, index) => (
                                <TableRow
                                    key={index}
                                >
                                    <TableCell
                                        className='w-full'
                                    >{row.keyWord}</TableCell>
                                    <TableCell>{row.clicks}</TableCell>
                                    <TableCell>{row.impression}</TableCell>
                                </TableRow>
                            ))
                    }

                </TableBody>
            </Table>
        </div>
    )
}

export default TableTemplate