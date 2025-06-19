<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Form from '$lib/components/ui/form/index';
	import { effect } from 'sveltekit-superforms/adapters';
	import { defaults, superForm } from 'sveltekit-superforms';
	import Input from '../ui/input/input.svelte';
	import Button from '../ui/button/button.svelte';
	import { Loader2 } from '@lucide/svelte';
	import { registerSchema } from '$lib/schemas/register';
	import { registerModalState } from '$lib/states/modalState.svelte';

	const form = superForm(defaults(effect(registerSchema)), {
		validators: effect(registerSchema),
		SPA: true
	});
	const { form: formData, enhance, delayed, errors } = form;
</script>

<Dialog.Root bind:open={registerModalState.value}>
	<Dialog.Content class="w-full p-5">
		<Dialog.Header class="mt-10">
			<Dialog.Title>Create an account</Dialog.Title>
		</Dialog.Header>
		<form>
			<Form.Field {form} name="name">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Name</Form.Label>
						<Input {...props} bind:value={$formData.name} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="email">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Email</Form.Label>
						<Input {...props} bind:value={$formData.email} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="password">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Password</Form.Label>
						<Input {...props} bind:value={$formData.password} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="confirmPassword">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Confirm Password</Form.Label>
						<Input {...props} bind:value={$formData.confirmPassword} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Button disabled={$delayed} class="mt-2 w-full">
				{#if $delayed}
					<Loader2 class="h-6 w-6 animate-spin " />
				{:else}
					Register
				{/if}
			</Form.Button>
		</form>
	</Dialog.Content>
</Dialog.Root>
