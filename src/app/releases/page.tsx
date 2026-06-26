import type { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import CommunitySection from "@/components/sections/CommunitySection";
import DesktopCTA from "@/components/sections/DesktopCTA";
import Button from "@/components/ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import content from "@/content/releases.json";

export const metadata: Metadata = {
  ...content.metadata,
  alternates: { canonical: "/releases" },
};

const latest = content.releases[0];

export default function ReleasesPage() {
  return (
    <PageLayout>
      {/* Hero */}
      <section
        className="py-24 px-6 xl:px-20"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 0% 50%, rgba(100,196,255,0.10) 0%, transparent 60%), var(--color-background)",
        }}
      >
        <div className="mx-auto max-w-[1280px]">
          <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-text-quaternary bg-layer-2 border border-border rounded-full px-3 py-1 font-cabin mb-6">
            {content.hero.tag}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6 leading-tight">
            {content.hero.titleStart}{" "}
            <span className="text-primary">{content.hero.titleAccent}</span>
          </h1>
          <ul className="flex flex-col gap-2 mb-8">
            {latest.highlights.map((h) => (
              <li key={h} className="flex items-center gap-3 text-[14px] text-text-secondary">
                <FontAwesomeIcon icon={faCircleCheck} className="w-3.5 h-3.5 text-primary shrink-0" />
                {h}
              </li>
            ))}
          </ul>
          <div className="flex flex-col md:flex-row gap-3">
            <Button href={latest.href} external size="lg">
              {content.hero.primaryCta.label}
            </Button>
            <Button href={content.hero.secondaryCta.href} variant="secondary" size="lg">
              {content.hero.secondaryCta.label}
            </Button>
          </div>
        </div>
      </section>

      {/* Release cards grid */}
      <section className="py-16 px-6 xl:px-20 border-t border-border">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.releases.map((r) => (
              <div key={r.version} className="bg-layer-1 border border-border rounded-2xl p-4 flex flex-col gap-6">
                {/* Version tag */}
                <span className="inline-block self-start text-[12px] font-bold text-primary bg-layer-2 border border-border rounded-full px-3 py-1 font-sans">
                  {r.version} {content.cardLabels.versionSuffix}
                </span>

                {/* Highlights */}
                <div className="flex flex-col gap-3 flex-1">
                  <p className="text-[13px] font-bold text-text-primary">{content.cardLabels.highlights}</p>
                  <ul className="flex flex-col gap-2">
                    {r.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2.5 text-[13px] text-text-tertiary">
                        <FontAwesomeIcon icon={faCircleCheck} className="w-3 h-3 text-primary shrink-0 mt-0.5" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Read More */}
                <a
                  href={r.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="self-start text-[13px] font-bold text-text-secondary hover:text-text-primary transition-colors border border-border hover:border-border-light rounded-lg px-4 py-2"
                >
                  {content.cardLabels.readMore}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <DesktopCTA />
      <CommunitySection />
    </PageLayout>
  );
}
