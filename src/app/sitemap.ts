import type { MetadataRoute } from "next";

const BASE_URL = "https://remix.live";

const PAGES: { url: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { url: "/",                  priority: 1.0, changeFrequency: "weekly"  },
  { url: "/features",          priority: 0.9, changeFrequency: "monthly" },
  { url: "/pricing",           priority: 0.9, changeFrequency: "monthly" },
  { url: "/learn",             priority: 0.8, changeFrequency: "monthly" },
  { url: "/releases",          priority: 0.8, changeFrequency: "weekly"  },
  { url: "/impact",            priority: 0.7, changeFrequency: "monthly" },
  { url: "/prototype",         priority: 0.7, changeFrequency: "monthly" },
  { url: "/plugins",           priority: 0.7, changeFrequency: "monthly" },
  { url: "/desktop",           priority: 0.7, changeFrequency: "monthly" },
  { url: "/partnership",       priority: 0.6, changeFrequency: "monthly" },
  { url: "/organization",      priority: 0.6, changeFrequency: "monthly" },
  { url: "/donate",            priority: 0.6, changeFrequency: "monthly" },
  { url: "/contact",           priority: 0.5, changeFrequency: "monthly" },
  { url: "/termsandconditions", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map(({ url, priority, changeFrequency }) => ({
    url: `${BASE_URL}${url}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
