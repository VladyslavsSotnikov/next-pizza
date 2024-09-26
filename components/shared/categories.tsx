"use client";

import { cn } from "@/lib/utils";
import { useCategoryStore } from "@/store/category";

const categories = [
  { id: 1, name: "Pizzas" },
  { id: 2, name: "Combo" },
  { id: 3, name: "Salad" },
  { id: 4, name: "Coctail" },
  { id: 5, name: "Cofe" },
  { id: 6, name: "Drink" },
  { id: 7, name: "Dessert" },
];

interface CategoriesProps {
  className?: string;
}

export const Categories = ({ className }: CategoriesProps) => {
  const { activeCategoryId } = useCategoryStore();

  return (
    <div className={cn("inline-flex gap-1 bg-gray-50 p-1 rounded-2xl", className)}>
      {categories.map(({ id, name }) => (
        <a
          key={id}
          href={`/#${name.toLowerCase()}`}
          className={cn(
            "flex items-center font-bold h-11 rounded-2xl px-5",
            id === activeCategoryId && "bg-white shadow-md shadow-gray-200 text-primary"
          )}
        >
          <button>{name}</button>
        </a>
      ))}
    </div>
  );
};
