import type { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import CommunitySection from "@/components/sections/CommunitySection";
import GitHubReleasesDownload from "@/components/sections/GitHubReleasesDownload";
import Button from "@/components/ui/Button";
import content from "@/content/desktop.json";
import { REMIX_DESKTOP_GITHUB_OWNER, REMIX_DESKTOP_GITHUB_REPO } from "@/lib/urls";

export const metadata: Metadata = {
  ...content.metadata,
  alternates: { canonical: "/desktop" },
  openGraph: {
    title: content.metadata.title as string,
    description: content.metadata.description as string,
    images: [{ url: "/assets/og/og-desktop.webp", width: 1200, height: 630, alt: "Remix Desktop App" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/assets/og/og-desktop.webp"],
  },
};

interface LatestRelease {
  tag_name: string;
  published_at: string;
  html_url: string;
}

// Server-side, cached for an hour; null hides the version line
async function getLatestDesktopRelease(): Promise<LatestRelease | null> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${REMIX_DESKTOP_GITHUB_OWNER}/${REMIX_DESKTOP_GITHUB_REPO}/releases/latest`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    return (await res.json()) as LatestRelease;
  } catch {
    return null;
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
}

export default async function DesktopPage() {
  const release = await getLatestDesktopRelease();

  return (
    <PageLayout>
      {/* GitHub Releases Download */}
      <section className="bg-background">
        <GitHubReleasesDownload />
      </section>

      {/* What's New */}
      <section className="py-20 px-6 xl:px-20 bg-layer-1 border-y border-border">
        <div className="mx-auto max-w-[1280px]">
          {release && (
            <a
              href={release.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mb-3 font-mono text-[12px] text-text-tertiary hover:text-text-primary transition-colors"
            >
              {release.tag_name} · {formatDate(release.published_at)}
            </a>
          )}
          <h2 className="text-2xl text-text-primary mb-2">{content.whatsNew.title}</h2>
          <p className="text-text-secondary mb-10">{content.whatsNew.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {content.whatsNew.items.map((item) => (
              <div key={item.title} className="bg-layer-2 rounded-xl border border-border p-6">
                <h3 className="text-[14px] font-bold text-text-primary mb-2">{item.title}</h3>
                <p className="text-[13px] text-text-tertiary">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-4">
            {content.whatsNew.actions.map((action) => (
              <Button
                key={action.label}
                href={action.href}
                variant={action.variant as "secondary" | "tertiary"}
                size="md"
              >
                {action.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <CommunitySection />
    </PageLayout>
  );
}
