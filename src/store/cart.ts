import { CartStateItem, getCartDetails } from "@/lib";
import { API } from "@/services/api-client";
import { create } from "zustand";

export interface CartState {
  loading: boolean;
  error: boolean;
  totalAmount: number;
  items: CartStateItem[];
  fetchCartItems: () => Promise<void>;
  updateItemQuantity: (id: number, quantity: number) => Promise<void>;
  removeCartItem: (id: number) => Promise<void>;
  // TODO: fix any
  addCartItem: (values: any) => Promise<void>;
}

export const useCartStore = create<CartState>((set) => ({
  loading: false,
  error: false,
  totalAmount: 0,
  items: [],

  fetchCartItems: async () => {
    try {
      set({ loading: true, error: false });
      const data = await API.cart.getCart();
      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
  updateItemQuantity: async () => {},
  removeCartItem: async () => {},
  addCartItem: async () => {},
}));
