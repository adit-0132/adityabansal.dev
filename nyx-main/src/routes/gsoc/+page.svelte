<script lang="ts">
	import { site } from '$lib/config/site';
</script>

<svelte:head>
	<title>Google Summer of Code | {site.identity.name}</title>
	<meta
		name="description"
		content="What I built and learned during Google Summer of Code 2026 with the R Project — making R help pages translatable into other languages."
	/>
</svelte:head>

<article class="mx-auto max-w-3xl space-y-6 px-4 py-8 md:px-6">
	<header class="space-y-3 border-b border-surface0 pb-6">
		<h1 class="text-3xl font-bold md:text-4xl">Making R speak more languages</h1>
		<p class="text-overlay1 text-sm">
			Google Summer of Code 2026 · R Project for Statistical Computing · 350 hours
			<br />
			Mentors: Heather Turner &amp; Elio Campitelli
		</p>
	</header>

	<p class="text-lg text-subtext1 leading-relaxed">
		This summer I spent 350 hours teaching R to hand out its documentation in other
		languages.
	</p>

	<p>
		The goal was easy to state. When you type <code>?function</code> in R you get its help
		page in whatever language its author wrote it in. My project, with the R Project for
		Statistical Computing, lets anyone ship a small &ldquo;translation module&rdquo; so that
		same page can also appear in another language — Spanish, French, Chinese, whatever — with
		no change from the package&rsquo;s author. Install the module, set your language, done.
	</p>

	<p>It sounds like a translation task. It mostly wasn&rsquo;t.</p>

	<p>
		I didn&rsquo;t start from nothing. The package I built on,
		<a href="https://github.com/eliocamp/rhelpi18n" target="_blank" rel="noopener noreferrer"
			>rhelpi18n</a
		>, already existed and already did the core trick — notice your language, find a
		translation, swap the page in. What it couldn&rsquo;t handle was help that generates
		content on the fly, and closing that gap is what my three pull requests over the summer
		set out to do.
	</p>

	<h2>Docs that change on you</h2>

	<p>
		Help pages aren&rsquo;t frozen text. A page can compute things while it&rsquo;s built or
		installed: today&rsquo;s date, the current version number, a table generated from code. So
		a translation written once rots. Translate a line that reads
		<code>installed under R 4.5.3</code> and the next release makes it a lie.
	</p>

	<p>
		The approach I worked on wraps those moving parts in placeholders. Before a translator
		sees a page, each dynamic span becomes a token like <code>&#123;ISEXPR_0&#125;</code>.
		They translate the prose around it and leave the token alone, moving it wherever their
		language needs it. When you open the page, R drops the real, current value back into the
		token.
	</p>

	<blockquote>Static words get translated; live data stays live.</blockquote>

	<p>
		Finding those spans by hand would be miserable, so the tool diffs a package&rsquo;s
		source against its installed form — whatever changed between the two is exactly what
		needs a placeholder. Underneath sits a small hook into R&rsquo;s help system that spots
		your language, finds a matching translation, and swaps the page out as you open it.
	</p>

	<h2>The summer, week by week</h2>

	<ol class="timeline">
		<li>
			<span class="wk">Weeks 1–2 · Reading</span>
			I cloned the package I would be extending and spent most of two weeks just reading.
			R&rsquo;s help system runs deeper than I expected: typing <code>?mean</code> quietly
			resolves to a file, runs it through a macro processor, and renders it. The detail that
			mattered for my project is that a help page can generate content at three separate
			moments. Some of it is fixed when the package is built, some when it is installed on your
			machine, and some every single time you open the page. A version number gets frozen at
			install; a countdown to a deadline recomputes on every view. To get a feel for all of
			it, I wrote a small
			<a
				href="https://github.com/adit-0132/multilingual-docs"
				target="_blank"
				rel="noopener noreferrer">demo package</a
			>
			that used each of those tricks on its own page, so I would have something predictable to
			break later.
		</li>
		<li>
			<span class="wk">Weeks 3–4 · The core idea</span>
			The real puzzle was telling the fixed words from the moving ones without asking package
			authors to label anything. I settled on a diff. Parse the package&rsquo;s source, where
			the dynamic bits are still live code, then parse its installed form, where those bits
			have been frozen to text. Whatever lines up is static; whatever changed is a value worth
			capturing. Each of those spans becomes a token like <code>&#123;ISEXPR_0&#125;</code>,
			and a second pass drops the real, current value back into the token when someone reads
			the page. The first time a translated help page came back with a correct, live date
			sitting under the prose, I was fairly sure the idea would survive contact with real
			packages.
		</li>
		<li>
			<span class="wk">Weeks 5–6 · First review</span>
			My mentor went through the code and, in a single pass, reframed the whole thing. What I
			had built as one feature was really two: substituting values at read time, and building
			the stored template in the first place. Splitting them made everything cleaner and let
			the read-time half move ahead while the harder half waited. The review also caught me
			assuming everyone installs from CRAN and hard-coding a download mirror; the better move
			was to install a package into a throwaway library, take what I needed, and delete it.
			Two edge cases surfaced that I had missed entirely: a translator&rsquo;s own words
			getting swallowed into a placeholder, and a translator writing a literal
			<code>&#123;ISEXPR_0&#125;</code> in their prose. A fair slice of what I had marked
			&ldquo;done&rdquo; turned back into &ldquo;think again,&rdquo; which stung and then
			helped.
		</li>
		<li>
			<span class="wk">Weeks 7–8 · Cleanup and packaging</span>
			I worked through the fixes one at a time: using R&rsquo;s built-in helpers instead of my
			own, rejecting locale codes that make invalid package names, returning the original text
			on a miss instead of an error that every caller had to handle. Then I split the work into
			two smaller pull requests along a clean seam, the read-time runtime in one and the
			template-building tool in the other, so a reviewer could weigh each on its own. I also
			published the demo package on R-universe so it was genuinely installable rather than just
			a repository. That cost me an afternoon on an obscure rule: a registry repository named
			slightly wrong serves zero packages and hands you no error to explain why.
		</li>
		<li>
			<span class="wk">Weeks 9–10 · The ugly edges</span>
			This was the run of small, fiddly problems that decide whether a tool is actually
			pleasant to use. A translator who needs a literal <code>&#123;ISEXPR_0&#125;</code> now
			writes <code>&#123;&#123;ISEXPR_0&#125;&#125;</code>, which I tuck behind a sentinel while
			matching and restore afterward. Help that differs by operating system, Windows versus the
			rest, became its own kind of span. I also taught the matcher to report not only the
			filled-in text but why it matched and how far the original had drifted, so a translation
			can be flagged as stale instead of quietly going wrong. And the package got its first
			test suite, because it honestly had none.
		</li>
		<li>
			<span class="wk">Weeks 11–12 · Tooling and a rename</span>
			The final stretch was about making the whole thing comfortable to actually use. I built
			the generator that takes a local package, installs it into a temporary library to see its
			baked help, diffs the two, and writes out a ready-to-fill translation folder: one file
			per help page, placeholders already in place, each with a hint showing what it stood for.
			Along the way two overlapping functions collapsed into one, and the package picked up a
			clearer name. Most of the last days went to a long, blunt review that I walked top to
			bottom, from one-word wording fixes up to &ldquo;should this option exist at all?&rdquo;
			The read-time half is merged now; the rest is in review.
		</li>
	</ol>

	<h2>What I actually learned</h2>

	<p>The code turned out to be the easy half.</p>

	<ul>
		<li>
			<strong>Reading beats writing.</strong> I landed in a codebase I&rsquo;d never seen,
			built by my mentor, sitting on R internals I only half-knew. The first weeks were mostly
			reading until the shape clicked. That skill pays off on every project after.
		</li>
		<li>
			<strong>Review reshapes the design.</strong> My mentor&rsquo;s comments rarely nitpicked
			syntax; they asked whether a piece should exist at all. One review folded two functions
			into one and cut a feature I was attached to. The result was always simpler.
		</li>
		<li>
			<strong>The hard problems are invisible from outside.</strong> Platform-specific help,
			two packages sharing a function name, the rules about where a package is even allowed to
			write a file — none of that was in the proposal.
		</li>
		<li>
			<strong>Open source is mostly people.</strong> Slicing work into reviewable chunks,
			writing a pull request someone can actually follow, arguing a tradeoff and then changing
			my mind — that&rsquo;s the job as much as the R is.
		</li>
	</ul>

	<h2>The thing that stuck</h2>

	<p>
		The first time <code>?greet</code> came back translated, with the version number still
		correct underneath, It felt like a big W. But the feature isn&rsquo;t what stuck.
		It&rsquo;s the shape of the work: a vague, hard problem handed to me inside an unfamiliar
		system, slowly turned into something that could be integrated into a much bigger ecosytem
		and workflow that thousands of R-users employ from all across the world.
	</p>

	<p>
		If you&rsquo;re weighing whether to apply to GSoC — apply. Worst case, you learn how a
		real project actually runs. Best case, you spend a summer making software a little more
		usable for people who&rsquo;d rather read the manual in their own language.
	</p>

	<h2>Sources</h2>

	<ul class="sources">
		<li>
			<a href="https://developer.r-project.org/parseRd.pdf" target="_blank" rel="noopener noreferrer"
				>Parsing Rd files</a
			> · Duncan Murdoch
		</li>
		<li>
			<a
				href="https://cran.r-project.org/doc/manuals/r-release/R-exts.html"
				target="_blank"
				rel="noopener noreferrer">Writing R Extensions</a
			> · Rd macros and <code>\Sexpr</code>
		</li>
		<li>
			<a
				href="https://cran.r-project.org/web/packages/policies.html"
				target="_blank"
				rel="noopener noreferrer">CRAN Repository Policy</a
			> · where a package may write files
		</li>
		<li>
			<a
				href="https://cldr.unicode.org/index/cldr-spec/picking-the-right-language-code"
				target="_blank"
				rel="noopener noreferrer">Picking the right language code</a
			> · Unicode CLDR
		</li>
		<li>
			<a href="https://github.com/eliocamp/rhelpi18n" target="_blank" rel="noopener noreferrer"
				>rhelpi18n</a
			> · the package I extended
		</li>
		<li>
			<a
				href="https://github.com/adit-0132/multilingual-docs"
				target="_blank"
				rel="noopener noreferrer">multilingual-docs</a
			> · my demo package and notes
		</li>
	</ul>
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

	article :global(strong) {
		color: var(--color-text);
		font-weight: 600;
	}

	article :global(ul) {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 1rem;
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

	article :global(ul.sources) {
		gap: 0.45rem;
		font-size: 0.9rem;
		margin-top: 0.5rem;
	}

	article :global(ul.sources li) {
		padding-left: 0;
		line-height: 1.5;
	}

	article :global(ul.sources li::before) {
		content: none;
	}

	article :global(ol.timeline) {
		list-style: none;
		padding-left: 0;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		margin-top: 0.5rem;
	}

	article :global(ol.timeline li) {
		color: var(--color-subtext0);
		line-height: 1.7;
		padding-left: 1.1rem;
		border-left: 2px solid var(--color-surface1);
	}

	article :global(ol.timeline .wk) {
		display: block;
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.78rem;
		letter-spacing: 0.02em;
		color: var(--current-accent-color);
		margin-bottom: 0.35rem;
	}

	article :global(blockquote) {
		border-left: 2px solid var(--current-accent-color);
		background-color: color-mix(in srgb, var(--color-surface0) 45%, transparent);
		border-radius: 0 0.4rem 0.4rem 0;
		padding: 0.75rem 1.25rem;
		color: var(--color-subtext1);
		font-style: italic;
		font-size: 1.05rem;
	}
</style>
