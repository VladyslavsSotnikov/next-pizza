"use client";

import { cn } from "@/lib/utils";
import { Title } from "./title";
import { Input } from "../ui";
import { RangeSlider } from "./range-slider";
import { CheckboxFiltersGroup } from "./checkbox-filters-group";
import { useFilters, useIngredients, useQueryFilters } from "@/hooks";

interface FiltersProps {
  className?: string;
}

export const Filters = ({ className }: FiltersProps) => {
  const { ingredients, loading } = useIngredients();
  const filters = useFilters();

  useQueryFilters(filters);

  const ingredientsItems = ingredients.map((ingredient) => ({
    text: ingredient.name,
    value: ingredient.id.toString(),
  }));

  const updatePrices = ([from, to]: number[]) => {
    filters.setPrices("priceFrom", from);
    filters.setPrices("priceTo", to);
  };

  return (
    <div className={cn("flex flex-col gap-10", className)}>
      <div className="flex flex-col gap-2">
        <Title text="Filters" size="sm" className="mb-5 font-bold" />
        {/* TOP CHECKBOX */}
        <CheckboxFiltersGroup
          title="Pizza types"
          className="mb-5"
          onClickCheckbox={filters.setPizzaTypes}
          items={[
            { text: "Thin", value: "1" },
            { text: "Traditional", value: "2" },
          ]}
          selectedValues={filters.pizzaTypes}
        />
        <CheckboxFiltersGroup
          title="Sizes"
          className="mb-5"
          onClickCheckbox={filters.setSizes}
          items={[
            { text: "20 cm", value: "20" },
            { text: "30 cm", value: "30" },
            { text: "40 cm", value: "40" },
          ]}
          selectedValues={filters.sizes}
        />
        {/* PRICE FILTER */}
        <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
          <p className="font-bold mb-3">Price from-to</p>
          <div className="flex gap-3 mb-5">
            <Input
              type="number"
              placeholder="0"
              min={0}
              max={1000}
              value={filters.prices.priceFrom || "0"}
              onChange={(e) => filters.setPrices("priceFrom", Number(e.target.value))}
            />
            <Input
              type="number"
              placeholder="100"
              min={10}
              max={1000}
              value={filters.prices.priceTo || "1000"}
              onChange={(e) => filters.setPrices("priceTo", Number(e.target.value))}
            />
          </div>
          <RangeSlider
            min={0}
            max={1000}
            step={1}
            value={[filters.prices.priceFrom || 0, filters.prices.priceTo || 1000]}
            onValueChange={updatePrices}
          />
        </div>
        {/* CHECKBOX FILTERS GROUP */}
        <CheckboxFiltersGroup
          title="Ingredients"
          className="mt-5"
          limit={6}
          loading={loading}
          onClickCheckbox={filters.setSelectedIngredients}
          defaultItems={ingredientsItems.slice(0, 6)}
          items={ingredientsItems}
          selectedValues={filters.selectedIngredients}
        />
      </div>
    </div>
  );
};
