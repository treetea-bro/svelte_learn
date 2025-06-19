<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Menu, ShoppingCartIcon } from '@lucide/svelte';
	import * as Avatar from './ui/avatar';
	import Button from './ui/button/button.svelte';
	import LoginModal from './modals/LoginModal.svelte';
	import RegisterModal from './modals/RegisterModal.svelte';
	import MobileAuth from './modals/MobileAuth.svelte';
	import {
		cartSheetState,
		loginModalState,
		mobileAuthState,
		registerModalState
	} from '$lib/states/modalState.svelte';
	import ResetPasswordModal from './modals/ResetPasswordModal.svelte';
	import CartSheet from './modals/CartSheet.svelte';

	let user = true;
	let isAdmin = true;
	let accountPages = [
		{ title: 'Profile', href: '/me/personal-info' },
		{ title: 'Order History', href: '/me/order-history' },
		{ title: 'Addresses', href: '/me/addresses' },
		{ title: 'Settings', href: '/me/settings' }
	];

	function getUserInitial(name: string) {
		return name
			.split(' ')
			.map((n) => n[0])
			.join('');
	}
</script>

<header
	class="bg-background sticky top-0 left-0 z-50 flex items-center justify-between border px-3 py-3 md:px-10"
>
	<a href="/" class="text-2xl capitalize">
		<span class="text-primary font-bold"> My Svelte </span>
		<span>Store front</span>
	</a>
	<div class="flex items-center gap-2 md:gap-6">
		{#if user}
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					<Avatar.Root>
						<Avatar.Image src="/" alt="seungmin lee" />
						<Avatar.Fallback>{getUserInitial('seungmin lee')}</Avatar.Fallback>
					</Avatar.Root>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					<DropdownMenu.Group>
						<DropdownMenu.Label>My Account</DropdownMenu.Label>
						<DropdownMenu.Separator />
						{#each accountPages as { href, title } (href)}
							<DropdownMenu.Item>
								{#snippet child({ props })}
									<a {href} {...props}> {title}</a>
								{/snippet}
							</DropdownMenu.Item>
						{/each}
						{#if isAdmin}
							<DropdownMenu.Item>
								{#snippet child({ props })}
									<a href="/admin" {...props}> Admin Dashboard </a>
								{/snippet}
							</DropdownMenu.Item>
						{/if}
						<DropdownMenu.Separator />
						<DropdownMenu.Item>Log out</DropdownMenu.Item>
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		{:else}
			<div class="hidden items-center gap-2 md:flex">
				<Button onclick={() => loginModalState.setTrue()} variant="ghost">
					Login
				</Button>
				<Button onclick={() => registerModalState.setTrue()}>Register</Button>
			</div>
			<button
				onclick={() => {
					mobileAuthState.setTrue();
				}}
				class="hover:bg-secondary flex size-10 items-center justify-center rounded-full md:hidden"
			>
				<Menu class="size-6 " />
			</button>
		{/if}

		{#if user}
			<button
				class="relative inline-block h-fit w-fit"
				onclick={() => cartSheetState.setTrue()}
			>
				<div
					class="bg-primary absolute -top-2 -right-2 flex size-5 items-center justify-center rounded-full text-xs text-white"
				>
					5
				</div>
				<ShoppingCartIcon class="size-6" />
			</button>
		{/if}
	</div>
</header>

<LoginModal />
<RegisterModal />
<MobileAuth />
<ResetPasswordModal />
<CartSheet />
