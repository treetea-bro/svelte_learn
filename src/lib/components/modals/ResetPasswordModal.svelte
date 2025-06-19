<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Form from '$lib/components/ui/form/index';
	import { effect } from 'sveltekit-superforms/adapters';
	import { defaults, superForm } from 'sveltekit-superforms';
	import Input from '../ui/input/input.svelte';
	import { Loader2 } from '@lucide/svelte';
	import { requestPasswordResetModalState } from '$lib/states/modalState.svelte';
	import { requestPasswordResetSchema } from '$lib/schemas/password-reset';

	const form = superForm(defaults(effect(requestPasswordResetSchema)), {
		validators: effect(requestPasswordResetSchema),
		SPA: true
	});
	const { form: formData, enhance, delayed, errors } = form;
</script>

<Dialog.Root bind:open={requestPasswordResetModalState.value}>
	<Dialog.Content class="w-full p-5">
		<Dialog.Header class="mt-10">
			<Dialog.Title>Request to reset your password</Dialog.Title>
		</Dialog.Header>
		<form>
			<Form.Field {form} name="email">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Email</Form.Label>
						<Input {...props} bind:value={$formData.email} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Button class="mt-2 w-full">
				{#if $delayed}
					<Loader2 class="size-6 animate-spin" />
				{:else}
					Login
				{/if}
			</Form.Button>
		</form>
	</Dialog.Content>
</Dialog.Root>
