export const load = async ({ locals: { db } }) => {
	const currentDate = new Date();
	const thirtyDaysAgo = new Date(
		currentDate.getTime() - 30 * 24 * 60 * 60 * 1000
	);
	const sixtyDaysAgo = new Date(
		currentDate.getTime() - 60 * 24 * 60 * 60 * 1000
	);

	const batch = await db.batch([
		db.query.orderTable.findMany({
			with: {
				orderProducts: {
					with: {
						product: true
					}
				},
				user: true
			},
			limit: 3,
			orderBy: (t, { desc }) => desc(t.createdAt)
		}),
		db.query.user.findMany({
			where: (t, { gt }) => gt(t.createdAt, thirtyDaysAgo)
		}),
		db.query.user.findMany({
			where: (t, { and, gt, lt }) =>
				and(gt(t.createdAt, sixtyDaysAgo), lt(t.createdAt, thirtyDaysAgo))
		}),
		db.query.orderTable.findMany({
			where: (t, { gt }) => gt(t.createdAt, thirtyDaysAgo)
		}),
		db.query.orderTable.findMany({
			where: (t, { and, gt, lt }) =>
				and(gt(t.createdAt, sixtyDaysAgo), lt(t.createdAt, thirtyDaysAgo))
		})
	]);

	const [
		recentOrders,
		thisMonthUsers,
		lastMonthUsers,
		thisMonthOrders,
		lastMonthOrders
	] = batch;

	const thisMonthRevenue = thisMonthOrders.reduce(
		(total, item) => total + item.amount,
		0
	);
	const lastMonthRevenue = lastMonthOrders.reduce(
		(total, item) => total + item.amount,
		0
	);

	const userGrowthPercentage =
		lastMonthUsers.length === 0
			? 100
			: ((thisMonthUsers.length - lastMonthUsers.length) /
					lastMonthUsers.length) *
				100;

	const revenueGrowthPercentage =
		lastMonthRevenue === 0
			? 100
			: ((thisMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100;

	return {
		order: recentOrders,
		totalRevenue: thisMonthRevenue,
		newCustomers: thisMonthUsers.length,
		userGrowth: userGrowthPercentage.toFixed(1),
		revenueGrowth: revenueGrowthPercentage.toFixed(1)
	};
};
