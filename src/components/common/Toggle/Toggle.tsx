import { cn } from "../../../utils/cn";
import type { ToggleProps } from "./Toggle.types";

const Toggle = ({
  checked,
  onChange,
  label,
  description,
  disabled,
}: ToggleProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex-1">
        {label && (
          <label className="text-sm font-medium text-gray-900 cursor-pointer">
            {label}
          </label>
        )}
        {description && (
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        )}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
          checked ? "bg-primary-600" : "bg-gray-200",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        <span
          className={cn(
            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
            checked ? "translate-x-5" : "translate-x-0"
          )}
        />
      </button>
    </div>
  );
};

export default Toggle;
