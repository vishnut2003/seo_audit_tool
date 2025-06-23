import { registerUser } from "@/utils/server/userManager/registerUser";
import { NextRequest, NextResponse } from "next/server";

export interface RegisterUserApiRequestDataInterface {
    name: string,
    email: string,
    password: string,
}

export async function POST(request: NextRequest) {
    try {

        const formData = await request.formData();

        const name = formData.get('name')?.toString();
        const email = formData.get('email')?.toString();
        const password = formData.get('password')?.toString();

        if (!name || !email || !password) {
            throw new Error("Empty request entries!");
        }

        const profileImage = formData.get('image') as File | null;

        await registerUser({
            userData: {
                name,
                email,
                password,
                imageFile: profileImage,
            }
        })

        return NextResponse.json(true);

    } catch (err) {
        console.log(err);
        if (typeof err === "string") {
            return NextResponse.json(err, { status: 500 });
        } else if (err instanceof Error) {
            return NextResponse.json(err.message, { status: 500 });
        } else {
            return NextResponse.json(err || "Something went wrong!", { status: 500 });
        }
    }
}