"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import QueryString from "qs";
import { Filters } from "@/hooks/use-filters";

export const useQueryFilters = (filters: Filters) => {
  const router = useRouter();

  useEffect(() => {
    const params = {
      priceFrom: filters.prices.priceFrom,
      priceTo: filters.prices.priceTo,
      sizes: Array.from(filters.sizes),
      pizzaTypes: Array.from(filters.pizzaTypes),
      ingredients: Array.from(filters.selectedIngredients),
    };

    const queryString = QueryString.stringify(params, { encode: false, arrayFormat: "comma" });

    router.push(`?${queryString}`, {
      scroll: false,
    });
  }, [filters, router]);
};
