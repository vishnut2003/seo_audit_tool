'use client';

import { Checkbox } from "@/Components/ui/checkbox"
import { TableCell, TableRow } from "@/Components/ui/table"
import { ProjectModelInterface } from "@/models/ProjectsModel"
import { setProjectId } from "@/utils/client/projects"
import { RiMoreLine } from "@remixicon/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

const TableDataRow = ({ rowData }: {
    rowData: ProjectModelInterface,
}) => {
    const [inProgress, setInProgress] = useState<boolean>(false);
    const router = useRouter();

    return (
        <TableRow>
            <TableCell className="w-[50px] h-14">
                <Checkbox />
            </TableCell>

            {/* Date */}
            <TableCell>{rowData.createdAt.split('T')[0].split('-').join('/')}</TableCell>

            {/* Website */}
            <TableCell>
                <p className="text-base font-semibold">{rowData.domain}</p>
                <button
                    className="text-xs font-medium text-gray-400"
                    onClick={async () => {
                        setInProgress(true)
                        await setProjectId(rowData.projectId);
                        router.push('/dashboard')
                    }}
                >{inProgress ? 'selecting...' : 'select project'}</button>
            </TableCell>

            {/* Last updated */}
            <TableCell>{rowData.updatedAt.split('T')[0].split('-').join('/')}</TableCell>

            {/* No. of Competitors */}
            <TableCell>{rowData.competitors.length}</TableCell>

            {/* Actions */}
            <TableCell>
                <button
                    className="p-2 hover:bg-gray-100 rounded-md"
                >
                    <RiMoreLine
                        size={20}
                    />
                </button>
            </TableCell>
        </TableRow>
    )
}

export default TableDataRow