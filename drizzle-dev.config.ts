import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	schema: './src/lib/server/db/schema',
	dialect: 'postgresql',
	// casing: 'snake_case',
	dbCredentials: {
		host: process.env.DB_HOST,
		port: Number(process.env.DB_PORT),
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		ssl: false
	},
	verbose: true,
	strict: true,
	out: './migrations'
});
