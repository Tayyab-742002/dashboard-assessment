import type { HTMLAttributes } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}
