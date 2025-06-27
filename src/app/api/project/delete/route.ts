import { deleteProjectById } from "@/utils/server/projects/deleteProject";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {

        const { projectId } = await request.json() as {
            projectId: string,
        }

        const userSession = await getServerSession();

        if (!userSession?.user?.email) {
            throw new Error("User not found!");
        }

        await deleteProjectById({
            ownerEmail: userSession.user.email,
            projectId,
        })

        return NextResponse.json(true);

    } catch (err) {
        if (typeof err === "string") {
            return NextResponse.json(err, {
                status: 500,
            });
        } else if (err instanceof Error) {
            return NextResponse.json(err.message, {
                status: 500,
            })
        } else {
            return NextResponse.json("Something went wrong!");
        }
    }
}