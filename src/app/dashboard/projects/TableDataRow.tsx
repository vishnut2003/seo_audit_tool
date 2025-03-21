'use client';

import { Checkbox } from "@/Components/ui/checkbox"
import { TableCell, TableRow } from "@/Components/ui/table"
import { ProjectModelInterface } from "@/models/ProjectsModel"
import { setProjectId } from "@/utils/client/projects"
import { RemixiconComponentType, RiDeleteBin6Line, RiMoreLine, RiPencilLine } from "@remixicon/react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover"
import Link from "next/link";

const TableDataRow = ({ rowData }: {
    rowData: ProjectModelInterface,
}) => {
    const [inProgress, setInProgress] = useState<boolean>(false);
    const router = useRouter();

    const searchParams = useSearchParams();
    const enableRedirect = searchParams.get('redirect');

    const moreOptions: {
        name: string,
        link: string,
        icon: RemixiconComponentType,
    }[] = [
            {
                name: "Edit Projects",
                link: `/dashboard/projects/edit/${encodeURIComponent(rowData.projectId)}`,
                icon: RiPencilLine,
            },
            {
                name: "Delete",
                link: `/dashboard/projects/delete/${encodeURIComponent(rowData.projectId)}`,
                icon: RiDeleteBin6Line,
            },
        ]

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
                        router.push(enableRedirect || '/dashboard')
                    }}
                >{inProgress ? 'selecting...' : 'select project'}</button>
            </TableCell>

            {/* Last updated */}
            <TableCell>{rowData.updatedAt.split('T')[0].split('-').join('/')}</TableCell>

            {/* No. of Competitors */}
            <TableCell>{rowData.competitors.length}</TableCell>

            {/* Actions */}
            <TableCell
                className="relative"
            >

                <Popover>
                    <PopoverTrigger
                        className="p-2 rounded-md hover:bg-gray-50"
                    >
                        <RiMoreLine
                            size={20}
                        />
                    </PopoverTrigger>

                    <PopoverContent
                        className="w-[170px] p-0 relative right-5"
                    >
                        <ul
                            className="flex flex-col gap-0"
                        >
                            {
                                moreOptions.map((option, index) => (
                                    <li
                                        key={index}
                                        className="py-3 px-3 hover:bg-gray-50"
                                    >
                                        <Link
                                            href={option.link}
                                            className="flex gap-3 items-center text-xs leading-3"
                                        >
                                            <option.icon
                                                size={17}
                                            />
                                            {option.name}
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </PopoverContent>
                </Popover>
            </TableCell>
        </TableRow>
    )
}

export default TableDataRow