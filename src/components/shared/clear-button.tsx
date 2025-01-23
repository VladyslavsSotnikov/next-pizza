import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface Props {
  onClick: () => void;
  className?: string;
}

export const ClearButton = (props: Props) => {
  const { onClick, className } = props;
  return (
    <button
      className={cn(
        "absolute top-1/2 right-4 -translate-y-1/2 opacity-50 hover:opacity-100 transition-opacity duration-300 cursor-pointer",
        className,
      )}
      onClick={onClick}
    >
      <X className="w-5 h-5" />
    </button>
  );
};
