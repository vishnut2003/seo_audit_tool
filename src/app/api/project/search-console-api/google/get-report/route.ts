import { GoogleSearchConsoleGraphFilterInterface } from "@/app/dashboard/google-search-console/report/GraphData";
import { getOneProject } from "@/utils/server/projects/getOneProject";
import { GoogleSearchConsoleAuth, googleSearchConsoleOAuthClient } from "@/utils/server/projects/googleSearchConsoleAPI/auth";
import { graphReports } from "@/utils/server/projects/googleSearchConsoleAPI/reports/graphReport";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { dateRange, projectId } = (await request.json()) as GoogleSearchConsoleGraphFilterInterface;

        const userSession = await getServerSession();

        if (!userSession?.user?.email) {
            throw new Error("Unauthorized user!");
        }

        const project = await getOneProject(projectId, userSession.user.email);

        if (
            !project ||
            !project.googleSearchConsole?.clientEmail ||
            !project.googleSearchConsole?.privateKey ||
            !project.googleSearchConsole?.property
        ) {
            if (!project?.googleSearchConsole?.token) {
                throw new Error("Credentials not found!");
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

        const report = await graphReports({
            auth,
            property: project.googleSearchConsole.property,
            dateRange: {
                from: dateRange.startDate,
                to: dateRange.endDate,
            },
        })

        return NextResponse.json({ report });
    } catch (err) {
        console.log(err)
        return NextResponse.json({ error: err }, { status: 500 })
    }
}