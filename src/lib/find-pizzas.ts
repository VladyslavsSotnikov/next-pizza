import { prisma } from "@/prisma/prisma-client";

export interface GetSearchParams {
  priceFrom?: string;
  priceTo?: string;
  sizes?: string;
  pizzaTypes?: string;
  ingredients?: string;
}

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 10000;

export const findPizzas = async (params: GetSearchParams) => {
  console.log("findPizzas called");
  const sizes = params.sizes?.split(",").map((size) => parseInt(size));
  const pizzaTypes = params.pizzaTypes?.split(",").map((type) => parseInt(type));
  const ingredientsIds = params.ingredients?.split(",").map((ingredient) => parseInt(ingredient));
  const minPrice = Number(params.priceFrom) || DEFAULT_MIN_PRICE;
  const maxPrice = Number(params.priceTo) || DEFAULT_MAX_PRICE;

  const categories = await prisma.category.findMany({
    include: {
      products: {
        orderBy: {
          id: "desc",
        },
        where: {
          ingredients: ingredientsIds ? { some: { id: { in: ingredientsIds } } } : undefined,
          items: {
            some: {
              price: {
                gte: minPrice,
                lte: maxPrice,
              },
              size: sizes ? { in: sizes } : undefined,
              pizzaType: pizzaTypes ? { in: pizzaTypes } : undefined,
            },
          },
        },
        include: {
          ingredients: true,
          items: {
            where: {
              price: {
                gte: minPrice,
                lte: maxPrice,
              },
            },
            orderBy: {
              price: "asc",
            },
          },
        },
      },
    },
  });

  return categories;
};
