import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, "child"> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any }
  ? Omit<T, "children">
  : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & {
  ref?: U | null;
};

// Custom utility
export function toGBNumber(bytes: number, floatingPoint = 2): number {
  return parseFloat((bytes / 1024 ** 3).toFixed(floatingPoint));
}
export function toGB(bytes: number): string {
  return (bytes / 1024 ** 3).toFixed(2) + " GB";
}

export function toMode(isReadOnly: boolean): string {
  return isReadOnly ? "Read Only" : "Read & Write";
}

export function toDetatchable(isRemovable: boolean): string {
  return isRemovable ? "Portable" : "Systems Drive";
}
export function snakeToCamelCase(str: string): string {
  return str.replace(/([-_][a-z])/g, (group) =>
    group.toUpperCase().replace("-", "").replace("_", "")
  );
}
export function toPercentage(used: number, total: number): number {
  return (used / total) * 100;
}

/**
 * Converts a Date object to a string in the format "YYYY-MM-DD".
 *
 * @param date - The Date object to convert.
 * @returns A string representing the date in "YYYY-MM-DD" format.
 */
export function toYyyyMmDd(date: Date): string {
  return date.toLocaleDateString("en-CA");
}

export function convertObjectKeysToCamelCase<T>(obj: T): T {
  if (typeof obj !== "object" || obj === null) {
    return obj; // Return non-objects and null directly
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => convertObjectKeysToCamelCase(item)) as T; // Recursively convert array elements
  }

  const newObj: { [key: string]: any } = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const camelKey = snakeToCamelCase(key);
      newObj[camelKey] = convertObjectKeysToCamelCase((obj as any)[key]); // Recursively convert nested objects
    }
  }
  return newObj as T;
}
