import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("q");
  if (!query) return NextResponse.json({ url: null });

  const key = process.env.UNSPLASH_ACCESS_KEY;
  if (!key) return NextResponse.json({ url: null });

  try {
    const res = await fetch(
      `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&orientation=landscape&client_id=${key}`,
      { next: { revalidate: 3600 } }
    );
    const data = await res.json();
    const url = data?.urls?.small ?? null;
    return NextResponse.json({ url });
  } catch {
    return NextResponse.json({ url: null });
  }
}
