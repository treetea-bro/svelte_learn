import { pipe, Schema } from 'effect';

export const categorySchema = Schema.Struct({
	name: pipe(Schema.String, Schema.minLength(1)),
	description: Schema.String,
	subcategories: pipe(Schema.Array(Schema.String), Schema.minItems(1))
});
