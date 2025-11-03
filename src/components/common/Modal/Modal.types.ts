import type { HTMLAttributes } from "react";

export type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

export interface ModalProps extends Omit<HTMLAttributes<HTMLDivElement>, "onClose"> {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: ModalSize;
}

