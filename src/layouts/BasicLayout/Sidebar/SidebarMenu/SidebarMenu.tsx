'use client';

import sidebarMenuItems, { SidebarMenuItemsInterface } from "./items"
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import analyticsSidebarMenuItems from "./analyticsItems";

const SidebarMenu = () => {

    const pathname = usePathname();
    const [currentMenuItems, setCurrentMenuItems] = useState<(string | SidebarMenuItemsInterface)[]>(sidebarMenuItems);

    useEffect(() => {
        if (pathname.includes('/dashboard/analytics-report/reports')) {
            setCurrentMenuItems(analyticsSidebarMenuItems);
        }
    }, [pathname, analyticsSidebarMenuItems])

    return (
        <div className="w-full flex flex-col gap-2">
            {currentMenuItems.map((menuItem, index) => {
                if (typeof menuItem === "string") {
                    return (
                        <h2
                            className="text-sm font-medium mt-3 mb-1"
                            key={index}
                        >{menuItem}</h2>
                    )
                } else {
                    return (
                        <Link href={menuItem.link} key={index} className={`flex min-w-max gap-2 py-3 px-4 rounded-lg ${menuItem.link === pathname || menuItem.subPages?.includes(pathname) ? 'bg-themesecondary text-white hover:bg-themesecondary' : 'hover:bg-gray-50'}`}>
                            <menuItem.icon size={24} />
                            <p className="whitespace-nowrap font-medium">{menuItem.name}</p>
                        </Link>
                    )
                }
            })}
        </div>
    )
}

export default SidebarMenu