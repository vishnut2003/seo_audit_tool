import { deleteGoogleAnalyticsAuth } from "@/utils/server/projects/analyticsAPI/google/delete";
import { NextRequest, NextResponse } from "next/server";

export interface GoogleAnalyticsDeleteRequestData {
    email: string,
    projectId: string,
}

export async function POST(request: NextRequest) {
    try {
        const {
            email,
            projectId,
        } = (await request.json()) as GoogleAnalyticsDeleteRequestData;
        
        if (!projectId || !email) {
            throw new Error("Project id and email id is required!");
        }

        await deleteGoogleAnalyticsAuth({
            email,
            projectId,
        })

        return NextResponse.json({success: true});
    } catch (err) {
        return NextResponse.json({ err }, { status: 500 });
    }
}