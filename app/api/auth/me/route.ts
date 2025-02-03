import { getUserSession } from "@/lib/get-user-session";
import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await getUserSession();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await prisma.user.findUnique({
      where: {
        id: Number(user.id),
      },
      select: {
        id: true,
        fullName: true,
        email: true,
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("[GET /api/auth/me] >>>>", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
