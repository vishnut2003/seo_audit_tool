'use client';

import { useEffect } from "react";
import sidebarMenuItems from "./items"
import { usePathname } from "next/navigation";
import Link from "next/link";

const SidebarMenu = () => {

    return (
        <div className="w-full flex flex-col gap-2">
            {sidebarMenuItems.map((menuItem, index) => (
                <Link href={menuItem.link} key={index} className={`flex gap-2 opacity-95 py-3 px-4 rounded-lg hover:bg-white/10 ${menuItem.link === usePathname() && 'bg-secondary text-white hover:bg-secondary'}`}>
                    <menuItem.icon size={24} />
                    <p>{menuItem.name}</p>
                </Link>
            ))}
        </div>
    )
}

export default SidebarMenu