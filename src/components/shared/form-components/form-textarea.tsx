import { cn } from "@/lib/utils";
import { TextareaHTMLAttributes } from "react";
import { RequiredSymbol, ClearButton, ErrorText } from "@/components/shared";
import { useFormContext } from "react-hook-form";
import { Textarea } from "@/components/ui";
interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export const FormTextarea = (props: Props) => {
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
        <Textarea
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
