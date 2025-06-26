import { GoogleSearchConsoleTabsDataFilterInteface } from "@/app/dashboard/google-search-console/report/DataTabs/Queries_Tab";
import { getOneProject } from "@/utils/server/projects/getOneProject";
import { GoogleSearchConsoleAuth, googleSearchConsoleOAuthClient } from "@/utils/server/projects/googleSearchConsoleAPI/auth";
import { getGoogleSearchConsoleTabsData } from "@/utils/server/projects/googleSearchConsoleAPI/reports/tabsData";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const {
            dateRange,
            projectId,
            dimension,
        } = (await request.json()) as GoogleSearchConsoleTabsDataFilterInteface;

        const userSession = await getServerSession();

        if (!userSession?.user?.email) {
            throw new Error("Unauthorized user!");
        }

        const project = await getOneProject(projectId, userSession.user.email);

        if (!project) {
            throw new Error("Project not found");
        } else if (
            !project.googleSearchConsole?.clientEmail ||
            !project.googleSearchConsole?.privateKey ||
            !project.googleSearchConsole?.property
        ) {
            if (!project.googleSearchConsole?.token) {
                throw new Error("Please setup Google search console API");
            }
        }

        let auth;

        if (
            project.googleSearchConsole?.clientEmail &&
            project.googleSearchConsole?.privateKey
        ) {
            auth = await GoogleSearchConsoleAuth({
                clientEmail: project.googleSearchConsole.clientEmail,
                privateKey: project.googleSearchConsole.privateKey,
            })
        } else {
            const oauthClient = await googleSearchConsoleOAuthClient({
                token: project.googleSearchConsole.token!,
            });
            auth = oauthClient;
        }

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