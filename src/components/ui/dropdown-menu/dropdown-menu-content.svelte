<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';

	import { cn, type WithoutChildrenOrChild } from '@/lib/utils';
	import DropdownMenuPortal from './dropdown-menu-portal.svelte';

	let {
		ref = $bindable(null),
		sideOffset = 6,
		align = 'start',
		portalProps,
		class: className,
		...restProps
	}: DropdownMenuPrimitive.ContentProps & {
		portalProps?: WithoutChildrenOrChild<ComponentProps<typeof DropdownMenuPortal>>;
	} = $props();
</script>

<DropdownMenuPortal {...portalProps}>
	<DropdownMenuPrimitive.Content
		bind:ref
		data-slot="dropdown-menu-content"
		{sideOffset}
		{align}
		class={cn(
			'z-50 min-w-40 overflow-hidden rounded-2xl bg-popover p-1.5 text-popover-foreground shadow-xl ring-1 ring-foreground/8 outline-none data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
			className
		)}
		{...restProps}
	/>
</DropdownMenuPortal>
