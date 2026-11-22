<!--
	Landing page body for /projects/shelf-studio, rendered by content/projects/shelf-studio.svx.
	Everything here is scoped to this page. Global rules are gated on `:has(.ss-page)` because every
	project page links this CSS, and it stays loaded after you navigate away; the gate keeps it inert there.
-->
<script lang="ts">
	const REPO_URL = 'https://github.com/adit-0132/shelf-studio';
	const SETUP_URL = 'https://github.com/adit-0132/shelf-studio/blob/main/SETUP.md';
	const SECURITY_URL = 'https://github.com/adit-0132/shelf-studio#security-notes';
	const ISSUES_URL = 'https://github.com/adit-0132/shelf-studio/issues';
	const IMG = '/projects/shelf-studio-media';

	const scenes = [
		{ name: 'White studio', look: 'Seamless white, soft contact shadows, no props' },
		{ name: 'Stone plinth', look: 'Travertine plinth, warm-grey backdrop, window light' },
		{ name: 'Natural linen', look: 'Light linen with soft folds, diffused daylight' },
		{ name: 'Festive setting', look: 'Warm walnut, blurred marigolds and brass diyas' },
		{ name: 'Dark studio', look: 'Charcoal backdrop, low-key light, rim highlights' }
	];

	const angles = [
		{ name: 'Eye-level ¾', look: 'Product height, turned about 30°' },
		{ name: 'High angle', look: 'About 45° above, looking down' },
		{ name: 'Low angle', look: 'Near the base, looking up about 10°' },
		{ name: 'Overhead', look: 'Steeply above' },
		{ name: 'Turned view', look: 'Orbited about 60° around the product' }
	];

	const steps = [
		{
			n: '01',
			title: 'Add your photos',
			body: 'Drop one to five phone photos of the product. Add what you know (brand, material, number of pieces, sizes, weights, notes); every field is optional. Several products in one batch appear together in every shot.',
			img: `${IMG}/ui-top.webp`,
			w: 1760,
			h: 1100,
			alt: 'The Shelf Studio app: product details on the left, the generated listing and its progress on the right'
		},
		{
			n: '02',
			title: 'Pick a photo set',
			body: 'Choose five scenes or five camera angles, then click Generate. Codex makes every image with all of your photos as references, and the results appear as they finish, usually within a few minutes.',
			img: `${IMG}/ui-angles.webp`,
			w: 1760,
			h: 1100,
			alt: "Five camera angles of the idol in the app's gallery: eye-level, high, low, overhead and turned"
		},
		{
			n: '03',
			title: 'Read the listing',
			body: 'A catalogue title, an Amazon title and Item Highlights with live character counts, five feature bullets, two descriptions and a specification table built from your exact inputs. Review notes flag missing or conflicting facts and stay out of the customer-facing text.',
			img: `${IMG}/ui-listing.webp`,
			w: 1200,
			h: 1080,
			alt: 'The generated listing with the Amazon fields open: a 61/75 Amazon title and 118/125 item highlights'
		},
		{
			n: '04',
			title: 'Review and download',
			body: 'Check every image against the real piece, then download the photos and the copy as one ZIP. Batches are saved, so you can retry only what is missing or come back to them later.',
			img: `${IMG}/ui-gallery.webp`,
			w: 1760,
			h: 1100,
			alt: "Five scene photos of the idol in the app's gallery, above the Download listing and images button"
		}
	];

	const features = [
		{
			title: 'Every reference, every shot',
			body: 'Each image call gets all of your photos, with strict instructions to keep the shape, proportions, piece count, colours and decorative detail. Only the setting, the light or the camera changes.'
		},
		{
			title: "Copy that won't make things up",
			body: 'A fact-first writing guide. It never infers grade, purity, plating, capacity, safety or origin from a photo, and it never invents a brand.'
		},
		{
			title: 'Marketplace limits, checked',
			body: 'Amazon title up to 75 characters, Item Highlights up to 125, description up to 2,000, with warnings for punctuation and repeated words.'
		},
		{
			title: 'Batches that survive restarts',
			body: 'Retry makes only the missing outputs, Stop keeps finished images, and an interrupted batch waits for you, so nothing is charged twice automatically.'
		},
		{
			title: 'Your house style',
			body: 'Save a listing as a writing example to guide the tone of later ones (its style, never its facts), or load a writing guide for your own brand or category.'
		},
		{
			title: 'Nothing hidden',
			body: 'Every batch keeps the exact prompt it sent in request.txt, and the app validates every file before showing it.'
		}
	];

	const needs = [
		{ what: 'Node.js 22 or newer', detail: 'No npm dependencies to install.' },
		{
			what: 'The Codex CLI',
			detail:
				'Signed in with a ChatGPT plan that includes image generation. No API key. Each batch counts against that plan’s usage limits.'
		},
		{
			what: 'Your computer',
			detail:
				'It listens on 127.0.0.1 only. Tested on Linux, where an optional installer adds it to the app menu; macOS and Windows are not tested yet.'
		},
		{
			what: 'A few minutes',
			detail: 'A batch usually takes a few minutes; the one on this page took four.'
		}
	];

	const limits = [
		'It redraws the product. The image model re-renders the whole photo, so fine patterns and small lettering can drift, and finishes can come out cleaner than the real piece. Review every image before you publish.',
		'Amazon’s main image must be a real photo of the product. Treat the white studio shot as a clean secondary image unless your marketplace’s rules say otherwise.',
		'In camera-angles mode, sides that no photo shows are approximations. The prompt keeps them plain and never adds ornament, so send photos from several sides when you can.',
		'It is local by design, so you can’t share it on a network or use it from your phone.'
	];

	const dataFlow = [
		{
			where: 'Your computer',
			what: 'The app, your photos, your details and every batch stay in a folder on your machine. There is no account, analytics or server of its own.'
		},
		{
			where: 'OpenAI, through Codex',
			what: 'To make the images and the copy, Codex sends your photos, details and the prompt to OpenAI under your ChatGPT sign-in, the same as using Codex yourself. Your plan’s terms apply.'
		},
		{
			where: 'Your Codex sign-in',
			what: 'Never read or exposed. Shelf Studio runs the codex command you already signed in to, in a sandbox that can write only inside the batch’s folder.'
		},
		{
			where: 'Other websites',
			what: 'Kept out. The app rejects foreign Host and Origin headers, needs a per-session token for every change, and serves a strict Content Security Policy.'
		}
	];

	const faqs = [
		{
			q: 'Is it free?',
			a: 'The app is free and open source under GPL-3.0-or-later. Generation runs on your ChatGPT plan, which must include Codex image generation, and counts against its usage limits.'
		},
		{
			q: 'Do I need an OpenAI API key?',
			a: 'No. It uses the image generation built into your Codex CLI sign-in.'
		},
		{
			q: 'Will my product look exactly the same?',
			a: 'It is built to keep the product, and the close-ups above show how much carries through. But the model redraws the photo, so small details can drift. Always compare each image with the real piece.'
		},
		{
			q: 'Is it only for idols and handicrafts?',
			a: 'No. The app is brand- and category-neutral; the Ganesha is the example on this page. Detailed pieces like engraving, inlay and printed patterns are what it was built to protect.'
		},
		{
			q: 'Can I use it from my phone?',
			a: 'Not directly. It only listens on your own computer. Take the photos on your phone, then drop them into the app on your computer.'
		},
		{
			q: 'Something broke. What now?',
			a: 'The setup guide has a check for each step and a troubleshooting section. If that does not fix it, open an issue on GitHub.'
		}
	];

	const install = `npm install -g @openai/codex
codex login

git clone https://github.com/adit-0132/shelf-studio.git
cd shelf-studio
npm start        # then open http://localhost:4317`;
</script>

