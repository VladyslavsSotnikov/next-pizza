import { cn } from "@/lib/utils";
import { Container } from "./container";
import Image from "next/image";
import { Button } from "../ui";
import { User } from "lucide-react";
import Link from "next/link";
import { SearchInput } from "./search-input";
import { CartButton } from "./cart-button";
interface HeaderProps {
  className?: string;
  hasCart?: boolean;
  hasSearch?: boolean;
}

export const Header = ({ className, hasSearch = true, hasCart = true }: HeaderProps) => {
  return (
    <header className={cn("border-b", className)}>
      <Container className="flex items-center justify-between py-8">
        {/* Left side */}
        <Link href="/">
          <div className="flex items-center gap-4">
            <Image src="/logo.png" alt="Next Pizza logo" width={35} height={35} />
            <div>
              <h1 className="text-2xl uppercase font-bold">Next Pizza</h1>
              <p className="text-sm text-gray-400 leading-3">Best pizzas in town</p>
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
          <Button variant="outline" className="flex items-center gap-1">
            <User size={16} /> Login
          </Button>
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
