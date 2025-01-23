import { cn } from "@/lib/utils";
import { Categories } from "./categories";
import { Container } from "./container";
import { SortPopup } from "./sort-popup";
import { Category } from "@prisma/client";

interface TopBarProps {
  categories: Category[];
  className?: string;
}

export const TopBar = ({ className, categories }: TopBarProps) => {
  return (
    <div
      className={cn(
        "sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10",
        className,
      )}
    >
      <Container className="flex items-center justify-between">
        <Categories categories={categories} />
        <SortPopup />
      </Container>
    </div>
  );
};
