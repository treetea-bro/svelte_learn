import { categorySchema } from '$lib/schemas/category';
import { superValidate } from 'sveltekit-superforms';
import { effect } from 'sveltekit-superforms/adapters';

export const load = async () => {
	return { form: await superValidate(effect(categorySchema)) };
};
