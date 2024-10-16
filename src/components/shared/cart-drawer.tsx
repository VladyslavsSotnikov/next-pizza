"use client";

import Link from "next/link";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui";
import { ArrowRight } from "lucide-react";
import { CartDrawerItem } from "./cart-drawer-item";
import { getCartItemDetails } from "@/lib";

interface Props {
  className?: string;
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({ className, children }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between pb-0 bg-[#f4f1ee]">
        <SheetHeader>
          <SheetTitle>
            In cart <span className="font-bold">3 goods</span>
          </SheetTitle>
        </SheetHeader>

        <div className="-mx-6 mt-5 overflow-auto flex-1">
          <div className="mb-2">
            <CartDrawerItem
              id={1}
              imageUrl="https://picsum.photos/200/300"
              details={getCartItemDetails(1, 20, [
                {
                  name: "cheese",
                  price: 10,
                  id: 1,
                  imageUrl: "https://picsum.photos/200/300",
                  createdAt: new Date(),
                  updatedAt: new Date(),
                },
              ])}
              name="Test pizza"
              quantity={1}
              price={100}
            />
          </div>
          <div className="mb-2">
            <CartDrawerItem
              id={1}
              imageUrl="https://picsum.photos/200/300"
              details={getCartItemDetails(1, 20, [
                {
                  name: "cheese",
                  price: 10,
                  id: 1,
                  imageUrl: "https://picsum.photos/200/300",
                  createdAt: new Date(),
                  updatedAt: new Date(),
                },
              ])}
              name="Test pizza"
              quantity={1}
              price={100}
            />
          </div>
        </div>
        <SheetFooter className="-mx-6 bg-white p-8">
          <div className="w-full">
            <div className="flex mb-4">
              <span className="flex flex-1 text-lg text-neutral-500">
                Total
                <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
              </span>
              <span className="font-bold text-lg">100 $</span>
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
