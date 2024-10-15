"use client";
import { cn } from "@/lib/utils";
import { Ingredient, ProductItem } from "@prisma/client";
import { GroupVariants, IngredientItem, PizzaImage, Title } from "@/components/shared";
import { Button } from "../ui";
import { PizzaSize, PizzaType, pizzaTypes } from "@/constants/pizza";
import { getPizzaDetails } from "@/lib";
import { usePizzaOptions } from "@/hooks";

interface Props {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  items: ProductItem[];
  loading?: boolean;
  onSubmit: (itemId: number, ingredients: number[]) => void;
  className?: string;
}

export const ChoosePizzaForm = ({ imageUrl, name, ingredients, items, loading, onSubmit, className }: Props) => {
  const { size, type, selectedIngredients, availableSizes, setSize, setType, addIngredient } = usePizzaOptions(items);

  const { totalPrice, textDetails } = getPizzaDetails(size, type, items, ingredients, selectedIngredients);

  const handleClickAdd = () => {
    console.log("cart", {
      size,
      type,
      ingredients: Array.from(selectedIngredients),
    });
  };

  return (
    <div className={cn(className, "flex flex-1")}>
      <PizzaImage imageUrl={imageUrl} size={size} />
      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />
        <p className="text-gray-400">{textDetails}</p>
        <div className="flex flex-col gap-2 mt-5">
          <GroupVariants items={availableSizes} selectedValue={String(size)} onClick={(value) => setSize(Number(value) as PizzaSize)} />
          <GroupVariants items={pizzaTypes} selectedValue={String(type)} onClick={(value) => setType(Number(value) as PizzaType)} />
        </div>
        <div className="bg-gray-50 p-5 rounded-md h-[440px] overflow-auto scrollbar mt-5">
          <div className="grid grid-cols-3 gap-3 mt-5">
            {ingredients.map((ingredient) => (
              <IngredientItem
                key={ingredient.id}
                imageUrl={ingredient.imageUrl}
                name={ingredient.name}
                price={ingredient.price}
                active={selectedIngredients.has(ingredient.id)}
                onClick={() => addIngredient(ingredient.id)}
              />
            ))}
          </div>
        </div>

        <Button onClick={handleClickAdd} className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
          Add to cart for {totalPrice} $
        </Button>
      </div>
    </div>
  );
};
