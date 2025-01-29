import { RiDashboardLine, RiFileChartLine, RiFileExcel2Line, RiFolder5Line, RiLineChartLine } from "@remixicon/react";

const sidebarMenuItems = [
    {
        name: 'Dashboard',
        icon: RiDashboardLine,
        link: '/dashboard'
    },
    {
        name: 'Projects',
        icon: RiFolder5Line,
        link: '/dashboard/projects',
        subPages: [
            "/dashboard/projects/add-new"
        ]
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
        name: 'Competitor Analysis',
        icon: RiLineChartLine,
        link: '/dashboard/compatitor-analysis'
    }
]

export default sidebarMenuItems;