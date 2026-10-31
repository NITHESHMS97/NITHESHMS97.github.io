import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://NITHESHMS97.github.io',
  markdown: {
    // leave ```mermaid blocks unhighlighted so the client script can render them
    syntaxHighlight: { type: 'shiki', excludeLangs: ['mermaid'] },
    // light + dark code themes, switched via CSS variables in global.css
    shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' }, defaultColor: false },
  },
});
