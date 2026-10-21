<script lang="ts">
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
	import Download from '@lucide/svelte/icons/download';
	import Landmark from '@lucide/svelte/icons/landmark';
	import ShieldCheck from '@lucide/svelte/icons/shield-check';
	import Workflow from '@lucide/svelte/icons/workflow';
	import { Button } from '@/components/ui/button';
	import * as Card from '@/components/ui/card';
	import { portfolioPdfPath, type Portfolio } from '@/content/portfolio';

	let { content }: { content: Portfolio } = $props();
	const icons = {
		'fuku-steel-plate-fund': Landmark,
		'd6e-systems': Workflow,
		'crypto-asset-rescue': ShieldCheck
	};
</script>

<section id="portfolio" aria-labelledby="portfolio-heading" class="mt-4">
	<Card.Root size="sm">
		<Card.Header>
			<Card.Title><h2 id="portfolio-heading">{content.labels.portfolio}</h2></Card.Title>
		</Card.Header>
		<Card.Content>
			<div class="projects">
				{#each content.cases as project (project.id)}
					{@const Icon = icons[project.id as keyof typeof icons]}
					<article id={project.id} class="project" aria-labelledby={`${project.id}-heading`}>
						<div class="project-icon" aria-hidden="true"><Icon strokeWidth={1.35} /></div>
						<div class="project-copy">
							<h3 id={`${project.id}-heading`}>
								<a href={project.links[0].href} target="_blank" rel="noreferrer">
									{project.overview.title}<ArrowUpRight aria-hidden="true" />
								</a>
							</h3>
							<p>{project.overview.summary}</p>
						</div>
					</article>
				{/each}
			</div>
		</Card.Content>
		<Card.Footer>
			<Button href={portfolioPdfPath} download variant="outline" size="sm" class="w-full">
				<Download data-icon="inline-start" />{content.labels.pdf}
			</Button>
		</Card.Footer>
	</Card.Root>
</section>

<style>
	.projects {
		display: grid;
		gap: 2rem;
		padding-block: 0.5rem;
	}
	.project {
		display: grid;
		grid-template-columns: 4.5rem minmax(0, 1fr);
		align-items: center;
		gap: 1.2rem;
		scroll-margin-top: 6rem;
	}
	.project-icon {
		color: var(--primary);
	}
	.project-icon :global(svg) {
		display: block;
		width: 4.5rem;
		height: 4.5rem;
	}
	h3 {
		font-size: 0.95rem;
		font-weight: 700;
		line-height: 1.5;
	}
	h3 a {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
	}
	h3 a:hover {
		text-decoration: underline;
		text-underline-offset: 0.2em;
	}
	h3 :global(svg) {
		width: 0.85rem;
		height: 0.85rem;
		flex: none;
		color: var(--muted-foreground);
	}
	p {
		margin-top: 0.5rem;
		font-size: 0.8rem;
		line-height: 1.8;
		color: var(--muted-foreground);
	}
	@media (min-width: 640px) {
		.projects {
			grid-template-columns: repeat(3, minmax(0, 1fr));
			align-items: start;
			gap: 1.5rem;
			padding-block: 0.75rem;
		}
		.project {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			gap: 1.1rem;
		}
		.project-icon :global(svg) {
			width: 5rem;
			height: 5rem;
		}
		h3 {
			font-size: 0.85rem;
		}
		p {
			font-size: 0.74rem;
		}
	}
</style>
