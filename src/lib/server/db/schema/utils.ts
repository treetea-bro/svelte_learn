import { json, timestamp } from 'drizzle-orm/pg-core';

export const timestamps = {
	updatedAt: timestamp()
		.notNull()
		.$onUpdate(() => new Date()),
	createdAt: timestamp().defaultNow().notNull()
};

export function array<T>(name: string) {
	return json(name).$type<T[]>();
}
