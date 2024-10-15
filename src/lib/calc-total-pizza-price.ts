import { PizzaSize, PizzaType } from "@/constants/pizza";
import { Ingredient, ProductItem } from "@prisma/client";

/**
 * Calculate the total price of a pizza
 * @param type - Pizza type
 * @param size - Pizza size
 * @param items - Pizza variants
 * @param ingredients - Pizza ingredients
 * @param selectedIngredients - Selected ingredients
 * @returns Total price of a pizza
 */
export const calcTotalPizzaPrice = (
  type: PizzaType,
  size: PizzaSize,
  items: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>
) => {
  const totalIngredientsPrice = ingredients.reduce((acc, ingredient) => {
    if (selectedIngredients.has(ingredient.id)) {
      return acc + ingredient.price;
    }
    return acc;
  }, 0);

  const pizzaPrice = items.find((item) => item.pizzaType === type && item.size === size)?.price || 0;

  return pizzaPrice + totalIngredientsPrice;
};
