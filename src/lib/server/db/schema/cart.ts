import { pgTable, text, integer, primaryKey } from 'drizzle-orm/pg-core';
import { nanoid } from 'nanoid';
import { timestamps } from './utils';
import { user } from './user';
import { productTable } from './product';
import { relations } from 'drizzle-orm';

export const cartTable = pgTable('cart', {
	id: text()
		.primaryKey()
		.$default(() => nanoid(12)),
	userId: text()
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	...timestamps
});

export const cartItemTable = pgTable(
	'cart_item',
	{
		cartId: text()
			.notNull()
			.references(() => cartTable.id, { onDelete: 'cascade' }),
		productId: text()
			.notNull()
			.references(() => productTable.id, { onDelete: 'cascade' }),
		quantity: integer().notNull().default(1),
		priceAtTimeOfAddition: integer().notNull(),
		...timestamps
	},
	(cart_item) => [
		primaryKey({ columns: [cart_item.cartId, cart_item.productId] })
	]
);

export const cartRelations = relations(cartTable, ({ many, one }) => ({
	user: one(user, {
		fields: [cartTable.userId],
		references: [user.id]
	}),
	cartItems: many(cartItemTable)
}));

export const cartItemRelations = relations(cartItemTable, ({ one }) => ({
	cart: one(cartTable, {
		fields: [cartItemTable.cartId],
		references: [cartTable.id]
	}),
	product: one(productTable, {
		fields: [cartItemTable.productId],
		references: [productTable.id]
	})
}));
