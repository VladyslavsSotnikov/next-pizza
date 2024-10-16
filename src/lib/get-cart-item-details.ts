import { mapPizzaType, PizzaSize, PizzaType } from "@/constants/pizza";
import { CartStateItem } from "./get-cart-details";

export const getCartItemDetails = (
  ingredients: CartStateItem["ingredients"],
  pizzaType: PizzaType | null,
  pizzaSize: PizzaSize | null
): string => {
  const details = [];

  if (pizzaType && pizzaSize) {
    details.push(`${mapPizzaType[pizzaType]} ${pizzaSize} sm`);
  }

  if (ingredients) {
    details.push(...ingredients.map((ingredient) => ingredient.name));
  }

  return details.join(", ");
};
