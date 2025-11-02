import { format } from "date-fns";
import { DATE_FORMAT, DATETIME_FORMAT } from "./constants";

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat("en-US").format(num);
};

export const formatDate = (date: string | Date): string => {
  return format(new Date(date), DATE_FORMAT);
};

export const formatDateTime = (date: string | Date): string => {
  return format(new Date(date), DATETIME_FORMAT);
};

export const formatPercentage = (
  value: number,
  decimals: number = 1
): string => {
  return `${value.toFixed(decimals)}%`;
};
