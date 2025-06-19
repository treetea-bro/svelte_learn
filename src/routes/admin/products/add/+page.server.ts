import { superValidate } from 'sveltekit-superforms';
import { message } from 'sveltekit-superforms';
import { fail } from '@sveltejs/kit';
import { productSchema } from '$lib/schemas/product.js';
import { effect, zod } from 'sveltekit-superforms/adapters';

export const load = async () => {
	return { form: await superValidate(effect(productSchema)) };
};

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, effect(productSchema));

		if (!form.valid) return fail(400, { form });

		const image = formData.get('images');
		// if (image instanceof File) {
		// }

		return message(form, 'Thank you for uploading an image!');
	}
};
