import { RiArrowLeftSLine, RiGroupLine, RiLineChartLine, RiUserLine } from "@remixicon/react";
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
        icon: RiUserLine,
        name: "User Acquisition",
        link: "/dashboard/analytics-report/reports/user-acquisition"
    },
    {
        icon: RiGroupLine,
        name: "Traffic Acquisition",
        link: "/dashboard/analytics-report/reports/traffic-acquisition",
    }
]

export default analyticsSidebarMenuItems;