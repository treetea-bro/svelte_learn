<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import * as Table from '$lib/components/ui/table/index';
	import {
		CheckCircleIcon,
		ClipboardIcon,
		ClockIcon,
		Truck
	} from '@lucide/svelte';

	let status = $state('processing');
</script>

<div class="flex-1 space-y-4 p-8 pt-6">
	<div class="flex items-center justify-between space-y-2">
		<h2 class="text-3xl font-bold tracking-tight capitalize">Orders</h2>
		<form class="flex items-center space-x-2">
			<Input
				class="w-[155px] lg:w-[250px]"
				placeholder="Search by order code"
			/>
			<Button type="submit">Search</Button>
		</form>
	</div>

	<Table.Root>
		<Table.Header>
			<Table.Row>
				<Table.Head class="w-[100px]">Order Id</Table.Head>
				<Table.Head>Status</Table.Head>
				<Table.Head>Customer</Table.Head>
				<Table.Head>Amount + Shipping</Table.Head>
				<Table.Head>Date</Table.Head>
				<Table.Head class="text-right">Actions</Table.Head>
			</Table.Row>
		</Table.Header>

		<Table.Body>
			<Table.Row>
				<Table.Cell class="font-medium"
					><div class="flex items-center gap-1">
						<span>EIJKEJH_9</span>
						<button
							onclick={() => {
								navigator.clipboard.writeText('EIJKEJH_9');
							}}><ClipboardIcon class="size-4" /></button
						>
					</div></Table.Cell
				>
				<Table.Cell>
					<div class="flex items-center gap-1">
						{#if status === 'delivered'}
							<CheckCircleIcon class="mr-2 size-4 text-green-500" />
						{:else if status === 'processing'}
							<ClockIcon class="mr-2 size-4 text-yellow-500" />
						{:else if status === 'shipped'}
							<Truck class="mr-2 size-4 text-red-500" />
						{/if}
						<span>{status}</span>
					</div>
				</Table.Cell>
				<Table.Cell>seungmin</Table.Cell>
				<Table.Cell>$100</Table.Cell>
				<Table.Cell>11/09/24</Table.Cell>
				<Table.Cell class="text-right"
					><Button variant="outline" size="sm">update to shipped</Button
					></Table.Cell
				>
			</Table.Row>
		</Table.Body>
	</Table.Root>
</div>
