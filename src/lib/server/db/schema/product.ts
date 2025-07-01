import { pgTable, text, integer, index } from 'drizzle-orm/pg-core';
import { nanoid } from 'nanoid';
import { timestamps, array } from './utils';
import { user } from './user';
import { orderProductTable } from './order';
import { relations } from 'drizzle-orm';

export const categoryTable = pgTable('category', {
	id: text()
		.primaryKey()
		.$default(() => nanoid(12)),
	name: text().notNull(),
	description: text(),
	subCategories: array<string>('subCategories').notNull(),
	...timestamps
});

export const productTable = pgTable(
	'product',
	{
		id: text()
			.primaryKey()
			.$default(() => nanoid(12)),
		name: text().notNull(),
		description: text().notNull(),
		categoryId: text()
			.notNull()
			.references(() => categoryTable.id, { onDelete: 'cascade' }),
		subCategory: text().notNull(),
		price: integer().notNull(),
		stock: integer().notNull(),
		images: array<{ fileUrl: string; key: string }>('images').notNull(),
		slug: text().unique().notNull(),
		sku: text().$default(() => `SKU-${nanoid(12)}`),
		adminId: text()
			.references(() => user.id)
			.notNull(),
		...timestamps
	},
	(product) => [index().on(product.name), index().on(product.description)]
);

export const productRelations = relations(productTable, ({ many, one }) => ({
	orderProducts: many(orderProductTable),
	category: one(categoryTable, {
		fields: [productTable.categoryId],
		references: [categoryTable.id]
	})
}));

export const categoryRelations = relations(categoryTable, ({ many }) => ({
	products: many(productTable)
}));
