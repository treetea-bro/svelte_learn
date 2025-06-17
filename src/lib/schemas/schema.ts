import { Schema } from 'effect';

const emailRegex = /^[^@]+@[^@]+.[^@]+$/;

export const schema = Schema.Struct({
	name: Schema.String.pipe(Schema.minLength(3)),
	email: Schema.String.pipe(
		Schema.filter((s) => emailRegex.test(s) || 'must be a valid email', {
			jsonSchema: { format: 'email' }
		})
	)
});

export const formSchema = Schema.Struct({
	username: Schema.String.pipe(Schema.minLength(3), Schema.maxLength(10))
});
