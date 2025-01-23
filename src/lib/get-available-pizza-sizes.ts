import { Variant } from "@/components/shared/group-variants";
import { pizzaSizes, PizzaType } from "@/constants/pizza";
import { ProductItem } from "@prisma/client";

export const getAvailablePizzaSizes = (
  type: PizzaType,
  items: ProductItem[],
): Variant[] => {
  const filteredPizzasByType = items.filter((item) => item.pizzaType === type);

  return pizzaSizes.map((size) => {
    return {
      name: size.name,
      value: size.value.toString(),
      disabled: !filteredPizzasByType.some(
        (pizza) => pizza.size === size.value,
      ),
    };
  });
};
