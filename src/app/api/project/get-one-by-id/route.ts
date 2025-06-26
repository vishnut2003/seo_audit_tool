import { getOneProject } from "@/utils/server/projects/getOneProject";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = (await request.json()) as {
            projectId: string,
        }

        const session = await getServerSession();

        if (!session?.user?.email) {
            throw new Error("Unauthorized user!");
        }

        const project = await getOneProject(body.projectId, session.user.email);
        return NextResponse.json(project);
    } catch (err) {
        return NextResponse.json(err, { status: 500 });
    }
}