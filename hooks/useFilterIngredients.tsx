"use client";

import { useEffect, useState } from "react";
import { API } from "@/services/api-client";
import { Ingredient } from "@prisma/client";
import { useSet } from "react-use";

interface ReturnType {
  ingredients: Ingredient[];
  loading: boolean;
  selectedIngredients: Set<string>;
  onAddIngredient: (id: string) => void;
}

export const useFilterIngredients = (): ReturnType => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIngredients, { toggle }] = useSet(new Set<string>());

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        setLoading(true);
        const ingredients = await API.ingredients.getAll();
        setIngredients(ingredients);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchIngredients();
  }, []);

  return { ingredients, loading, selectedIngredients, onAddIngredient: toggle };
};
