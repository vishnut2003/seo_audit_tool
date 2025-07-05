'use client';

import { GetAllUserApiEndpointRequestEntry } from '@/app/api/user-manager/get-all-users/route';
import { Table, TableBody } from '@/Components/ui/table';
import BasicLayout from '@/layouts/BasicLayout/BasicLayout'
import { UserModelInterface } from '@/models/UsersModel';
import { RiArrowLeftSLine, RiArrowRightSLine, RiErrorWarningFill, RiLoaderLine, RiUserAddLine } from '@remixicon/react'
import axios, { AxiosError } from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import TableDataRow, { UserDataWithImageFile } from './TableDataRow';
import { GetUserAvatarApiRequestDataInterface, GetUserAvatarImageApiRouteResponseInterface } from '@/app/api/user-manager/get-user-avatar/route';
import { base64ToFile } from '@/lib/utils';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select"

const Page = () => {

  const [inProgress, setInProgress] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [usersData, setUsersData] = useState<UserDataWithImageFile[]>([]);
  const [dataPerPage, setDataPerPage] = useState<number>(5);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalUsersCount, setTotalUsersCount] = useState<number>(0);
  const [searchText, setSearchText] = useState<string>('');

  const [refreshPage, setRefreshPage] = useState<number>(0);

  useEffect(() => {

    setInProgress(true);

    const requestData: GetAllUserApiEndpointRequestEntry = {
      dataPerPage,
      pageNumber,
      searchText,
    }

    axios.post<UserModelInterface[]>('/api/user-manager/get-all-users', requestData)
      .then(async (response) => {

        const usersCount: string = response.headers['x-users-count'];
        const count = parseInt(usersCount)
        setTotalUsersCount(count)

        const {
          data: users,
        } = response;

        const usersData: UserDataWithImageFile[] = [];

        for (const user of users) {

          const output: UserDataWithImageFile = {
            ...user as any,
            imageFile: null,
          }

          if (!user.image) {
            usersData.push(output);
            continue;
          }

          const avatarRequestData: GetUserAvatarApiRequestDataInterface = {
            relativeImagePath: user.image,
          }

          const {
            data: avatarBinary,
          } = await axios.post<GetUserAvatarImageApiRouteResponseInterface>('/api/user-manager/get-user-avatar', avatarRequestData);

          if (!avatarBinary.buffer) {
            usersData.push(output);
            continue;
          }

          const imageFile = base64ToFile(avatarBinary.buffer, "user-avatar", avatarBinary.mimeType);
          output['imageFile'] = imageFile;

          usersData.push(output);

        }

        setUsersData(usersData);

      })
      .catch((err) => {
        if (err instanceof AxiosError) {
          setError(err.response?.data || "Something went wrong!");
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Something went wrong!");
        }
      })
      .finally(() => setInProgress(false))


  }, [searchText, dataPerPage, pageNumber, refreshPage])

  return (
    <BasicLayout>
      <div>
        <div
          className='space-y-5'
        >

          <div
            className='flex w-full items-center justify-between'
          >
            <Link
              className='flex w-max items-center gap-3 font-medium bg-white shadow-2xl shadow-gray-200 rounded-md py-3 px-5'
              href={'/dashboard/advance/admin/user-registration'}
            >
              <RiUserAddLine
                size={20}
              />
              <p>Add User</p>
            </Link>

            <div
              className='flex items-center gap-3'
            >
              <input
                type="text"
                placeholder='Search user'
                className='py-3 px-5 bg-white rounded-md outline-none shadow-2xl shadow-gray-200'
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
              />
            </div>
          </div>

          <div
            className="bg-white rounded-md overflow-hidden shadow-xl shadow-gray-200 min-h-[300px] h-full"
          >
            {
              error ?
                <div
                  className='h-[300px] w-full bg-red-50 text-red-500 flex items-center justify-center gap-5'
                >
                  <RiErrorWarningFill
                    size={20}
                  />
                  <p>{error}</p>
                </div>
                : inProgress ?
                  <div
                    className='flex items-center justify-center h-[300px] w-full gap-5'
                  >
                    <RiLoaderLine
                      size={20}
                      className='animate-spin text-themesecondary'
                    />
                    <p>Loading Users...</p>
                  </div>
                  : usersData.length > 0 ?
                    <Table>
                      <TableBody>
                        {
                          usersData.map((user, index) => (
                            <TableDataRow
                              userData={user}
                              key={index}
                              setRefreshPage={setRefreshPage}
                            />
                          ))
                        }
                      </TableBody>
                    </Table>
                    : usersData.length === 0 ?
                      <div
                        className='flex items-center justify-center h-[300px] w-full opacity-50 gap-5'
                      >
                        <RiErrorWarningFill
                          size={20}
                        />
                        <p>No Users Found!</p>
                      </div>
                      : ""
            }
          </div>

          <div
            className='flex w-full items-center justify-between gap-5'
          >
            <div>
              <Select
                onValueChange={(value) => {
                  setDataPerPage(parseInt(value));
                }}
                disabled={inProgress}
              >
                <SelectTrigger className="w-[180px] disabled:opacity-50">
                  <SelectValue placeholder="Users Per Page" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div
              className='flex items-center justify-center gap-3'
            >
              <button
                className='flex items-center gap-2 py-3 px-5 rounded-md bg-white shadow-2xl shadow-gray-200 disabled:opacity-40'
                disabled={pageNumber === 1 || inProgress}
                onClick={() => {
                  setPageNumber(prev => --prev)
                }}
              >
                <RiArrowLeftSLine
                  size={20}
                />
                <p>Prev</p>
              </button>

              <p>{pageNumber}</p>

              <button
                className='flex items-center gap-2 py-3 px-5 rounded-md bg-white shadow-2xl shadow-gray-200 disabled:opacity-40'
                disabled={pageNumber === (Math.ceil(totalUsersCount / dataPerPage)) || inProgress}
                onClick={() => {
                  setPageNumber(prev => ++prev)
                }}
              >
                <p>Next</p>
                <RiArrowRightSLine
                  size={20}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </BasicLayout>
  )
}

export default Page