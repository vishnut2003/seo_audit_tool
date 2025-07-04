'use client';

import { TableCell, TableRow } from "@/Components/ui/table";
import { UserModelInterface } from "@/models/UsersModel";
import Image from "next/image";

export interface UserDataWithImageFile extends UserModelInterface {
    imageFile: File | null,
}

const TableDataRow = ({
    userData,
}: {
    userData: UserDataWithImageFile,
}) => {
    return (
        <TableRow>
            {/* Profile image */}
            <TableCell className="w-[100px] border-b border-gray-200">
                <Image
                    src={userData.imageFile ? URL.createObjectURL(userData.imageFile) : "/public/users/default-avatar.png"}
                    alt="User-avatar"
                    width={200}
                    height={200}
                    className="w-[50px] h-[50px] rounded-full"
                />
            </TableCell>

            {/* Name and Email */}
            <TableCell
                className="space-y-2 border-b border-gray-200"
            >
                <div>
                    <p
                        className="text-sm font-semibold"
                    >{userData.name}</p>
                    <p
                        className="text-sm mt-0"
                    >{userData.email}</p>
                </div>
            </TableCell>

            {/* Delete Action */}
            <TableCell
                className="relative border-b border-gray-200"
            >
                <div
                    className="flex items-center justify-end gap-5"
                >
                    <button
                        className="py-3 px-5 rounded-md bg-themesecondary text-white"
                    >Edit</button>
                    <button
                        className="py-3 px-5 rounded-md bg-red-500 text-white"
                    >Delete</button>
                </div>
            </TableCell>
        </TableRow>
    )
}

export default TableDataRow