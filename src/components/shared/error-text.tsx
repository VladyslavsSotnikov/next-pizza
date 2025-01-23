import { cn } from "@/lib/utils";

interface Props {
  text: string;
  className?: string;
}

export const ErrorText = (props: Props) => {
  const { text, className } = props;
  return <p className={cn("text-red-500 text-sm", className)}>{text}</p>;
};
