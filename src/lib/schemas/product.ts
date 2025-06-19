import { JSONSchema, pipe, Schema } from 'effect';

const FileWithMaxSize = Schema.filter((file) => file.size < 100_000, {
	message: () => 'Max 100 kB upload size exceeded.'
});

const q = Schema.instanceOf(File);
const a = Schema.Struct({
	name: pipe(Schema.String, Schema.minLength(1)),
	description: pipe(Schema.String, Schema.minLength(3)),
	category: pipe(Schema.Number, Schema.positive()),
	subCategory: pipe(Schema.String, Schema.minLength(1)),
	price: pipe(Schema.Number, Schema.positive()),
	stock: pipe(Schema.Number, Schema.nonNegative()),
	images: q.annotations({
		jsonSchema: {
			type: 'object',
			required: []
		}
	})
});

export const productSchema = pipe(a);
