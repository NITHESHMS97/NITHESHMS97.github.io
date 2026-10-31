import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;
export type TreeNode = { key: string; label: string; post?: Post; children: TreeNode[] };

export const readingTime = (body = '') => Math.max(1, Math.round(body.trim().split(/\s+/).length / 200));
export const formatDate = (d: Date) =>
  d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });
const titleCase = (s: string) => s.replace(/[-_]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

export async function getPosts() {
  return getCollection('posts', (p) => !p.data.draft);
}

const nodeOrder = (n: TreeNode): number =>
  n.post?.data.order ?? (n.children.length ? Math.min(...n.children.map(nodeOrder)) : 999);

function sortNodes(nodes: TreeNode[]) {
  nodes.sort((a, b) => nodeOrder(a) - nodeOrder(b) || a.label.localeCompare(b.label));
  nodes.forEach((n) => sortNodes(n.children));
}

/** Folders under src/content/posts become branches of the tree; `order` in frontmatter sorts siblings. */
export function buildTree(posts: Post[]): TreeNode[] {
  const root: TreeNode = { key: '', label: '', children: [] };
  for (const post of posts) {
    const parts = post.id.split('/');
    let node = root;
    parts.forEach((part, i) => {
      const key = parts.slice(0, i + 1).join('/');
      let child = node.children.find((c) => c.key === key);
      if (!child) node.children.push((child = { key, label: titleCase(part), children: [] }));
      if (i === parts.length - 1) Object.assign(child, { post, label: post.data.title });
      node = child;
    });
  }
  sortNodes(root.children);
  return root.children;
}

/** Posts in reading order (depth-first through the tree), for prev/next links. */
export const flatten = (nodes: TreeNode[]): Post[] =>
  nodes.flatMap((n) => [...(n.post ? [n.post] : []), ...flatten(n.children)]);
