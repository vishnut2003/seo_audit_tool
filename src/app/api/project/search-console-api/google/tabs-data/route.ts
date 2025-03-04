import { GoogleSearchConsoleTabsDataFilterInteface } from "@/app/dashboard/google-search-console/report/DataTabs/Queries_Tab";
import { getOneProject } from "@/utils/server/projects/getOneProject";
import { GoogleSearchConsoleAuth } from "@/utils/server/projects/googleSearchConsoleAPI/auth";
import { getGoogleSearchConsoleTabsData } from "@/utils/server/projects/googleSearchConsoleAPI/reports/tabsData";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const {
            dateRange,
            projectId,
            dimension,
        } = (await request.json()) as GoogleSearchConsoleTabsDataFilterInteface;

        const project = await getOneProject(projectId);

        if (!project) {
            throw new Error("Project not found");
        } else if (
            !project.googleSearchConsole?.clientEmail ||
            !project.googleSearchConsole?.privateKey ||
            !project.googleSearchConsole?.property
        ) {
            throw new Error("Please setup Google search console API");
        }

        const auth = await GoogleSearchConsoleAuth({
            clientEmail: project.googleSearchConsole.clientEmail,
            privateKey: project.googleSearchConsole.privateKey,
        });

        const report = await getGoogleSearchConsoleTabsData({
            dateRange,
            auth,
            property: project.googleSearchConsole.property,
            dimension,
        })

        return NextResponse.json({ report });

    } catch (err) {
        return NextResponse.json({ error: err }, { status: 500 });
    }
}