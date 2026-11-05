/**
 * Helper to resolve static assets correctly across all environments:
 * - Local development
 * - Cloud Run / Custom domain
 * - GitHub Pages subpath (e.g. https://<username>.github.io/<repo>/)
 */
export const getAssetUrl = (path: string): string => {
  if (!path) return '';
  // Remote URLs remain untouched
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  // Strip leading slash or dot-slash
  const cleanPath = path.replace(/^\.?\//, '');
  const base = import.meta.env.BASE_URL || './';
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  return `${normalizedBase}${cleanPath}`;
};
