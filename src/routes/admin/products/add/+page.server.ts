import { superValidate } from 'sveltekit-superforms';
import { effect } from 'sveltekit-superforms/adapters';
import { message } from 'sveltekit-superforms';
import { fail } from '@sveltejs/kit';
import { productSchema } from '$lib/schemas/products.js';

export const load = async () => {
	return { form: await superValidate(effect(productSchema)) };
};

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, effect(productSchema));
		console.log(form);

		if (!form.valid) {
			return fail(400, { form });
		}

		// TODO: Do something with the validated form.data

		// Return the form with a status message
		return message(form, 'Form posted successfully!');
	}
};
