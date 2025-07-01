import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { svelteKitHandler } from 'better-auth/svelte-kit';
import { db } from '$lib/server/db';
import { auth } from '$lib/auth';

const protectedUserRoutes = ['/me', '/checkout'];
const handleAuth: Handle = async ({ event, resolve }) => {
	const { url, request } = event;
	const session = await auth.api.getSession({
		headers: request.headers
	});

	console.log('session', session);
	// if (url.pathname.startsWith('/admin') && session?.user.role !== 'admin') {
	// 	redirect(303, '/');
	// }

	const isProtectedUserRoute = protectedUserRoutes.some((route) =>
		url.pathname.startsWith(route)
	);
	if (isProtectedUserRoute && !session) {
		redirect(303, '/');
	}

	return svelteKitHandler({ event, resolve, auth });
};

export const handleDb: Handle = async ({ event, resolve }) => {
	event.locals.db = db;

	return resolve(event);
};

const preloadFonts: Handle = async ({ event, resolve }) => {
	const response = await resolve(event, {
		preload: ({ type }) => type === 'font'
	});

	return response;
};

export const handle = sequence(preloadFonts, handleDb, handleAuth);
