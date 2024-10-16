import { mapPizzaType, PizzaSize, PizzaType } from "@/constants/pizza";
import { Ingredient } from "@prisma/client";

export const getCartItemDetails = (pizzaType: PizzaType, pizzaSize: PizzaSize, ingredients: Ingredient[]): string => {
  const details = [];

  if (pizzaType && pizzaSize) {
    details.push(`${mapPizzaType[pizzaType]} ${pizzaSize} sm`);
  }

  if (ingredients) {
    details.push(...ingredients.map((ingredient) => ingredient.name));
  }

  return details.join(", ");
};
