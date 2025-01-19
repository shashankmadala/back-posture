import React from "react"

export const Alert = React.forwardRef(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={`relative w-full rounded-lg border p-4 ${
      variant === "destructive" 
        ? "border-red-500/50 text-red-500" 
        : "border-gray-200 text-gray-700"
    }`}
    {...props}
  />
))
Alert.displayName = "Alert"

export const AlertDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className="text-sm [&_p]:leading-relaxed"
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"