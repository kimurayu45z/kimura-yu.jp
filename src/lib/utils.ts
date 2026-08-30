import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Snippet } from 'svelte';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };
export type WithoutChildren<T> = T extends { children?: unknown } ? Omit<T, 'children'> : T;
export type WithoutChild<T> = T extends { child?: unknown } ? Omit<T, 'child'> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRefAndChild<
	T,
	U extends HTMLElement = HTMLElement
> = WithoutChildrenOrChild<T> & {
	ref?: U | null;
	child?: Snippet<[{ props: Record<string, unknown> }]>;
};
