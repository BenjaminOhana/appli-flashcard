import { NextResponse } from "next/server";
import { updateCardProgress } from "@/lib/notion";

// Next.js 15 requires async params
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  try {
    const body = await req.json();
    const result = await updateCardProgress(id, body);
    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    console.error(`PATCH /api/cards/${id} error:`, error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
