<script lang="ts">
	import { site } from '$lib/config/site';

	const ANNOUNCEMENT_URL =
		'https://r-consortium.org/all-projects/2026-group-2.html#babelrd-machine-drafted-human-reviewed-translations-of-r-help-pages';
</script>

<svelte:head>
	<title>R Consortium grant | {site.identity.name}</title>
</svelte:head>

<article class="mx-auto max-w-3xl space-y-6 px-4 py-8 md:px-6">
	<header class="border-surface0 space-y-3 border-b pb-6">
		<h1 class="text-3xl font-bold md:text-4xl">
			Machine-drafted, human-reviewed translations of R help pages
		</h1>
		<p class="text-overlay1 text-sm">
			R Consortium ISC grant · 2026 Group 2 · $5,600
			<br />
			Project: <code>babelrd</code>
			<br />
			<a href={ANNOUNCEMENT_URL} target="_blank" rel="noopener noreferrer"
				>Read the announcement on r-consortium.org</a
			>
		</p>
	</header>

	<p class="text-subtext1 text-lg leading-relaxed">
		The R Consortium&rsquo;s Infrastructure Steering Committee has funded my project,
		<code>babelrd</code>, in its second grant cycle of 2026.
	</p>

	<p>
		It picks up where my <a href="/gsoc">Google Summer of Code project</a> left off.
		<a href="/projects/rdlocal">rdlocal</a> lets you read R help pages in your own language by installing
		a translation module. But every one of those translations is still written by hand, and the help text
		for base R alone runs to roughly a million characters per language.
	</p>

	<h2>What babelrd will do</h2>

	<p>
		<code>babelrd</code> is a companion package to rdlocal. It lets a translation team machine-draft a
		shared rdlocal module for a package and a language, checks that every help page still renders correctly,
		and then hands the draft to people to review.
	</p>

	<h2>Without breaking the help pages</h2>

	<p>
		Plain machine translation breaks help pages easily: it rewrites code, changes link targets and
		mangles the placeholders rdlocal uses for live values. <code>babelrd</code> will:
	</p>

	<ul>
		<li>keep code, links and placeholders away from the translator</li>
		<li>translate one help page at a time, so the terminology stays consistent</li>
		<li>check every page after it is translated</li>
		<li>
			mark every machine-drafted string as needing review, and never overwrite a human translation
		</li>
		<li>export to PO files, so the review can happen in Weblate or any gettext editor</li>
	</ul>

	<h2>The plan</h2>

	<p>
		It starts with DeepL, then adds glossary support and more translation backends. Along the way I
		will publish a pilot Spanish draft of the help pages of the <code>MASS</code> package, with a quality
		report.
	</p>

	<h2>What it builds on</h2>

	<p>
		<code>babelrd</code> builds on translation work the ISC funded before it:
		<a href="https://github.com/eliocamp/rhelpi18n" target="_blank" rel="noopener noreferrer"
			>rhelpi18n</a
		>
		(the package now called rdlocal),
		<a href="https://docs.ropensci.org/babeldown/" target="_blank" rel="noopener noreferrer"
			>babeldown</a
		>
		and the Consistent Translations Glossary.
	</p>
</article>

<style>
	article :global(p) {
		color: var(--color-subtext0);
		line-height: 1.75;
	}

	article :global(h2) {
		color: var(--color-text);
		font-size: 1.5rem;
		font-weight: 600;
		margin-top: 2.5rem;
		margin-bottom: 0.25rem;
	}

	article :global(a) {
		color: var(--current-accent-color);
		text-decoration: underline;
		text-underline-offset: 2px;
		transition: opacity 0.15s ease;
	}

	article :global(a:hover) {
		opacity: 0.75;
	}

	article :global(code) {
		background-color: var(--color-surface0);
		color: var(--current-accent-color);
		border-radius: 0.3rem;
		padding: 0.1rem 0.4rem;
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.88em;
	}

	article :global(ul) {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		padding-left: 0;
	}

	article :global(ul li) {
		color: var(--color-subtext0);
		line-height: 1.7;
		padding-left: 1.25rem;
		position: relative;
	}

	article :global(ul li::before) {
		content: '—';
		position: absolute;
		left: 0;
		color: var(--current-accent-color);
	}
</style>
