'use client';

import { DeleteUserByUserIdApiRouteRequestData } from "@/app/api/user-manager/delete-user-by-userid/route";
import { TableCell, TableRow } from "@/Components/ui/table";
import { UserModelInterface } from "@/models/UsersModel";
import { RiDeleteBinLine, RiPencilLine } from "@remixicon/react";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

export interface UserDataWithImageFile extends UserModelInterface {
    imageFile: File | null,
}

const TableDataRow = ({
    userData,
    setRefreshPage,
}: {
    userData: UserDataWithImageFile,
    setRefreshPage: Dispatch<SetStateAction<number>>,
}) => {

    async function deleteUserByUserId() {
        const confirm = window.confirm(`Please confirm if you want to delete user: ${userData.name}, email: ${userData.email}`);
        if (!confirm) {
            return;
        }

        try {

            const requestData: DeleteUserByUserIdApiRouteRequestData = {
                userId: userData.userId,
            }

            await axios.post('/api/user-manager/delete-user-by-userid', requestData);
            setRefreshPage(prev => ++prev)

        } catch (err) {
            if (err instanceof Error) {
                window.alert(err.message);
            } else if (err instanceof AxiosError) {
                window.alert(err.response?.data || "Something went wrong")
            } else {
                window.alert("Something went wrong!");
            }
        }
    }

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
                        className="text-lg font-semibold"
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
                        className="py-2 px-4 rounded-md bg-themesecondary text-white flex items-center gap-3"
                    >
                        <RiPencilLine
                            size={20}
                        />
                        <p>Edit</p>
                    </button>
                    <button
                        className="py-2 px-4 rounded-md bg-red-500 text-white flex items-center gap-3"
                        onClick={deleteUserByUserId}
                    >
                        <RiDeleteBinLine
                            size={20}
                        />
                        <p>Delete</p>
                    </button>
                </div>
            </TableCell>
        </TableRow>
    )
}

export default TableDataRow