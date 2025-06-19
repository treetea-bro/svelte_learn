<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import * as Table from '$lib/components/ui/table/index';
</script>

<div class="flex-1 space-y-4 p-8 pt-6">
	<div class="flex items-center justify-between space-y-2">
		<h2 class="text-3xl font-bold tracking-tight capitalize">Categories</h2>
		<div class="flex items-center space-x-2">
			<Input class="w-[155px] lg:w-[250px]" placeholder="Search categories" />
			<Button href="categories/add">Add new category</Button>
		</div>
	</div>

	<Table.Root>
		<Table.Header>
			<Table.Row>
				<Table.Head class="w-[100px]">Id</Table.Head>
				<Table.Head>Name</Table.Head>
				<Table.Head>Number of subcategories</Table.Head>
				<Table.Head>Description</Table.Head>
				<Table.Head class="text-right">Actions</Table.Head>
			</Table.Row>
		</Table.Header>

		<Table.Body>
			<Table.Row>
				<Table.Cell class="font-medium">1</Table.Cell>
				<Table.Cell>electronics</Table.Cell>
				<Table.Cell>5</Table.Cell>
				<Table.Cell>this is the description</Table.Cell>
				<Table.Cell class="text-right"
					><Button variant="destructive" size="sm">Delete</Button></Table.Cell
				>
			</Table.Row>
		</Table.Body>
	</Table.Root>
</div>
