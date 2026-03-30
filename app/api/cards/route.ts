import { NextResponse } from "next/server";
import { fetchCardsToReview, addCard } from "@/lib/notion";

export async function GET() {
  try {
    const cards = await fetchCardsToReview();
    return NextResponse.json(cards);
  } catch (error: any) {
    console.error("GET /api/cards error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await addCard(body);
    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    console.error("POST /api/cards error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
