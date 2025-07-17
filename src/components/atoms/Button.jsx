import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Button = forwardRef(({ 
  children, 
  variant = "primary", 
  size = "md", 
  loading = false,
  icon,
  iconPosition = "left",
  className,
  disabled,
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary to-secondary text-white hover:scale-105 hover:shadow-lg active:scale-95 focus:ring-primary/50",
    secondary: "bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white hover:scale-105 focus:ring-primary/50",
    outline: "border border-neutral-300 text-neutral-700 hover:bg-neutral-50 hover:border-neutral-400 focus:ring-neutral/50",
    ghost: "text-neutral-700 hover:bg-neutral-100 focus:ring-neutral/50",
    accent: "bg-gradient-to-r from-accent to-green-500 text-white hover:scale-105 hover:shadow-lg active:scale-95 focus:ring-accent/50"
  };

  const sizes = {
    sm: "px-3 py-2 text-sm rounded-md gap-1.5",
    md: "px-6 py-3 text-base rounded-lg gap-2",
    lg: "px-8 py-4 text-lg rounded-xl gap-2.5"
  };

  const isDisabled = disabled || loading;

  return (
    <button
      ref={ref}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        isDisabled && "cursor-not-allowed opacity-50",
        className
      )}
      disabled={isDisabled}
      {...props}
    >
      {loading ? (
        <ApperIcon name="Loader2" className="w-4 h-4 animate-spin" />
      ) : (
        icon && iconPosition === "left" && <ApperIcon name={icon} className="w-4 h-4" />
      )}
      {children}
      {!loading && icon && iconPosition === "right" && <ApperIcon name={icon} className="w-4 h-4" />}
    </button>
  );
});

Button.displayName = "Button";

export default Button;