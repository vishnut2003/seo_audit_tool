import { getAllReportRecords } from "@/utils/server/seoOptimerApi";
import { NextResponse } from "next/server";

export async function GET () {
    try {
        const records = await getAllReportRecords();
        return NextResponse.json(records);
    } catch (err) {
        return NextResponse.json({error: err}, {status: 500});
    }
}