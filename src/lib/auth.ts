import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { admin } from 'better-auth/plugins';

// import type { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';

// export function createAuth(db: BetterSQLite3Database) {
// 	return betterAuth({
// 		database: drizzleAdapter(db, {
// 			provider: 'sqlite'
// 		}),
// 		emailAndPassword: {
// 			enabled: true,
// 			sendResetPassword: async ({ user, url, token }) => {
// 				console.log({ user, url, token });
// 			}
// 		},
// 		plugins: [admin()],
// 		user: {
// 			changeEmail: {
// 				enabled: true
// 			}
// 		}
// 	});
// }

import { db } from './server/db';

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: 'pg'
	}),
	emailAndPassword: {
		enabled: true,
		sendResetPassword: async ({ user, url, token }) => {
			console.log({ user, url, token });
		}
	},
	plugins: [admin()],
	user: {
		changeEmail: {
			enabled: true
		}
	}
});
