import { cn } from "../../../utils/cn";
import type { InputProps } from "./Input.types";

// React 19: ref is now a regular prop, no forwardRef needed
const Input = ({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className,
  id,
  ref = undefined,
  ...props
}: InputProps) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={cn("flex flex-col gap-1.5", fullWidth && "w-full")}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {leftIcon}
          </div>
        )}

        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full px-3 py-2 border rounded-lg transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent",
            "disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed",
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 hover:border-gray-400",
            leftIcon && "pl-10",
            rightIcon && "pr-10",
            className
          )}
          {...props}
        />

        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            {rightIcon}
          </div>
        )}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {helperText && !error && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

export default Input;
