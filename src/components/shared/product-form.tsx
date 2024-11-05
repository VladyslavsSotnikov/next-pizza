"use client";

import { useCartStore } from "@/store";
import { ProductWithRelations } from "@/types/prisma";
import { toast } from "react-hot-toast";
import { ChoosePizzaForm } from "./choose-pizza-form";
import { ChooseProductForm } from "./choose-product-form";

interface ProductFormProps {
  product: ProductWithRelations;
  onSubmit?: VoidFunction;
}

export const ProductForm = ({ product, onSubmit: _onSubmit }: ProductFormProps) => {
  const { addCartItem, loading } = useCartStore();

  const firstItem = product.items[0];
  const isPizzaForm = firstItem.pizzaType !== null;

  const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
    try {
      const itemId = productItemId ?? firstItem.id;

      await addCartItem({
        productItemId: itemId,
        ingredientsIds: ingredients,
      });

      toast.success(`${product.name} was added to cart`);
      _onSubmit?.();
    } catch (error) {
      toast.error("Failed to add product to cart");
      console.error(error);
    }
  };

  if (!isPizzaForm) {
    return (
      <ChooseProductForm imageUrl={product.imageUrl} name={product.name} price={firstItem.price} onSubmit={onSubmit} loading={loading} />
    );
  }

  return (
    <ChoosePizzaForm
      imageUrl={product.imageUrl}
      name={product.name}
      ingredients={product.ingredients}
      items={product.items}
      onSubmit={onSubmit}
      loading={loading}
    />
  );
};
