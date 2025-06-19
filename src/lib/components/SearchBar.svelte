<script lang="ts">
	import Button from './ui/button/button.svelte';
	import { goto } from '$app/navigation';
	import { Search } from '@lucide/svelte';

	let value = $state('');
</script>

<form
	onsubmit={(e) => {
		e.preventDefault();
		goto(`/search?term=${value}`);
	}}
	class="text-foreground focus-within:ring-primary absolute bottom-3 left-5 flex w-full max-w-xs items-center rounded-md bg-white px-1 focus-within:ring-2 sm:max-w-md md:left-10 md:gap-2 md:px-3"
>
	<Search />
	<input class="h-12 flex-1 px-2 outline-none md:h-16" bind:value />
	<Button type="submit">Search</Button>
</form>
