<script lang="ts">
	import * as Card from '@/components/ui/card';

	interface Props {
		name: string;
		latinName: string;
		organizations: string[];
		qrSrc: string;
		qrAlt: string;
		primary?: boolean;
		cardId: string;
	}

	let { name, latinName, organizations, qrSrc, qrAlt, primary = false, cardId }: Props = $props();
	let rotateX = $state(0);
	let rotateY = $state(0);
	let dragging = $state(false);
	let pointerId = 0;
	let startX = 0;
	let startY = 0;
	let startRotateX = 0;
	let startRotateY = 0;

	const clamp = (value: number): number => Math.max(-12, Math.min(12, value));

	function pointerDown(event: PointerEvent): void {
		if (event.pointerType === 'mouse' && event.button !== 0) return;
		dragging = true;
		pointerId = event.pointerId;
		startX = event.clientX;
		startY = event.clientY;
		startRotateX = rotateX;
		startRotateY = rotateY;
	}

	function pointerMove(event: PointerEvent): void {
		if (!dragging || event.pointerId !== pointerId) return;
		rotateY = clamp(startRotateY + (event.clientX - startX) * 0.07);
		rotateX = clamp(startRotateX - (event.clientY - startY) * 0.07);
	}

	function pointerUp(event: PointerEvent): void {
		if (event.pointerId === pointerId) dragging = false;
	}

	function reset(): void {
		rotateX = 0;
		rotateY = 0;
		dragging = false;
	}
</script>

<svelte:window onpointerup={pointerUp} onpointercancel={pointerUp} onblur={reset} />

<div class="card-stage" data-card-id={cardId}>
	<div class="ground-shadow" aria-hidden="true"></div>
	<div
		class:dragging
		class="card-stack"
		style={`--rotate-x: ${rotateX}deg; --rotate-y: ${rotateY}deg`}
		role="group"
		aria-label={`${name} — ${organizations.join(', ')}`}
		onpointerdown={pointerDown}
		onpointermove={pointerMove}
		onpointercancel={pointerUp}
		ondblclick={reset}
	>
		<div class="card-edge edge-lower" aria-hidden="true"></div>
		<div class="card-edge edge-upper" aria-hidden="true"></div>
		<Card.Root class="business-card-face rounded-[1.45rem] py-0 shadow-none ring-0">
			<Card.Content class="business-card-content p-0">
				<div class="identity">
					{#if primary}
						<h1>{name}</h1>
					{:else}
						<p class="display-name">{name}</p>
					{/if}
					<p class="latin-name">{latinName}</p>
					<ul>
						{#each organizations as organization (organization)}
							<li>{organization}</li>
						{/each}
					</ul>
				</div>

				<div class="qr-wrap">
					<img src={qrSrc} alt={qrAlt} width="144" height="144" draggable="false" />
				</div>
			</Card.Content>
		</Card.Root>
	</div>
</div>

<style>
	.card-stage {
		position: relative;
		width: 100%;
		padding: 0.5rem 0.35rem 1.15rem;
		perspective: 1100px;
		isolation: isolate;
	}
	.ground-shadow {
		position: absolute;
		z-index: -1;
		right: 7%;
		bottom: 0.45rem;
		left: 7%;
		height: 1rem;
		border-radius: 50%;
		background: rgb(27 39 64 / 0.28);
		filter: blur(0.85rem);
		transform: scaleX(0.94);
	}
	.card-stack {
		position: relative;
		aspect-ratio: 1.586;
		width: 100%;
		cursor: grab;
		transform: rotateX(var(--rotate-x)) rotateY(var(--rotate-y));
		transform-style: preserve-3d;
		transition:
			transform 180ms cubic-bezier(0.2, 0.7, 0.2, 1),
			filter 180ms ease-out;
		touch-action: pan-y;
		user-select: none;
		will-change: transform;
	}
	.card-stack.dragging {
		cursor: grabbing;
		filter: drop-shadow(0 1rem 0.8rem rgb(28 39 62 / 0.12));
		transition: filter 180ms ease-out;
	}
	.card-edge,
	:global(.business-card-face) {
		position: absolute;
		inset: 0;
		border-radius: 1.45rem;
	}
	.card-edge {
		pointer-events: none;
	}
	.edge-lower {
		border: 1px solid #b5bdca;
		background: linear-gradient(180deg, #d6dbe4 0%, #bfc7d3 100%);
		box-shadow: 0 0.75rem 1.4rem -0.9rem rgb(28 39 62 / 0.52);
		transform: translate3d(0, 0.52rem, -0.5rem);
	}
	.edge-upper {
		border: 1px solid #d7dce4;
		background: linear-gradient(180deg, #f5f6f8 0%, #dde1e8 100%);
		transform: translate3d(0, 0.25rem, -0.22rem);
	}
	:global(.business-card-face) {
		display: block;
		overflow: hidden;
		border: 1px solid #d9dee7;
		background: #fff;
		color: #14213d;
		box-shadow:
			inset 0 1px rgb(255 255 255 / 0.96),
			0 0.2rem 0.45rem rgb(34 46 72 / 0.08);
		transform: translateZ(0.12rem);
	}
	:global(.business-card-content) {
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto;
		align-items: stretch;
		gap: clamp(1rem, 4vw, 2rem);
		height: 100%;
		padding: clamp(1.2rem, 4vw, 2rem);
	}
	.identity {
		display: flex;
		min-width: 0;
		flex-direction: column;
		justify-content: center;
	}
	h1,
	.display-name {
		font-size: clamp(1.7rem, 5.4vw, 2.75rem);
		font-weight: 720;
		line-height: 1;
		letter-spacing: -0.05em;
	}
	.latin-name {
		margin-top: 0.45rem;
		font-size: clamp(0.78rem, 2vw, 1rem);
		font-weight: 650;
		letter-spacing: 0.08em;
		color: var(--muted-foreground);
	}
	ul {
		display: grid;
		gap: 0.24rem;
		margin-top: clamp(0.85rem, 2.5vw, 1.3rem);
	}
	li {
		overflow: hidden;
		font-size: clamp(0.5rem, 1.55vw, 0.68rem);
		font-weight: 600;
		line-height: 1.25;
		color: #525d72;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.qr-wrap {
		align-self: center;
		width: clamp(5.2rem, 21vw, 8.1rem);
		border-radius: 0.45rem;
		background: #fff;
		padding: clamp(0.15rem, 0.7vw, 0.3rem);
		box-shadow: 0 0 0 1px rgb(20 33 61 / 0.04);
		transform: translateZ(0.28rem);
	}
	.qr-wrap img {
		display: block;
		width: 100%;
		height: auto;
	}
	@media (max-width: 420px) {
		.card-stage {
			padding-inline: 0.15rem;
		}
		:global(.business-card-content) {
			gap: 0.75rem;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.card-stack {
			transition: none;
		}
	}
</style>
