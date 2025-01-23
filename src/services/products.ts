import { Product } from "@prisma/client";
import { axiosInstance } from "./instance";
import { API_ROUTES } from "./constants";

export const search = async (query: string): Promise<Product[]> => {
  const { data } = await axiosInstance.get<Product[]>(
    API_ROUTES.SEARCH_PRODUCTS,
    {
      params: {
        query,
      },
    },
  );

  return data;
};
