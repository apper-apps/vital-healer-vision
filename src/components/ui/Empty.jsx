import React from "react";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No data available",
  description = "There's nothing to display right now.",
  action,
  actionLabel = "Get Started",
  icon = "Package",
  className = ""
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 text-center ${className}`}>
      <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center mb-6">
        <ApperIcon name={icon} className="w-10 h-10 text-primary" />
      </div>
      <h3 className="text-xl font-semibold text-neutral-800 mb-2">
        {title}
      </h3>
      <p className="text-neutral-600 mb-8 max-w-md">
        {description}
      </p>
      {action && (
        <button
          onClick={action}
          className="btn-primary inline-flex items-center gap-2"
        >
          <ApperIcon name="Plus" className="w-4 h-4" />
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default Empty;