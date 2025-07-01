import { STATUS } from '../../../constant';
import { relations } from 'drizzle-orm';
import { pgTable, text, integer, primaryKey } from 'drizzle-orm/pg-core';
import { nanoid } from 'nanoid';
import { timestamps } from './utils';
import { addressTable, user } from './user';
import { productTable } from './product';

export const orderTable = pgTable('order', {
	id: text()
		.primaryKey()
		.$default(() => nanoid(12)),
	userId: text()
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	status: text('status', { enum: STATUS }).notNull(),
	amount: integer().notNull(),
	addressId: text()
		.references(() => addressTable.id)
		.notNull(),
	code: text()
		.notNull()
		.$default(() => nanoid(12)),
	...timestamps
});

// Order to Product junction table
export const orderProductTable = pgTable(
	'order_product',
	{
		orderId: text()
			.notNull()
			.references(() => orderTable.id, { onDelete: 'cascade' }),
		productId: text()
			.notNull()
			.references(() => productTable.id, { onDelete: 'cascade' }),
		quantity: integer().notNull().default(1),
		// Optional: Add any additional fields specific to this order-product relationship
		...timestamps
	},
	(order_product) => [
		primaryKey({ columns: [order_product.orderId, order_product.productId] })
	]
);

// Relationships
export const orderRelations = relations(orderTable, ({ many, one }) => ({
	user: one(user, {
		fields: [orderTable.userId],
		references: [user.id]
	}),
	orderProducts: many(orderProductTable)
}));

export const orderProductRelations = relations(
	orderProductTable,
	({ one }) => ({
		order: one(orderTable, {
			fields: [orderProductTable.orderId],
			references: [orderTable.id]
		}),
		product: one(productTable, {
			fields: [orderProductTable.productId],
			references: [productTable.id]
		})
	})
);
