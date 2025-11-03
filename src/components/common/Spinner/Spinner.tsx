import { Loader2 } from "lucide-react";
import { cn } from "../../../utils/cn";
import type { SpinnerProps } from "./Spinner.types";
import logo from "../../../assets/images/logo.png";
const Spinner = ({ className, label }: SpinnerProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <img src={logo} alt="logo" className="w-10 h-10 animate-pulse" />
      <div className="flex flex-row items-center justify-center gap-2">
        <Loader2 className={cn("animate-spin text-primary", className)} />
        {label && (
          <span className="text-sm text-muted-foreground">{label}</span>
        )}
      </div>
    </div>
  );
};

export default Spinner;
