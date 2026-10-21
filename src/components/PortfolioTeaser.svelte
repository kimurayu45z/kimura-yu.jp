<script lang="ts">
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
	import FileText from '@lucide/svelte/icons/file-text';
	import { Button } from '@/components/ui/button';
	import * as Card from '@/components/ui/card';
	import type { Portfolio } from '@/content/portfolio';
	import type { Locale } from '@/paraglide/runtime';

	let { locale, content }: { locale: Locale; content: Portfolio } = $props();
</script>

<section aria-labelledby="portfolio-heading" class="mt-5">
	<Card.Root size="sm">
		<Card.Header>
			<Card.Title><h2 id="portfolio-heading">{content.labels.portfolio}</h2></Card.Title>
			<Card.Description>{content.intro}</Card.Description>
		</Card.Header>
		<Card.Content>
			<ul class="flex flex-col gap-3">
				{#each content.cases as project (project.id)}
					<li>
						<a class="project-link" href={`/${locale}/portfolio#${project.id}`}>
							<span>{project.title}</span>
							<ArrowUpRight aria-hidden="true" />
						</a>
					</li>
				{/each}
			</ul>
		</Card.Content>
		<Card.Footer>
			<Button href={`/${locale}/portfolio`} variant="outline" class="w-full">
				<FileText data-icon="inline-start" />{content.labels.read}
			</Button>
		</Card.Footer>
	</Card.Root>
</section>

<style>
	.project-link {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		font-size: 0.82rem;
		line-height: 1.5;
	}
	.project-link:hover span {
		text-decoration: underline;
		text-underline-offset: 0.2em;
	}
	.project-link :global(svg) {
		width: 1rem;
		height: 1rem;
		flex: none;
		color: var(--muted-foreground);
	}
</style>
