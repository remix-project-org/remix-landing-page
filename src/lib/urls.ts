/**
 * Single source of truth for every Remix-owned URL/email referenced across the site.
 * Update a value here and every place that references it (via `{{TOKEN}}` placeholders
 * in content JSON, or via a direct import in a component) picks up the change.
 */

export const REMIX_APP_URL = "https://app.remix.live";
export const REMIX_APP_DOMAIN = "app.remix.live";
export const REMIX_SITE_URL = "https://remix.live";
export const REMIX_FORMS_URL = "https://forms.remix.live";
export const REMIX_DOCS_URL = "https://remix-ide.readthedocs.io";

export const REMIX_GITHUB_OWNER = "ethereum";
export const REMIX_GITHUB_REPO = "remix-project";
export const REMIX_GITHUB_URL = `https://github.com/${REMIX_GITHUB_OWNER}/${REMIX_GITHUB_REPO}`;

export const REMIX_DESKTOP_GITHUB_OWNER = "remix-project-org";
export const REMIX_DESKTOP_GITHUB_REPO = "remix-desktop";
export const REMIX_DESKTOP_GITHUB_URL = `https://github.com/${REMIX_DESKTOP_GITHUB_OWNER}/${REMIX_DESKTOP_GITHUB_REPO}`;

export const DISCORD_URL = "https://discord.gg/MzhfCGstNA";
export const X_URL = "https://x.com/EthereumRemix";
export const LINKEDIN_URL = "https://www.linkedin.com/company/ethereum-remix/";
export const GIVETH_URL = "https://giveth.io/project/remix-project";

export const CONTACT_EMAIL_DOMAIN = "remixlabs.live";
export const CONTACT_INFO_EMAIL = `info@${CONTACT_EMAIL_DOMAIN}`;
export const CONTACT_REMIX_EMAIL = `remix@${CONTACT_EMAIL_DOMAIN}`;

// Placeholders content JSON can reference (e.g. "{{APP_URL}}/?call=...") so links never
// need to hardcode a domain. Only the token is swapped — everything else (path, query,
// hash) in the string is left untouched.
const TOKENS: Record<string, string> = {
  APP_URL: REMIX_APP_URL,
  APP_DOMAIN: REMIX_APP_DOMAIN,
  SITE_URL: REMIX_SITE_URL,
  FORMS_URL: REMIX_FORMS_URL,
  DOCS_URL: REMIX_DOCS_URL,
  GITHUB_URL: REMIX_GITHUB_URL,
  DESKTOP_GITHUB_URL: REMIX_DESKTOP_GITHUB_URL,
  DISCORD_URL,
  X_URL,
  LINKEDIN_URL,
  GIVETH_URL,
  INFO_EMAIL: CONTACT_INFO_EMAIL,
  REMIX_EMAIL: CONTACT_REMIX_EMAIL,
};

export function resolveHref(value: string): string {
  if (!value.includes("{{")) return value;
  return value.replace(/\{\{(\w+)\}\}/g, (match, key: string) => TOKENS[key] ?? match);
}

/**
 * Recursively resolves `{{TOKEN}}` placeholders in every string value of a JSON-like
 * structure. Use right after importing a content JSON file, e.g.:
 *
 *   import rawContent from "@/content/home.json";
 *   const content = resolveContent(rawContent);
 */
export function resolveContent<T>(value: T): T {
  if (typeof value === "string") {
    return resolveHref(value) as unknown as T;
  }
  if (Array.isArray(value)) {
    return value.map((v) => resolveContent(v)) as unknown as T;
  }
  if (value !== null && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, resolveContent(v)])
    ) as T;
  }
  return value;
}
