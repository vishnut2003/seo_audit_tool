'use client';

import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Notification from "./Notification";

function UserCard() {
  const [userSession, setUserSession] = useState<Session | null>(null)
  useEffect(() => {
    getSession().then((session) => {
      setUserSession(session)
      console.log(session)
    });
  }, [])

  return (
    <div
      className="flex items-center gap-5"
    >
      <Notification />
      <div
        className="flex flex-col items-end"
      >
        <Link href={'/my-account/account-settings'}>
          {/* eslint-disable @next/next/no-img-element */}
          <img
            src={userSession?.user?.image || '/users/default-avatar.png'}
            alt="User Image"
            className="w-[40px] h-[40px] drop-shadow-xl rounded-full"
          />
          {/* eslint-enable @next/next/no-img-element */}
        </Link>
      </div>
    </div>
  )
}

export default UserCard