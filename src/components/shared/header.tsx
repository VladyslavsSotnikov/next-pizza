import { cn } from "@/lib/utils";
import { Container } from "./container";
import Image from "next/image";
import { Button } from "../ui";
import { ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { SearchInput } from "./search-input";
interface HeaderProps {
  className?: string;
}

export const Header = ({ className }: HeaderProps) => {
  return (
    <header className={cn("border border-b", className)}>
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

        <div className="flex-1 mx-10">
          <SearchInput />
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-1">
            <User size={16} /> Login
          </Button>
          <div>
            <Button className="group relative">
              <b>10 $</b>
              <span className="h-full w-[1px] bg-white/30 mx-3" />
              <div className="flex items-center gap-1 transition-all duration-300 rounded-md">
                <ShoppingCart size={16} className="relative" strokeWidth={2} />
                <b>3</b>
              </div>
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
};
