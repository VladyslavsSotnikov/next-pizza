"use client";

import Link from "next/link";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui";
import { ArrowRight } from "lucide-react";
import { CartDrawerItem } from "./cart-drawer-item";
import { getCartItemDetails } from "@/lib";
import { useCartStore } from "@/store/cart";
import { useEffect } from "react";
import { PizzaSize, PizzaType } from "@/constants/pizza";

interface Props {
  className?: string;
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({ className, children }) => {
  const { items, totalAmount, fetchCartItems } = useCartStore();

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between pb-0 bg-[#f4f1ee]">
        <SheetHeader>
          <SheetTitle>
            In cart <span className="font-bold">{items.length} goods</span>
          </SheetTitle>
        </SheetHeader>

        <div className="-mx-6 mt-5 overflow-auto flex-1">
          {items.map((item) => (
            <div className="mb-2" key={item.id}>
              <CartDrawerItem
                id={item.id}
                imageUrl={item.imageUrl}
                details={
                  item.pizzaType && item.pizzaSize
                    ? getCartItemDetails(item.ingredients, item.pizzaType as PizzaType, item.pizzaSize as PizzaSize)
                    : ""
                }
                name={item.name}
                quantity={item.quantity}
                price={item.price}
              />
            </div>
          ))}
        </div>
        <SheetFooter className="-mx-6 bg-white p-8">
          <div className="w-full">
            <div className="flex mb-4">
              <span className="flex flex-1 text-lg text-neutral-500">
                Total
                <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
              </span>
              <span className="font-bold text-lg">{totalAmount} $</span>
            </div>
            <Link href="/cart">
              <Button type="submit" className="w-full h-12 text-base">
                Checkout
                <ArrowRight className="w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
