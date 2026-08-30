<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';

	import { cn } from '@/lib/utils';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: DropdownMenuPrimitive.ItemProps = $props();
</script>

<DropdownMenuPrimitive.Item
	bind:ref
	data-slot="dropdown-menu-item"
	class={cn(
		'relative flex cursor-default items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium outline-none select-none focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
		className
	)}
	{...restProps}
/>
