import { getUserDataByEmail } from "@/utils/server/userManager/getUserDataByMail";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {

        const { email } = await request.json() as {
            email: string,
        }

        const userData = await getUserDataByEmail({ email });
        console.log(userData);

        return NextResponse.json(userData);

    } catch (err) {
        let errorMessage = "Something went wrong";

        if (err instanceof Error) {
            errorMessage = err.message;
        } else if (typeof err === "string") {
            errorMessage = err;
        }

        return NextResponse.json(errorMessage, { status: 500 });
    }
}