"use client";

import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { ChoosePizzaForm } from "@/components/shared";

import { ChooseProductForm } from "../choose-product-form";
import { ProductWithRelations } from "@/types/prisma";

interface ChooseProductModalProps {
  product: ProductWithRelations;
  className?: string;
}

export const ChooseProductModal = ({ product, className }: ChooseProductModalProps) => {
  const router = useRouter();
  const isPizzaForm = product.items[0].pizzaType !== null;

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent className={cn("p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden", className)}>
        {isPizzaForm ? (
          <ChoosePizzaForm
            imageUrl={product.imageUrl}
            name={product.name}
            ingredients={product.ingredients}
            items={product.items}
            onSubmit={() => {}}
          />
        ) : (
          <ChooseProductForm imageUrl={product.imageUrl} name={product.name} price={product.items[0].price} />
        )}
      </DialogContent>
    </Dialog>
  );
};
