<script lang="ts">
	import LinkWithIcon from '$components/LinkWithIcon.svelte';
	import Featured, { type FeaturedProject } from '$components/layout/Featured.svelte';
	import {
		IconArrowRight,
		IconExternalLink,
		IconCalendarEvent,
		IconActivity
	} from '@tabler/icons-svelte';
	import Site from '$lib/config/common';
	import { site } from '$lib/config/site';
	import { Home } from '$lib/config/pages';
	import ThemeSelector from '$components/themes/ThemeSelector.svelte';
	import ColorSelector from '$components/themes/ColorSelector.svelte';
	import Experience from '$components/Experience.svelte';
	import LocationMap from '$components/bento/LocationMap.svelte';
	import TimeWaster from '$components/bento/TimeWaster.svelte';
	import type { CommitData } from '$lib/api/commits';

	type PageData = {
		featuredProjects: FeaturedProject[];
		commitData: CommitData;
	};

	let { data }: { data: PageData } = $props();
	let isNameHovered = $state(false);
	const langTotal = $derived((data.commitData?.languages || []).reduce((a, l) => a + l.size, 0));
</script>

<div class="mx-auto max-w-6xl space-y-12 px-0 py-8 md:space-y-16 md:px-4 md:py-12">
	<!-- Section 1: Hero / Introduction -->
	<section class="space-y-5 px-4 md:px-0">
		<h1 class="text-3xl font-bold md:text-4xl">
			{site.hero.greeting}
			<span class="text-accent">
				{#if site.hero.easterEggParens && site.identity.firstName.length >= 2}
					<span class="sr-only select-none">{site.identity.firstName}</span>
					<span>
						<span aria-hidden="true">{site.identity.firstName.charAt(0)}</span><span
							class="decoration-accent/30 underline decoration-dashed opacity-70"
							onmouseenter={() => (isNameHovered = true)}
							onmouseleave={() => (isNameHovered = false)}
							onfocus={() => (isNameHovered = true)}
							onblur={() => (isNameHovered = false)}
							tabindex="0"
							role="button"
							aria-label="Hover or focus to see a fun fact about my name"
							>{site.identity.firstName.charAt(1)}</span
						><span aria-hidden="true">{site.identity.firstName.slice(2)}</span><span
							class={`pointer-events-none inline-flex overflow-hidden align-baseline whitespace-nowrap transition-all duration-500 ease-out select-none ${
								isNameHovered ? 'max-w-[12ch] opacity-100' : 'max-w-0 opacity-0'
							}`}>&nbsp;'{site.hero.easterEggParens}'</span
						>
					</span>
					<span>{site.identity.lastName}</span>
				{:else}
					<span>{site.identity.firstName} {site.identity.lastName}</span>
				{/if}
			</span>
		</h1>
		<p class="text-subtext0 max-w-prose text-lg leading-relaxed">
			{site.hero.bio}
		</p>
		<div class="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2">
			{#each Home.socialLinks as link, i (link.href)}
				<LinkWithIcon
					href={link.href}
					text={link.text}
					icon={link.icon}
					external={true}
					class="text-sm"
				/>
				{#if i < Home.socialLinks.length - 1}
					<span class="text-surface1 text-xs">|</span>
				{/if}
			{/each}
			{#if Home.socialLinks.length > 0}
				<span class="text-surface1 text-xs">|</span>
			{/if}
			<a
				href="/about"
				class="group text-subtext1 hover:text-accent inline-flex items-center gap-1 text-sm transition-colors duration-200"
			>
				<span>More about me</span>
				<IconArrowRight
					size={16}
					class="transition-transform duration-200 group-hover:translate-x-0.5"
				/>
			</a>
		</div>
	</section>

	<!-- Section: Minimal Experience Row -->
	{#if site.experience.length > 0}
		<Experience />
	{/if}

	<!-- Section: Featured Projects -->
	<Featured projects={data.featuredProjects} maxProjects={2} />

	<!-- Section: Bento Grid Container -->
	<section class="px-4 md:px-0">
		<h2 class="sr-only">Dashboard / Highlights</h2>
		<div class="grid grid-cols-1 justify-center gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
			<!-- Box 1: Theme Selector -->
			<div
				class="border-surface0 bg-base rounded-xl border p-4 shadow-lg sm:col-span-2 xl:col-span-1"
			>
				<ThemeSelector />
				<ColorSelector />
			</div>

			<!-- Box 2: Book a chat -->
			{#if site.socials.calcom}
				<div class="border-surface0 bg-base rounded-xl border p-4 shadow-lg lg:col-span-1">
					<h3 class="text-text mb-3 flex items-center gap-2 text-sm font-semibold">
						<IconCalendarEvent size={16} class="text-accent" />
						Let's Connect
					</h3>
					<p class="text-subtext0 mb-4 text-sm">
						Always open to interesting projects and conversations.
					</p>
					<a
						href={Site.out.calcom}
						target="_blank"
						rel="noopener noreferrer"
						class="bg-accent/80 focus:ring-accent/50 focus:ring-offset-base inline-flex w-full items-center justify-center gap-2 rounded-md px-3 py-1.5 text-base text-sm font-medium shadow-sm transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
					>
						<IconCalendarEvent size={16} />
						Book a Chat
					</a>
				</div>
			{/if}

			<!-- Box 3: Location Map -->
			<LocationMap />

			<!-- Box 4: Time Waster -->
			<TimeWaster />

			<!-- Box 5: Latest Commits -->
			{#if data.commitData?.commits?.length > 0}
				<div class="border-surface0 bg-base rounded-xl border p-4 shadow-lg md:col-span-2">
					<div class="text-text mb-3 flex items-center justify-between gap-2 text-sm">
						<h3 class="flex items-center gap-2 font-semibold">
							<IconActivity size={16} class="text-accent" />
							<span>Recent Commits</span>
						</h3>
					</div>
					<ul class="space-y-1.5 text-sm">
						{#each data.commitData.commits.slice(0, 4) as commit (commit.sha)}
							<li>
								<a
									href={commit.href}
									target="_blank"
									rel="noopener noreferrer"
									class="text-subtext0 hover:text-accent flex min-w-0 items-center gap-2"
									title={`${commit.repo}: ${commit.message}`}
								>
									<span class="text-text flex-shrink-0 font-medium"
										>{commit.repo.split('/')[1]}:</span
									>
									<span class="min-w-0 flex-1 truncate">{commit.message}</span>
									{#if commit.additions !== undefined && commit.deletions !== undefined}
										<span class="flex-shrink-0 text-xs whitespace-nowrap">
											<span class="text-green">+{commit.additions}</span>
											<span class="text-surface1">/</span>
											<span class="text-red">-{commit.deletions}</span>
										</span>
									{/if}
								</a>
							</li>
						{/each}
					</ul>
					<div class="mt-3 flex items-center gap-3">
						{#if site.socials.github}
							<a
								href={site.socials.github}
								target="_blank"
								rel="noopener noreferrer"
								class="group text-accent inline-flex items-center gap-1 text-sm hover:underline"
							>
								<span>View on GitHub</span>
								<IconExternalLink
									size={14}
									class="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
								/>
							</a>
						{/if}
						{#if langTotal > 0}
							<div
								class="ml-auto max-w-xs flex-1 sm:max-w-sm md:max-w-md"
								aria-label="Language breakdown"
							>
								<div class="bg-surface2 h-2 w-full rounded-[3px]">
									<div class="flex h-full w-full">
										{#each data.commitData.languages as lang (lang.name)}
											<div
												class="group relative h-full first:rounded-l-[3px] last:rounded-r-[3px]"
												style={`width: clamp(8px, ${(lang.size / langTotal) * 100}%, ${(lang.size / langTotal) * 100}%); background-color: ${lang.color};`}
											>
												<div
													class="border-surface1 bg-surface1 pointer-events-none absolute -top-7 left-1/2 z-10 -translate-x-1/2 rounded border px-2 py-0.5 text-xs whitespace-nowrap opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100"
												>
													<span class="inline-flex items-center gap-2">
														<span
															class="inline-block h-2 w-2 rounded"
															style={`background-color: ${lang.color};`}
														></span>
														<span class="text-subtext0">{lang.name}</span>
														<span class="text-surface1">•</span>
														<span class="text-subtext1"
															>{Math.round((lang.size / langTotal) * 100)}%</span
														>
													</span>
												</div>
											</div>
										{/each}
									</div>
								</div>
							</div>
						{/if}
					</div>
				</div>
			{/if}
		</div>
	</section>
</div>
