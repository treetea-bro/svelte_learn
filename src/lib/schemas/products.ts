import { pipe, Schema } from 'effect';

const FileType = Schema.declare(
	(input: unknown): input is File => input instanceof File,
	{
		identifier: 'File',
		description: 'A browser File object',
		message: () => 'Please upload a valid file.'
	}
);

// 최대 크기를 확인하는 필터 적용
const FileWithMaxSize = pipe(
	FileType,
	Schema.filter((file) => file.size < 100_000, {
		message: () => 'Max 100 kB upload size exceeded.'
	})
);

// 제품 스키마 정의
export const productSchema = Schema.Struct({
	name: pipe(Schema.String, Schema.minLength(1)),
	description: pipe(Schema.String, Schema.minLength(3)),
	category: pipe(Schema.Number, Schema.positive()),
	subCategory: pipe(Schema.String, Schema.minLength(1)),
	price: pipe(Schema.Number, Schema.positive()),
	stock: pipe(Schema.Number, Schema.nonNegative()),
	images: Schema.Array(FileWithMaxSize).annotations({ jsonSchema: {} })
});