{#snippet lota(cls: string, maskId: string)}
	<svg class={cls} viewBox="0 0 64 64" aria-hidden="true">
		<defs>
			<mask id={maskId} maskUnits="userSpaceOnUse">
				<rect width="64" height="64" fill="white" />
				<rect x="0" y="27" width="64" height="2" fill="black" />
				<rect x="0" y="39" width="64" height="2" fill="black" />
				<path d="M21 30.5Q24.5 33 21 37.5Q17.5 33 21 30.5Z" fill="black" />
				<path d="M32 30.5Q35.5 33 32 37.5Q28.5 33 32 30.5Z" fill="black" />
				<path d="M43 30.5Q46.5 33 43 37.5Q39.5 33 43 30.5Z" fill="black" />
			</mask>
		</defs>
		<g fill="currentColor">
			<g mask="url(#{maskId})">
				<path
					d="M20 5H44V10H39V15C50 17 55 25 55 33C55 42 49 47 42 48V53H22V48C15 47 9 42 9 33C9 25 14 17 25 15V10H20Z"
				/>
			</g>
			<rect x="4" y="53" width="56" height="5" rx="1.5" />
		</g>
	</svg>
{/snippet}

<div class="ss-page not-prose">
	<!-- Hero -->
	<section class="hero">
		<div class="hero-copy">
			<p class="eyebrow">Local app · Open source · Codex CLI</p>
			<div class="title-row">
				{@render lota('mark', 'ss-lota-hero')}
				<h1>Shelf Studio</h1>
			</div>
			<p class="tagline">Phone photo in. <em>Catalog out.</em></p>
			<p class="lede">
				Turn rough phone photos of a product into catalog photos and the listing copy to go with
				them. It runs on your computer through the image generation in your Codex CLI sign-in, and
				it is built to keep the real object: its shape, colours and fine detail.
			</p>
			<div class="ctas">
				<a class="btn btn-primary" href={REPO_URL} target="_blank" rel="noopener noreferrer"
					>Get it on GitHub</a
				>
				<a class="btn btn-ghost" href={SETUP_URL} target="_blank" rel="noopener noreferrer"
					>Read the setup guide</a
				>
			</div>
			<p class="meta">Runs on your computer · No API key · No sign-up of its own</p>
		</div>
		<figure class="hero-shot">
			<img
				src="{IMG}/hero.webp"
				alt="A rough phone photo of an inlaid brass Ganesha next to four catalog photos made from it: white studio, festive setting, high angle and dark studio"
				width="1600"
				height="900"
				fetchpriority="high"
			/>
			<figcaption>Real outputs from one batch, unretouched. Left: the phone photo.</figcaption>
		</figure>
	</section>

	<!-- Problem -->
	<section class="problem" aria-labelledby="problem">
		<figure class="photo">
			<img
				src="{IMG}/phone-photo-marked.webp"
				alt="A phone photo of an inlaid brass Ganesha in a shop, with glitter wallpaper, the photographer's shadow and a gift box circled"
				width="720"
				height="922"
				loading="lazy"
			/>
		</figure>
		<div class="problem-copy">
			<h2 id="problem">Phone photos don't sell.</h2>
			<p>
				Small sellers photograph products where they stand: on a shop shelf, against glitter
				wallpaper, with their own shadow in the frame. The piece is beautiful; the photo is not.
			</p>
			<p>
				An image generator will happily change the product along with the background. For a handmade
				piece, that detail is the whole point. Shelf Studio changes the setting, the light or the
				camera, and keeps the object.
			</p>
		</div>
	</section>

	<!-- Scenes -->
	<section class="showcase" aria-labelledby="scenes">
		<div class="section-head">
			<h2 id="scenes">One batch, <em>five scenes.</em></h2>
			<p>The same view in five settings and lighting moods. Real outputs, unretouched.</p>
		</div>
		<figure class="shot">
			<img
				src="{IMG}/hero-scenes.webp"
				alt="The phone photo of the Ganesha next to five catalog scenes made from it: white studio, stone plinth, natural linen, festive setting and dark studio"
				width="1600"
				height="900"
				loading="lazy"
			/>
		</figure>
		<ul class="chips">
			{#each scenes as s (s.name)}
				<li><strong>{s.name}</strong><span>{s.look}</span></li>
			{/each}
		</ul>
	</section>

	<!-- Angles -->
	<section class="showcase" aria-labelledby="angles">
		<div class="section-head">
			<h2 id="angles">Or <em>five camera angles.</em></h2>
			<p>
				The camera moves; the product stays the same. The settings stay plain, so the viewpoint is
				what varies.
			</p>
		</div>
		<figure class="shot">
			<img
				src="{IMG}/hero-angles.webp"
				alt="The same phone photo next to five camera views of the idol: eye-level, high, low, overhead and turned"
				width="1600"
				height="900"
				loading="lazy"
			/>
		</figure>
		<ul class="chips">
			{#each angles as a (a.name)}
				<li><strong>{a.name}</strong><span>{a.look}</span></li>
			{/each}
		</ul>
	</section>

	<!-- Fidelity -->
	<section class="closer-look" aria-labelledby="closer">
		<div class="closer-copy">
			<h2 id="closer">Look closer.</h2>
			<p>
				The same region of the idol, in the phone photo and in three outputs. The turquoise sash,
				the red squares set in rings and both quartered red blocks carry through.
			</p>
			<p>
				The drift shows too: the brass comes out cleaner than the real piece's antique patina. That
				is the honest shape of generative fidelity, and why the app asks you to review before you
				publish.
			</p>
		</div>
		<figure class="shot">
			<img
				src="{IMG}/fidelity-closeup.webp"
				alt="The same detail region in the phone photo and three outputs: the sash tiles, the red squares in rings and the quartered red blocks carry through"
				width="1600"
				height="900"
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
					<img src={step.img} alt={step.alt} width={step.w} height={step.h} loading="lazy" />
				</figure>
			</div>
		{/each}
	</section>

	<!-- Features -->
	<section class="features" aria-labelledby="features">
		<h2 id="features">Built around the product</h2>
		<div class="feature-grid">
			{#each features as f (f.title)}
				<div class="feature">
					<h3>{f.title}</h3>
					<p>{f.body}</p>
				</div>
			{/each}
		</div>
	</section>

	<!-- Get started -->
	<section class="start" aria-labelledby="start">
		<div>
			<h2 id="start">What you need</h2>
			<dl class="needs">
				{#each needs as n (n.what)}
					<div class="need">
						<dt>{n.what}</dt>
						<dd>{n.detail}</dd>
					</div>
				{/each}
			</dl>
		</div>
		<div class="start-run">
			<h3>Get started</h3>
			<div class="codebox"><pre><code>{install}</code></pre></div>
			<p>
				The header should say <strong>Connected to Codex</strong>. The
				<a class="text-link" href={SETUP_URL} target="_blank" rel="noopener noreferrer"
					>setup guide</a
				> checks each step, and it is written for people and for coding agents setting it up for someone.
			</p>
		</div>
	</section>

	<!-- Limits -->
	<section class="limits" aria-labelledby="limits">
		<h2 id="limits">Limits, honestly</h2>
		<ul>
			{#each limits as l (l)}
				<li>{l}</li>
			{/each}
		</ul>
	</section>

	<!-- Privacy -->
	<section class="privacy" aria-labelledby="privacy">
		<div class="privacy-head">
			<h2 id="privacy">Where your photos go</h2>
			<p>
				Shelf Studio is a personal tool that runs on your own computer. Here is everywhere your
				photos and details travel, and what keeps the app to itself.
			</p>
			<a class="text-link" href={SECURITY_URL} target="_blank" rel="noopener noreferrer"
				>Read the security notes</a
			>
		</div>
		<dl class="flow">
			{#each dataFlow as d (d.where)}
				<div class="flow-row">
					<dt>{d.where}</dt>
					<dd>{d.what}</dd>
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
	<section class="cta-band">
		<svg class="band" aria-hidden="true">
			<defs>
				<pattern id="ss-band" width="40" height="24" patternUnits="userSpaceOnUse">
					<rect y="2" width="40" height="1.5" />
					<rect y="20.5" width="40" height="1.5" />
					<path d="M10 7Q14 12 10 17Q6 12 10 7Z" />
					<circle cx="30" cy="12" r="1.6" />
				</pattern>
			</defs>
			<rect width="100%" height="24" fill="url(#ss-band)" />
		</svg>
		<div class="cta-inner">
			{@render lota('cta-mark', 'ss-lota-cta')}
			<h2>Phone photo in. <em>Catalog out.</em></h2>
			<p>Open source. Runs on your computer. Keeps the product.</p>
			<div class="ctas">
				<a class="btn btn-paper" href={REPO_URL} target="_blank" rel="noopener noreferrer"
					>Star on GitHub</a
				>
				<a class="btn btn-paper-ghost" href={SETUP_URL} target="_blank" rel="noopener noreferrer"
					>Read the setup guide</a
				>
			</div>
		</div>
	</section>

	<p class="disclaimer">
		Shelf Studio is an independent project, not affiliated with or endorsed by OpenAI, Amazon or
		Flipkart. ChatGPT and Codex are trademarks of OpenAI. The example photos are of the author's own
		product.
	</p>
</div>

<style>
	@font-face {
		font-family: 'Instrument Serif';
		src: url('/projects/shelf-studio-media/fonts/InstrumentSerif-normal-400.woff2') format('woff2');
		font-style: normal;
		font-weight: 400;
		font-display: swap;
	}
	@font-face {
		font-family: 'Instrument Serif';
		src: url('/projects/shelf-studio-media/fonts/InstrumentSerif-italic-400.woff2') format('woff2');
		font-style: italic;
		font-weight: 400;
		font-display: swap;
	}
	@font-face {
		font-family: 'Inter';
		src: url('/projects/shelf-studio-media/fonts/Inter-Variable.woff2') format('woff2');
		font-weight: 400 700;
		font-display: swap;
	}

	/* ── Page theme: Studio Sage. Only applies while this page is in the document. ── */
	:global(html:has(.ss-page)) {
		--catppuccin-color-base: #1e231f;
		--catppuccin-color-mantle: #232924;
		--catppuccin-color-crust: #191d1a;
		--catppuccin-color-surface0: #2a312c;
		--catppuccin-color-surface1: #353d37;
		--catppuccin-color-surface2: #46504a;
		--catppuccin-color-overlay0: #66706a;
		--catppuccin-color-overlay1: #8f988f;
		--catppuccin-color-overlay2: #a0a9a0;
		--catppuccin-color-subtext0: #b2baaf;
		--catppuccin-color-subtext1: #d0d5cb;
		--catppuccin-color-text: #f6f5f1;
		--catppuccin-color-green: #a9c296;
		--current-accent-color: #a9c296 !important; /* sage on ink; beats the inline accent the theme script sets */
	}
	:global(html.latte:has(.ss-page)) {
		--catppuccin-color-base: #f6f5f1;
		--catppuccin-color-mantle: #efeee8;
		--catppuccin-color-crust: #e8e7e0;
		--catppuccin-color-surface0: #e6e5dd;
		--catppuccin-color-surface1: #d9d8cf;
		--catppuccin-color-surface2: #c4c3b8;
		--catppuccin-color-overlay0: #8e968c;
		--catppuccin-color-overlay1: #646c62;
		--catppuccin-color-overlay2: #555d53;
		--catppuccin-color-subtext0: #4b534b;
		--catppuccin-color-subtext1: #39413a;
		--catppuccin-color-text: #1e231f;
		--catppuccin-color-green: #385741;
		--current-accent-color: #385741 !important; /* the app's own green; text-safe on paper */
	}

	/* ── Page ── */
	.ss-page {
		--paper: #f6f5f1;
		--ink: #1e231f;
		--green: #385741;
		--sage: #a9c296;
		color: var(--color-text);
		font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
		line-height: 1.65;
	}
	.ss-page h1,
	.ss-page h2 {
		font-family: 'Instrument Serif', ui-serif, Georgia, serif;
		font-weight: 400;
		color: var(--color-text);
		letter-spacing: -0.01em;
		margin: 0;
	}
	.ss-page h2 {
		font-size: clamp(2.2rem, 4.2vw, 3.3rem);
		line-height: 1.05;
	}
	.ss-page h2 em,
	.tagline em {
		font-style: italic;
		color: var(--color-accent);
	}
	.ss-page h3 {
		font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
		font-size: 1.15rem;
		font-weight: 650;
		line-height: 1.3;
		letter-spacing: -0.01em;
		color: var(--color-text);
		margin: 0;
	}
	.ss-page p {
		margin: 0;
	}
	.ss-page section {
		margin: 0 0 6.5rem;
	}
	.ss-page figure {
		margin: 0;
	}

	/* Hero */
	.hero {
		display: grid;
		gap: 3rem;
		padding-top: 1rem;
	}
	.eyebrow {
		font-size: 0.82rem;
		font-weight: 600;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--color-accent);
	}
	.title-row {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-top: 1rem;
	}
	.mark {
		width: clamp(3.2rem, 6vw, 4.4rem);
		height: auto;
		flex: none;
		color: var(--color-accent);
	}
	.hero h1 {
		font-size: clamp(3.4rem, 8.5vw, 6.2rem);
		line-height: 0.95;
		letter-spacing: -0.02em;
	}
	.tagline {
		font-family: 'Instrument Serif', ui-serif, Georgia, serif;
		font-size: clamp(1.7rem, 3.2vw, 2.4rem);
		line-height: 1.15;
		margin-top: 0.9rem;
	}
	.lede {
		max-width: 44rem;
		margin-top: 1.1rem;
		color: var(--color-subtext1);
		font-size: 1.06rem;
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
		padding: 0.9rem 1.45rem;
		border-radius: 12px;
		font-weight: 650;
		font-size: 1rem;
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
		outline: 3px solid var(--color-accent);
		outline-offset: 3px;
	}
	.btn-primary {
		background: var(--color-accent);
		color: var(--color-base);
	}
	.btn-primary:hover {
		filter: brightness(1.08);
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
		font-size: 0.88rem;
		color: var(--color-subtext0);
	}

	/* Hero image */
	.hero-shot img {
		display: block;
		width: 100%;
		height: auto;
		border-radius: 18px;
		border: 1px solid var(--color-surface1);
		box-shadow: 0 18px 40px rgba(30, 35, 31, 0.22);
	}
	.hero-shot figcaption {
		margin-top: 0.7rem;
		font-size: 0.85rem;
		color: var(--color-subtext0);
	}

	/* Screenshots and photos */
	.shot,
	.photo {
		border-radius: 16px;
		overflow: hidden;
		border: 1px solid var(--color-surface1);
		box-shadow: 0 18px 40px rgba(30, 35, 31, 0.18);
		background: var(--paper);
	}
	.shot img,
	.photo img {
		display: block;
		width: 100%;
		height: auto;
	}

	.problem > *,
	.closer-look > *,
	.step > *,
	.start > *,
	.privacy > * {
		min-width: 0;
	}

	/* Problem */
	.problem {
		display: grid;
		gap: 2.5rem;
		align-items: center;
	}
	.photo {
		max-width: 26rem;
		border: 0;
		box-shadow: none;
		background: none;
	}
	.problem-copy p {
		margin-top: 1.1rem;
		color: var(--color-subtext1);
		font-size: 1.05rem;
		max-width: 38rem;
	}

	/* Scenes and angles */
	.section-head {
		max-width: 46rem;
		margin-bottom: 1.8rem;
	}
	.section-head p {
		margin-top: 0.8rem;
		color: var(--color-subtext1);
	}
	.chips {
		list-style: none;
		margin: 1.4rem 0 0;
		padding: 0;
		display: grid;
		gap: 0.7rem;
	}
	.chips li {
		margin: 0;
		padding: 0.8rem 1rem;
		border-radius: 12px;
		background: var(--color-mantle);
		border: 1px solid var(--color-surface0);
	}
	.chips strong {
		display: block;
		font-weight: 650;
		color: var(--color-text);
	}
	.chips span {
		display: block;
		font-size: 0.88rem;
		color: var(--color-subtext0);
		line-height: 1.45;
		margin-top: 0.15rem;
	}

	/* Look closer */
	.closer-look {
		display: grid;
		gap: 2rem;
		align-items: center;
	}
	.closer-copy {
		max-width: 46rem;
	}
	.closer-copy p {
		margin-top: 1rem;
		color: var(--color-subtext1);
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
		font-weight: 700;
		font-size: 0.92rem;
		letter-spacing: 0.06em;
		color: var(--color-accent);
	}
	.step h3 {
		font-family: 'Instrument Serif', ui-serif, Georgia, serif;
		font-weight: 400;
		font-size: clamp(1.9rem, 3vw, 2.4rem);
		line-height: 1.1;
		margin-top: 0.3rem;
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
		border-top: 4px solid var(--color-accent);
		border-radius: 14px;
		padding: 1.4rem 1.5rem;
		background: var(--color-mantle);
	}
	.feature p {
		margin-top: 0.6rem;
		color: var(--color-subtext1);
		font-size: 0.95rem;
	}

	/* What you need + get started */
	.start {
		display: grid;
		gap: 2.5rem;
		align-items: start;
	}
	.needs {
		margin: 1.6rem 0 0;
		border: 1px solid var(--color-surface1);
		border-radius: 14px;
		overflow: hidden;
	}
	.need {
		padding: 1rem 1.2rem;
		border-bottom: 1px solid var(--color-surface0);
	}
	.need:last-child {
		border-bottom: 0;
	}
	.need dt {
		font-weight: 650;
		color: var(--color-text);
	}
	.need dd {
		margin: 0.25rem 0 0;
		color: var(--color-subtext1);
		font-size: 0.95rem;
	}
	.start-run h3 {
		margin-top: 0.4rem;
	}
	.start-run p {
		margin-top: 1rem;
		color: var(--color-subtext1);
		font-size: 0.95rem;
	}
	.start-run strong {
		color: var(--color-text);
	}
	/* The site forces pre backgrounds transparent and colours code with the accent, so the box lives on a wrapper. */
	.codebox {
		margin-top: 1rem;
		border-radius: 12px;
		background: #171b18;
		border: 1px solid var(--color-surface1);
		overflow-x: auto;
	}
	.codebox pre {
		margin: 0;
		padding: 1.2rem 1.3rem;
	}
	.codebox pre code {
		font-family: ui-monospace, 'SFMono-Regular', Menlo, monospace;
		color: #e4e8df;
		background: none;
		padding: 0;
		font-size: 0.86rem;
		line-height: 1.6;
	}

	/* Limits */
	.limits {
		max-width: 52rem;
	}
	.limits ul {
		margin: 1.4rem 0 0;
		padding: 0;
		list-style: none;
		display: grid;
		gap: 0.8rem;
	}
	.limits li {
		margin: 0;
		padding: 0.9rem 1.1rem 0.9rem 1.3rem;
		border-left: 3px solid var(--color-accent);
		background: var(--color-mantle);
		border-radius: 0 12px 12px 0;
		color: var(--color-subtext1);
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
		color: var(--color-accent);
		font-weight: 650;
		text-decoration: underline;
		text-underline-offset: 4px;
	}
	.privacy-head .text-link {
		display: inline-block;
		margin-top: 1rem;
	}
	.flow {
		margin: 0;
		display: grid;
		gap: 0.8rem;
	}
	.flow-row {
		padding: 1rem 1.2rem;
		border-radius: 12px;
		background: var(--color-mantle);
		border: 1px solid var(--color-surface0);
	}
	.flow-row dt {
		font-weight: 650;
		color: var(--color-text);
	}
	.flow-row dd {
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
		font-weight: 650;
		font-size: 1.08rem;
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
		font-weight: 700;
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

	/* Closing band: always paper on the app's green, in light and dark */
	.cta-band {
		background: var(--green);
		color: var(--paper);
		border-radius: 22px;
		overflow: hidden;
		margin-bottom: 2rem !important;
	}
	.band {
		display: block;
		width: 100%;
		height: 24px;
		margin-top: 1.4rem;
		fill: var(--sage);
		opacity: 0.85;
	}
	.cta-inner {
		padding: clamp(1.6rem, 4.5vw, 3rem) clamp(1.6rem, 5vw, 3.5rem) clamp(2rem, 5vw, 3.5rem);
	}
	.cta-mark {
		width: 3rem;
		height: auto;
		color: var(--sage);
	}
	.cta-band h2 {
		color: var(--paper);
		font-size: clamp(2.3rem, 5vw, 3.8rem);
		margin-top: 0.8rem;
	}
	.cta-band h2 em {
		color: var(--sage);
	}
	.cta-band p {
		margin-top: 0.7rem;
		font-size: 1.05rem;
		color: #e3e8dd;
	}
	.btn-paper {
		background: var(--paper);
		color: var(--ink);
	}
	.btn-paper:hover {
		background: #ffffff;
	}
	.btn-paper-ghost {
		border: 2px solid rgba(246, 245, 241, 0.7);
		color: var(--paper);
	}
	.btn-paper-ghost:hover {
		background: rgba(246, 245, 241, 0.1);
	}
	.cta-band .btn:focus-visible {
		outline-color: var(--paper);
	}

	.disclaimer {
		font-size: 0.8rem;
		color: var(--color-overlay1);
		margin: 0 0 1rem;
	}

	@media (min-width: 640px) {
		.chips {
			grid-template-columns: repeat(2, 1fr);
		}
	}
	@media (min-width: 900px) {
		.problem {
			grid-template-columns: 0.8fr 1.2fr;
			gap: 4rem;
		}
		.chips {
			grid-template-columns: repeat(5, 1fr);
		}
		.step {
			grid-template-columns: 1fr 1.35fr;
			gap: 3.5rem;
		}
		.step.flip .step-copy {
			order: 2;
		}
		.feature-grid {
			grid-template-columns: repeat(3, 1fr);
		}
		.start {
			grid-template-columns: 1fr 1fr;
			gap: 3.5rem;
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
