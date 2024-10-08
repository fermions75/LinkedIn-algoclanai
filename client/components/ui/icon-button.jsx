"use client";
import { forwardRef } from "react";
import { Button } from "./button";

const IconButton = forwardRef(
  ({ icon: Icon, children, size = "sm", className = "", ...props }, ref) => {
    // The ref is received here
    return (
      <Button
        ref={ref} // Forward the ref to your Button component
        size={size}
        className={`h-8 gap-1 ${className}`}
        {...props}
      >
        {Icon && Icon}
        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
          {children}
        </span>
      </Button>
    );
  }
);

export default IconButton;
