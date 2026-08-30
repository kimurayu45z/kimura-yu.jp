<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	import { cn, type WithElementRef } from '@/lib/utils';

	let {
		ref = $bindable(null),
		value = $bindable(),
		class: className,
		...restProps
	}: WithElementRef<HTMLInputAttributes, HTMLInputElement> = $props();
</script>

<input
	bind:this={ref}
	bind:value
	data-slot="input"
	class={cn(
		'h-12 w-full min-w-0 rounded-xl border border-transparent bg-input/55 px-4 text-base outline-none transition-[color,box-shadow,background-color] placeholder:text-muted-foreground focus-visible:border-ring focus-visible:bg-background focus-visible:ring-3 focus-visible:ring-ring/25 disabled:pointer-events-none disabled:opacity-50 md:text-sm',
		className
	)}
	{...restProps}
/>
