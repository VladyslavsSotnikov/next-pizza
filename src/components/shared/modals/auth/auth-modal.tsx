"use client";

import { Button, Dialog } from "@/components/ui";
import { DialogContent } from "@/components/ui/dialog";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { LoginForm, RegisterForm } from "./forms";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const AuthModal = ({ open, onClose }: Props) => {
  const [type, setType] = useState<"login" | "register">("login");

  const onSwitchType = () => {
    setType(type === "login" ? "register" : "login");
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-[450pm] bg-white p-10">
        {type === "login" ? (
          <LoginForm onClose={onClose} />
        ) : (
          <RegisterForm onClose={onClose} />
        )}
        <hr />
        <div className="flex  gap-2">
          <Button
            variant="secondary"
            className="gap-2 h-12 p-2 flex-1"
            onClick={() =>
              signIn("github", { callbackUrl: "/", redirect: true })
            }
          >
            <img
              src="https://github.githubassets.com/favicons/favicon.svg"
              alt="Github"
              className="w-6 h-6"
            />
            Login with Github
          </Button>
          <Button
            variant="secondary"
            className="gap-2 h-12 p-2 flex-1"
            onClick={() =>
              signIn("google", { callbackUrl: "/", redirect: true })
            }
          >
            <img
              src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
              alt="Google"
              className="w-6 h-6"
            />
            Login with Google
          </Button>
        </div>
        <Button variant="secondary" onClick={onSwitchType}>
          {type === "login"
            ? "Don't have an account? Register"
            : "Already have an account? Login"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
