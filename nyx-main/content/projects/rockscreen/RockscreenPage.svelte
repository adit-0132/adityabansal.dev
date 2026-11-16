<!--
	Landing page body for /projects/rockscreen, rendered by content/projects/rockscreen.svx.
	Everything here is scoped to this page. Global rules are gated on `:has(.rs-page)` because project
	modules load eagerly, so this component's CSS ships with other pages too; the gate keeps it inert there.
-->
<script lang="ts">
	const REPO_URL = 'https://github.com/adit-0132/rockscreen';
	const DOWNLOAD_URL = 'https://github.com/adit-0132/rockscreen/releases/latest';
	const OBTAINIUM_URL =
		'https://apps.obtainium.imranr.dev/redirect?r=obtainium://add/https://github.com/adit-0132/rockscreen';
	const PRIVACY_URL = 'https://github.com/adit-0132/rockscreen/blob/master/PRIVACY.md';
	const ISSUES_URL = 'https://github.com/adit-0132/rockscreen/issues';
	const LRCLIB_URL = 'https://lrclib.net';
	const IMG = '/projects/rockscreen-media';

	const steps = [
		{
			n: '01',
			title: 'Give it access',
			body: 'Rockscreen needs notification access to see what is playing, and permission to show a full-screen notification so it can open over the lock screen. The app walks you through both. If your phone blocks full-screen notifications, "Display over other apps" is an optional fallback.',
			imgs: [
				{
					src: `${IMG}/settings-access.webp`,
					alt: "Rockscreen's settings: the lyrics switch is on, and notifications and full-screen notifications are allowed"
				}
			]
		},
		{
			n: '02',
			title: 'Play, then wake your phone',
			body: 'Start a song in Spotify or any music app that shows playback controls in your notifications. Wake the phone without unlocking it: the lyrics are already there, the current line lit and the rest fading out, moving in time with the music. Play, pause and skip right from the lock screen.',
			imgs: [
				{
					src: `${IMG}/lock-carry.webp`,
					alt: 'Rockscreen over the lock screen: the clock, the playing song with controls, and its lyrics with the current line in bold'
				}
			]
		},
		{
			n: '03',
			title: 'Make it yours',
			body: 'Pick a font (Round, Sharp or Serif), the lyric size, how strongly the other lines fade, how much of the album colours glow through, and whether the clock shows. Unlock, and Rockscreen gets out of the way.',
			imgs: [
				{
					src: `${IMG}/lock-serif.webp`,
					alt: 'The lyrics in the Serif font with a teal album-colour glow'
				},
				{
					src: `${IMG}/settings-appearance.webp`,
					alt: 'Appearance settings: background intensity, lyric size, focus intensity, lyric font and the clock switch'
				}
			]
		}
	];

	const features = [
		{
			title: 'In time with the music',
			body: 'Line-synced lyrics from LRCLIB, the open, community-run lyrics database. The current line is lit; the lines around it fade.'
		},
		{
			title: 'Album-art colours',
			body: "The background picks up the colours of the song's artwork, with play, pause and skip under the clock."
		},
		{
			title: 'Stays on while you sing',
			body: 'The screen stays on while lyrics play over the lock screen. Press power to turn it off, as usual.'
		},
		{
			title: 'Out of the way',
			body: 'It opens only while music plays and the song has lyrics, and closes the moment you unlock.'
		}
	];

	type Status = 'yes' | 'untested' | 'no';
	const support: { setup: string; status: Status; label: string; note?: string }[] = [
		{
			setup: 'Spotify on a vivo phone, Android 15',
			status: 'yes',
			label: 'Tested on a real phone'
		},
		{
			setup: 'Android 16 emulator with a test music player',
			status: 'yes',
			label: 'Tested'
		},
		{
			setup: 'Other music apps with playback controls in notifications',
			status: 'untested',
			label: 'Should work, not tested yet',
			note: 'YouTube Music included.'
		},
		{
			setup: 'Pixel, Samsung, Xiaomi, OnePlus and other phones',
			status: 'untested',
			label: 'Not tested yet',
			note: 'If your phone blocks full-screen notifications, turn on "Display over other apps".'
		},
		{
			setup: 'Android 8.1 to 14',
			status: 'untested',
			label: 'Supported, not tested yet'
		},
		{
			setup: 'Phones that unlock the instant you wake them',
			status: 'no',
			label: 'Not on a normal wake',
			note: 'For example a fingerprint sensor in the power button. Leave the phone on a desk or stand, or wake it another way.'
		},
		{
			setup: 'Lock screen set to "None"',
			status: 'no',
			label: "Doesn't work",
			note: 'Rockscreen needs a lock screen to appear on: swipe, pattern, PIN or password.'
		}
	];

	const permissions = [
		{
			what: 'Notification access',
			why: "To read the song, artist, album and playback position from your music app's media session. It looks at nothing else, apart from the artwork of media notifications."
		},
		{
			what: 'Internet',
			why: 'To look up lyrics on lrclib.net.'
		},
		{
			what: 'Notifications and full-screen notifications',
			why: 'A silent full-screen notification opens the lyrics over the lock screen when you wake the phone.'
		},
		{
			what: 'Display over other apps (optional)',
			why: 'Off unless you allow it. A fallback for phones that block full-screen notifications.'
		},
		{
			what: 'Wake lock, network state, run at startup, foreground service',
			why: "Added by Android's WorkManager library, which runs the weekly cache clean-up and keeps it scheduled after a reboot. Rockscreen runs no foreground service of its own."
		}
	];

	const faqs = [
		{
			q: 'Is it free?',
			a: 'Yes. Rockscreen is free and open source under the GPL-3.0, with no ads and nothing to buy.'
		},
		{
			q: 'Why does a song show no lyrics?',
			a: "Lyrics come from LRCLIB and are matched by title and artist, so remixes, live versions and very new releases are often missing. If a lookup fails (offline, or LRCLIB is down), that song shows no lyrics for 30 days; clearing the app's storage resets it."
		},
		{
			q: 'The notification access switch is greyed out.',
			a: 'Android 13 and newer block it for apps installed from a browser. Open App info, tap the ⋮ menu, choose "Allow restricted settings", then try again.'
		},
		{
			q: 'I woke my phone and nothing appeared.',
			a: 'Rockscreen appears only while music is playing, for songs that have lyrics, and only on the lock screen. Check that your lock screen is not set to "None" and that the phone did not unlock straight away. If your phone blocks full-screen notifications, turn on "Display over other apps" in Rockscreen.'
		},
		{
			q: 'Is it on Google Play or F-Droid?',
			a: 'Not yet. Download the APK from GitHub, or add the repository to Obtainium to get updates. An F-Droid listing is planned.'
		},
		{
			q: 'Who made it?',
			a: 'Aditya Bansal, with substantial help from an AI coding assistant (Claude). It was tested on a real phone and the Android emulator, and all of the source is on GitHub.'
		}
	];
