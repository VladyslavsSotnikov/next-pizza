import { ProfileForm } from "@/components/shared";
import { getUserSession } from "@/lib/get-user-session";
import { prisma } from "@/prisma/prisma-client";
import { User } from "@prisma/client";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await getUserSession();

  if (!session) {
    return redirect("/not-auth");
  }

  const user: User | null = await prisma.user.findFirst({
    where: {
      id: +session?.id,
    },
  });

  if (!user) {
    return redirect("/not-auth");
  }

  return <ProfileForm data={user} />;
}
