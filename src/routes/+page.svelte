<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { schema } from '$lib/schemas/schema.js';
	import { superForm } from 'sveltekit-superforms';
	import SuperDebug from 'sveltekit-superforms';
	import { effectClient } from 'sveltekit-superforms/adapters';

	let { data } = $props();

	const { form, message, errors, enhance } = superForm(data.form, {
		validators: effectClient(schema)
	});
</script>

{#if $message}
	<h3>{$message}</h3>
{/if}

<form method="POST" use:enhance>
	<div>
		<label for="name">Name</label>
		<input
			type="text"
			name="name"
			aria-invalid={$errors.name ? 'true' : undefined}
			bind:value={$form.name}
		/>
		{#if $errors.name}<span class="invalid">{$errors.name}</span>{/if}
	</div>

	<div>
		<label for="email">E-mail</label>
		<input
			type="email"
			name="email"
			aria-invalid={$errors.email ? 'true' : undefined}
			bind:value={$form.email}
		/>
		{#if $errors.email}<span class="invalid">{$errors.email}</span>{/if}
	</div>
	<div><Button type="submit">Submit</Button></div>
</form>

<SuperDebug data={$form} />

<style>
	input {
		border: solid;
	}
	.invalid {
		color: red;
	}
</style>
