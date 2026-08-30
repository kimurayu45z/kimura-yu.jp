<script lang="ts">
	import Check from '@lucide/svelte/icons/check';
	import Globe from '@lucide/svelte/icons/globe';
	import LockKeyhole from '@lucide/svelte/icons/lock-keyhole';
	import UnlockKeyhole from '@lucide/svelte/icons/unlock-keyhole';

	import { Button } from '@/components/ui/button';
	import * as DropdownMenu from '@/components/ui/dropdown-menu';
	import { localeMetadata, supportedLocales } from '@/lib/locales';
	import type { Locale } from '@/paraglide/runtime';

	interface Props {
		locale: Locale;
		mode: 'public' | 'private';
		isAuthenticated?: boolean;
		labels: {
			publicMode: string;
			privateMode: string;
			privateLocked: string;
			language: string;
		};
	}

	let { locale, mode, isAuthenticated = false, labels }: Props = $props();

	const pathForLocale = (nextLocale: Locale): string =>
		mode === 'private' ? `/${nextLocale}/private` : `/${nextLocale}`;
</script>

<header class="sticky top-0 z-50 bg-background/80 backdrop-blur-xl">
	<div class="mx-auto flex h-16 w-full max-w-2xl items-center justify-end px-5 sm:px-7">
		<div class="flex items-center gap-2">
			<Button
				href={mode === 'public' ? `/${locale}/private` : `/${locale}`}
				variant="outline"
				size="icon"
				class="rounded-full bg-card/90"
				aria-label={mode === 'public'
					? labels.privateLocked
					: isAuthenticated
						? labels.publicMode
						: labels.publicMode}
				title={mode === 'public' ? labels.privateMode : labels.publicMode}
			>
				{#if mode === 'public'}<LockKeyhole />{:else}<UnlockKeyhole />{/if}
			</Button>

			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					{#snippet child({ props })}
						<Button variant="outline" size="icon" class="rounded-full bg-card/90" {...props}>
							<Globe />
							<span class="sr-only">{labels.language}</span>
						</Button>
					{/snippet}
				</DropdownMenu.Trigger>
				<DropdownMenu.Content align="end">
					{#each supportedLocales as option (option)}
						<DropdownMenu.Item>
							{#snippet child({ props })}
								<a href={pathForLocale(option)} lang={localeMetadata[option].htmlLang} {...props}>
									{localeMetadata[option].label}
									{#if option === locale}<Check class="ml-auto text-primary" />{/if}
								</a>
							{/snippet}
						</DropdownMenu.Item>
					{/each}
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
	</div>
</header>
