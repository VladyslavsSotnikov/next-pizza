"use client";

import {
  CheckoutItem,
  CheckoutItemSkeleton,
  CheckoutSidebar,
  Container,
  Title,
  WhiteBlock,
} from "@/components/shared";
import { Input, Textarea } from "@/components/ui";
import { PizzaType, PizzaSize } from "@/constants/pizza";
import { useCart } from "@/hooks";
import { getCartItemDetails } from "@/lib";

export default function Checkout() {
  const { items, loading, updateItemQuantity, removeCartItem, totalAmount } =
    useCart();

  const onClickCountButton = (
    id: number,
    quantity: number,
    type: "plus" | "minus",
  ) => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  return (
    <Container>
      <Title text="Checkout" size="lg" className="font-extrabold my-7" />
      <div className="flex gap-10">
        <div className="flex flex-col gap-10 flex-1 mb-20">
          <WhiteBlock title="1. Cart">
            <div className="flex flex-col gap-5">
              {loading &&
                Array.from({ length: 3 }).map((_, index) => (
                  <CheckoutItemSkeleton key={index} className="h-15 w-full" />
                ))}
              {!loading &&
                items.map((item) => (
                  <CheckoutItem
                    key={item.id}
                    id={item.id}
                    imageUrl={item.imageUrl}
                    details={getCartItemDetails(
                      item.ingredients,
                      item.pizzaType as PizzaType,
                      item.pizzaSize as PizzaSize,
                    )}
                    name={item.name}
                    price={item.price}
                    quantity={item.quantity}
                    onClickCountButton={(type) =>
                      onClickCountButton(item.id, item.quantity, type)
                    }
                    onClickRemove={() => {
                      removeCartItem(item.id);
                    }}
                  />
                ))}
            </div>
          </WhiteBlock>
          <WhiteBlock title="2. Personal details">
            <div className="grid grid-cols-2 gap-5">
              <Input name="firstName" placeholder="First name" />
              <Input name="lastName" placeholder="Last name" />
              <Input name="email" placeholder="Email" />
              <Input name="phone" placeholder="Phone" />
            </div>
          </WhiteBlock>
          <WhiteBlock title="3. Delivery address">
            <div className="flex flex-col gap-5">
              <Input name="address" placeholder="Address" />
              <Textarea
                className="text-base"
                rows={5}
                placeholder="Comment..."
              />
            </div>
          </WhiteBlock>
        </div>
        <div className="w-[450px]">
          <CheckoutSidebar totalAmount={totalAmount} />
        </div>
      </div>
    </Container>
  );
}
