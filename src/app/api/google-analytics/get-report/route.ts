import { AnalyticsGoogleApiAuth } from "@/utils/server/projects/analyticsAPI/google/auth";
import { fetchAnalyticsReport, GoogleAnalyticsReportFilterInterface } from "@/utils/server/projects/analyticsAPI/google/fetchReport";
import { getOneProject } from "@/utils/server/projects/getOneProject";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = (await request.json()) as GoogleAnalyticsReportFilterInterface;
        const cookieStore = await cookies();
        const projectId = cookieStore.get('projectId');

        if (!projectId) {
            throw new Error("Project id required!");
        }

        const project = await getOneProject(projectId.value);

        if (
            !project ||
            !project.googleAnalytics?.propertyId ||
            !project.googleAnalytics?.clientEmail ||
            !project.googleAnalytics?.privateKey
        ) {
            throw new Error("Project or credentials not found!");
        }

        const auth = await AnalyticsGoogleApiAuth({
            clientEmail: project.googleAnalytics.clientEmail,
            privateKey: project.googleAnalytics.privateKey,
        });

        const report = await fetchAnalyticsReport({
            auth,
            propertyId: project.googleAnalytics.propertyId,
            filter: body,
        });

        return NextResponse.json({ report });
    } catch (err) {
        console.log(err);
        return NextResponse.json({
            error: err,
        }, {
            status: 500,
        })
    }
}