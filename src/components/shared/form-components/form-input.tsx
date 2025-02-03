"use client";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { InputHTMLAttributes } from "react";
import { RequiredSymbol, ClearButton, ErrorText } from "@/components/shared";
import { useFormContext } from "react-hook-form";
interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export const FormInput = (props: Props) => {
  const { name, label, required, className, ...rest } = props;

  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const value = watch(name);
  const error = errors[name]?.message as string;

  const onClear = () => {
    setValue(name, "", { shouldValidate: true });
  };

  return (
    <div className={cn(className)}>
      {label && (
        <p className="font-medium mb-2">
          {label} {required && <RequiredSymbol />}
        </p>
      )}
      <div className="relative">
        <Input
          {...register(name)}
          className="h-12 text-md"
          name={name}
          value={value}
          {...rest}
        />
        {value && <ClearButton onClick={onClear} />}
      </div>

      {error && <ErrorText text={error} className="mt-2" />}
    </div>
  );
};
