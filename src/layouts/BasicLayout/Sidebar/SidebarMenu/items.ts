import { RiDashboardLine, RiFileChartLine, RiFileExcel2Line, RiSearch2Line } from "@remixicon/react";

const sidebarMenuItems = [
    {
        name: 'Dashboard',
        icon: RiDashboardLine,
        link: '/dashboard'
    },
    {
        name: 'PDF Reports',
        icon: RiFileChartLine,
        link: '/dashboard/reports'
    },
    {
        name: 'Sheet Reports',
        icon: RiFileExcel2Line,
        link: '/dashboard/sheet-reports'
    },
    {
        name: 'Keyword Research',
        icon: RiSearch2Line,
        link: '#'
    }
]

export default sidebarMenuItems;