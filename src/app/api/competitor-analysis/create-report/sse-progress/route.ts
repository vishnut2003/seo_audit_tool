import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {

    const { searchParams } = new URL(request.url);
    const reportId = searchParams.get("reportid");

    if (!reportId || reportId === "Generating...") {
        return NextResponse.json({
            error: "Report id is not valid!",
        }, {status: 500})
    }

    console.log(reportId);

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
        const timestamp = new Date().toISOString()
        await sendEvent(JSON.stringify({
            message: 'Periodic update',
            time: timestamp
        }))
    }, 5000)

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