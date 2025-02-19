import { ibenModels } from "@/lib/models/ibendouma-models";
import { NextResponse } from "next/server";

export async function GET() {
  const { OrderModelIben } = await ibenModels;

  try {
    await OrderModelIben.deleteMany({ status: "En attente" });
    return NextResponse.json(
      { success: "Commandes supprimes avec success" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ errorMessage: error }, { status: 500 });
  }
}
