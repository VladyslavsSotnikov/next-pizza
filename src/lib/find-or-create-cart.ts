import { prisma } from "@/prisma/prisma-client";

export const findOrCreateCart = async (token: string) => {
  const cart = await prisma.cart.findFirst({
    where: { token },
  });

  if (!cart) {
    const newCart = await prisma.cart.create({
      data: { token },
    });

    return newCart;
  }

  return cart;
};
