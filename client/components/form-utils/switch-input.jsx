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
import { Switch } from "@/components/ui/switch";

const SwitchInput = ({ control, name, description, label, disabled }) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {description && <FormDescription>{description}</FormDescription>}
          <FormControl>
            <div className="flex items-center space-x-2">
              <Switch
                disabled={disabled}
                checked={field.value}
                onCheckedChange={field.onChange}
                className=""
              />
              <FormLabel>{label ? label : "Active"}</FormLabel>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SwitchInput;
