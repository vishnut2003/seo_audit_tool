'use client';

import sidebarMenuItems, { SidebarMenuItemsInterface } from "./items"
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import analyticsSidebarMenuItems from "./analyticsItems";
import { RiLoader4Line } from "@remixicon/react";

const SidebarMenu = () => {

    const pathname = usePathname();
    const [currentMenuItems, setCurrentMenuItems] = useState<(string | SidebarMenuItemsInterface)[]>(sidebarMenuItems);

    const [isLoading, setIsLoading] = useState<{
        [key: number]: boolean,
    }>({});

    useEffect(() => {
        if (pathname.includes('/dashboard/analytics-report/reports')) {
            setCurrentMenuItems(analyticsSidebarMenuItems);
        }
    }, [pathname])

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
                        <Link
                            href={menuItem.link}
                            key={index}
                            className={`flex min-w-max gap-2 py-3 px-4 rounded-lg ${menuItem.link === pathname || menuItem.subPages?.includes(pathname) ? 'bg-themesecondary text-white hover:bg-themesecondary' : 'hover:bg-gray-50'} ${menuItem.link === '/dashboard' && 'bg-gray-50'}`}
                            onClick={() => {

                                if (pathname === menuItem.link) {
                                    return;
                                }

                                setIsLoading({
                                    [index]: true,
                                });
                            }}
                        >
                            {
                                isLoading[index] ?
                                <RiLoader4Line
                                    size={24}
                                    className="animate-spin text-themesecondary"
                                />
                                : <menuItem.icon
                                        size={24}
                                    />
                            }
                            <p className="whitespace-nowrap font-medium">{menuItem.name}</p>
                        </Link>
                    )
                }
            })}
        </div>
    )
}

export default SidebarMenu