"use client";

import { cn } from "@/lib/utils";
import { useCategoryStore } from "@/store/category";
import { Category } from "@prisma/client";

interface CategoriesProps {
  className?: string;
  categories: Category[];
}

export const Categories = ({ className, categories }: CategoriesProps) => {
  const { activeCategoryId } = useCategoryStore();

  return (
    <div
      className={cn("inline-flex gap-1 bg-gray-50 p-1 rounded-2xl", className)}
    >
      {categories.map(({ id, name }) => (
        <a
          key={`categiry-${name.toLowerCase()}${id}`}
          href={`/#${name.toLowerCase()}`}
          className={cn(
            "flex items-center font-bold h-11 rounded-2xl px-5",
            activeCategoryId === id &&
              "bg-white shadow-md shadow-gray-200 text-primary",
          )}
        >
          <button>{name}</button>
        </a>
      ))}
    </div>
  );
};
