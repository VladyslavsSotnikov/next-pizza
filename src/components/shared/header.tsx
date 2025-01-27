"use client";

import { cn } from "@/lib/utils";
import { Container } from "./container";
import Image from "next/image";
import Link from "next/link";
import { SearchInput } from "./search-input";
import { CartButton } from "./cart-button";
import { ProfileButton } from "./profile-button";
import { AuthModal } from "./modals/auth";
import { useState } from "react";

interface HeaderProps {
  className?: string;
  hasCart?: boolean;
  hasSearch?: boolean;
}

export const Header = ({
  className,
  hasSearch = true,
  hasCart = true,
}: HeaderProps) => {
  const [openAuthModal, setOpenAuthModal] = useState(false);
  return (
    <header className={cn("border-b", className)}>
      <Container className="flex items-center justify-between py-8">
        {/* Left side */}
        <Link href="/">
          <div className="flex items-center gap-4">
            <Image
              src="/logo.png"
              alt="Next Pizza logo"
              width={35}
              height={35}
            />
            <div>
              <h1 className="text-2xl uppercase font-bold">Next Pizza</h1>
              <p className="text-sm text-gray-400 leading-3">
                Best pizzas in town
              </p>
            </div>
          </div>
        </Link>

        {hasSearch && (
          <div className="flex-1 mx-10">
            <SearchInput />
          </div>
        )}

        {/* Right side */}
        <div className="flex items-center gap-3">
          <AuthModal
            open={openAuthModal}
            onClose={() => setOpenAuthModal(false)}
          />
          <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />

          {hasCart && (
            <div>
              <CartButton />
            </div>
          )}
        </div>
      </Container>
    </header>
  );
};
