"use client";

import { useEffect, useRef } from "react";
import { useIntersection } from "react-use";
import { cn } from "@/lib/utils";
import { Title } from "./title";
import { ProductCart } from "./product-cart";
import { useCategoryStore } from "@/store/category";

interface ProductsGroupListProps {
  title: string;
  items: any[];
  categoryId: number;
  className?: string;
  listClassName?: string;
}

export const ProductsGroupList = ({ title, items, listClassName, categoryId, className }: ProductsGroupListProps) => {
  const { setActiveCategoryId } = useCategoryStore();
  const intersectionRef = useRef(null);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4,
  });

  useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId);
    }
  }, [categoryId, intersection, setActiveCategoryId]);

  return (
    <div className={className} id={title.toLowerCase()} ref={intersectionRef}>
      <Title text={title} size="lg" className="font-extrabold mb-5" />

      <div className={cn("grid grid-cols-3 gap-[50px]", listClassName)}>
        {items.map((item) => (
          <ProductCart
            key={item.id}
            id={item.id}
            imageUrl={item.imageUrl}
            name={item.name}
            price={item.items[0].price}
            ingredients={item.ingredients}
          />
        ))}
      </div>
    </div>
  );
};
