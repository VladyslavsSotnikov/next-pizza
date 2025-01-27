import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { findOrCreateCart } from "@/lib/find-or-create-cart";
import { CreateCartItemValues } from "@/services/dto/cart.dto";
import { updateCartTotalAmount } from "@/lib";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("cartToken")?.value;

    if (!token) {
      return NextResponse.json({ totalAmount: 0, items: [] }, { status: 200 });
    }

    const userCart = await prisma.cart.findFirst({
      where: {
        OR: [{ token }],
      },
      include: {
        items: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            productItem: {
              include: {
                product: true,
              },
            },
            ingredients: true,
          },
        },
      },
    });

    return NextResponse.json(userCart);
  } catch (error) {
    console.error(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get("cartToken")?.value;

    if (!token) {
      token = crypto.randomUUID();
    }

    const userCart = await findOrCreateCart(token);

    const data = (await req.json()) as CreateCartItemValues;

    const findCartItems = await prisma.cartItem
      .findMany({
        where: {
          cartId: userCart.id,
          productItemId: data.productItemId,
        },
        include: {
          ingredients: {
            select: {
              id: true,
            },
          },
        },
      })
      .then((items) => {
        return items.map((item) => {
          return {
            ...item,
            ingredients: item.ingredients
              .map((ingredient) => ingredient.id)
              .sort(),
          };
        });
      });

    const findCartItem = findCartItems.find(
      (item) =>
        data.ingredientsIds?.sort().join(",") ===
        item.ingredients.sort().join(","),
    );

    if (findCartItem) {
      await prisma.cartItem.update({
        where: {
          id: findCartItem.id,
        },
        data: {
          quantity: findCartItem.quantity + 1,
        },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          productItemId: data.productItemId,
          quantity: 1,
          ingredients: {
            connect: data.ingredientsIds?.map((id) => ({ id })),
          },
        },
      });
    }

    const updatedUserCart = await updateCartTotalAmount(token);

    const res = NextResponse.json(updatedUserCart);
    res.cookies.set("cartToken", token);

    return res;
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to add product to cart" },
      { status: 500 },
    );
  }
}
