<script lang="ts">
	import { goto } from '$app/navigation';
	import { Search } from '@lucide/svelte';

	let value = $state('');
</script>

<form
	onsubmit={(e) => {
		e.preventDefault();
		goto(`/search?term=${value}`);
	}}
	class="focus-within:ring-primary bg-muted flex w-full items-center justify-between rounded-3xl p-2 focus-within:ring-2"
>
	<input
		placeholder="Search..."
		class="placeholder:text-muted-foreground h-11 flex-1 bg-transparent outline-none"
		bind:value
	/>
	<Search class="text-muted-foreground" />
</form>
