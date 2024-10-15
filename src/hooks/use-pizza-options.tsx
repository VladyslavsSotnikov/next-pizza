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
  setSize: (size: PizzaSize) => void;
  setType: (type: PizzaType) => void;
  addIngredient: (ingredientId: number) => void;
}

export const usePizzaOptions = (items: ProductItem[]): ReturnType => {
  const [size, setSize] = useState<PizzaSize>(20);
  const [type, setType] = useState<PizzaType>(1);
  const [selectedIngredients, { toggle: addIngredient }] = useSet<number>();

  const availableSizes = getAvailablePizzaSizes(type, items);

  useEffect(() => {
    const avaliblePizza = availableSizes.find((pizza) => Number(pizza.value) === size && !pizza.disabled);

    const availableSize = availableSizes?.find((pizza) => !pizza.disabled)?.value;

    if (!avaliblePizza && availableSize) {
      setSize(Number(availableSize) as PizzaSize);
    }
  }, [type]);

  return {
    size,
    type,
    selectedIngredients,
    availableSizes,
    setSize,
    setType,
    addIngredient,
  };
};
