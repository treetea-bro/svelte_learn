<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import {
		Blocks,
		Box,
		Home,
		LayoutDashboard,
		Truck,
		User
	} from '@lucide/svelte';

	let { children } = $props();

	const items = [
		{
			title: 'Overview',
			url: 'overview',
			icon: LayoutDashboard
		},
		{
			title: 'Products',
			url: 'products',
			icon: Box
		},
		{
			title: 'Users',
			url: 'users',
			icon: User
		},
		{
			title: 'Orders',
			url: 'orders',
			icon: Truck
		},
		{
			title: 'Categories',
			url: 'categories',
			icon: Blocks
		},

		{
			title: 'Store front',
			url: '../',
			icon: Home
		}
	];
</script>

<Sidebar.Provider>
	<Sidebar.Root>
		<Sidebar.Content>
			<Sidebar.Group>
				<Sidebar.GroupLabel>admin dashboard</Sidebar.GroupLabel>
				<Sidebar.GroupContent>
					<Sidebar.Menu>
						{#each items as item (item.title)}
							<Sidebar.MenuItem>
								<Sidebar.MenuButton>
									{#snippet child({ props })}
										<a href={'/admin/' + item.url} {...props}>
											<item.icon />
											<span>{item.title}</span>
										</a>
									{/snippet}
								</Sidebar.MenuButton>
							</Sidebar.MenuItem>
						{/each}
					</Sidebar.Menu>
				</Sidebar.GroupContent>
			</Sidebar.Group>
		</Sidebar.Content>
	</Sidebar.Root>

	<main class="flex-1">
		<Sidebar.Trigger />
		{@render children?.()}
	</main>
</Sidebar.Provider>
