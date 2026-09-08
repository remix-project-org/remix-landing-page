import type { MetadataRoute } from "next";
import { REMIX_SITE_URL } from "@/lib/urls";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${REMIX_SITE_URL}/sitemap.xml`,
  };
}
