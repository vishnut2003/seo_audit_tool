'use client';

import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

function UserCard() {
  const [userSession, setUserSession] = useState<Session | null>(null)
  useEffect(() => {
    getSession().then((session) => {
      setUserSession(session)
      console.log(session)
    });
  }, [])

  return (
    <div>
      <div
        className="flex flex-col items-end"
      >
        <Link href={'/my-account/account-settings'}>
          <Image
            src={userSession?.user?.image || '/users/default-avatar.png'}
            alt="User Image"
            width={1000}
            height={1000}
            className="w-[40px] drop-shadow-xl"
          />
        </Link>
      </div>
    </div>
  )
}

export default UserCard