import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface Props {
  title?: JSX.Element;
  value?: string | number | ReactNode;
  className?: string;
}

export const CheckoutItemDetails = ({ title, value, className }: Props) => {
  return (
    <div className={cn("flex my-4", className)}>
      <span className="flex flex-1 text-lg text-neutral-500">
        {title}
        <div className="flex-1 border-b border-dashed border-neutral-200 relative -top-1 mx-2"></div>
      </span>
      <span className="font-bold text-lg">{value}</span>
    </div>
  );
};
