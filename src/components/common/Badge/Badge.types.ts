export type BadgeVariant =
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "default";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}
