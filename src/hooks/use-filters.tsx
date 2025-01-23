import { useSearchParams } from "next/navigation";
import { useSet } from "react-use";
import { useState } from "react";

interface PriceProps {
  priceFrom?: number;
  priceTo?: number;
}

export interface QueryFilters extends PriceProps {
  pizzaTypes?: string;
  sizes?: string;
  ingredients?: string;
}

export interface Filters {
  sizes: Set<string>;
  pizzaTypes: Set<string>;
  selectedIngredients: Set<string>;
  prices: PriceProps;
}

interface ReturnType extends Filters {
  setSizes: (size: string) => void;
  setPizzaTypes: (pizzaType: string) => void;
  setSelectedIngredients: (ingredient: string) => void;
  setPrices: (price: keyof PriceProps, value: number) => void;
}

export const useFilters = (): ReturnType => {
  const searchParams = useSearchParams() as unknown as Map<
    keyof QueryFilters,
    string
  >;

  const [prices, setPrices] = useState<PriceProps>({
    priceFrom: Number(searchParams.get("priceFrom")) || undefined,
    priceTo: Number(searchParams.get("priceTo")) || undefined,
  });

  const [sizes, { toggle: toggleSize }] = useSet(
    new Set<string>(searchParams.get("sizes")?.split(",") || []),
  );
  const [pizzaTypes, { toggle: togglePizzaType }] = useSet(
    new Set<string>(searchParams.get("pizzaTypes")?.split(",") || []),
  );

  const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
    new Set<string>(searchParams.get("ingredients")?.split(",") || []),
  );

  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrices((prev) => ({ ...prev, [name]: value }));
  };

  return {
    sizes,
    pizzaTypes,
    selectedIngredients,
    prices,
    setSelectedIngredients: toggleIngredients,
    setSizes: toggleSize,
    setPizzaTypes: togglePizzaType,
    setPrices: updatePrice,
  };
};
