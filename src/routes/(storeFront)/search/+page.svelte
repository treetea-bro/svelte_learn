<script lang="ts">
	import SearchBar2 from '$lib/components/SearchBar2.svelte';

	let { data } = $props();
</script>

<div class="mx-auto max-w-6xl md:my-20 lg:px-10">
	<h1 class="text-xl font-bold capitalize md:text-3xl">Search for Chair</h1>

	<div class="my-5 flex items-center justify-center">
		<SearchBar2 />
	</div>
</div>
