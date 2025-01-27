"use server";

import { CheckoutFormValues } from "@/components/shared/checkout/checkout-form-schema";
import { prisma } from "@/prisma/prisma-client";
import { OrderStatus } from "@prisma/client";
import { cookies } from "next/headers";

export const createOrder = async (data: CheckoutFormValues) => {
  try {
    const cookieStore = cookies();
    const cartToken = cookieStore.get("cartToken")?.value;

    // If cart token not found, throw an error
    if (!cartToken) {
      throw new Error("Cart token not found");
    }

    // Find cart by token
    const userCart = await prisma.cart.findFirst({
      where: {
        token: cartToken,
      },
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            productItem: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    });

    // If cart not found, throw an error
    if (!userCart) {
      throw new Error("Cart not found");
    }

    // If cart is empty, throw an error
    if (userCart?.totalAmount === 0) {
      throw new Error("Cart is empty");
    }

    // Create order
    const order = await prisma.order.create({
      data: {
        fullName: `${data.firstName} ${data.lastName}`,
        address: data.address,
        phone: data.phone,
        email: data.email,
        comment: data.comment,
        token: cartToken,
        totalAmount: userCart.totalAmount,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.items),
      },
    });

    // Clear cart
    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    });

    // Delete cart items
    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });

    // TODO: Create url for stripe payment

    return `/order/${order.id}`;
  } catch (error) {
    console.log("error >>>>", error);
  }
};
