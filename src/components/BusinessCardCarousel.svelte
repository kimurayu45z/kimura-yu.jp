<script lang="ts">
	import * as Carousel from '@/components/ui/carousel';
	import { Button } from '@/components/ui/button';
	import type { CarouselAPI } from '@/components/ui/carousel/context';

	import BusinessCard from './BusinessCard.svelte';

	interface BusinessCardItem {
		id: string;
		label: string;
		organizations: string[];
		website?:
			| {
					label: string;
					href: string;
			  }
			| undefined;
	}

	interface Props {
		name: string;
		latinName: string;
		cards: BusinessCardItem[];
		qrSrc: string;
		qrAlt: string;
		previousLabel: string;
		nextLabel: string;
	}

	let { name, latinName, cards, qrSrc, qrAlt, previousLabel, nextLabel }: Props = $props();
	let api = $state<CarouselAPI>();
	let current = $state(0);

	$effect(() => {
		if (!api) return;
		const updateCurrent = (): void => {
			current = api?.selectedScrollSnap() ?? 0;
		};
		updateCurrent();
		api.on('select', updateCurrent);
		return () => api?.off('select', updateCurrent);
	});
</script>

<Carousel.Root
	class="business-card-carousel"
	opts={{ align: 'start', loop: false }}
	setApi={(carouselApi) => (api = carouselApi)}
>
	<Carousel.Content>
		{#each cards as card, index (card.id)}
			<Carousel.Item>
				<BusinessCard
					{name}
					{latinName}
					organizations={card.organizations}
					website={card.website}
					{qrSrc}
					{qrAlt}
					primary={index === 0}
					cardId={card.id}
				/>
			</Carousel.Item>
		{/each}
	</Carousel.Content>

	<div class="carousel-controls">
		<Carousel.Previous class="carousel-arrow" aria-label={previousLabel} />
		<div class="carousel-position" aria-live="polite">
			<div class="carousel-dots">
				{#each cards as card, index (card.id)}
					<Button
						variant="ghost"
						size="icon-xs"
						class={current === index
							? 'carousel-dot active rounded-full'
							: 'carousel-dot rounded-full'}
						aria-label={card.label}
						aria-current={current === index ? 'true' : undefined}
						onclick={() => api?.scrollTo(index)}
					>
						<span></span>
					</Button>
				{/each}
			</div>
			<span>{current + 1} / {cards.length}</span>
		</div>
		<Carousel.Next class="carousel-arrow" aria-label={nextLabel} />
	</div>
</Carousel.Root>

<style>
	:global(.business-card-carousel) {
		width: 100%;
	}
	.carousel-controls {
		display: grid;
		grid-template-columns: auto 1fr auto;
		align-items: center;
		gap: 0.8rem;
		padding-inline: 0.35rem;
	}
	:global(.carousel-arrow) {
		position: static;
		inset: auto;
		margin: 0;
		border-color: color-mix(in srgb, var(--border) 86%, transparent);
		background: var(--card);
		box-shadow: 0 0.45rem 1.2rem -0.8rem rgb(34 46 72 / 0.3);
		transform: none;
	}
	.carousel-position {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.65rem;
		font-size: 0.68rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		color: var(--muted-foreground);
	}
	.carousel-dots {
		display: flex;
		align-items: center;
		gap: 0.15rem;
	}
	:global(.carousel-dot) {
		width: 1rem;
		height: 1rem;
		padding: 0;
	}
	:global(.carousel-dot span) {
		width: 0.3rem;
		height: 0.3rem;
		border-radius: 999px;
		background: var(--muted-foreground);
		transition:
			width 160ms ease,
			background-color 160ms ease;
	}
	:global(.carousel-dot.active span) {
		width: 0.72rem;
		background: var(--primary);
	}
</style>
