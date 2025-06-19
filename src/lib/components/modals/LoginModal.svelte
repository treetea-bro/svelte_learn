<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Form from '$lib/components/ui/form/index';
	import { effect } from 'sveltekit-superforms/adapters';
	import { defaults, superForm } from 'sveltekit-superforms';
	import { loginSchema } from '$lib/schemas/login';
	import Input from '../ui/input/input.svelte';
	import { Loader2 } from '@lucide/svelte';
	import {
		loginModalState,
		requestPasswordResetModalState
	} from '$lib/states/modalState.svelte';

	const form = superForm(defaults(effect(loginSchema)), {
		validators: effect(loginSchema),
		SPA: true
	});
	const { form: formData, enhance, delayed, errors } = form;
</script>

<Dialog.Root bind:open={loginModalState.value}>
	<Dialog.Content class="w-full p-5">
		<Dialog.Header class="mt-10">
			<Dialog.Title>Login to your account</Dialog.Title>
			<Dialog.Description
				>Enter your email land password to login, click login when your ready</Dialog.Description
			>
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

			<Form.Field {form} name="password">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Password</Form.Label>
						<Input {...props} bind:value={$formData.password} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<button
				onclick={() => {
					loginModalState.setFalse();
					requestPasswordResetModalState.setTrue();
				}}
				class="text-primary text-sm"
			>
				forgot your password?
			</button>
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
