import { RiDashboardLine, RiFileChartLine, RiFileExcel2Line, RiFolder5Line, RiLineChartLine, RiToolsLine } from "@remixicon/react";

const sidebarMenuItems = [
    {
        name: 'Dashboard',
        icon: RiDashboardLine,
        link: '/dashboard'
    },
    {
        name: 'Quick Tools',
        icon: RiToolsLine,
        link: '/dashboard/quick-tools',
        subPages: [
            "/dashboard/quick-tools/pdf-report",
            "/dashboard/quick-tools/sheet-report"
        ]
    },
    "My Projects",
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