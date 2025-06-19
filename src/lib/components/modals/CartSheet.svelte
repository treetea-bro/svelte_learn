<script lang="ts">
	import * as Sheet from '$lib/components/ui/sheet';
	import { cartSheetState } from '$lib/states/modalState.svelte';
	import Button from '../ui/button/button.svelte';
</script>

<Sheet.Root bind:open={cartSheetState.value}>
	<Sheet.Content>
		<Sheet.Header>
			<Sheet.Title>Your order</Sheet.Title>
		</Sheet.Header>
		<p class="my-5 capitalize md:my-0">total: $500</p>
		<Sheet.Footer>
			<Button>Proceed to checkout</Button>
		</Sheet.Footer>
	</Sheet.Content>
</Sheet.Root>
