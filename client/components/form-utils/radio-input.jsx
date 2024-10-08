"use client";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const RadioInput = ({
  control,
  name,
  label,
  description,
  choices,
  disabled,
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-row space-x-1"
            >
              {choices.map((choice) => (
                <FormItem
                  key={choice.value}
                  className="mt-1 flex items-center space-x-3 space-y-0"
                >
                  <FormControl>
                    <RadioGroupItem value={choice.value} disabled={disabled} />
                  </FormControl>
                  <FormLabel className="font-normal">{choice.label}</FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>

          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default RadioInput;
