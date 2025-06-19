<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Form from '$lib/components/ui/form/index';
	import Input from '$lib/components/ui/input/input.svelte';
	import { productSchema } from '$lib/schemas/product.js';
	import { Loader2 } from '@lucide/svelte';
	import { filesProxy, superForm } from 'sveltekit-superforms';
	import { effectClient, zodClient } from 'sveltekit-superforms/adapters';

	let { data } = $props();
	const form = superForm(data.form, {
		validators: effectClient(productSchema)
	});
	const { form: formData, enhance, delayed, errors } = form;
	const images = filesProxy(form, 'images');
	const previews = $derived(
		Array.from($images).map((file) => URL.createObjectURL(file))
	);
</script>

<div class="space-y-4 p-8 pt-6">
	<div class="flex items-center justify-between space-y-2">
		<h2 class="text-3xl font-bold tracking-tight capitalize">
			Add New Product
		</h2>
	</div>

	<form method="POST" enctype="multipart/form-data" use:enhance>
		<Card.Root>
			<Card.Header>
				<Card.Title>Product Information</Card.Title>
			</Card.Header>
			<Card.Content class="space-y-4">
				<!-- <Form.Field {form} name="name"> -->
				<!-- 	<Form.Control> -->
				<!-- 		{#snippet children({ props })} -->
				<!-- 			<Form.Label>Product Name</Form.Label> -->
				<!-- 			<Input {...props} bind:value={$formData.name} /> -->
				<!-- 		{/snippet} -->
				<!-- 	</Form.Control> -->
				<!-- 	<Form.FieldErrors /> -->
				<!-- </Form.Field> -->
				<!---->
				<!-- <Form.Field {form} name="description"> -->
				<!-- 	<Form.Control> -->
				<!-- 		{#snippet children({ props })} -->
				<!-- 			<Form.Label>Description</Form.Label> -->
				<!-- 			<Input {...props} bind:value={$formData.description} /> -->
				<!-- 		{/snippet} -->
				<!-- 	</Form.Control> -->
				<!-- 	<Form.FieldErrors /> -->
				<!-- </Form.Field> -->
				<!---->
				<!-- <Form.Field {form} name="price"> -->
				<!-- 	<Form.Control> -->
				<!-- 		{#snippet children({ props })} -->
				<!-- 			<Form.Label>Price</Form.Label> -->
				<!-- 			<Input {...props} type="number" bind:value={$formData.price} /> -->
				<!-- 		{/snippet} -->
				<!-- 	</Form.Control> -->
				<!-- 	<Form.FieldErrors /> -->
				<!-- </Form.Field> -->
				<!---->
				<!-- <Form.Field {form} name="stock"> -->
				<!-- 	<Form.Control> -->
				<!-- 		{#snippet children({ props })} -->
				<!-- 			<Form.Label>Stock</Form.Label> -->
				<!-- 			<Input {...props} type="number" bind:value={$formData.stock} /> -->
				<!-- 		{/snippet} -->
				<!-- 	</Form.Control> -->
				<!-- 	<Form.FieldErrors /> -->
				<!-- </Form.Field> -->
				<!---->
				<!-- <Form.Field {form} name="category"> -->
				<!-- 	<Form.Control> -->
				<!-- 		{#snippet children({ props })} -->
				<!-- 			<Form.Label>Category</Form.Label> -->
				<!-- 			<Input {...props} type="number" bind:value={$formData.category} /> -->
				<!-- 		{/snippet} -->
				<!-- 	</Form.Control> -->
				<!-- 	<Form.FieldErrors /> -->
				<!-- </Form.Field> -->
				<!---->
				<!-- <Form.Field {form} name="subCategory"> -->
				<!-- 	<Form.Control> -->
				<!-- 		{#snippet children({ props })} -->
				<!-- 			<Form.Label>Sub Category</Form.Label> -->
				<!-- 			<Input {...props} bind:value={$formData.subCategory} /> -->
				<!-- 		{/snippet} -->
				<!-- 	</Form.Control> -->
				<!-- 	<Form.FieldErrors /> -->
				<!-- </Form.Field> -->

				<Form.Field {form} name="images">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Images</Form.Label>
							<Input
								{...props}
								type="file"
								accept="image/png, image/jpeg"
								bind:files={$images}
								multiple
							/>
						{/snippet}
					</Form.Control>
					{#if $errors.images}
						{#each $errors.images[0] as error (error)}
							<p class="text-red-600">{error}</p>
						{/each}
					{/if}
				</Form.Field>
				<div class="grid w-fit grid-cols-3 gap-2">
					{#each previews as preview (preview)}
						<img src={preview} alt="img" class="size-20 rounded-md border-2" />
					{/each}
				</div>
				<Form.Button
					>{#if $delayed}
						<Loader2 class="size-6 animate-spin" />
					{/if}Add Product</Form.Button
				>
			</Card.Content>
		</Card.Root>
	</form>
</div>
