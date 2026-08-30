<script lang="ts">
	import Check from '@lucide/svelte/icons/check';
	import Copy from '@lucide/svelte/icons/copy';
	import Share2 from '@lucide/svelte/icons/share-2';
	import UserRoundPlus from '@lucide/svelte/icons/user-round-plus';

	import { Button } from '@/components/ui/button';

	interface Props {
		url: string;
		vcardUrl: string;
		title: string;
		labels: { add: string; share: string; copy: string; copied: string };
		primaryLabel?: string;
	}

	let { url, vcardUrl, title, labels, primaryLabel }: Props = $props();
	let copied = $state(false);

	async function share() {
		if (navigator.share) {
			await navigator.share({ title, url });
			return;
		}
		await copy();
	}

	async function copy() {
		await navigator.clipboard.writeText(url);
		copied = true;
		window.setTimeout(() => (copied = false), 1800);
	}
</script>

<div class="grid grid-cols-[minmax(0,1fr)_auto_auto] gap-2">
	<Button href={vcardUrl} variant="brand" size="lg" class="w-full">
		<UserRoundPlus />
		{primaryLabel ?? labels.add}
	</Button>
	<Button
		variant="outline"
		size="icon"
		class="size-12 rounded-full bg-card"
		onclick={share}
		title={labels.share}
	>
		<Share2 />
		<span class="sr-only">{labels.share}</span>
	</Button>
	<Button
		variant="outline"
		size="icon"
		class="size-12 rounded-full bg-card"
		onclick={copy}
		aria-live="polite"
		title={copied ? labels.copied : labels.copy}
	>
		{#if copied}<Check />{:else}<Copy />{/if}
		<span class="sr-only">{copied ? labels.copied : labels.copy}</span>
	</Button>
</div>
