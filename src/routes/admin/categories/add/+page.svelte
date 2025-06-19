<script lang="ts">
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Form from '$lib/components/ui/form/index';
	import Input from '$lib/components/ui/input/input.svelte';
	import { categorySchema } from '$lib/schemas/category.js';
	import { Loader2, X } from '@lucide/svelte';
	import { superForm } from 'sveltekit-superforms';
	import { effectClient } from 'sveltekit-superforms/adapters';

	let { data } = $props();
	const form = superForm(data.form, {
		validators: effectClient(categorySchema)
	});
	const { form: formData, enhance, delayed, errors } = form;

	let subCategoryInput = $state('');

	function handleSubcategoryInput(e: Event) {
		const input = e.target as HTMLInputElement;
		const value = input.value;

		if (value.endsWith(' ')) {
			const trimmedWord = value.trim();
			if (trimmedWord && !$formData.subcategories.includes(trimmedWord)) {
				$formData.subcategories = [...$formData.subcategories, trimmedWord];
				subCategoryInput = '';
			}
		}
	}

	function removeSubcategory(index: number) {
		$formData.subcategories = $formData.subcategories.filter(
			(_, i) => i !== index
		);
	}
</script>

<div class="space-y-4 p-8 pt-6">
	<div class="flex items-center justify-between space-y-2">
		<h2 class="text-3xl font-bold tracking-tight capitalize">
			Add New Category
		</h2>
	</div>

	<form method="POST" use:enhance>
		<Card.Root>
			<Card.Header>
				<Card.Title>Category Information</Card.Title>
			</Card.Header>
			<Card.Content class="space-y-4">
				<Form.Field {form} name="name">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Category Name</Form.Label>
							<Input {...props} bind:value={$formData.name} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field {form} name="description">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Category Description</Form.Label>
							<Input {...props} bind:value={$formData.description} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field {form} name="subcategories">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Sub Categories</Form.Label>
							{#if $formData.subcategories.length > 0}
								<div class="mb-2 flex flex-wrap gap-2">
									{#each $formData.subcategories as subCategory, index (subCategory)}
										<Badge
											>{subCategory}<Button
												class="ml-1.5 hover:text-red-500"
												onclick={() => removeSubcategory(index)}
												><X class="size-3" /></Button
											></Badge
										>
									{/each}
								</div>
							{/if}
							<Input
								{...props}
								bind:value={subCategoryInput}
								oninput={handleSubcategoryInput}
								placeholder="type subcategory and press space to add"
							/>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Button
					>{#if $delayed}
						<Loader2 class="size-6 animate-spin" />
					{/if}Add Category</Form.Button
				>
			</Card.Content>
		</Card.Root>
	</form>
</div>
