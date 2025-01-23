import { ArrowRight } from "lucide-react";

import { Percent, Truck } from "lucide-react";

import { Package } from "lucide-react";
import { CheckoutItemDetails } from "./checkout-item-details";
import { WhiteBlock } from "./white-block";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

const VAT = 15;
const DELIVERY_FEE = 25;

type CheckoutSidebarProps = {
  totalAmount: number;
  className?: string;
  loading?: boolean;
};

export const CheckoutSidebar = ({
  totalAmount,
  className,
  loading,
}: CheckoutSidebarProps) => {
  const fee = (totalAmount * VAT) / 100;
  const finalAmount = totalAmount + fee + DELIVERY_FEE;

  return (
    <WhiteBlock className={cn("p-6 sticky top-4", className)}>
      <div className="flex flex-col gap-1">
        <span className="text-xl">Total:</span>
        {loading ? (
          <Skeleton className="h-11 w-36" />
        ) : (
          <span className="h-11 text-[34px] font-extrabold">{`${finalAmount}$`}</span>
        )}
      </div>

      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Package size={18} className="mr-2 text-gray-300" /> Subtotal
          </div>
        }
        value={
          loading ? (
            <Skeleton className="h-6 w-16 rounded-[6px]" />
          ) : (
            `${totalAmount}$`
          )
        }
      />
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Percent size={18} className="mr-2 text-gray-300" /> Fee
          </div>
        }
        value={
          loading ? <Skeleton className="h-6 w-16 rounded-[6px]" /> : `${fee}$`
        }
      />
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Truck size={18} className="mr-2 text-gray-300" /> Delivery
          </div>
        }
        value={
          loading ? (
            <Skeleton className="h-6 w-16 rounded-[6px]" />
          ) : (
            `${DELIVERY_FEE}$`
          )
        }
      />
      <Button
        type="submit"
        className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
      >
        Place order
        <ArrowRight size={20} className="w-5 ml-2" />
      </Button>
    </WhiteBlock>
  );
};
