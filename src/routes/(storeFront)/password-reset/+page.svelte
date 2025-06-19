<script lang="ts">
	import * as Form from '$lib/components/ui/form/index';
	import { effect } from 'sveltekit-superforms/adapters';
	import { defaults, superForm } from 'sveltekit-superforms';
	import { Loader2 } from '@lucide/svelte';
	import { resetPasswordSchema } from '$lib/schemas/password-reset';
	import * as Card from '$lib/components/ui/card';
	import Input from '$lib/components/ui/input/input.svelte';

	const form = superForm(defaults(effect(resetPasswordSchema)), {
		validators: effect(resetPasswordSchema),
		SPA: true
	});
	const { form: formData, enhance, delayed, errors } = form;
</script>

<div class="mt-5 grid h-[70vh] w-full place-items-center">
	<Card.Root>
		<Card.Header>
			<Card.Title>Reset your password</Card.Title>
		</Card.Header>
		<Card.Content>
			<form class="space-y-4">
				<Form.Field {form} name="password">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Password</Form.Label>
							<Input {...props} bind:value={$formData.password} />
						{/snippet}
					</Form.Control>
				</Form.Field>

				<Form.Field {form} name="confirmPassword">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Confirm Password</Form.Label>
							<Input {...props} bind:value={$formData.confirmPassword} />
						{/snippet}
					</Form.Control>
				</Form.Field>

				<Form.Button class="mt-2 w-full">
					{#if $delayed}
						<Loader2 class="size-6 animate-spin" />
					{:else}
						Submit
					{/if}
				</Form.Button>
			</form>
		</Card.Content>
	</Card.Root>
</div>
