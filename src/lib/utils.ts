import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, "child"> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, "children"> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };

// Custom utility
export function toGBNumber(bytes: number, floatingPoint = 2): number {
	return parseFloat((bytes / 1024 ** 3).toFixed(floatingPoint));
}
export  function toGB(bytes: number): string {
	return (bytes / 1024 ** 3).toFixed(2) + " GB";
}

export function toMode(isReadOnly: boolean): string {
	return isReadOnly ? "Read Only" : "Read & Write";
}

export function toDetatchable(isRemovable: boolean): string {
	return isRemovable ? "Portable" : "Systems Drive";
}
