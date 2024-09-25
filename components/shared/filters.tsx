import { cn } from "@/lib/utils";
import { Title } from "./title";
import { FilterCheckbox } from "./filter-checkbox";
import { Input } from "../ui";
import { RangeSlider } from "./range-slider";
import { CheckboxFiltersGroup } from "./checkbox-filters-group";

interface FiltersProps {
  className?: string;
}

const ingredients = [
  { text: "Cheese", value: "1" },
  { text: "Tomato", value: "2" },
  { text: "Cheese", value: "3" },
  { text: "Tomato", value: "4" },
  { text: "Cheese", value: "5" },
  { text: "Tomato", value: "6" },
];

export const Filters = ({ className }: FiltersProps) => {
  return (
    <div className={cn("flex flex-col gap-10", className)}>
      <div className="flex flex-col gap-2">
        <Title text="Filters" size="sm" className="mb-5 font-bold" />
        {/* TOP CHECKBOX */}
        <div className="flex flex-col gap-4">
          <FilterCheckbox text="Can assemble" value="can-assemble" />
          <FilterCheckbox text="New" value="new" />
        </div>
        {/* PRICE FILTER */}
        <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
          <p className="font-bold mb-3">Price from-to</p>
          <div className="flex gap-3 mb-5">
            <Input type="number" placeholder="0" min={0} max={100} defaultValue={0} />
            <Input type="number" placeholder="100" min={10} max={100} />
          </div>
          <RangeSlider min={0} max={100} step={1} value={[0, 100]} />
        </div>
        {/* CHECKBOX FILTERS GROUP */}
        <CheckboxFiltersGroup
          title="Ingredients"
          className="mt-5"
          limit={6}
          defaultItems={ingredients}
          items={[...ingredients, ...ingredients]}
        />
      </div>
    </div>
  );
};
