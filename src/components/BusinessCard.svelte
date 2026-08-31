<script lang="ts">
	import { ArrowUpRight } from '@lucide/svelte';

	import * as Card from '@/components/ui/card';

	interface WebsiteLink {
		label: string;
		href: string;
	}

	interface Organization {
		name: string;
		roles: string[];
	}

	interface Props {
		name: string;
		latinName: string;
		organizations: Organization[];
		website?: WebsiteLink | undefined;
		qrSrc: string;
		qrAlt: string;
		primary?: boolean;
		cardId: string;
	}

	let {
		name,
		latinName,
		organizations,
		website,
		qrSrc,
		qrAlt,
		primary = false,
		cardId
	}: Props = $props();
</script>

<Card.Root
	class="business-card-face rounded-[1.45rem] py-0 shadow-none ring-0"
	data-card-id={cardId}
	role="group"
	aria-label={`${name} — ${organizations.map((organization) => `${organization.name}, ${organization.roles.join(' / ')}`).join('; ')}`}
>
	<Card.Content class="business-card-content p-0">
		<div class="identity">
			{#if primary}
				<h1>{name}</h1>
			{:else}
				<p class="display-name">{name}</p>
			{/if}
			<p class="latin-name">{latinName}</p>
			<ul>
				{#each organizations as organization (organization.name)}
					<li>
						<span>{organization.name}</span>
						<strong>{organization.roles.join(' / ')}</strong>
					</li>
				{/each}
			</ul>
			{#if website}
				<a class="card-website" href={website.href} target="_blank" rel="noreferrer">
					<span>{website.label}</span>
					<ArrowUpRight />
				</a>
			{/if}
		</div>

		<div class="qr-wrap">
			<img src={qrSrc} alt={qrAlt} width="144" height="144" draggable="false" />
		</div>
	</Card.Content>
</Card.Root>

<style>
	:global(.business-card-face) {
		display: block;
		aspect-ratio: 1.586;
		overflow: hidden;
		border: 1px solid #d9dee7;
		background: #fff;
		color: #14213d;
		box-shadow: 0 0.8rem 2.2rem -1.7rem rgb(28 39 62 / 0.28);
	}
	:global(.business-card-content) {
		--column-height: clamp(7.2rem, 25vw, 8.3rem);

		display: grid;
		grid-template-columns: minmax(0, 1fr) auto;
		align-items: center;
		gap: clamp(0.75rem, 3.5vw, 1.75rem);
		height: 100%;
		padding: clamp(1.15rem, 4vw, 2rem);
	}
	.identity,
	.qr-wrap {
		box-sizing: border-box;
		height: var(--column-height);
	}
	.identity {
		display: flex;
		min-width: 0;
		flex-direction: column;
		justify-content: center;
	}
	h1,
	.display-name {
		font-size: clamp(1.55rem, 5vw, 2.4rem);
		font-weight: 720;
		line-height: 1;
		letter-spacing: -0.05em;
	}
	.latin-name {
		margin-top: 0.35rem;
		font-size: clamp(0.72rem, 1.9vw, 0.95rem);
		font-weight: 650;
		letter-spacing: 0.08em;
		color: var(--muted-foreground);
	}
	ul {
		display: grid;
		gap: 0.15rem;
		margin-top: clamp(0.5rem, 1.7vw, 0.8rem);
	}
	li {
		display: flex;
		min-width: 0;
		align-items: baseline;
		justify-content: space-between;
		gap: 0.45rem;
		font-size: clamp(0.54rem, 1.5vw, 0.66rem);
		font-weight: 600;
		line-height: 1.2;
		color: #525d72;
	}
	li span {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	li strong {
		flex: none;
		font-size: 0.92em;
		font-weight: 750;
		letter-spacing: 0.04em;
		color: #29364f;
	}
	.card-website {
		display: inline-flex;
		width: fit-content;
		max-width: 100%;
		align-items: center;
		gap: 0.25rem;
		margin-top: clamp(0.38rem, 1.3vw, 0.65rem);
		font-size: clamp(0.58rem, 1.5vw, 0.7rem);
		font-weight: 700;
		color: color-mix(in srgb, var(--primary) 76%, #14213d);
	}
	.card-website span {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.card-website :global(svg) {
		width: 0.75rem;
		height: 0.75rem;
		flex: none;
	}
	.qr-wrap {
		width: var(--column-height);
		border-radius: 0.45rem;
		background: #fff;
		padding: clamp(0.15rem, 0.7vw, 0.3rem);
		box-shadow: 0 0 0 1px rgb(20 33 61 / 0.04);
	}
	.qr-wrap img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
	@media (max-width: 420px) {
		:global(.business-card-content) {
			gap: 0.7rem;
		}
	}
</style>
