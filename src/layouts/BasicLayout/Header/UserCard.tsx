'use client';

import { getSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Notification from "./Notification";
import axios from "axios";
import { GetUserAvatarApiRequestDataInterface, GetUserAvatarImageApiRouteResponseInterface } from "@/app/api/user-manager/get-user-avatar/route";
import { RiLoaderLine } from "@remixicon/react";
import Image from "next/image";
import { base64ToFile } from "@/lib/utils";
import { UserModelInterface } from "@/models/UsersModel";

function UserCard() {
  const [userAvatar, setUserAvatar] = useState<string | null>(null);

  const [inProgress, setInProgress] = useState<boolean>(false);

  useEffect(() => {
    setInProgress(true)
    getSession().then(async (session) => {

      // Fetch user avatar if available
      if (session?.user?.email) {

        let userData = null

        try {
          const {
            data: user,
          } = await axios.post<UserModelInterface | null>('/api/user-manager/get-user-data-by-email', { email: session.user.email })
          userData = user;
        } catch (err) {
          console.log(err);
        }

        const requestEntry: GetUserAvatarApiRequestDataInterface = {
          relativeImagePath: userData?.image || "",
        }

        const {
          data,
        } = await axios.post<GetUserAvatarImageApiRouteResponseInterface>('/api/user-manager/get-user-avatar', requestEntry);

        if (data && data.buffer) {
          const { buffer: base64Data, mimeType } = data;
          const imageFile = base64ToFile(base64Data, 'profileImage', mimeType);
          const profileImageObjectUrl = URL.createObjectURL(imageFile);
          setUserAvatar(profileImageObjectUrl);
        }
      }

      setInProgress(false)

    })
  }, [])

  return (
    <div
      className="flex items-center gap-5"
    >
      <Notification />
      <div
        className="flex flex-col items-end"
      >
        <Link href={'/dashboard/advance/my-account'} className="relative">
          <Image
            src={userAvatar || '/users/default-avatar.png'}
            alt="User Image"
            className="w-[40px] h-[40px] drop-shadow-xl rounded-full"
            width={500}
            height={500}
          />

          {
            inProgress &&
            <div
              className="absolute top-0 left-0 w-full h-full rounded-full bg-white/90 flex justify-center items-center"
            >
              <RiLoaderLine
                className="animate-spin text-themesecondary"
                size={20}
              />
            </div>
          }

        </Link>
      </div>
    </div>
  )
}

export default UserCard