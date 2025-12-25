import { goapiModels } from "@/lib/models/ibytrade-models";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { MadModel } = await goapiModels;
  try {
    const { mad } = await req.json();
    const newMad = await MadModel.create({ mad });
    return NextResponse.json({ newMad }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ errorMessage: error }, { status: 500 });
  }
}
