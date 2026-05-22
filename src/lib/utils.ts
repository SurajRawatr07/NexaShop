import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatNumber(num: number): string {
  if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
  return num.toString();
}

export function getDiscountedPrice(original: number, discount: number): number {
  return Math.round(original * (1 - discount / 100));
}

export function generateStars(rating: number): string {
  return "★".repeat(Math.floor(rating)) + (rating % 1 >= 0.5 ? "½" : "");
}

export function truncate(text: string, length: number): string {
  return text.length > length ? text.slice(0, length) + "..." : text;
}

export function debounce<T extends (...args: unknown[]) => unknown>(fn: T, delay: number) {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

export function getTimeLeft(targetDate: Date): { hours: number; minutes: number; seconds: number } {
  const now = new Date().getTime();
  const distance = targetDate.getTime() - now;
  if (distance < 0) return { hours: 0, minutes: 0, seconds: 0 };
  return {
    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((distance % (1000 * 60)) / 1000),
  };
}

export function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
