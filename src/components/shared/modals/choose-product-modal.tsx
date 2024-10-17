"use client";

import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { ChoosePizzaForm } from "@/components/shared";

import { ChooseProductForm } from "../choose-product-form";
import { ProductWithRelations } from "@/types/prisma";
import { useCartStore } from "@/store";
import toast from "react-hot-toast";

interface ChooseProductModalProps {
  product: ProductWithRelations;
  className?: string;
}

export const ChooseProductModal = ({ product, className }: ChooseProductModalProps) => {
  const router = useRouter();
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
      router.back();
    } catch (error) {
      toast.error("Failed to add product to cart");
      console.error(error);
    }
  };

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent className={cn("p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden", className)}>
        {isPizzaForm ? (
          <ChoosePizzaForm
            imageUrl={product.imageUrl}
            name={product.name}
            ingredients={product.ingredients}
            items={product.items}
            onSubmit={onSubmit}
            loading={loading}
          />
        ) : (
          <ChooseProductForm
            imageUrl={product.imageUrl}
            name={product.name}
            price={firstItem.price}
            onSubmit={onSubmit}
            loading={loading}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
