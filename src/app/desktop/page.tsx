import type { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import CommunitySection from "@/components/sections/CommunitySection";
import GitHubReleasesDownload from "@/components/sections/GitHubReleasesDownload";
import Button from "@/components/ui/Button";
import content from "@/content/desktop.json";

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

export default function DesktopPage() {
  return (
    <PageLayout>
      {/* GitHub Releases Download */}
      <section className="bg-background">
        <GitHubReleasesDownload />
      </section>

      {/* What's New */}
      <section className="py-20 px-6 xl:px-20 bg-layer-1 border-y border-border">
        <div className="mx-auto max-w-[1280px]">
          <h2 className="text-2xl font-bold text-text-primary mb-2">{content.whatsNew.title}</h2>
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
