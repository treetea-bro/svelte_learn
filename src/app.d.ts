// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';

type Schema = typeof import('./lib/server/db/schema');
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			db: BetterSQLite3Database<Schema>;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
