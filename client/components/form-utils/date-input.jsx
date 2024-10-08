"use client";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";

const DateInput = ({
  control,
  name,
  label,
  description,
  disabled,
  from,
  to,
}) => {
  const caDisabled = (date, field) => {
    if (from) {
      // Disable dates before today
      return date < new Date().setHours(0, 0, 0, 0);
    } else if (to) {
      // Disable dates before today and after selected date
      return date < new Date() || (field.value && date < field.value);
    } else {
      // No specific disabling behavior
      return false;
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="my-2 pt-2 flex flex-col">
          <FormLabel>{label}</FormLabel>
          <Popover disabled>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  disabled={disabled}
                  variant={"outline"}
                  className={cn(
                    "w-full pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) => caDisabled(date, field)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {description && <FormDescription>{description}</FormDescription>}
        </FormItem>
      )}
    />
  );
};

export default DateInput;
