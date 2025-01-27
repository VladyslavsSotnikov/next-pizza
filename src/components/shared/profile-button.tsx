import { CircleUser, User } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

import { Button } from "../ui";

interface Props {
  onClickSignIn?: () => void;
}

export const ProfileButton = ({ onClickSignIn }: Props) => {
  const { data: session, status } = useSession();

  if (!session) {
    return (
      <Button
        onClick={onClickSignIn}
        variant="outline"
        className="flex items-center gap-1"
        loading={status === "loading"}
      >
        <User size={16} /> Login
      </Button>
    );
  }

  return (
    <Link href="/profile">
      <Button variant="outline" className="flex items-center gap-1">
        <CircleUser size={16} /> Profile
      </Button>
    </Link>
  );
};
