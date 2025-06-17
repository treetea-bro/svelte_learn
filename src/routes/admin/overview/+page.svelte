<script lang="ts">
	import * as Card from '$lib/components/ui/card/index';
	import * as Table from '$lib/components/ui/table/index';
	import { ArrowUpIcon, ShoppingCartIcon } from '@lucide/svelte';
</script>

<div class="flex-1 space-y-4 p-8 pt-6">
	<h2 class="text-3xl font-bold tracking-tight capitalize">dashboard</h2>
	<div class="grid gap-4 md:grid-cols-2">
		<Card.Root>
			<Card.Celler class="flex items-center justify-between pb-2">
				<Card.Title class="text-sm font-medium">Total revenue</Card.Title>
				<ShoppingCartIcon class="text-muted-foreground size-4" />
			</Card.Header>
			<Card.Content>
				<div class="text-2xl font-bold">$5000</div>
				<p class="text-muted-foreground text-xs">+50% from laste month</p>
			</Card.Content>
		</Card.Root>

		<Card.Root>
			<Card.Celler class="flex items-center justify-between pb-2">
				<Card.Title class="text-sm font-medium">New Customers</Card.Title>
				<ArrowUpIcon class="text-muted-foreground size-4" />
			</Card.Header>
			<Card.Content>
				<div class="text-2xl font-bold">+20</div>
				<p class="text-muted-foreground text-xs">+20% from laste month</p>
			</Card.Content>
		</Card.Root>
	</div>

	<Card.Root>
		<Card.Header>
			<Card.Title>Recent Orders Title</Card.Title>
		</Card.Header>
		<Card.Content>
			<Table.Root>
				<Table.Header>
					<Table.Row>
						<Table.Head class="w-[100px]">Order</Table.Head>
						<Table.Head>Status</Table.Head>
						<Table.Head>Customer</Table.Head>
						<Table.Head class="text-right">AMT + SHP</Table.Head>
					</Table.Row>
				</Table.Header>

				<Table.Body>
					<Table.Row>
						<Table.Cell class="font-medium">INV001</Table.Cell>
						<Table.Cell>Processing</Table.Cell>
						<Table.Cell>Seungmin Lee</Table.Cell>
						<Table.Cell class="text-right">$500</Table.Cell>
					</Table.Row>
				</Table.Body>
			</Table.Root>
		</Card.Content>
	</Card.Root>
</div>
