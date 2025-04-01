import { RiArrowLeftSLine } from "@remixicon/react";
import { SidebarMenuItemsInterface } from "./items";

const analyticsSidebarMenuItems: (string | SidebarMenuItemsInterface)[] = [
    {
        icon: RiArrowLeftSLine,
        name: "Go to Dashboard",
        link: "/dashboard",
    },
    "Analytics Reports",
]

export default analyticsSidebarMenuItems;