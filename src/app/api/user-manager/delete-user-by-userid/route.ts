import { deleteUserByUserId } from "@/utils/server/userManager/deleteUserByUserId";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export interface DeleteUserByUserIdApiRouteRequestData {
    userId: string,
}

export async function POST(request: NextRequest) {
    try {

        const {
            userId,
        } = await request.json() as DeleteUserByUserIdApiRouteRequestData;

        const userSession = await getServerSession();

        if (!userSession?.user?.email) {
            throw new Error("Unauthorized access!");
        }

        await deleteUserByUserId({
            currentUserEmail: userSession.user.email,
            userId,
        })

        return NextResponse.json(true);

    } catch (err) {
        let errMessage = "Something went wrong!";

        if (err instanceof Error) {
            errMessage = err.message;
        } else if (typeof err === "string") {
            errMessage = err;
        }

        return NextResponse.json(errMessage, { status: 500 });
    }
}