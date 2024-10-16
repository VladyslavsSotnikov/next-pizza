import { cn } from "@/lib/utils";

import * as CartItem from "@/components/shared/cart-item-details";
import { CartItemProps } from "./cart-item-details/cart-item-details.types";
import { Trash2Icon } from "lucide-react";

interface CartDrawerItemProps extends CartItemProps {
  className?: string;
}

export const CartDrawerItem = ({ id, imageUrl, details, name, quantity, price, className }: CartDrawerItemProps) => {
  return (
    <div className={cn("flex bg-white p-5 gap-6", className)}>
      <CartItem.Image src={imageUrl} />

      <div className="flex-1">
        <CartItem.Info name={name} details={details} />
        <hr className="w-full my-3" />
        <div className="flex justify-between items-center">
          <CartItem.CountButton onClick={(type) => console.log(type)} value={quantity} />
          <div className="flex items-center gap-3">
            <CartItem.Price value={price} />
            <Trash2Icon onClick={() => console.log("delete")} className="text-gray-400 cursor-pointer hover:text-gray-600" size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};
