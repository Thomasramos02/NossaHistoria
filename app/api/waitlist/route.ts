import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase-server";

export async function POST(req: Request) {
  let payload: { email?: string } | null = null;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_json" },
      { status: 400 }
    );
  }

  const normalized = String(payload?.email ?? "").trim().toLowerCase();
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized);

  if (!isValid) {
    return NextResponse.json(
      { ok: false, error: "invalid_email" },
      { status: 400 }
    );
  }

  const { error } = await supabase
    .from("waitlist")
    .insert({ email: normalized, promo: "39,90", source: "landing" });

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json(
        { ok: false, error: "duplicate" },
        { status: 409 }
      );
    }

    return NextResponse.json({ ok: false, error: "db_error" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
