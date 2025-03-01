"use client";

import { useEffect } from "react";
import { useCartStore } from "@/store/cart";
import { CartStateItem } from "@/lib";
import { CreateCartItemValues } from "@/services/dto/cart.dto";

type ReturnProps = {
  totalAmount: number;
  items: CartStateItem[];
  loading: boolean;
  updateItemQuantity: (id: number, quantity: number) => void;
  removeCartItem: (id: number) => void;
  addCartItem: (values: CreateCartItemValues) => void;
};

export const useCart = (): ReturnProps => {
  const cartState = useCartStore();

  useEffect(() => {
    cartState.fetchCartItems();
  }, []);

  return cartState;
};
