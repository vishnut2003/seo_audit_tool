import { RiArrowGoForwardLine, RiArrowLeftSLine, RiLineChartLine, RiUser3Line } from "@remixicon/react";
import { SidebarMenuItemsInterface } from "./items";

const analyticsSidebarMenuItems: (string | SidebarMenuItemsInterface)[] = [
    {
        icon: RiArrowLeftSLine,
        name: "Go to Dashboard",
        link: "/dashboard",
    },
    "Analytics Reports",
    {
        icon: RiLineChartLine,
        name: "Google Analytics",
        link: "/dashboard/analytics-report/reports",
    },
    "Acquisition",
    {
        icon: RiUser3Line,
        name: "User Acquisition",
        link: "#"
    },
    {
        icon: RiArrowGoForwardLine,
        name: "Traffic Acquisition",
        link: "#",
    }
]

export default analyticsSidebarMenuItems;