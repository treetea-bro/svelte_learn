export const load = async ({ locals: { db } }) => {
	const z = await db.query.user.findMany();
};
