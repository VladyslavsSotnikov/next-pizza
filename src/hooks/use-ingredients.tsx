"use client";

import { useEffect, useState } from "react";
import { API } from "@/services/api-client";
import { Ingredient } from "@prisma/client";

interface ReturnType {
  ingredients: Ingredient[];
  loading: boolean;
}

export const useIngredients = (): ReturnType => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);

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

  return { ingredients, loading };
};
