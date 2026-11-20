<script lang="ts">
	import '../app.css';
	import Header from '../components/layout/Header.svelte';
	import Footer from '../components/layout/Footer.svelte';
	import Sidebar from '../components/layout/Sidebar.svelte';
	import { page } from '$app/state';
	import { onNavigate } from '$app/navigation';
	import { onMount } from 'svelte';
	import Site from '$lib/config/common';
	import { site } from '$lib/config/site';
	import BackgroundEffect from '$components/BackgroundEffect.svelte';
	import { BackgroundEnabled } from '$lib/stores/theme';
	import { initCodeBlocks } from '$lib/client/codeblocks';
	import type { ProjectMetadata } from '$types/projects';

	const { children } = $props();

	let title = $derived(
		[Site.name, ...page.url.pathname.split('/').slice(1)].filter(Boolean).join(' - ')
	);

	// Link previews: a project page shares its own title, description and cover; other pages
	// use the site defaults. Each tag is written once, since most scrapers take the first one.
	const project = $derived(page.data.metadata as ProjectMetadata | undefined);
	const shareTitle = $derived(project?.title ?? title);
	const shareDescription = $derived(project?.description ?? Site.description);
	const shareImage = $derived(
		project?.image && !project.image.url.endsWith('.svg') // previews can't show SVG
			? new URL(project.image.url, Site.url).href
			: `${Site.url}/og-image.png`
	);

	let isSidebarOpen = $state(false);
	function toggleSidebar() {
		isSidebarOpen = !isSidebarOpen;
	}
	function closeSidebar() {
		isSidebarOpen = false;
	}

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	onMount(() => {
		initCodeBlocks();
	});
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={shareDescription} />

	<meta property="og:title" content={shareTitle} />
	<meta property="og:description" content={shareDescription} />
	<meta property="og:type" content={project ? 'article' : 'website'} />
	<meta property="og:url" content={Site.url + page.url.pathname} />
	<meta property="og:image" content={shareImage} />
	<meta property="og:site_name" content={Site.name} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={shareTitle} />
	<meta name="twitter:description" content={shareDescription} />
	<meta name="twitter:image" content={shareImage} />

	<meta name="author" content={Site.seo.author} />
	<meta name="keywords" content={Site.tags.join(', ')} />
	<meta name="robots" content="index, follow" />
	{#if site.identity.seo.geoRegion}
		<meta name="geo.region" content={site.identity.seo.geoRegion} />
	{/if}
	{#if Site.seo.location.city}
		<meta name="geo.placename" content={Site.seo.location.city} />
	{/if}
	<link rel="canonical" href={Site.url + page.url.pathname} />

	{@html `<script type="application/ld+json">
		${JSON.stringify({
			'@context': 'https://schema.org',
			'@type': ['Person', 'ProfilePage'],
			name: Site.seo.author,
			givenName: site.identity.givenName,
			familyName: site.identity.familyName,
			alternateName: site.identity.alternateNames,
			url: Site.url,
			description: Site.description,
			jobTitle: site.identity.jobTitle,
			birthDate: Site.seo.birthDate,
			worksFor: Site.seo.worksFor.name
				? {
						'@type': 'Organization',
						name: Site.seo.worksFor.name,
						url: Site.seo.worksFor.url
					}
				: undefined,
			address: Site.seo.location.city
				? {
						'@type': 'PostalAddress',
						addressLocality: Site.seo.location.city,
						addressRegion: Site.seo.location.region,
						addressCountry: Site.seo.location.country
					}
				: undefined,
			sameAs: [
				Site.out.github,
				Site.out.linkedin,
				Site.out.instagram,
				Site.out.bluesky,
				Site.out.wakatime
			].filter(Boolean),
			knowsAbout: site.identity.seo.knowsAbout,
			mainEntity: {
				'@type': 'Person',
				name: Site.seo.author
			},
			identifier: Site.url
		})}
	</script>`}
</svelte:head>

<div class="text-text mx-auto flex min-h-screen max-w-[90%] flex-col md:max-w-[80%]">
	{#if $BackgroundEnabled}
		<BackgroundEffect />
	{/if}
	<Header {toggleSidebar} />
	<Sidebar isOpen={isSidebarOpen} {closeSidebar} />
	<main class="flex-1 px-0 py-8 md:px-5">
		{@render children?.()}
	</main>
	<Footer />
</div>
