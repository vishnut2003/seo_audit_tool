'use client';

import sidebarMenuItems from "./items"
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";

const SidebarMenu = () => {

    const pathname = usePathname();

    return (
        <div className="w-full flex flex-col gap-2">
            {sidebarMenuItems.map((menuItem, index) => (
                <Link href={menuItem.link} key={index} className={`flex min-w-max gap-2 py-3 px-4 rounded-lg ${menuItem.link === pathname || menuItem.subPages?.includes(pathname) ? 'bg-secondary text-white hover:bg-secondary' : 'hover:bg-gray-50'}`}>
                    <menuItem.icon size={24} />
                    <p className="whitespace-nowrap font-medium">{menuItem.name}</p>
                </Link>
            ))}
        </div>
    )
}

export default SidebarMenu