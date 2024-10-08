"use client";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SelectInput = ({
  control,
  items,
  name,
  label,
  placeholder,
  description,
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <div>
                <FormLabel>{label}</FormLabel>
                <SelectTrigger>
                  <SelectValue
                    placeholder={placeholder ? placeholder : "Select option"}
                  />
                </SelectTrigger>
              </div>
            </FormControl>
            <SelectContent>
              {items.map((item, idx) => (
                <SelectItem key={idx} value={item.name}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SelectInput;
