import { updateUserData } from "@/utils/server/userManager/updateUser";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {

        const formData = await request.formData();

        const name = formData.get('name')?.toString();
        const password = formData.get('password')?.toString() || "";
        const profileImage = formData.get('image') as File | null;

        const userSession = await getServerSession();

        if (!userSession?.user?.email) {
            throw new Error("User unauthorized!");
        }

        if (!name) {
            throw new Error("Name field can not be empty!");
        }

        await updateUserData({
            name,
            email: userSession.user.email,
            password,
            profileImage,
        })

        return NextResponse.json(true);

    } catch (err) {
        let errorMessage = "Something went wrong!";

        if (err instanceof Error) {
            errorMessage = err.message;
        } else if (typeof err === "string") {
            errorMessage = err;
        }

        return NextResponse.json(errorMessage, { status: 500 });
    }
}