"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "../ui";
import { CartDrawer } from "./cart-drawer";
import { useCartStore } from "@/store";
import { cn } from "@/lib/utils";

export const CartButton = () => {
  const { totalAmount, items, loading } = useCartStore();

  return (
    <CartDrawer>
      <Button className={cn("group relative min-w-[132px]")} loading={loading}>
        <b>{totalAmount} $</b>
        <span className="h-full w-[1px] bg-white/30 mx-3" />
        <div className="flex items-center gap-1 transition-all duration-300 rounded-md">
          <ShoppingCart size={16} className="relative" strokeWidth={2} />
          <b>{items.length}</b>
        </div>
      </Button>
    </CartDrawer>
  );
};
