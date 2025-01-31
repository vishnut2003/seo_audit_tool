import { getAllProjects } from "@/utils/server/projects/getAllProject";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { email, page } = await request.json() as {
            page: number, // for pagination
            email: string,
        }

        const projects = await getAllProjects({ email, page });
        return NextResponse.json(projects);
    } catch (err) {
        return NextResponse.json({ error: err }, { status: 500 })
    }
}