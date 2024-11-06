"use client";

import Link from "next/link";
import Image from "next/image";

import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CartDrawerItem } from "./cart-drawer-item";
import { getCartItemDetails } from "@/lib";
import { useCartStore } from "@/store/cart";
import { useEffect } from "react";
import { PizzaSize, PizzaType } from "@/constants/pizza";

import emptyCart from "../../../public/assets/images/empty-box.png";
import { Title } from "./title";

interface Props {
  children: React.ReactNode;
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({ children }) => {
  const { items, totalAmount, fetchCartItems, updateItemQuantity, removeCartItem } = useCartStore();

  useEffect(() => {
    fetchCartItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClickCountButton = (cartItemId: number, quantity: number, type: "plus" | "minus") => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(cartItemId, newQuantity);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between pb-0 bg-[#f4f1ee]">
        {items.length > 0 && (
          <SheetHeader>
            <SheetTitle>
              In cart <span className="font-bold">{items.length} goods</span>
            </SheetTitle>
          </SheetHeader>
        )}

        {items.length > 0 && (
          <>
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
                    disabled={item.disabled}
                    name={item.name}
                    quantity={item.quantity}
                    price={item.price}
                    onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
                    onClickDeleteButton={() => removeCartItem(item.id)}
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
          </>
        )}

        {items.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center w-72 mx-auto">
            <Image src={emptyCart} alt="empty-cart" width={120} height={120} />
            <Title text="Cart is empty" />
            <p className="text-neutral-500 text-center mb-4">Add some products to your cart to checkout</p>

            <SheetClose asChild>
              <Button type="submit" className="w-56 h-12 text-base" size="lg">
                <ArrowLeft className="w-5 mr-2" />
                Go to menu
              </Button>
            </SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
