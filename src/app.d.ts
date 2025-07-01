// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';

type Schema = typeof import('./lib/server/db/schema');
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			db: NodePgDatabase<Schema>;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
