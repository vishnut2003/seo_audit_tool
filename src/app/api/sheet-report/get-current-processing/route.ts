import { getCurrentProcessingSheetRecord } from "@/utils/server/sheetReport/databaseActions/getSingleReport";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

    const { searchParams } = new URL(request.url);
    const reportId = searchParams.get("reportid");

    if (!reportId) {
        return NextResponse.json({
            error: "Report id is not valid!",
        }, { status: 500 })
    }

    // Create a TransformStream for SSE
    const { readable, writable } = new TransformStream()
    const writer = writable.getWriter()
    const encoder = new TextEncoder()

    // Function to send events
    const sendEvent = async (data: string) => {
        await writer.write(encoder.encode(`data: ${data}\n\n`))
    }

    // Start sending periodic events
    const intervalId = setInterval(async () => {
        const record = await getCurrentProcessingSheetRecord({ reportId });
        await sendEvent(JSON.stringify(record));
    }, 10000)

    // Handle connection closure
    request.signal.addEventListener('abort', () => {
        clearInterval(intervalId)
        writer.close()
    })

    return new Response(readable, {
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-open'
        }
    })
}