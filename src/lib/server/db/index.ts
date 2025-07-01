import { drizzle } from 'drizzle-orm/node-postgres';
import { env } from '$env/dynamic/private';
import * as schema from '$lib/server/db/schema';

export const db = drizzle({
	schema,
	connection: env.DB_URL
});
