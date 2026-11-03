<!--
	Landing page body for /projects/context-porter, rendered by content/projects/context-porter.svx.
	Everything here is scoped to this page. Global rules are gated on `:has(.cp-page)` because project
	modules load eagerly, so this component's CSS ships with other pages too; the gate keeps it inert there.
-->
<script lang="ts">
	const STORE_URL = 'https://chromewebstore.google.com/detail/eeijogjkipjihfdkapijankhflinbdlm';
	const REPO_URL = 'https://github.com/adit-0132/context-porter';
	const PRIVACY_URL = 'https://github.com/adit-0132/context-porter/blob/main/PRIVACY.md';
	const ISSUES_URL = 'https://github.com/adit-0132/context-porter/issues';
	const IMG = '/projects/context-porter-media';
	const VIDEO_ID = '5cPNLgoAMqg';
	const VIDEO_URL = `https://www.youtube.com/watch?v=${VIDEO_ID}`;

	// Click-to-play: show our own poster and contact YouTube only when the visitor presses play.
	let playing = $state(false);

	const steps = [
		{
			n: '01',
			title: 'Export',
			body: 'Open any chat and click Export Chat. You get a .llmchat file: plain, readable JSON with every message, role, timestamp and model. Or bulk-export your whole history into a single ZIP.',
			img: `${IMG}/shot-2.webp`,
			alt: 'The Context Porter popup after exporting 20 messages, next to the exported .llmchat file'
		},
		{
			n: '02',
			title: 'Compress',
			body: 'Optional. Drag the quality slider to trim filler and older versions of code that later messages replaced, so a long chat fits a fresh context window. It runs on your device in milliseconds, with no AI service involved. In the demo, a 20-message chat went from 2,412 to 1,038 tokens.',
			img: `${IMG}/shot-4.webp`,
			alt: 'Smart compression stats in the popup: 2.4K tokens down to 1.0K, 43% kept'
		},
		{
			n: '03',
			title: 'Continue',
			body: 'Convert the file to Markdown and attach it to a new chat on any model, or copy it straight to your clipboard. You always review it and press send yourself.',
			img: `${IMG}/shot-5.webp`,
			alt: 'The converted Markdown pasted into a new chat, ready for the user to send'
		}
	];

	const features = [
		{
			title: 'Export the chat you are on',
			body: 'One click on ChatGPT, Claude, Gemini or Grok. Name the export, or let it use the chat title.'
		},
		{
			title: 'Back up your whole history',
			body: 'Bulk-export ChatGPT and Claude conversations, and the Gemini chats in your sidebar, into one ZIP.'
		},
		{
			title: 'Compress without AI',
			body: 'A deterministic, offline pipeline ranks what matters and drops pleasantries and outdated code.'
		},
		{
			title: 'Copy and paste across tabs',
			body: 'Copy an export in one tab and paste it in another to convert it, no files needed.'
		}
	];

	const platforms = [
		{ name: 'ChatGPT', site: 'chatgpt.com', one: true, all: 'Yes' },
		{ name: 'Claude', site: 'claude.ai', one: true, all: 'Yes' },
		{ name: 'Gemini', site: 'gemini.google.com', one: true, all: 'Chats in the sidebar' },
		{ name: 'Grok', site: 'grok.com', one: true, all: 'Not yet' }
	];

	const permissions = [
		{
			what: 'Access to chatgpt.com, claude.ai, gemini.google.com and grok.com',
			why: 'To read your own conversations there when you click Export. No other website.'
		},
		{
			what: 'Active tab and tabs',
			why: 'To see which supported site the current tab is on, and to step through your Gemini chats during Export All.'
		},
		{
			what: 'Web requests (ChatGPT only)',
			why: "To reuse the session header ChatGPT's own page sends. Read in memory, never stored or sent elsewhere."
		},
		{
			what: 'Storage',
			why: 'Temporary export progress. A finished bulk export is deleted as soon as it is zipped.'
		},
		{
			what: 'Clipboard',
			why: 'Only when you press Copy or Paste.'
		}
	];

	const faqs = [
		{
			q: 'Is it free?',
			a: 'Yes. Context Porter is free and open source under the MIT license.'
		},
		{
			q: 'Does my conversation leave my browser?',
			a: 'No. There is no server, account or analytics. The extension only talks to the AI site you are already signed in to, and saves exports as files on your device.'
		},
		{
			q: 'Will it send messages for me?',
			a: 'Never. It does not type or send anything in a chat. You attach the file and press send yourself.'
		},
		{
			q: 'What does not carry over?',
			a: 'Interactive canvases and artifacts, the contents of images (they are referenced by name), and abandoned branches of edited messages. Only the active branch is exported.'
		},
		{
			q: 'Which browsers does it work in?',
			a: 'Chrome, and Chromium browsers that install extensions from the Chrome Web Store, such as Brave and Edge.'
		},
		{
			q: 'A site changed and export broke. What now?',
			a: 'AI sites change often. Open an issue on GitHub and it will be fixed in an update.'
		}
	];

	const llmchat = `{
  "version": "1.0",
  "standard": "llmchat",
  "metadata": {
    "title": "Rate limiting an Express API",
    "source_platform": "claude.ai",
    "total_messages": 20
  },
  "messages": [
    {
      "role": "user",
      "content": "I'm building a small Express API…",
      "timestamp": "2026-10-28T19:04:40Z"
    },
    …
  ]
}`;
</script>

