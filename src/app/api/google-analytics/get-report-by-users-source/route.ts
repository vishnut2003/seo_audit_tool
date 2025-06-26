import { AnalyticsGoogleApiAuth, authorizeWithOAuthClient } from "@/utils/server/projects/analyticsAPI/google/auth";
import { fetchReportByNewUsersSource } from "@/utils/server/projects/analyticsAPI/google/fetchReport";
import { getOneProject } from "@/utils/server/projects/getOneProject";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export interface GoogleAnalyticsReportByUsersSourceRequestInterface {
    dateRange: {
        from: string,
        to: string,
    },
}

export async function POST(request: NextRequest) {
    try {
        const cookieStore = await cookies();
        const projectId = cookieStore.get('projectId');

        const {
            dateRange,
        } = (await request.json()) as GoogleAnalyticsReportByUsersSourceRequestInterface;

        if (!projectId) {
            throw new Error("Project ID Not found!");
        }

        const userSession = await getServerSession();

        if (!userSession?.user?.email) {
            throw new Error("Unauthorized user!");
        }

        const project = await getOneProject(projectId.value, userSession.user.email);

        if (
            !project ||
            !project.googleAnalytics?.propertyId ||
            !project.googleAnalytics?.clientEmail ||
            !project.googleAnalytics?.privateKey
        ) {
            if (!project?.googleAnalytics?.token) {
                throw new Error("Google Auth not found!");
            }
        }

        let auth;

        if (
            project.googleAnalytics?.clientEmail &&
            project.googleAnalytics?.privateKey
        ) {
            auth = await AnalyticsGoogleApiAuth({
                clientEmail: project.googleAnalytics.clientEmail,
                privateKey: project.googleAnalytics.privateKey,
            })
        } else {
            const oauthClient = await authorizeWithOAuthClient({
                token: project.googleAnalytics.token!,
            });
            auth = oauthClient;
        }

        const report = await fetchReportByNewUsersSource({
            auth,
            propertyId: project.googleAnalytics.propertyId,
            filter: {
                dateRange,
            },
        })

        return NextResponse.json({ report });
    } catch (err) {
        return NextResponse.json(err, { status: 500 });
    }
}