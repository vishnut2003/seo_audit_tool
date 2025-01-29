'use client';

import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react"

const SidebarLogo = () => {

  const [userSession, setUserSession] = useState<Session | null>(null);

  useEffect(() => {
    getSession().then((session) => {
      setUserSession(session);
    })
  }, []);

  return (
    <div className="w-full py-5 px-6">
        <h2 className="font-bold text-xl">Hello {userSession?.user?.name} <span role="img" aria-label="dog">👋</span></h2>
        <p className="text-sm opacity-80">Welcome to SEO Audit Tool</p>
    </div>
  )
}

export default SidebarLogo