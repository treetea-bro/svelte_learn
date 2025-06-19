import { pipe, Schema as S } from 'effect';

const EmailSchema = S.String.pipe(S.pattern(/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/));
// const EmailSchema = Schema.String.pipe(
// 	Schema.pattern(
// 		/^(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:\\[\x00-\x7F]|[^\x00-\x08\x0A-\x1F\x7F"])*")@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/
// 	)
// );

export const loginSchema = S.Struct({
	email: EmailSchema,
	password: pipe(S.String, S.minLength(8), S.maxLength(100))
});
