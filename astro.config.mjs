import { defineConfig } from 'astro/config';

// TODO: set to your GitHub username. If repo is NOT named <user>.github.io, also add: base: '/<repo-name>'
export default defineConfig({
  site: 'https://NITHESHMS97.github.io',
  markdown: {
    // leave ```mermaid blocks unhighlighted so the client script can render them
    syntaxHighlight: { type: 'shiki', excludeLangs: ['mermaid'] },
  },
});
