# Blog conventions

Astro static blog deployed to GitHub Pages (push to `main` triggers `.github/workflows/deploy.yml`). No new dependencies without asking.

## Style rules for every new page, layout or component
- Wrap pages in `src/layouts/Base.astro` (header, footer, theme toggle, mermaid come from it). Don't add a second layout or duplicate header/footer markup. Shared logic (reading time, date format, post tree) lives in `src/lib/posts.ts`; reuse it.
- All styling goes in `src/styles/global.css`. Use the CSS variables (`--bg`, `--surface`, `--text`, `--muted`, `--border`, `--accent`, `--font`, `--mono`). No hardcoded colors, no new accent colors, no inline `<style>` except for truly component-scoped rules that still use the variables.
- Light and dark must both work (`data-theme` attribute + `prefers-color-scheme`). Check any new UI in both.
- Page container is `.container` (76rem); prose is capped at ~70ch (`.page`, `.post`). Must be responsive down to mobile.
- Links use `import.meta.env.BASE_URL` as prefix, never hardcoded `/`.
- Dates: `toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' })`. Reading time: words / 200, min 1.
- Listings use the `.cards` / `.card` pattern from `src/pages/index.astro`; related posts are shown with `src/components/PostTree.astro`.
- Nav links live in `Base.astro`; add new top-level pages there.

## Posts
- Folders under `src/content/posts/` form the tree (`series/part-1.md`). Optional `order` frontmatter sorts siblings; prev/next links follow tree order.
- Posts can also be created/edited at `/editor/`, which exists only under `npm run dev` (never deployed; its nav/Edit links are `import.meta.env.DEV`-gated). It commits via GitHub API using a token kept in the browser's localStorage). Keep the editor's frontmatter fields in sync with `src/content.config.ts`.
- Markdown in `src/content/posts/*.md`, frontmatter: `title`, `description`, `date` (required), `draft` (optional).
- Use `##` / `###` for sections (they feed the table of contents); the page title is the `h1`, so don't add another `#`.
- Diagrams: fenced ```mermaid blocks (rendered client-side, themed automatically).
- Code fences must declare a language (shiki dual theme is configured in `astro.config.mjs`).

## Before finishing any change
Run `npm run build`; fix errors. Commit with the repo-local git config (no `--global`).
