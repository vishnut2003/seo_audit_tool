import { NextResponse } from "next/server";

export async function GET() {
    try {
        
    } catch (err) {
        return NextResponse.json({ error: err }, { status: 500 })
    }
}