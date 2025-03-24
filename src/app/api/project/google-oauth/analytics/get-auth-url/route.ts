import { createAnalyticsOAuthClient } from "@/utils/server/googleOAuth";
import { updatePropertyId } from "@/utils/server/projects/analyticsAPI/google/create";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const cookieStore = await cookies();
        const session = await getServerSession();
        const projectId = cookieStore.get('projectId');

        const { propertyId } = (await request.json()) as {
            propertyId: string
        }

        if (!session?.user?.email) {
            throw new Error("User not found!");
        } else if (!projectId) {
            throw new Error("ProjectId not found");
        }

        await updatePropertyId({
            email: session.user.email,
            projectId: projectId.value,
            propertyId,
        });

        const [authClient, SCOPE] = await createAnalyticsOAuthClient();
        const url = authClient.generateAuthUrl({
            access_type: "offline",
            scope: SCOPE,
            prompt: "consent",
        })

        return NextResponse.json(url);
    } catch (err) {
        return NextResponse.json(err, { status: 500 })
    }
}