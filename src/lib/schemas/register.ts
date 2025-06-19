import { pipe, Schema as S } from 'effect';

const EmailSchema = S.String.pipe(S.pattern(/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/));

export const registerSchema = pipe(
	S.Struct({
		email: EmailSchema,
		name: pipe(S.String, S.minLength(3), S.maxLength(20)),
		password: pipe(S.String, S.minLength(8), S.maxLength(200)),
		confirmPassword: pipe(S.String, S.minLength(8), S.maxLength(200))
	}),
	S.filter((data) => {
		if (data.password !== data.confirmPassword) {
			return {
				path: ['confirmPassword'],
				message: 'password do not match'
			};
		}
		return true;
	}),
	S.annotations({
		jsonSchema: {
			type: 'object',
			required: ['email', 'name', 'password', 'confirmPassword']
		}
	})
);