<div class="cp-page not-prose">
	<!-- Hero -->
	<section class="hero">
		<div class="hero-copy">
			<p class="eyebrow">Chrome extension · Free · Open source</p>
			<div class="title-row">
				<svg class="mark" viewBox="0 0 96 96" aria-hidden="true">
					<rect width="96" height="96" rx="22" fill="#0E1013" />
					<path fill="#F3EFE6" d="M18 39A12 12 0 0 1 30 27H43V63H30L18 73Z" />
					<path fill="#FF4F1A" d="M53 23H66A12 12 0 0 1 78 35V47A12 12 0 0 1 66 59H53Z" />
				</svg>
				<h1>Context Porter</h1>
			</div>
			<p class="tagline">Take your context with you<span class="dot">.</span></p>
			<p class="lede">
				Move any AI conversation between ChatGPT, Claude, Gemini and Grok. Export it, shrink it on
				your device, and pick up where you left off on another model.
			</p>
			<div class="ctas">
				<a class="btn btn-primary" href={STORE_URL} target="_blank" rel="noopener noreferrer"
					>Add to Chrome</a
				>
				<a class="btn btn-ghost" href={REPO_URL} target="_blank" rel="noopener noreferrer"
					>View source on GitHub</a
				>
			</div>
			<p class="meta">No account · No server · No tracking</p>
		</div>
		<figure class="video">
			{#if playing}
				<iframe
					src="https://www.youtube-nocookie.com/embed/{VIDEO_ID}?autoplay=1&rel=0&playsinline=1"
					title="Context Porter: take control of your context (demo video)"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					referrerpolicy="strict-origin-when-cross-origin"
					allowfullscreen
				></iframe>
			{:else}
				<a
					class="video-facade"
					href={VIDEO_URL}
					target="_blank"
					rel="noopener noreferrer"
					aria-label="Play the Context Porter demo video"
					onclick={(e) => {
						e.preventDefault();
						playing = true;
					}}
				>
					<img src="{IMG}/cover.jpg" alt="" width="1600" height="900" fetchpriority="high" />
					<span class="play" aria-hidden="true">
						<svg viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z" /></svg>
					</span>
					<span class="video-time" aria-hidden="true">▶ 0:42 demo</span>
				</a>
			{/if}
		</figure>
	</section>

	<!-- Problem -->
	<section class="problem">
		<p class="stamp" aria-hidden="true">LIMIT REACHED</p>
		<h2>Your best chat is stuck in one app.</h2>
		<p>
			Long conversations hit limits. A new chat on another model knows nothing. Copying a whole
			conversation by hand is slow and messy. Context Porter reads the chat through the site you are
			already signed in to and hands you a clean, portable copy you can take anywhere.
		</p>
	</section>

	<!-- In the toolbar -->
	<section class="inline-shot" aria-labelledby="toolbar">
		<div class="inline-copy">
			<h2 id="toolbar">Right where you chat</h2>
			<p>
				Click the toolbar icon on ChatGPT, Claude, Gemini or Grok. The popup knows which site you
				are on and exports the conversation that is open, using the session you are already signed
				in with.
			</p>
		</div>
		<figure class="shot">
			<img
				src="{IMG}/shot-1.webp"
				alt="The Context Porter popup open over a long claude.ai conversation"
				width="1280"
				height="800"
				loading="lazy"
			/>
		</figure>
	</section>

	<!-- How it works -->
	<section class="steps" aria-labelledby="how">
		<h2 id="how">How it works</h2>
		{#each steps as step, i (step.n)}
			<div class="step" class:flip={i % 2 === 1}>
				<div class="step-copy">
					<span class="step-n">{step.n}</span>
					<h3>{step.title}</h3>
					<p>{step.body}</p>
				</div>
				<figure class="shot">
					<img src={step.img} alt={step.alt} width="1280" height="800" loading="lazy" />
				</figure>
			</div>
		{/each}
	</section>

	<!-- Features -->
	<section class="features" aria-labelledby="features">
		<h2 id="features">Everything in the box</h2>
		<div class="feature-grid">
			{#each features as f (f.title)}
				<div class="feature">
					<h3>{f.title}</h3>
					<p>{f.body}</p>
				</div>
			{/each}
		</div>
		<div class="wide">
			<figure class="shot">
				<img
					src="{IMG}/shot-3.webp"
					alt="Export All in progress on ChatGPT, packing 214 conversations into one ZIP"
					width="1280"
					height="800"
					loading="lazy"
				/>
			</figure>
			<div class="format">
				<h3>An open format you can keep</h3>
				<p>
					<code>.llmchat</code> is plain JSON: messages, roles, timestamps and model, with the platform's
					quirks kept out of the core. Read it, edit it, script it.
				</p>
				<div class="codebox"><pre><code>{llmchat}</code></pre></div>
			</div>
		</div>
	</section>

	<!-- Platforms -->
	<section class="platforms" aria-labelledby="platforms">
		<h2 id="platforms">Where it works</h2>
		<div class="table-wrap">
			<table>
				<thead>
					<tr
						><th scope="col">Platform</th><th scope="col">Export this chat</th><th scope="col"
							>Export all chats</th
						></tr
					>
				</thead>
				<tbody>
					{#each platforms as p (p.name)}
						<tr>
							<th scope="row">{p.name} <span class="site">{p.site}</span></th>
							<td>{p.one ? 'Yes' : 'No'}</td>
							<td class:muted={p.all === 'Not yet'}>{p.all}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</section>

	<!-- Privacy -->
	<section class="privacy" aria-labelledby="privacy">
		<div class="privacy-head">
			<h2 id="privacy">Private by design</h2>
			<p>
				Everything runs inside your browser. Context Porter only talks to the AI site you are
				already signed in to, using your existing session. Here is every permission it asks for, and
				why.
			</p>
			<a class="text-link" href={PRIVACY_URL} target="_blank" rel="noopener noreferrer"
				>Read the privacy policy</a
			>
		</div>
		<dl class="perms">
			{#each permissions as p (p.what)}
				<div class="perm">
					<dt>{p.what}</dt>
					<dd>{p.why}</dd>
				</div>
			{/each}
		</dl>
	</section>

	<!-- FAQ -->
	<section class="faq" aria-labelledby="faq">
		<h2 id="faq">Questions</h2>
		{#each faqs as f (f.q)}
			<details>
				<summary>{f.q}</summary>
				<p>{f.a}</p>
			</details>
		{/each}
		<p class="faq-more">
			Something else? <a
				class="text-link"
				href={ISSUES_URL}
				target="_blank"
				rel="noopener noreferrer">Ask on GitHub</a
			>
		</p>
	</section>

	<!-- Closing CTA -->
	<section class="closer">
		<h2>Take your context with you.</h2>
		<p>Free, open source, and it never leaves your browser.</p>
		<div class="ctas">
			<a class="btn btn-ink" href={STORE_URL} target="_blank" rel="noopener noreferrer"
				>Add to Chrome</a
			>
			<a class="btn btn-ink-ghost" href={REPO_URL} target="_blank" rel="noopener noreferrer"
				>Star on GitHub</a
			>
		</div>
	</section>

	<p class="disclaimer">
		Context Porter is an independent project, not affiliated with or endorsed by OpenAI, Anthropic,
		Google or xAI. ChatGPT, Claude, Gemini and Grok are trademarks of their respective owners.
	</p>
</div>

<style>
	@font-face {
		font-family: 'Geist';
		src: url('/projects/context-porter-media/fonts/Geist-Variable.woff2') format('woff2');
		font-weight: 100 900;
		font-display: swap;
	}
	@font-face {
		font-family: 'Geist Mono';
		src: url('/projects/context-porter-media/fonts/GeistMono-Variable.woff2') format('woff2');
		font-weight: 100 900;
		font-display: swap;
	}

	/* ── Page theme: Ink & Signal. Only applies while this page is in the document. ── */
	:global(html:has(.cp-page)) {
		--catppuccin-color-base: #0e1013;
		--catppuccin-color-mantle: #13161a;
		--catppuccin-color-crust: #0a0c0e;
		--catppuccin-color-surface0: #1c1f25;
		--catppuccin-color-surface1: #2a2e35;
		--catppuccin-color-surface2: #3a3f47;
		--catppuccin-color-overlay0: #5b616a;
		--catppuccin-color-overlay1: #737a84;
		--catppuccin-color-overlay2: #8a919c;
		--catppuccin-color-subtext0: #a7adb6;
		--catppuccin-color-subtext1: #c9c4b8;
		--catppuccin-color-text: #f3efe6;
		--catppuccin-color-peach: #ff4f1a;
		--current-accent-color: #ff4f1a !important; /* beats the inline accent the theme script sets */
	}
	:global(html.latte:has(.cp-page)) {
		--catppuccin-color-base: #f3efe6;
		--catppuccin-color-mantle: #ebe5d9;
		--catppuccin-color-crust: #e2dbcd;
		--catppuccin-color-surface0: #e4ddd0;
		--catppuccin-color-surface1: #d3cbbd;
		--catppuccin-color-surface2: #bdb5a6;
		--catppuccin-color-overlay0: #8a919c;
		--catppuccin-color-overlay1: #6b717a;
		--catppuccin-color-overlay2: #5b616a;
		--catppuccin-color-subtext0: #4a4f57;
		--catppuccin-color-subtext1: #3a3f47;
		--catppuccin-color-text: #0e1013;
		--catppuccin-color-peach: #c2330a;
		--current-accent-color: #c2330a !important; /* darker orange keeps text contrast on paper */
	}

	/* Widen the shared project article and swap its generic banner/header for this page's hero. */
	:global(article.prose:has(.cp-page)) {
		max-width: 72rem;
	}
	:global(article.prose:has(.cp-page) > header),
	:global(article.prose:has(.cp-page) > hr),
	:global(article.prose:has(.cp-page) > div:has(> img)) {
		display: none;
	}

	/* ── Page ── */
	.cp-page {
		--signal: #ff4f1a;
		--ink: #0e1013;
		--paper: #f3efe6;
		color: var(--color-text);
		line-height: 1.65;
	}
	.cp-page h1,
	.cp-page h2,
	.cp-page h3 {
		font-family: 'Geist', ui-sans-serif, system-ui, sans-serif;
		color: var(--color-text);
		letter-spacing: -0.03em;
		margin: 0;
	}
	.cp-page h2 {
		font-size: clamp(1.8rem, 3.2vw, 2.6rem);
		font-weight: 800;
		line-height: 1.08;
	}
	.cp-page h3 {
		font-size: 1.3rem;
		font-weight: 700;
		line-height: 1.2;
	}
	.cp-page p {
		margin: 0;
	}
	.cp-page section {
		margin: 0 0 6rem;
	}
	.cp-page code {
		font-family: 'Geist Mono', ui-monospace, monospace;
		font-size: 0.92em;
	}

	/* Hero */
	.hero {
		display: grid;
		gap: 3rem;
		padding-top: 1rem;
	}
	.eyebrow {
		font-family: 'Geist Mono', ui-monospace, monospace;
		font-size: 0.85rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--color-accent);
	}
	.title-row {
		display: flex;
		align-items: center;
		gap: 1.1rem;
		margin-top: 1rem;
	}
	.mark {
		width: clamp(3.4rem, 6vw, 4.6rem);
		height: auto;
		flex: none;
		border-radius: 22%;
		box-shadow: 0 0 0 1px color-mix(in srgb, var(--color-text) 14%, transparent);
	}
	.hero h1 {
		font-size: clamp(2.8rem, 7vw, 5.2rem);
		font-weight: 800;
		line-height: 0.95;
		letter-spacing: -0.045em;
	}
	.tagline {
		font-family: 'Geist', ui-sans-serif, system-ui, sans-serif;
		font-size: clamp(1.4rem, 2.6vw, 2rem);
		font-weight: 600;
		letter-spacing: -0.02em;
		margin-top: 1rem;
	}
	.tagline .dot {
		color: var(--signal);
	}
	.lede {
		max-width: 44rem;
		margin-top: 1.1rem;
		color: var(--color-subtext1);
		font-size: 1.05rem;
	}
	.ctas {
		display: flex;
		flex-wrap: wrap;
		gap: 0.9rem;
		margin-top: 2rem;
	}
	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.95rem 1.5rem;
		border-radius: 12px;
		font-family: 'Geist', ui-sans-serif, system-ui, sans-serif;
		font-weight: 700;
		font-size: 1.02rem;
		letter-spacing: -0.01em;
		text-decoration: none;
		transition:
			transform 0.15s ease,
			background-color 0.15s ease,
			border-color 0.15s ease;
	}
	.btn:hover {
		transform: translateY(-1px);
	}
	.btn:focus-visible,
	.text-link:focus-visible,
	summary:focus-visible {
		outline: 3px solid var(--signal);
		outline-offset: 3px;
	}
	.btn-primary {
		background: var(--signal);
		color: var(--ink);
	}
	.btn-primary:hover {
		background: #ff6a3d;
	}
	.btn-ghost {
		border: 2px solid var(--color-surface2);
		color: var(--color-text);
	}
	.btn-ghost:hover {
		border-color: var(--color-accent);
	}
	.meta {
		margin-top: 1.2rem;
		font-family: 'Geist Mono', ui-monospace, monospace;
		font-size: 0.85rem;
		color: var(--color-subtext0);
	}

	/* Screenshots */
	.shot {
		margin: 0;
		border-radius: 16px;
		overflow: hidden;
		border: 1px solid var(--color-surface1);
		box-shadow: 0 24px 60px rgba(0, 0, 0, 0.28);
		background: var(--paper);
	}
	.shot img {
		display: block;
		width: 100%;
		height: auto;
	}

	/* Hero video (click-to-play) */
	.video {
		position: relative;
		margin: 0;
		aspect-ratio: 16 / 9;
		border-radius: 16px;
		overflow: hidden;
		border: 1px solid var(--color-surface1);
		box-shadow: 0 24px 60px rgba(0, 0, 0, 0.28);
		background: #000;
	}
	.video iframe {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		border: 0;
	}
	.video-facade {
		position: absolute;
		inset: 0;
		display: block;
		cursor: pointer;
	}
	.video-facade img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.play {
		position: absolute;
		left: 50%;
		top: 50%;
		width: 88px;
		height: 88px;
		margin: -44px 0 0 -44px;
		border-radius: 50%;
		background: var(--ink);
		display: grid;
		place-items: center;
		box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
		transition: transform 0.15s ease;
	}
	.play svg {
		width: 38px;
		height: 38px;
		margin-left: 4px;
		fill: var(--signal);
	}
	.video-facade:hover .play {
		transform: scale(1.07);
	}
	.video-facade:focus-visible {
		outline: 3px solid var(--signal);
		outline-offset: -3px;
	}
	.video-time {
		position: absolute;
		right: 14px;
		bottom: 14px;
		padding: 0.45rem 0.65rem;
		border-radius: 8px;
		background: rgba(14, 16, 19, 0.85);
		color: var(--paper);
		font:
			600 0.8rem/1 'Geist Mono',
			ui-monospace,
			monospace;
	}

	/* Toolbar section */
	.inline-copy {
		max-width: 46rem;
		margin-bottom: 2rem;
	}
	.inline-copy p {
		margin-top: 1rem;
		color: var(--color-subtext1);
	}

	/* Problem */
	.problem {
		position: relative;
		max-width: 50rem;
	}
	.problem h2 {
		margin-top: 1.4rem;
	}
	.problem p:last-child {
		margin-top: 1.2rem;
		color: var(--color-subtext1);
		font-size: 1.05rem;
	}
	.stamp {
		display: inline-block;
		transform: rotate(-4deg);
		border: 5px solid var(--signal);
		border-radius: 10px;
		padding: 0.25rem 0.9rem 0.3rem;
		color: var(--signal);
		font-family: 'Geist', ui-sans-serif, system-ui, sans-serif;
		font-weight: 900;
		font-size: 1.35rem;
		letter-spacing: 0.02em;
	}

	/* Steps */
	.steps h2 {
		margin-bottom: 2.6rem;
	}
	.step {
		display: grid;
		gap: 2rem;
		align-items: center;
		margin-bottom: 4rem;
	}
	.step:last-child {
		margin-bottom: 0;
	}
	.step-n {
		font-family: 'Geist Mono', ui-monospace, monospace;
		font-weight: 700;
		font-size: 0.95rem;
		color: var(--color-accent);
	}
	.step h3 {
		font-size: clamp(1.6rem, 2.6vw, 2.1rem);
		font-weight: 800;
		margin-top: 0.4rem;
	}
	.step p {
		margin-top: 0.9rem;
		color: var(--color-subtext1);
	}

	/* Features */
	.features h2 {
		margin-bottom: 2rem;
	}
	.feature-grid {
		display: grid;
		gap: 1rem;
	}
	.feature {
		border: 1px solid var(--color-surface1);
		border-radius: 14px;
		padding: 1.4rem 1.5rem;
		background: var(--color-mantle);
		border-top: 4px solid var(--signal);
	}
	.feature p {
		margin-top: 0.6rem;
		color: var(--color-subtext1);
		font-size: 0.95rem;
	}
	.wide {
		display: grid;
		gap: 2rem;
		margin-top: 3rem;
		align-items: start;
	}
	.format p {
		margin-top: 0.7rem;
		color: var(--color-subtext1);
	}
	.format p code {
		color: var(--color-text);
		background: var(--color-surface0);
		border-radius: 6px;
		padding: 0.05em 0.35em;
		font-size: 0.9em;
	}
	/* The site forces pre backgrounds transparent, so the dark box lives on a wrapper. */
	.codebox {
		margin-top: 1.2rem;
		border-radius: 12px;
		background: #15181d;
		border: 1px solid var(--color-surface1);
		overflow-x: auto;
	}
	.codebox pre {
		margin: 0;
		padding: 1.2rem 1.3rem;
	}
	.codebox pre code {
		color: #d7dae0;
		background: none;
		padding: 0;
		font-size: 0.85rem;
		line-height: 1.55;
	}

	/* Platforms */
	.platforms h2 {
		margin-bottom: 1.6rem;
	}
	.table-wrap {
		overflow-x: auto;
		border: 1px solid var(--color-surface1);
		border-radius: 14px;
	}
	table {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.98rem;
	}
	th,
	td {
		text-align: left;
		padding: 1rem 1.2rem;
		border-bottom: 1px solid var(--color-surface0);
	}
	thead th {
		font-family: 'Geist Mono', ui-monospace, monospace;
		font-size: 0.8rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--color-subtext0);
		background: var(--color-mantle);
	}
	tbody tr:last-child th,
	tbody tr:last-child td {
		border-bottom: 0;
	}
	tbody th {
		font-weight: 700;
		color: var(--color-text);
	}
	.site {
		display: block;
		font-weight: 400;
		font-size: 0.82rem;
		color: var(--color-subtext0);
	}
	td.muted {
		color: var(--color-overlay1);
	}

	/* Privacy */
	.privacy {
		display: grid;
		gap: 2.5rem;
	}
	.privacy-head p {
		margin-top: 1rem;
		color: var(--color-subtext1);
	}
	.text-link {
		display: inline-block;
		margin-top: 1rem;
		color: var(--color-accent);
		font-weight: 700;
		text-decoration: underline;
		text-underline-offset: 4px;
	}
	.perms {
		margin: 0;
		display: grid;
		gap: 0.8rem;
	}
	.perm {
		padding: 1rem 1.2rem;
		border-radius: 12px;
		background: var(--color-mantle);
		border: 1px solid var(--color-surface0);
	}
	.perm dt {
		font-weight: 700;
		color: var(--color-text);
	}
	.perm dd {
		margin: 0.3rem 0 0;
		color: var(--color-subtext1);
		font-size: 0.95rem;
	}

	/* FAQ */
	.faq {
		max-width: 52rem;
	}
	.faq h2 {
		margin-bottom: 1.4rem;
	}
	details {
		border-bottom: 1px solid var(--color-surface1);
	}
	summary {
		cursor: pointer;
		list-style: none;
		padding: 1.1rem 0;
		font-family: 'Geist', ui-sans-serif, system-ui, sans-serif;
		font-weight: 700;
		font-size: 1.1rem;
		display: flex;
		justify-content: space-between;
		gap: 1rem;
	}
	summary::-webkit-details-marker {
		display: none;
	}
	summary::after {
		content: '+';
		color: var(--color-accent);
		font-weight: 800;
	}
	details[open] summary::after {
		content: '−';
	}
	details p {
		padding: 0 0 1.2rem;
		color: var(--color-subtext1);
	}
	.faq-more {
		margin-top: 1.4rem;
		color: var(--color-subtext0);
	}
	.faq-more .text-link {
		margin-top: 0;
	}

	/* Closing CTA: always ink on Signal, in both light and dark */
	.closer {
		background: var(--signal);
		color: var(--ink);
		border-radius: 22px;
		padding: clamp(2rem, 5vw, 3.5rem);
		margin-bottom: 2rem;
	}
	.closer h2 {
		color: var(--ink);
		font-size: clamp(2rem, 4.4vw, 3.4rem);
	}
	.closer p {
		margin-top: 0.8rem;
		font-size: 1.05rem;
	}
	.btn-ink {
		background: var(--ink);
		color: var(--paper);
	}
	.btn-ink:hover {
		background: #23272e;
	}
	.btn-ink-ghost {
		border: 2px solid var(--ink);
		color: var(--ink);
	}
	.btn-ink-ghost:hover {
		background: rgba(14, 16, 19, 0.08);
	}

	.disclaimer {
		font-size: 0.8rem;
		color: var(--color-overlay1);
		margin: 0 0 1rem;
	}

	@media (min-width: 900px) {
		.step {
			grid-template-columns: 1fr 1.35fr;
			gap: 3.5rem;
		}
		.step.flip .step-copy {
			order: 2;
		}
		.feature-grid {
			grid-template-columns: repeat(2, 1fr);
		}
		.wide {
			grid-template-columns: 1.25fr 1fr;
		}
		.privacy {
			grid-template-columns: 1fr 1.2fr;
			align-items: start;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.btn {
			transition: none;
		}
		.btn:hover {
			transform: none;
		}
	}
</style>
