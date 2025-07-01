import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatCurrency(
	value: number,
	currencyCode?: string,
	locale?: string
) {
	try {
		// Note: if no `locale` is provided, the browser's default
		// locale will be used.
		return new Intl.NumberFormat(locale, {
			style: 'currency',
			currency: currencyCode || 'USD'
		}).format(value);
	} catch {
		// A fallback in case the NumberFormat fails for any reason
		return value.toFixed(2);
	}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, 'child'> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any }
	? Omit<T, 'children'>
	: T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & {
	ref?: U | null;
};
