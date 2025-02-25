import { JSX } from "react";
import CompetitorReportTab from "./CompetitorReportTab";
import SheetReportTab from "./SheetReportTab";
import { RemixiconComponentType, RiFileChartLine, RiLineChartLine } from "@remixicon/react";

export interface NotificationTabInterface {
    title: string,
    content: () => JSX.Element,
    icon: RemixiconComponentType,
}

const notificationItems: NotificationTabInterface[] = [
    {
        title: "Technical Reports",
        content: SheetReportTab,
        icon: RiFileChartLine,
    },
    {
        title: "Competitors Reports",
        content: CompetitorReportTab,
        icon: RiLineChartLine,
    }
]

export default notificationItems;