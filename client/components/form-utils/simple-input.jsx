"use client";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const SimpleInput = ({
  control,
  name,
  label,
  placeholder,
  description,
  type,
  disabled,
  style,
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className={style && style}>
              <FormLabel>{label}</FormLabel>
              <Input
                type={type && type}
                placeholder={placeholder}
                className="w-full"
                {...field}
                disabled={disabled}
              />
              {description && <FormDescription>{description}</FormDescription>}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SimpleInput;
