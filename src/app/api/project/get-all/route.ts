import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        console.log(body);

        return NextResponse.json({success: true});
    } catch (err) {
        return NextResponse.json({ error: err }, { status: 500 })
    }
}