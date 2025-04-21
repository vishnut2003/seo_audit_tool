import { rewriteArticle } from "@/utils/server/smallSeoTools/rewriteArticleFunctions";
import { NextRequest, NextResponse } from "next/server";

export interface SeoToolsArticleRewriteToolsEntry {
    content: string,
}

export async function POST(request: NextRequest) {
    try {
        const { content } = (await request.json()) as SeoToolsArticleRewriteToolsEntry;
        const modelResponse = await rewriteArticle({ content });
        return NextResponse.json(modelResponse);
    } catch (err) {
        console.log(err);
        return NextResponse.error();
    }
}