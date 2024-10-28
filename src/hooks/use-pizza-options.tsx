import { Variant } from "@/components/shared/group-variants";
import { PizzaSize, PizzaType } from "@/constants/pizza";
import { getAvailablePizzaSizes } from "@/lib";
import { ProductItem } from "@prisma/client";
import { useEffect, useState } from "react";
import { useSet } from "react-use";

interface ReturnType {
  size: PizzaSize;
  type: PizzaType;
  selectedIngredients: Set<number>;
  availableSizes: Variant[];
  currentItemId: number | undefined;
  setSize: (size: PizzaSize) => void;
  setType: (type: PizzaType) => void;
  addIngredient: (ingredientId: number) => void;
}

export const usePizzaOptions = (items: ProductItem[]): ReturnType => {
  const [size, setSize] = useState<PizzaSize>(20);
  const [type, setType] = useState<PizzaType>(1);
  const [selectedIngredients, { toggle: addIngredient }] = useSet<number>();

  const availableSizes = getAvailablePizzaSizes(type, items);

  const currentItemId = items.find((item) => item.pizzaType === type && item.size === size)?.id;

  useEffect(() => {
    const avaliblePizza = availableSizes.find((pizza) => Number(pizza.value) === size && !pizza.disabled);

    const availableSize = availableSizes?.find((pizza) => !pizza.disabled)?.value;

    if (!avaliblePizza && availableSize) {
      setSize(Number(availableSize) as PizzaSize);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  return {
    size,
    type,
    selectedIngredients,
    availableSizes,
    currentItemId,
    setSize,
    setType,
    addIngredient,
  };
};
