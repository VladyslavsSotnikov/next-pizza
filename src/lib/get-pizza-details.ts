import { mapPizzaType, PizzaSize, PizzaType } from "@/constants/pizza";
import { calcTotalPizzaPrice } from "./calc-total-pizza-price";
import { Ingredient, ProductItem } from "@prisma/client";

export const getPizzaDetails = (
  size: PizzaSize,
  type: PizzaType,
  items: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>
) => {
  const totalPrice = calcTotalPizzaPrice(type, size, items, ingredients, selectedIngredients);
  const textDetails = `${size} sm, ${mapPizzaType[type].toLocaleLowerCase()} pizza`;

  return { totalPrice, textDetails };
};
