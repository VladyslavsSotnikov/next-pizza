import { API_ROUTES } from "./constants";
import { axiosInstance } from "./instance";
import { CartDTO, CreateCartItemValues } from "./dto/cart.dto";

export const getCart = async (): Promise<CartDTO> => {
  const { data } = await axiosInstance.get<CartDTO>(API_ROUTES.CART);

  return data;
};

export const updateCartItemQuantity = async (
  id: number,
  quantity: number,
): Promise<CartDTO> => {
  const { data } = await axiosInstance.patch<CartDTO>(
    `${API_ROUTES.CART}/${id}`,
    { quantity },
  );

  return data;
};

export const removeCartItem = async (id: number): Promise<CartDTO> => {
  const { data } = await axiosInstance.delete<CartDTO>(
    `${API_ROUTES.CART}/${id}`,
  );

  return data;
};

export const addCartItem = async (
  values: CreateCartItemValues,
): Promise<CartDTO> => {
  const { data } = await axiosInstance.post<CartDTO>(API_ROUTES.CART, values);

  return data;
};
