# adityabansal.dev

Personal portfolio, deployed to GitHub Pages at [adityabansal.dev](https://adityabansal.dev).

Based on the [`nyx`](https://github.com/JasonLovesDoggo/nyx) SvelteKit portfolio template by Jason Cameron, re-skinned for a fully static `adapter-static` build with all developer-specific content centralized in one editable config.

## Editing your data

All editable site data lives in **one file**: `src/lib/config/site.ts`. Edit it directly, or open `/admin` in dev mode (`bun run dev`) for a form-based editor that exports a fresh `site.ts` for you to paste back.

- Identity (name, bio, SEO metadata) → `site.identity`, `site.hero`
- About page (paragraphs, avatar, optional pet block) → `site.about`
- Pics page (heading, description) → `site.pics`
- Social links → `site.socials`
- Experience timeline → `site.experience`
- Navigation → `site.nav`
- Branding (copyright, analytics) → `site.brand`

Projects are markdown under `content/projects/<slug>.svx`. See `content/projects/_template.svx` for the schema.

Static assets:

- `static/images/placeholder-avatar.svg` — replace with your photo
- `static/projects/<slug>.{svg,webp,png}` — project thumbnails
- `static/logos/` — employer/company logos for the experience timeline

## Develop

```bash
bun install
bun run dev      # http://localhost:5173
bun run build    # SSG output → build/
bun run preview  # serve build/
```

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the static site and publishes it to GitHub Pages. Set the repo's Pages source to "GitHub Actions" and point `adityabansal.dev`'s DNS at GitHub Pages.

`static/CNAME` carries the custom domain. `static/.nojekyll` ensures the `_app/` directory is served.
