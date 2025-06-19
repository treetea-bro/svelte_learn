import { pipe, Schema as S } from 'effect';

const EmailSchema = S.String.pipe(S.pattern(/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/));
// const EmailSchema = Schema.String.pipe(
// 	Schema.pattern(
// 		/^(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:\\[\x00-\x7F]|[^\x00-\x08\x0A-\x1F\x7F"])*")@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/
// 	)
// );

export const requestPasswordResetSchema = S.Struct({
	email: EmailSchema
});

export const resetPasswordSchema = pipe(
	S.Struct({
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
