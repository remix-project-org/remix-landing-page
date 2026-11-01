import type { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import CommunitySection from "@/components/sections/CommunitySection";
import DesktopCTA from "@/components/sections/DesktopCTA";
import HeroSection from "@/components/sections/HeroSection";
import RemixAIChatMock from "@/components/sections/RemixAIChatMock";
import QuickDAppMock from "@/components/sections/QuickDAppMock";
import PartnersSection from "@/components/sections/PartnersSection";
import PlanPanel, { PlanStrip } from "@/components/sections/PlanPanel";
import AnalyticsButton from "@/components/ui/AnalyticsButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import FaqSection from "@/components/sections/FaqSection";
import rawContent from "@/content/home.json";
import { resolveContent } from "@/lib/urls";

const content = resolveContent(rawContent);


const ACCENT_DOTS: Record<string, string> = {
  primary: "",
  ai: "[--eyebrow-dot:var(--color-remix-ai)]",
  desktop: "[--eyebrow-dot:var(--color-remix-desktop)]",
};

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <PageLayout>
      <HeroSection />
      {/* ── RemixAI ──────────────────────────────────────── */}
      <section
        className="relative z-10 py-24 px-6 xl:px-20 border-y border-border overflow-hidden"
        style={{ background: "radial-gradient(ellipse 80% 60% at 10% 120%, rgba(45,231,243,0.18) 0%, transparent 65%), #1e2035" }}
      >
        <div className="mx-auto max-w-[1280px] flex flex-col lg:flex-row gap-16 items-center justify-center">
          <div className="max-w-lg lg:order-2">
            <p className="eyebrow [--eyebrow-dot:var(--color-remix-ai)] mb-6">
              {content.ai.eyebrow}
            </p>
            <h2 className="text-3xl md:text-4xl text-text-primary mb-4">
              {content.ai.title}
            </h2>
            <p className="text-text-secondary mb-6">
              {content.ai.description}
            </p>
            <p className="text-[12px] text-text-quaternary border-l-2 border-primary/30 pl-3 mb-8 italic">
              {content.ai.proNote}
            </p>
            <div className="flex flex-wrap gap-3">
              <AnalyticsButton href={content.ai.cta.href} external={content.ai.cta.external} variant="ai" gaEvent={{ section: "remixai", label: "try_remixai" }}>
                {content.ai.cta.label}
              </AnalyticsButton>
              <AnalyticsButton href={content.ai.ctaSecondary.href} external={content.ai.ctaSecondary.external} variant="secondary" gaEvent={{ section: "remixai", label: "see_plans" }}>
                {content.ai.ctaSecondary.label}
              </AnalyticsButton>
            </div>
          </div>

          {/* AI Chat Mock */}
          <RemixAIChatMock />
        </div>
      </section>

      {/* ── QuickDApp ─────────────────────────────────────── */}
      <section className="relative z-10 bg-background py-24 px-6 xl:px-20">
        <div className="mx-auto max-w-[1280px] flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1 max-w-xl">
            <p className="eyebrow mb-3">
              {content.quickdapp.eyebrow}
            </p>
            <h2 className="text-3xl md:text-4xl text-text-primary mb-4">
              {content.quickdapp.title}
            </h2>
            <p className="text-text-tertiary mb-6">
              {content.quickdapp.description}
            </p>
            <ol className="mb-8 divide-y divide-border border-y border-border">
              {content.quickdapp.features.map((item, i) => (
                <li key={item.label} className="flex items-baseline gap-4 py-[11px] text-[14px] text-text-tertiary">
                  <span className="font-mono text-[11px] text-primary">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex-1">{item.label}</span>
                  {item.tag && (
                    <span className="whitespace-nowrap rounded-full border border-border-light px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em] text-text-tertiary">
                      {item.tag}
                    </span>
                  )}
                </li>
              ))}
            </ol>
            <div className="flex flex-wrap gap-3">
              <AnalyticsButton href={content.quickdapp.cta.href} external={content.quickdapp.cta.external} size="lg" gaEvent={{ section: "quickdapp", label: "try_quickdapp" }}>
                {content.quickdapp.cta.label}
              </AnalyticsButton>
              <AnalyticsButton href={content.quickdapp.ctaSecondary.href} external={content.quickdapp.ctaSecondary.external} size="lg" variant="secondary" gaEvent={{ section: "quickdapp", label: "see_plans" }}>
                {content.quickdapp.ctaSecondary.label}
              </AnalyticsButton>
            </div>
          </div>

          {/* QuickDApp mock — prompt → live dApp on ENS */}
          <QuickDAppMock />
        </div>
      </section>

      {/* ── Pricing Teaser ───────────────────────────────── */}
      <section className="relative z-10 py-24 px-6 xl:px-20 bg-layer-1 border-y border-border">
        <div className="mx-auto max-w-[1160px]">
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5 mb-8">
            <div>
              <p className="eyebrow">{content.pricingTeaser.eyebrow}</p>
              <h2 className="mt-3 text-[clamp(30px,4vw,44px)] leading-[1.02] text-text-primary">
                {content.pricingTeaser.titleStart}
                <br />
                {content.pricingTeaser.titleEnd}
              </h2>
            </div>
            <p className="text-text-secondary max-w-[40ch]">{content.pricingTeaser.description}</p>
          </div>

          <PlanPanel plans={content.pricingTeaser.plans} creditsLabel={content.pricingTeaser.creditsLabel} gaSection="pricing_teaser" compact>
            <div className="flex flex-wrap items-center gap-x-[18px] gap-y-2 px-[26px] py-[18px] text-[13px] text-text-secondary">
              <span className="label-mono">{content.pricingTeaser.includesLabel}</span>
              {content.pricingTeaser.includes.map((item) => (
                <span key={item} className="inline-flex items-center gap-1.5">
                  <FontAwesomeIcon icon={faCheck} className="w-3 h-3 text-primary" />
                  {item}
                </span>
              ))}
            </div>
          </PlanPanel>

          <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-3.5 mt-3.5">
            <PlanStrip
              name={content.pricingTeaser.free.name}
              note={content.pricingTeaser.free.priceNote}
              description={content.pricingTeaser.free.description}
              cta={content.pricingTeaser.free.cta}
              href={content.pricingTeaser.free.ctaHref}
              gaEvent={{ section: "pricing_teaser", plan: "free" }}
            />
            <PlanStrip
              name={content.pricingTeaser.compare.name}
              description={content.pricingTeaser.compare.description}
              cta={content.pricingTeaser.compare.cta}
              href={content.pricingTeaser.compare.href}
              gaEvent={{ section: "pricing_teaser", label: "see_pricing" }}
            />
          </div>

          <div className="mt-20">
            <FaqSection limit={4} />
          </div>
        </div>
      </section>

      {/* ── Go Deeper ────────────────────────────────────── */}
      <section className="relative z-10 bg-background py-24 px-6 xl:px-20">
        <div className="mx-auto max-w-[1280px]">
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5 mb-8">
            <div>
              <p className="eyebrow">{content.goDeeper.eyebrow}</p>
              <h2 className="mt-3 text-3xl md:text-4xl text-text-primary">{content.goDeeper.title}</h2>
            </div>
            <p className="text-text-secondary max-w-[40ch]">{content.goDeeper.description}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 rounded-[22px] border border-border bg-layer-1/55 overflow-hidden">
            {content.goDeeper.cards.map((card, i) => (
              <Link
                key={card.title}
                href={card.href}
                target={card.external ? "_blank" : undefined}
                rel={card.external ? "noopener noreferrer" : undefined}
                className={`group flex flex-col gap-3.5 px-[30px] pt-8 pb-[30px] border-border transition-colors hover:bg-white/[0.025] ${i > 0 ? "border-t md:border-t-0 md:border-l" : ""}`}
              >
                <span className={`eyebrow ${ACCENT_DOTS[card.accent]}`}>
                  {String(i + 1).padStart(2, "0")} · {card.label}
                </span>
                <h3 className="text-[22px] font-extrabold tracking-[-0.01em] text-text-primary">{card.title}</h3>
                <p className="flex-1 text-[14px] leading-relaxed text-text-tertiary">{card.description}</p>
                <span className="border-t border-border pt-3.5 font-mono text-[12px] text-text-quaternary">{card.detail}</span>
                <span className="inline-flex items-center gap-1.5 text-[14px] font-bold text-primary">
                  {card.cta}
                  <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3 transition-transform group-hover:translate-x-[3px]" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Desktop CTA ──────────────────────────────────── */}
      <DesktopCTA />

      {/* ── Partners ─────────────────────────────────────── */}
      <PartnersSection />

      {/* ── Community ────────────────────────────────────── */}
      <CommunitySection />
    </PageLayout>
  );
}
