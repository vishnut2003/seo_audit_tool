import { createSearchConsoleOAuthClient } from "@/utils/server/googleOAuth";
import { updateProperty } from "@/utils/server/projects/googleSearchConsoleAPI/create";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const cookieStore = await cookies();
        const session = await getServerSession();
        const projectId = cookieStore.get('projectId');

        const { property } = (await request.json()) as {
            property: string
        }

        if (!session?.user?.email) {
            throw new Error("User not found!");
        } else if (!projectId) {
            throw new Error("ProjectId not found");
        }

        await updateProperty({
            email: session.user.email,
            projectId: projectId.value,
            property,
        });

        const [authClient, SCOPE] = await createSearchConsoleOAuthClient();
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