</script>

{#snippet mark(cls: string)}
	<svg class={cls} viewBox="18 18 72 72" aria-hidden="true">
		<rect x="18" y="18" width="72" height="72" rx="20" fill="#130A1C" />
		<g transform="translate(54 54) scale(0.74) translate(-54 -51)">
			<path fill="#FF2BD6" d="M39 50 V41 A15 15 0 0 1 69 41 V50 H61 V41 A7 7 0 0 0 47 41 V50 Z" />
			<path fill="#FF2BD6" d="M35 49 H63 L57 73 H35 A12 12 0 0 1 35 49 Z" />
			<path fill="#711766" d="M66.5 49 H73 A12 12 0 0 1 73 73 H60.5 Z" />
		</g>
	</svg>
{/snippet}

<div class="rs-page not-prose">
	<!-- Hero -->
	<section class="hero">
		<div class="hero-copy">
			<p class="eyebrow">Android app · Free · Open source</p>
			<div class="title-row">
				{@render mark('mark')}
				<h1><span class="r">R</span>ockscreen</h1>
			</div>
			<p class="tagline"><span class="wipe">Wake your phone. The words are already there.</span></p>
			<p class="lede">
				Rockscreen puts the lyrics of whatever is playing on your lock screen, line by line, in time
				with the music. Unlock, and they get out of the way.
			</p>
			<div class="ctas">
				<a class="btn btn-primary" href={DOWNLOAD_URL} target="_blank" rel="noopener noreferrer"
					>Download the APK</a
				>
				<a class="btn btn-ghost" href={REPO_URL} target="_blank" rel="noopener noreferrer"
					>View source on GitHub</a
				>
			</div>
			<p class="meta">No account · No ads · No tracking</p>
			<p class="fine">
				Android 8.1 or newer, 3.2 MB. Or get updates with <a
					class="text-link"
					href={OBTAINIUM_URL}
					target="_blank"
					rel="noopener noreferrer">Obtainium</a
				>.
			</p>
		</div>
		<figure class="hero-phone">
			<div class="phone">
				<img
					src="{IMG}/lock-neon.webp"
					alt="Rockscreen over the lock screen: the clock, the song playing with controls, and its lyrics with the current line in bold"
					width="720"
					height="1600"
					fetchpriority="high"
				/>
			</div>
		</figure>
	</section>

	<!-- The idea -->
	<section class="idea">
		<p class="stamp" aria-hidden="true">NOW PLAYING</p>
		<h2>Your lock screen shows the song's name. Rockscreen shows the words.</h2>
		<p>
			Put your phone on the desk, the kitchen counter or the car mount while music plays, and it
			becomes the karaoke screen. Glance at it and you are singing the right line, not the one you
			half remember.
		</p>
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
				<div class="step-phones" class:pair={step.imgs.length > 1}>
					{#each step.imgs as im (im.src)}
						<figure class="phone">
							<img src={im.src} alt={im.alt} width="720" height="1600" loading="lazy" />
						</figure>
					{/each}
				</div>
			</div>
		{/each}
	</section>

	<!-- Features -->
	<section class="features" aria-labelledby="features">
		<h2 id="features">What it does</h2>
		<div class="feature-grid">
			{#each features as f (f.title)}
				<div class="feature">
					<h3>{f.title}</h3>
					<p>{f.body}</p>
				</div>
			{/each}
		</div>
	</section>

	<!-- Where it works -->
	<section class="support" aria-labelledby="support">
		<h2 id="support">Where it works</h2>
		<p class="section-lede">What has been tested so far, and where it won't show up.</p>
		<div class="table-wrap">
			<table>
				<thead>
					<tr><th scope="col">Setup</th><th scope="col">Status</th></tr>
				</thead>
				<tbody>
					{#each support as s (s.setup)}
						<tr>
							<th scope="row">{s.setup}</th>
							<td>
								<span class="status {s.status}">{s.label}</span>
								{#if s.note}<span class="note">{s.note}</span>{/if}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</section>

	<!-- Privacy -->
	<section class="privacy" aria-labelledby="privacy">
		<div class="privacy-head">
			<h2 id="privacy">Only the title and artist leave your phone</h2>
			<p>
				They go to <a
					class="inline-link"
					href={LRCLIB_URL}
					target="_blank"
					rel="noopener noreferrer">lrclib.net</a
				> over HTTPS to find the lyrics. No account, analytics, ads or crash reporting. Lyrics are cached
				on the phone for 30 days (at most 500 songs) and kept out of backups. Here is every permission
				and why.
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
		{@render mark('closer-mark')}
		<h2>Sing the right words.</h2>
		<p>Free, open source, and nothing but the song title and artist leaves your phone.</p>
		<div class="ctas">
			<a class="btn btn-ink" href={DOWNLOAD_URL} target="_blank" rel="noopener noreferrer"
				>Download the APK</a
			>
			<a class="btn btn-ink-ghost" href={REPO_URL} target="_blank" rel="noopener noreferrer"
				>Star on GitHub</a
			>
		</div>
	</section>

	<p class="disclaimer">
		Screenshots show demo songs written for them; the app's interface is unedited. Rockscreen is an
		independent project, not affiliated with or endorsed by Spotify, LRCLIB or any music service.
	</p>
</div>

<style>
	@font-face {
		font-family: 'Space Grotesk';
		src: url('/projects/rockscreen-media/fonts/SpaceGrotesk-latin.woff2') format('woff2');
		font-weight: 300 700;
		font-display: swap;
	}
	@font-face {
		font-family: 'DM Sans';
		src: url('/projects/rockscreen-media/fonts/DMSans-latin.woff2') format('woff2');
		font-weight: 100 1000;
		font-display: swap;
	}

	/* ── Page theme: Neon. Only applies while this page is in the document. ── */
	:global(html:has(.rs-page)) {
		--catppuccin-color-base: #130a1c;
		--catppuccin-color-mantle: #1a1026;
		--catppuccin-color-crust: #0d0714;
		--catppuccin-color-surface0: #231536;
		--catppuccin-color-surface1: #33224a;
		--catppuccin-color-surface2: #46335f;
		--catppuccin-color-overlay0: #6a5a7d;
		--catppuccin-color-overlay1: #85769a;
		--catppuccin-color-overlay2: #9a8bad;
		--catppuccin-color-subtext0: #a99ab9;
		--catppuccin-color-subtext1: #cdc1d9;
		--catppuccin-color-text: #f7effa;
		--catppuccin-color-pink: #ff2bd6;
		--current-accent-color: #ff2bd6 !important; /* beats the inline accent the theme script sets */
	}
	:global(html.latte:has(.rs-page)) {
		--catppuccin-color-base: #f8f1fb;
		--catppuccin-color-mantle: #f0e6f5;
		--catppuccin-color-crust: #e8dcef;
		--catppuccin-color-surface0: #eadfee;
		--catppuccin-color-surface1: #d9cbe0;
		--catppuccin-color-surface2: #c3b3cc;
		--catppuccin-color-overlay0: #8d7e9b;
		--catppuccin-color-overlay1: #6f6180;
		--catppuccin-color-overlay2: #5c4f6c;
		--catppuccin-color-subtext0: #54476a;
		--catppuccin-color-subtext1: #3d3150;
		--catppuccin-color-text: #130a1c;
		--catppuccin-color-pink: #c621a6;
		--current-accent-color: #c621a6 !important; /* text-safe magenta on paper (4.55:1) */
	}

	/* Widen the shared project article and swap its generic banner/header for this page's hero. */
	:global(article.prose:has(.rs-page)) {
		max-width: 72rem;
	}
	:global(article.prose:has(.rs-page) > header),
	:global(article.prose:has(.rs-page) > hr),
	:global(article.prose:has(.rs-page) > div:has(> img)) {
		display: none;
	}

	/* ── Page ── */
	.rs-page {
		--neon: #ff2bd6;
		--ink: #130a1c;
		--unsung: #711766;
		--lit: #ff2bd6;
		--dim: #4a2050;
		color: var(--color-text);
		font-family: 'DM Sans', ui-sans-serif, system-ui, sans-serif;
		line-height: 1.65;
	}
	:global(html.latte) .rs-page {
		--lit: #c621a6;
		--dim: #d9c3dc;
	}
	.rs-page h1,
	.rs-page h2,
	.rs-page h3 {
		font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif;
		color: var(--color-text);
		letter-spacing: -0.02em;
		margin: 0;
	}
	.rs-page h2 {
		font-size: clamp(1.8rem, 3.2vw, 2.6rem);
		font-weight: 700;
		line-height: 1.1;
	}
	.rs-page h3 {
		font-size: 1.3rem;
		font-weight: 700;
		line-height: 1.2;
	}
	.rs-page section {
		margin: 0 0 6rem;
	}

	/* Phone frame around a real capture */
	.phone {
		margin: 0;
		padding: 7px;
		border-radius: 30px;
		background: #05030a;
		box-shadow:
			0 0 0 1px color-mix(in srgb, var(--color-text) 16%, transparent),
			0 28px 60px rgba(8, 2, 14, 0.45);
	}
	.phone img {
		display: block;
		width: 100%;
		height: auto;
		border-radius: 24px;
	}

	/* Hero */
	.hero {
		display: grid;
		gap: 3rem;
		align-items: center;
		padding-top: 1rem;
	}
	.eyebrow {
		font-size: 0.85rem;
		font-weight: 600;
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
		border-radius: 28%;
		box-shadow: 0 0 0 1px color-mix(in srgb, var(--color-text) 14%, transparent);
	}
	.hero h1 {
		font-size: clamp(3rem, 7vw, 5.2rem);
		font-weight: 700;
		line-height: 0.95;
		letter-spacing: -0.035em;
	}
	.hero h1 .r {
		color: var(--color-accent);
	}
	.tagline {
		font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif;
		font-size: clamp(1.4rem, 2.6vw, 2rem);
		font-weight: 600;
		line-height: 1.25;
		letter-spacing: -0.015em;
		margin-top: 1.2rem;
		max-width: 34rem;
	}
	/* The karaoke wipe from the logo: lit up to a 14° edge, then the part still to come. */
	.wipe {
		background: linear-gradient(104deg, var(--lit) 0 50%, var(--dim) 50% 100%);
		background-size: 220% 100%;
		background-position: 100% 0;
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
		animation: rs-wipe 2.4s cubic-bezier(0.4, 0, 0.2, 1) 0.3s forwards;
	}
	@keyframes rs-wipe {
		to {
			background-position: 0 0;
		}
	}
	.lede {
		max-width: 40rem;
		margin-top: 1.1rem;
		color: var(--color-subtext1);
		font-size: 1.08rem;
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
		border-radius: 999px;
		font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif;
		font-weight: 700;
		font-size: 1.02rem;
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
	.inline-link:focus-visible,
	summary:focus-visible {
		outline: 3px solid var(--color-accent);
		outline-offset: 3px;
	}
	.btn-primary {
		background: var(--neon);
		color: var(--ink);
	}
	.btn-primary:hover {
		background: #ff5ae0;
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
		font-size: 0.9rem;
		font-weight: 600;
		letter-spacing: 0.02em;
		color: var(--color-subtext0);
	}
	.fine {
		margin-top: 0.4rem;
		font-size: 0.9rem;
		color: var(--color-subtext0);
	}
	.fine .text-link {
		margin-top: 0;
	}
	.hero-phone {
		position: relative;
		margin: 0 auto;
		width: min(100%, 300px);
	}
	.hero-phone::before {
		content: '';
		position: absolute;
		inset: -12% -30%;
		background: radial-gradient(
			closest-side,
			color-mix(in srgb, var(--neon) 30%, transparent),
			transparent
		);
		pointer-events: none;
	}
	.hero-phone .phone {
		position: relative;
	}

	/* The idea */
	.idea {
		max-width: 52rem;
	}
	.idea h2 {
		margin-top: 1.4rem;
	}
	.idea p:last-child {
		margin-top: 1.2rem;
		color: var(--color-subtext1);
		font-size: 1.05rem;
	}
	.stamp {
		display: inline-block;
		transform: rotate(-4deg);
		border: 4px solid var(--color-accent);
		border-radius: 10px;
		padding: 0.2rem 0.8rem 0.25rem;
		color: var(--color-accent);
		font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif;
		font-weight: 700;
		font-size: 1.25rem;
		letter-spacing: 0.04em;
	}

	/* Steps */
	.steps h2 {
		margin-bottom: 2.6rem;
	}
	.step {
		display: grid;
		gap: 2rem;
		align-items: center;
		margin-bottom: 4.5rem;
	}
	.step:last-child {
		margin-bottom: 0;
	}
	.step-n {
		font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif;
		font-weight: 700;
		font-size: 0.95rem;
		color: var(--color-accent);
	}
	.step h3 {
		font-size: clamp(1.6rem, 2.6vw, 2.1rem);
		margin-top: 0.4rem;
	}
	.step p {
		margin-top: 0.9rem;
		color: var(--color-subtext1);
	}
	.step-phones {
		display: grid;
		justify-content: center;
		grid-template-columns: minmax(0, 270px);
	}
	.step-phones.pair {
		grid-template-columns: repeat(2, minmax(0, 250px));
		gap: 1.2rem;
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
		position: relative;
		border: 1px solid var(--color-surface1);
		border-radius: 14px;
		padding: 1.5rem 1.5rem 1.4rem;
		background: var(--color-mantle);
		overflow: hidden;
	}
	/* Each card carries the motif: a short lit bar with a slanted edge. */
	.feature::before {
		content: '';
		display: block;
		width: 4.5rem;
		height: 7px;
		margin-bottom: 1rem;
		border-radius: 99px;
		background: linear-gradient(104deg, var(--neon) 0 62%, transparent 62% 70%, var(--unsung) 70%);
	}
	.feature p {
		margin-top: 0.6rem;
		color: var(--color-subtext1);
		font-size: 0.97rem;
	}

	/* Where it works */
	.support h2 {
		margin-bottom: 0.6rem;
	}
	.section-lede {
		color: var(--color-subtext1);
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
		vertical-align: top;
		padding: 1rem 1.2rem;
		border-bottom: 1px solid var(--color-surface0);
	}
	thead th {
		font-size: 0.8rem;
		font-weight: 600;
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
		font-weight: 600;
		color: var(--color-text);
		width: 45%;
	}
	.status {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-weight: 600;
	}
	.status::before {
		content: '';
		width: 0.6rem;
		height: 0.6rem;
		border-radius: 50%;
		flex: none;
	}
	.status.yes::before {
		background: var(--neon);
	}
	.status.untested::before {
		background: transparent;
		box-shadow: inset 0 0 0 2px var(--color-overlay1);
	}
	.status.no::before {
		background: var(--color-overlay0);
	}
	.status.no {
		color: var(--color-subtext0);
	}
	.note {
		display: block;
		margin-top: 0.25rem;
		font-size: 0.88rem;
		color: var(--color-subtext0);
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
	.text-link,
	.inline-link {
		color: var(--color-accent);
		font-weight: 700;
		text-decoration: underline;
		text-underline-offset: 4px;
	}
	.text-link {
		display: inline-block;
		margin-top: 1rem;
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
		font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif;
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
	.faq-more .text-link {
		margin-top: 0;
	}

	/* Closing CTA: always ink on neon, in both light and dark (6.04:1) */
	.closer {
		background: var(--neon);
		color: var(--ink);
		border-radius: 22px;
		padding: clamp(2rem, 5vw, 3.5rem);
		margin-bottom: 2rem;
	}
	.closer-mark {
		width: 3.4rem;
		height: auto;
		border-radius: 28%;
		margin-bottom: 1.2rem;
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
		color: #f7effa;
	}
	.btn-ink:hover {
		background: #2a1a3b;
	}
	.btn-ink-ghost {
		border: 2px solid var(--ink);
		color: var(--ink);
	}
	.btn-ink-ghost:hover {
		background: rgba(19, 10, 28, 0.08);
	}
	.btn-ink:focus-visible,
	.btn-ink-ghost:focus-visible {
		outline-color: var(--ink);
	}

	.disclaimer {
		font-size: 0.8rem;
		color: var(--color-overlay1);
		margin: 0 0 1rem;
	}

	@media (min-width: 900px) {
		.hero {
			grid-template-columns: 1.4fr 1fr;
		}
		.step {
			grid-template-columns: 1fr 1fr;
			gap: 3.5rem;
		}
		.step.flip .step-copy {
			order: 2;
		}
		.feature-grid {
			grid-template-columns: repeat(2, 1fr);
		}
		.privacy {
			grid-template-columns: 1fr 1.2fr;
			align-items: start;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.wipe {
			animation: none;
			background-position: 0 0;
		}
		.btn {
			transition: none;
		}
		.btn:hover {
			transform: none;
		}
	}
</style>
