import { cn } from "@/lib/utils";

const categories = ["Pizza", "Combo", "Salad", "Coctail", "Cofe", "Drink", "Dessert"];
const activeCategory = 0;

interface CategoriesProps {
  className?: string;
}

export const Categories = ({ className }: CategoriesProps) => {
  return (
    <div className={cn("inline-flex gap-1 bg-gray-50 p-1 rounded-2xl", className)}>
      {categories.map((category, index) => (
        <a
          key={index}
          className={cn(
            "flex items-center font-bold h-11 rounded-2xl px-5",
            index === activeCategory && "bg-white shadow-md shadow-gray-200 text-primary"
          )}
        >
          <button>{category}</button>
        </a>
      ))}
    </div>
  );
};
