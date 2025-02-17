import { JSX } from "react";
import CompetitorReportTab from "./CompetitorReportTab";
import SheetReportTab from "./SheetReportTab";

export interface NotificationTabInterface {
    title: string,
    content: () => JSX.Element,
}

const notificationItems: NotificationTabInterface[] = [
    {
        title: "Technical Reports",
        content: SheetReportTab,
    },
    {
        title: "Competitors Reports",
        content: CompetitorReportTab,
    }
]

export default notificationItems;