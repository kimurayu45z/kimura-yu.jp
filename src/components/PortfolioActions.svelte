<script lang="ts">
	import ArrowLeft from '@lucide/svelte/icons/arrow-left';
	import Download from '@lucide/svelte/icons/download';
	import Printer from '@lucide/svelte/icons/printer';
	import { Button } from '@/components/ui/button';
	import { portfolioPdfPath, type Portfolio } from '@/content/portfolio';
	import type { Locale } from '@/paraglide/runtime';

	let { locale, labels }: { locale: Locale; labels: Portfolio['labels'] } = $props();
</script>

<nav class="portfolio-actions" aria-label={labels.portfolio}>
	<Button href={`/${locale}`} variant="ghost" size="sm">
		<ArrowLeft data-icon="inline-start" />{labels.profile}
	</Button>
	<div class="flex flex-wrap gap-2">
		<Button href={portfolioPdfPath} download size="sm">
			<Download data-icon="inline-start" />{labels.pdf}
		</Button>
		<Button href={`/${locale}/portfolio/print`} variant="outline" size="sm">
			<Printer data-icon="inline-start" />{labels.print}
		</Button>
	</div>
</nav>

<style>
	.portfolio-actions {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 0.75rem;
		margin-bottom: 1rem;
	}
</style>
