import {
  WhiteBlock,
  CheckoutItemSkeleton,
  CheckoutItem,
} from "@/components/shared";
import { PizzaType, PizzaSize } from "@/constants/pizza";
import { CartStateItem } from "@/lib";
import { getCartItemDetails } from "@/lib/get-cart-item-details";

interface Props {
  items: CartStateItem[];
  onClickCountButton: (
    id: number,
    quantity: number,
    type: "plus" | "minus",
  ) => void;
  removeCartItem: (id: number) => void;
  className?: string;
  loading?: boolean;
}

export const CheckoutCart = (props: Props) => {
  const { items, onClickCountButton, removeCartItem, className, loading } =
    props;
  return (
    <WhiteBlock title="1. Cart" className={className}>
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
  );
};
