import { GoogleSearchConsoleGraphFilterInterface } from "@/app/dashboard/google-search-console/report/GraphData";
import { getOneProject } from "@/utils/server/projects/getOneProject";
import { GoogleSearchConsoleAuth } from "@/utils/server/projects/googleSearchConsoleAPI/auth";
import { graphReports } from "@/utils/server/projects/googleSearchConsoleAPI/reports/graphReport";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { dateRange, projectId } = (await request.json()) as GoogleSearchConsoleGraphFilterInterface;
        const project = await getOneProject(projectId);

        if (
            !project ||
            !project.googleSearchConsole?.clientEmail ||
            !project.googleSearchConsole?.privateKey ||
            !project.googleSearchConsole?.property
        ) {
            throw new Error("Credentials not found!");
        }

        const auth = await GoogleSearchConsoleAuth({
            clientEmail: project.googleSearchConsole.clientEmail,
            privateKey: project.googleSearchConsole.privateKey,
        });

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
        return NextResponse.json({ error: err }, { status: 500 })
    }
}