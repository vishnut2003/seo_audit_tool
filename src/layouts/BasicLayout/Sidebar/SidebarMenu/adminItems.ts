import { RiArrowLeftSLine, RiGroupLine, RiUserAddLine } from "@remixicon/react";
import { SidebarMenuItemsInterface } from "./items";

const adminSidebarMenuItems: (string | SidebarMenuItemsInterface)[] = [
    {
        icon: RiArrowLeftSLine,
        name: "Go to Dashboard",
        link: "/dashboard",
    },
    "Users",
    {
        icon: RiGroupLine,
        link: "/dashboard/advance/admin/user-management",
        name: "User Management",
    },
    {
        icon: RiUserAddLine,
        link: "/dashboard/advance/admin/user-registration",
        name: "Add User",
    }
]

export default adminSidebarMenuItems;