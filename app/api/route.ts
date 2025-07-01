// app/api/products/route.ts
import { NextResponse } from "next/server";
import { supabase } from "../lib/supabase";

// GET /api/products
export async function GET() {
  const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

// POST /api/products
export async function POST(req: Request) {
  const { name, price, category } = await req.json();
  const { data, error } = await supabase.from("products").insert([{ name, price, category }]).select().single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data, { status: 201 });
}
