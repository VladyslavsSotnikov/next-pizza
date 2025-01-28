import { getServerSession } from "next-auth";
import { authOptions } from "@/configs";

export const getUserSession = async () => {
  const session = await getServerSession(authOptions);

  return session?.user ?? null;
};
