import { ShoppingCart } from "lucide-react";
import { Button } from "../ui";
import { CartDrawer } from "./cart-drawer";

export const CartButton = () => {
  return (
    <CartDrawer>
      <Button className="group relative">
        <b>100 $</b>
        <span className="h-full w-[1px] bg-white/30 mx-3" />
        <div className="flex items-center gap-1 transition-all duration-300 rounded-md">
          <ShoppingCart size={16} className="relative" strokeWidth={2} />
          <b>3</b>
        </div>
      </Button>
    </CartDrawer>
  );
};
