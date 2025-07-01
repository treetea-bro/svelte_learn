import { nanoid } from 'nanoid';
import { ROLE } from '../../../constant';
import { pgTable, text, timestamp, boolean } from 'drizzle-orm/pg-core';
import { timestamps } from './utils';
import { cartTable } from './cart';
import { orderTable } from './order';
import { relations } from 'drizzle-orm';

export const user = pgTable('user', {
	id: text().primaryKey(),
	name: text().notNull(),
	email: text().notNull().unique(),
	emailVerified: boolean()
		.$defaultFn(() => false)
		.notNull(),
	image: text(),
	createdAt: timestamp()
		.$defaultFn(() => /* @__PURE__ */ new Date())
		.notNull(),
	updatedAt: timestamp()
		.$defaultFn(() => /* @__PURE__ */ new Date())
		.notNull(),
	role: text({ enum: ROLE }).default('user'),
	banned: boolean(),
	banReason: text(),
	banExpires: timestamp()
});

export const session = pgTable('session', {
	id: text().primaryKey(),
	expiresAt: timestamp().notNull(),
	token: text().notNull().unique(),
	createdAt: timestamp().notNull(),
	updatedAt: timestamp().notNull(),
	ipAddress: text(),
	userAgent: text(),
	userId: text()
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	impersonatedBy: text()
});

export const account = pgTable('account', {
	id: text().primaryKey(),
	accountId: text().notNull(),
	providerId: text().notNull(),
	userId: text()
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	accessToken: text(),
	refreshToken: text(),
	idToken: text(),
	accessTokenExpiresAt: timestamp(),
	refreshTokenExpiresAt: timestamp(),
	scope: text(),
	password: text(),
	createdAt: timestamp().notNull(),
	updatedAt: timestamp().notNull()
});

export const verification = pgTable('verification', {
	id: text().primaryKey(),
	identifier: text().notNull(),
	value: text().notNull(),
	expiresAt: timestamp().notNull(),
	createdAt: timestamp().$defaultFn(() => /* @__PURE__ */ new Date()),
	updatedAt: timestamp().$defaultFn(() => /* @__PURE__ */ new Date())
});

export const addressTable = pgTable('address', {
	id: text()
		.primaryKey()
		.$default(() => nanoid(12)),
	label: text().notNull(),
	address: text().notNull(),
	state: text(),
	country: text().notNull(),
	isDefaultShipping: boolean().notNull(),
	isDefaultBilling: boolean().notNull(),
	userId: text()
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	...timestamps
});

export const userRelation = relations(user, ({ many, one }) => ({
	addresses: many(addressTable),
	cart: one(cartTable),
	orders: many(orderTable)
}));

export const addressRelations = relations(addressTable, ({ one }) => ({
	user: one(user, {
		fields: [addressTable.userId],
		references: [user.id]
	})
}));
