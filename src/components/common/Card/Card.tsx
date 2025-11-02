import { cn } from "../../../utils/cn";
import type {
  CardProps,
  CardHeaderProps,
  CardContentProps,
  CardFooterProps,
} from "./Card.types";

const Card = ({
  children,
  hover = false,
  padding = "md",
  className,
  ...props
}: CardProps) => {
  const paddingStyles = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <div
      className={cn(
        "bg-white rounded-lg shadow-sm border border-gray-200",
        hover && "transition-shadow hover:shadow-md",
        paddingStyles[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const CardHeader = ({
  title,
  subtitle,
  action,
  children,
  className,
  ...props
}: CardHeaderProps) => {
  return (
    <div
      className={cn("flex items-start justify-between mb-4", className)}
      {...props}
    >
      <div className="flex-1">
        {title && (
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        )}
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        {children}
      </div>
      {action && <div className="ml-4">{action}</div>}
    </div>
  );
};

const CardContent = ({ children, className, ...props }: CardContentProps) => {
  return (
    <div className={cn("", className)} {...props}>
      {children}
    </div>
  );
};

const CardFooter = ({ children, className, ...props }: CardFooterProps) => {
  return (
    <div
      className={cn("mt-4 pt-4 border-t border-gray-200", className)}
      {...props}
    >
      {children}
    </div>
  );
};

// Compound component pattern
Card.Header = CardHeader;
Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card;
