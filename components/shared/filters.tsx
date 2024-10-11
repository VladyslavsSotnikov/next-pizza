"use client";

import { cn } from "@/lib/utils";
import { Title } from "./title";
import { Input } from "../ui";
import { RangeSlider } from "./range-slider";
import { CheckboxFiltersGroup } from "./checkbox-filters-group";
import { useFilterIngredients } from "@/hooks/useFilterIngredients";
import { useEffect, useState } from "react";
import { useSet } from "react-use";
import QueryString from "qs";
import { useRouter, useSearchParams } from "next/navigation";

interface FiltersProps {
  className?: string;
}

interface PriceProps {
  priceFrom?: number;
  priceTo?: number;
}

interface QueryFilters extends PriceProps {
  pizzaTypes?: string;
  sizes?: string;
  ingredients?: string;
}

export const Filters = ({ className }: FiltersProps) => {
  const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>;
  const router = useRouter();
  const { ingredients, loading, selectedIngredients, onAddIngredient } = useFilterIngredients(searchParams.get("ingredients")?.split(",") || []);
  const [prices, setPrice] = useState<PriceProps>({
    priceFrom: Number(searchParams.get("priceFrom")) || undefined,
    priceTo: Number(searchParams.get("priceTo")) || undefined,
  });
  const [selectedSizes, { toggle: toggleSize }] = useSet(new Set<string>(searchParams.get("sizes")?.split(",") || []));
  const [pizzaTypes, { toggle: togglePizzaType }] = useSet(new Set<string>(searchParams.get("pizzaTypes")?.split(",") || []));


  const ingredientsItems = ingredients.map((ingredient) => ({
    text: ingredient.name,
    value: ingredient.id.toString(),
  }));

  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrice({ ...prices, [name]: value });
  };

  useEffect(() => {
    const filters = {
      ...prices,
      pizzaTypes: Array.from(pizzaTypes),
      sizes: Array.from(selectedSizes),
      ingredients: Array.from(selectedIngredients),
    };

    const queryString = QueryString.stringify(filters, { encode: false, arrayFormat: "comma" });

    router.push(`?${queryString}`, {
      scroll: false,
    });
  }, [prices, pizzaTypes, selectedSizes, selectedIngredients, router]);


  console.log(searchParams);

  return (
    <div className={cn("flex flex-col gap-10", className)}>
      <div className="flex flex-col gap-2">
        <Title text="Filters" size="sm" className="mb-5 font-bold" />
        {/* TOP CHECKBOX */}
        <CheckboxFiltersGroup
          title="Pizza types"
          className="mb-5"
          onClickCheckbox={togglePizzaType}
          items={[
            { text: "Thin", value: "1" },
            { text: "Traditional", value: "2" },
          ]}
          selectedValues={pizzaTypes}
        />
        <CheckboxFiltersGroup
          title="Sizes"
          className="mb-5"
          onClickCheckbox={toggleSize}
          items={[{ text: "20 cm", value: "20" }, { text: "30 cm", value: "30" }, { text: "40 cm", value: "40" }]}
          selectedValues={selectedSizes}
        />
        {/* PRICE FILTER */}
        <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
          <p className="font-bold mb-3">Price from-to</p>
          <div className="flex gap-3 mb-5">
            <Input
              type="number"
              placeholder="0"
              min={0}
              max={100}
              value={prices.priceFrom?.toString() || "0"}
              onChange={(e) => updatePrice("priceFrom", Number(e.target.value))}
            />
            <Input
              type="number"
              placeholder="100"
              min={10}
              max={100}
              value={prices.priceTo?.toString() || "100"}
              onChange={(e) => updatePrice("priceTo", Number(e.target.value))}
            />
          </div>
          <RangeSlider
            min={0}
            max={100}
            step={1}
            value={[prices.priceFrom || 0, prices.priceTo || 100]}
            onValueChange={([from, to]) => {
              setPrice({ priceFrom: from, priceTo: to });
            }}
          />
        </div>
        {/* CHECKBOX FILTERS GROUP */}
        <CheckboxFiltersGroup
          title="Ingredients"
          className="mt-5"
          limit={6}
          loading={loading}
          onClickCheckbox={onAddIngredient}
          defaultItems={ingredientsItems.slice(0, 6)}
          items={ingredientsItems}
          selectedValues={selectedIngredients}
        />
      </div>
    </div>
  );
};
