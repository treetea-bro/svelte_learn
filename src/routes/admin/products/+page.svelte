<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import * as Table from '$lib/components/ui/table/index';

	let showProduct = $state(true);
</script>

<div class="flex-1 space-y-4 p-8 pt-6">
	<div class="flex items-center justify-between space-y-2">
		<h2 class="text-3xl font-bold tracking-tight capitalize">Products</h2>
		<div class="flex items-center space-x-2">
			<Input class="w-[155px] lg:w-[250px]" placeholder="Search products..." />
			<Button href="products/add">Add Product</Button>
		</div>
	</div>
	{#if showProduct}
		<Table.Root>
			<Table.Header>
				<Table.Row>
					<Table.Head class="w-[100px]">ID</Table.Head>
					<Table.Head>image</Table.Head>
					<Table.Head>Name</Table.Head>
					<Table.Head>Category</Table.Head>
					<Table.Head>Sub category</Table.Head>
					<Table.Head>Price</Table.Head>
					<Table.Head>Stock</Table.Head>
					<Table.Head class="text-right">Actions</Table.Head>
				</Table.Row>
			</Table.Header>

			<Table.Body>
				<Table.Row>
					<Table.Cell class="font-medium">1</Table.Cell>
					<Table.Cell
						><img
							src="./favicon.png"
							class="size-14 rounded border"
							alt="img"
						/></Table.Cell
					>
					<Table.Cell>jordans</Table.Cell>
					<Table.Cell>shoe</Table.Cell>
					<Table.Cell>jordan brands</Table.Cell>
					<Table.Cell>$100</Table.Cell>
					<Table.Cell>10</Table.Cell>
					<Table.Cell class="text-right"
						><Button variant="destructive" size="sm">Delete</Button></Table.Cell
					>
				</Table.Row>
			</Table.Body>
		</Table.Root>
	{:else}
		<p
			class="text-muted-foreground flex h-[70h] w-full flex-col items-center justify-center gap-3 text-3xl"
		>
			No Products found
			<Button href="products/add">create new product</Button>
		</p>
	{/if}
</div>
