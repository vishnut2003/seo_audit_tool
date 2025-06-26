import { AnalyticsGoogleApiAuth, authorizeWithOAuthClient } from "@/utils/server/projects/analyticsAPI/google/auth";
import { fetchAnalyticsTrafficAcquisitionGraphData, fetchAnalyticsTrafficAcquisitionTableData } from "@/utils/server/projects/analyticsAPI/google/trafficAcquisitionData";
import { getOneProject } from "@/utils/server/projects/getOneProject";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export interface AnalyticsTrafficAcquisitionApiRouteEntry {
    dateRange: {
        startDate: string,
        endDate: string,
    },
    graphType: "date" | "week" | "month",
}

export async function POST(request: NextRequest) {
    try {

        const {
            dateRange,
            graphType,
        } = (await request.json()) as AnalyticsTrafficAcquisitionApiRouteEntry;

        const cookieStore = await cookies();
        const projectId = cookieStore.get('projectId');

        if (!projectId) {
            throw new Error("ProjectId not found!");
        }

        const userSession = await getServerSession();

        if (!userSession?.user?.email) {
            throw new Error("Unauthorized user!");
        }

        const project = await getOneProject(projectId.value, userSession.user.email);

        if (!project) {
            throw new Error("Project not found!");
        }

        if (!project.googleAnalytics?.clientEmail || !project.googleAnalytics.privateKey || !project.googleAnalytics.propertyId) {
            if (!project.googleAnalytics?.token) {
                throw new Error("Google Auth not found!");
            }
        }

        let auth

        if (
            project.googleAnalytics.clientEmail &&
            project.googleAnalytics.privateKey
        ) {
            auth = await AnalyticsGoogleApiAuth({
                clientEmail: project.googleAnalytics.clientEmail,
                privateKey: project.googleAnalytics.privateKey,
            });
        } else {
            auth = await authorizeWithOAuthClient({
                token: project.googleAnalytics.token!,
            })
        }

        const graphReport = await fetchAnalyticsTrafficAcquisitionGraphData({
            auth,
            graphType,
            propertyId: project.googleAnalytics.propertyId,
            dateRange,
        })

        const tableReport = await fetchAnalyticsTrafficAcquisitionTableData({
            auth,
            dateRange,
            propertyId: project.googleAnalytics.propertyId,
        })

        return NextResponse.json([graphReport, tableReport]);

    } catch (err) {
        if (err instanceof Error) {
            return NextResponse.json(err.message, { status: 500 });
        } else if (typeof err === "string") {
            return NextResponse.json(err, { status: 500 });
        } else {
            return NextResponse.json("Something went wrong!", { status: 500 });
        }
    }
}