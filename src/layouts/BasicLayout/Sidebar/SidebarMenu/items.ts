import { RemixiconComponentType, RiBarChart2Line, RiDashboardLine, RiFileChart2Line, RiFileChartLine, RiFileExcel2Line, RiFolder5Line, RiLineChartLine, RiSearchLine, RiToolsLine } from "@remixicon/react";

export interface SidebarMenuItemsInterface {
    name: string,
    icon: RemixiconComponentType,
    link: string,
    subPages?: string[],
}

const sidebarMenuItems: (string | SidebarMenuItemsInterface)[] = [
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
            "/dashboard/quick-tools/sheet-report",
            "/dashboard/quick-tools/competitor-analysis",
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
    "Reports",
    {
        name: "Monthly Report",
        icon: RiFileChart2Line,
        link: "/dashboard/monthly-report",
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
    },
    "Integrations",
    {
        name: "Analytics Reports",
        icon: RiBarChart2Line,
        link: "/dashboard/analytics-report",
        subPages: [
            "/dashboard/analytics-report/reports"
        ]
    },
    {
        name: "Search Console",
        icon: RiSearchLine,
        link: "/dashboard/google-search-console",
        subPages: [
            "/dashboard/google-search-console/report"
        ]
    },
]

export default sidebarMenuItems;