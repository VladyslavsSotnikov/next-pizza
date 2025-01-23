import { cn } from "@/lib/utils";
import { Title } from "./title";

interface Props {
  className?: string;
  contentClassName?: string;
  title?: string;
  endAdornment?: React.ReactNode;
  children: React.ReactNode;
}

export const WhiteBlock = ({
  children,
  className,
  title,
  endAdornment,
  contentClassName,
}: Props) => {
  return (
    <div className={cn("bg-white rounded-3xl p-6", className)}>
      {title && (
        <div className="flex items-center justify-between p-5 px-7 ">
          <Title text={title} size="md" className="font-bold" />
          {endAdornment}
        </div>
      )}
      <div className={cn("px-5 py-4", contentClassName)}>{children}</div>
    </div>
  );
};
