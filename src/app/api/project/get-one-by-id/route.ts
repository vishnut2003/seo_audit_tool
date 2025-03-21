import { getOneProject } from "@/utils/server/projects/getOneProject";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = (await request.json()) as {
            projectId: string,
        }
        const project = await getOneProject(body.projectId);
        return NextResponse.json(project);
    } catch (err) {
        return NextResponse.json(err, { status: 500 });
    }
}