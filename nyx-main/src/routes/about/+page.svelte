<script lang="ts">
	import { IconBrandGithub, IconBrandLinkedin, IconMail, IconDog } from '@tabler/icons-svelte';
	import Site from '$lib/config/common';
	import { site } from '$lib/config/site';
	import AnchorHeader from '$lib/components/AnchorHeader.svelte';

	const handleEmailClick = () => {
		window.location.href = `mailto:${site.brand.contactEmail}`;
	};
</script>

<svelte:head>
	<title>{site.about.pageTitle} | {site.identity.name}</title>
</svelte:head>

<div class="mx-auto max-w-6xl space-y-8 px-4 py-8 md:px-6">
	<section class="space-y-6">
		<h1 class="flex items-center gap-3 text-3xl font-bold md:text-4xl">
			<span>{site.about.heading}</span>
		</h1>

		<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
			<div class="md:col-span-1">
				<img
					src={site.about.avatarUrl}
					alt={site.about.avatarAlt}
					class="h-full w-full rounded-md object-cover shadow-lg transition-transform duration-300 hover:scale-[1.02]"
				/>
			</div>

			<div class="space-y-4 md:col-span-2">
				<p class="text-subtext0 text-base leading-relaxed">
					{site.about.intro}
				</p>

				{#each site.about.paragraphs as paragraph (paragraph)}
					<p class="text-subtext0 text-base leading-relaxed">
						{paragraph}
					</p>
				{/each}

				{#if site.about.hobbiesText}
					<p class="text-subtext0 text-base leading-relaxed">
						{site.about.hobbiesText}
					</p>
				{/if}

				<div class="flex flex-wrap gap-3 pt-2">
					{#if Site.out.github}
						<a
							href={Site.out.github}
							target="_blank"
							rel="noopener noreferrer"
							class="hover:text-accent inline-flex items-center gap-1.5 text-sm transition-colors"
						>
							<IconBrandGithub size={16} />
							GitHub
						</a>
						<span class="text-surface1">*</span>
					{/if}

					{#if Site.out.linkedin}
						<a
							href={Site.out.linkedin}
							target="_blank"
							rel="noopener noreferrer"
							class="hover:text-accent inline-flex items-center gap-1.5 text-sm transition-colors"
						>
							<IconBrandLinkedin size={16} />
							LinkedIn
						</a>
						<span class="text-surface1">*</span>
					{/if}

					{#if site.about.showEmailButton}
						<span
							role="button"
							aria-label="Send an email to contact"
							class="hover:text-accent inline-flex cursor-pointer items-center gap-1.5 text-sm transition-colors"
							tabindex="0"
							onclick={handleEmailClick}
							onkeydown={(e) => {
								if (e.key === 'Enter' || e.key === ' ') {
									handleEmailClick();
								}
							}}
						>
							<IconMail size={16} />
							contact[at][thisdomain]
						</span>
					{/if}
				</div>
			</div>
		</div>
	</section>

	{#if site.about.pet}
		<section id="hobbies-section" class="space-y-8">
			<div class="bg-base rounded-lg p-6 transition-all duration-300">
				<AnchorHeader
					level="h3"
					id={site.about.pet.name.toLowerCase()}
					class="mb-5 flex items-center gap-2 text-xl font-semibold"
				>
					<IconDog size={24} class="text-accent" />
					{site.about.pet.heading}
				</AnchorHeader>

				<div class="mb-5 grid grid-cols-1 gap-4 md:grid-cols-3">
					{#each site.about.pet.photos as photo (photo.url)}
						<img
							src={photo.url}
							alt={photo.alt}
							class="h-40 w-full rounded-md object-cover shadow-sm transition-transform duration-300 hover:scale-[1.03]"
						/>
					{/each}
				</div>
			</div>
		</section>
	{/if}
</div>

<style>
	:global(html) {
		scroll-padding-top: 5rem;
	}
</style>
