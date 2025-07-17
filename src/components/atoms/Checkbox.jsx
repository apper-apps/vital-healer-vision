import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Checkbox = forwardRef(({ 
  label,
  description,
  error,
  className,
  checked,
  ...props 
}, ref) => {
  return (
    <div className="space-y-2">
      <div className="flex items-start space-x-3">
        <div className="relative flex items-center">
          <input
            ref={ref}
            type="checkbox"
            checked={checked}
            className={cn(
              "w-5 h-5 border-2 border-neutral-300 rounded focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors appearance-none",
              checked && "bg-primary border-primary",
              error && "border-red-500 focus:border-red-500 focus:ring-red-500/50",
              className
            )}
            {...props}
          />
          {checked && (
            <ApperIcon 
              name="Check" 
              className="absolute inset-0 w-3 h-3 text-white m-auto pointer-events-none" 
            />
          )}
        </div>
        <div className="flex-1">
          {label && (
            <label className="block text-sm font-medium text-neutral-700 cursor-pointer">
              {label}
            </label>
          )}
          {description && (
            <p className="text-sm text-neutral-500 mt-1">{description}</p>
          )}
        </div>
      </div>
      {error && (
        <p className="text-sm text-red-600 ml-8">{error}</p>
      )}
    </div>
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;