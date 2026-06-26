import type { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import CommunitySection from "@/components/sections/CommunitySection";
import Button from "@/components/ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faTerminal, faCloudArrowUp, faFileCode } from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import content from "@/content/plugins.json";

export const metadata: Metadata = {
  ...content.metadata,
  alternates: { canonical: "/plugins" },
};

const ICONS: Record<string, IconDefinition> = {
  code: faCode,
  terminal: faTerminal,
  cloudArrowUp: faCloudArrowUp,
  fileCode: faFileCode,
};

function PluginManagerIllustration() {
  const ill = content.illustration;
  return (
    <div className="flex-1 w-full max-w-[480px]">
      <div className="bg-layer-1 rounded-2xl border border-border overflow-hidden shadow-xl">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-layer-2 border-b border-border shrink-0">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
          </div>
          <span className="text-[11px] text-text-quaternary font-mono ml-1">{ill.windowTitle}</span>
        </div>
        {/* Search */}
        <div className="px-4 py-3 border-b border-border">
          <div className="bg-layer-3 border border-border rounded-lg px-3 py-1.5 flex items-center gap-2">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-text-quaternary shrink-0">
              <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
            </svg>
            <span className="text-[11px] text-text-quaternary">{ill.searchPlaceholder}</span>
          </div>
        </div>
        {/* Plugin list */}
        {ill.plugins.map((p, i) => (
          <div
            key={p.name}
            className={`flex items-center gap-3 px-4 py-3 ${i < ill.plugins.length - 1 ? "border-b border-border/50" : ""} ${p.active ? "bg-primary/5" : ""}`}
          >
            <div className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 ${p.active ? "bg-primary/15 border-primary/30" : "bg-layer-2 border-border"}`}>
              <div className={`w-2.5 h-2.5 rounded-sm ${p.active ? "bg-primary" : "bg-text-quaternary/30"}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-bold text-text-primary truncate">{p.name}</p>
              <p className="text-[10px] text-text-quaternary truncate">{p.desc}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[9px] text-text-quaternary bg-layer-3 border border-border rounded-full px-1.5 py-0.5">
                {p.maintainer}
              </span>
              <button className={`text-[10px] font-bold px-2.5 py-1 rounded-lg ${p.active ? "bg-primary/10 text-primary border border-primary/20" : "bg-layer-3 text-text-tertiary border border-border"}`}>
                {p.active ? ill.activeLabel : ill.activateLabel}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PluginsPage() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="py-24 px-6 xl:px-20 border-b border-border">
        <div className="mx-auto max-w-[1280px] flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 max-w-xl">
            <p className="text-[11px] font-bold uppercase tracking-widest text-primary font-cabin mb-3">{content.hero.eyebrow}</p>
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
              {content.hero.titleStart}{" "}
              <span className="text-primary">{content.hero.titleAccent}</span>
            </h1>
            <p className="text-text-secondary text-lg mb-8">
              {content.hero.description}
            </p>
            <div className="flex flex-col md:flex-row gap-4">
              <Button href={content.hero.primaryCta.href} external size="lg">
                {content.hero.primaryCta.label}
              </Button>
              <Button href={content.hero.secondaryCta.href} variant="secondary" size="lg">
                {content.hero.secondaryCta.label}
              </Button>
            </div>
          </div>
          <PluginManagerIllustration />
        </div>
      </section>

      {/* Plugin grid */}
      <section className="py-16 px-6 xl:px-20">
        <div className="mx-auto max-w-[1280px] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {content.categories.map((cat) => (
            <div key={cat.tag} className="bg-layer-1 border border-border rounded-2xl p-8 flex flex-col gap-6">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-primary font-cabin block mb-2">
                  {cat.tag}
                </span>
                <h2 className="text-xl font-bold text-text-primary">{cat.title}</h2>
              </div>
              <ul className="space-y-4 flex-1">
                {cat.plugins.map((p) => (
                  <li key={p.name} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <div>
                      <p className="text-[13px] font-semibold text-text-primary">{p.name}</p>
                      <p className="text-[12px] text-text-tertiary">{p.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Build a plugin CTA */}
      <section className="py-20 px-6 xl:px-20 bg-layer-1 border-y border-border">
        <div className="mx-auto max-w-[1280px] flex flex-col lg:flex-row gap-12 items-center">
          <div className="flex-1 max-w-xl">
            <p className="text-[11px] font-bold uppercase tracking-widest text-primary font-cabin mb-3">{content.build.eyebrow}</p>
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">{content.build.title}</h2>
            <p className="text-text-secondary mb-6">
              {content.build.description}
            </p>
            <div className="flex flex-col md:flex-row gap-3">
              <Button href={content.build.primaryCta.href} external size="md">
                {content.build.primaryCta.label}
              </Button>
              <Button href={content.build.secondaryCta.href} external variant="secondary" size="md">
                {content.build.secondaryCta.label}
              </Button>
            </div>
          </div>
          <div className="flex-1 bg-layer-2 rounded-2xl border border-border p-8 flex flex-col gap-4">
            {content.build.items.map((item) => (
              <div key={item.label} className="flex items-center gap-3 text-[13px] text-text-secondary">
                <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <FontAwesomeIcon icon={ICONS[item.icon]} className="w-3 h-3 text-primary" />
                </div>
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CommunitySection />
    </PageLayout>
  );
}
