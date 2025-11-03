import { Loader2 } from "lucide-react";
import { cn } from "../../../utils/cn";
import { memo } from "react";
import type { SpinnerProps } from "./Spinner.types";

const Spinner = ({ size = "md", className, label }: SpinnerProps) => {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-12 h-12",
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <Loader2
        className={cn("animate-spin text-primary-600", sizes[size], className)}
      />
      {label && <span className="text-sm text-gray-600">{label}</span>}
    </div>
  );
};

export default memo(Spinner);
