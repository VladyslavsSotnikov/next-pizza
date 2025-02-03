import { authOptions } from "@/configs";
import { prisma } from "@/prisma/prisma-client";
import { IncomingMessage, ServerResponse } from "http";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const user = await getServerSession(
      {
        cookies: request.cookies,
        method: request.method,
      } as unknown as IncomingMessage & {
        cookies: Partial<{ [key: string]: string }>;
      },
      response as unknown as ServerResponse,
      authOptions,
    );

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await prisma.user.findUnique({
      where: {
        id: Number(user.user.id),
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
