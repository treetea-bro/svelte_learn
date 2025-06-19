<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import * as Table from '$lib/components/ui/table/index';
</script>

<div class="flex-1 space-y-4 p-8 pt-6">
	<div class="flex items-center justify-between space-y-2">
		<h2 class="text-3xl font-bold tracking-tight capitalize">Users</h2>
		<div class="flex items-center space-x-2">
			<Input class="w-[155px] lg:w-[250px]" placeholder="Search products..." />
			<Button href="products/add">Add User</Button>
		</div>
	</div>

	<Table.Root>
		<Table.Header>
			<Table.Row>
				<Table.Head class="w-[100px]">Name</Table.Head>
				<Table.Head>Email</Table.Head>
				<Table.Head>Role</Table.Head>
				<Table.Head>Status</Table.Head>
				<Table.Head>Join Date</Table.Head>
				<Table.Head>Total spent</Table.Head>
				<Table.Head class="text-right">Actions</Table.Head>
			</Table.Row>
		</Table.Header>

		<Table.Body>
			<Table.Row>
				<Table.Cell class="font-medium">Seungmin Lee</Table.Cell>
				<Table.Cell>hi@gmail.com</Table.Cell>
				<Table.Cell>admin</Table.Cell>
				<Table.Cell>active</Table.Cell>
				<Table.Cell>22/11/24</Table.Cell>
				<Table.Cell>$5000</Table.Cell>
				<Table.Cell class="text-right"
					><Button variant="destructive" size="sm">Ban user</Button></Table.Cell
				>
			</Table.Row>
		</Table.Body>
	</Table.Root>
</div>
