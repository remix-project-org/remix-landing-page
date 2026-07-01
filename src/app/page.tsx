import type { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import CommunitySection from "@/components/sections/CommunitySection";
import DesktopCTA from "@/components/sections/DesktopCTA";
import HeroSection from "@/components/sections/HeroSection";
import RemixAIChatMock from "@/components/sections/RemixAIChatMock";
import QuickDAppMock from "@/components/sections/QuickDAppMock";
import PartnersSection from "@/components/sections/PartnersSection";
import Button from "@/components/ui/Button";
import AnalyticsButton from "@/components/ui/AnalyticsButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWandMagicSparkles, faMagnifyingGlass, faGlobe,
  faGraduationCap, faMagnifyingGlassChart, faCube,
  faCheck, faArrowRight, faTags,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import Link from "next/link";
import content from "@/content/home.json";


const ICONS: Record<string, IconDefinition> = {
  wandMagicSparkles: faWandMagicSparkles,
  magnifyingGlass: faMagnifyingGlass,
  globe: faGlobe,
  graduationCap: faGraduationCap,
  magnifyingGlassChart: faMagnifyingGlassChart,
  cube: faCube,
};

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <PageLayout>
      <HeroSection />

      {/* ── Social Proof ─────────────────────────────────── */}
      <section className="relative z-10 bg-background py-20 px-6 xl:px-20 border-b border-border">
        <div className="mx-auto max-w-[1280px] flex flex-col gap-12">

          {/* Stats row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {content.proofBar.stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center text-center gap-1">
                <span className="text-3xl md:text-4xl font-bold text-text-primary">{s.value}</span>
                <span className="text-[13px] text-text-tertiary">{s.label}</span>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-border" />

          {/* Free offer */}
          <div className="flex flex-col items-center gap-5 text-center">
            <p className="text-[11px] font-bold uppercase tracking-widest text-primary font-cabin">
              {content.proofBar.freeTag}
            </p>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
              {content.proofBar.freeFeatures.map((f) => (
                <span key={f} className="flex items-center gap-2 text-[13px] text-text-secondary">
                  <FontAwesomeIcon icon={faCheck} className="w-3 h-3 text-primary shrink-0" />
                  {f}
                </span>
              ))}
            </div>
            <AnalyticsButton href={content.proofBar.cta.href} external={content.proofBar.cta.external} size="lg" gaEvent={{ section: "proof_bar", label: "try_remix" }}>
              {content.proofBar.cta.label}
            </AnalyticsButton>
          </div>

        </div>
      </section>

      {/* ── Partners ─────────────────────────────────────── */}
      <PartnersSection />

      {/* ── RemixAI ──────────────────────────────────────── */}
      <section
        className="relative z-10 py-24 px-6 xl:px-20 border-y border-border overflow-hidden"
        style={{ background: "radial-gradient(ellipse 80% 60% at 10% 120%, rgba(45,231,243,0.18) 0%, transparent 65%), #1e2035" }}
      >
        <div className="mx-auto max-w-[1280px] flex flex-col lg:flex-row gap-16 items-center justify-center">
          <div className="max-w-lg lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-remix-ai/10 border border-remix-ai/20 text-remix-ai text-[12px] font-bold font-cabin uppercase tracking-widest mb-6">
              {content.ai.eyebrow}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
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
            <p className="text-[11px] font-bold uppercase tracking-widest text-primary font-cabin mb-3">
              {content.quickdapp.eyebrow}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              {content.quickdapp.title}
            </h2>
            <p className="text-text-secondary mb-8">
              {content.quickdapp.description}
            </p>
            <ul className="space-y-3 mb-8">
              {content.quickdapp.features.map((item) => (
                <li key={item.label} className="flex items-center gap-3 text-[13px] text-text-secondary">
                  <div className="w-6 h-6 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <FontAwesomeIcon icon={ICONS[item.icon]} className="text-primary w-3 h-3" />
                  </div>
                  {item.label}
                </li>
              ))}
            </ul>
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
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-12 text-center max-w-2xl mx-auto">
            <p className="text-[11px] font-bold uppercase tracking-widest text-primary font-cabin mb-3">
              {content.pricingTeaser.eyebrow}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              {content.pricingTeaser.title}
            </h2>
            <p className="text-text-secondary">
              {content.pricingTeaser.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {content.pricingTeaser.plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative flex flex-col gap-6 rounded-2xl px-6 py-6 ${
                  plan.featured
                    ? "bg-layer-2 border-2 border-primary"
                    : "bg-layer-2 border border-border"
                }`}
              >
                {plan.offerTag && (
                  <div className="inline-flex items-center gap-1.5 self-start rounded-full bg-primary/10 border border-primary/20 px-3 py-1">
                    <FontAwesomeIcon icon={faTags} className="w-3 h-3 text-primary" />
                    <span className="text-[11px] font-bold text-primary">{plan.offerTag}</span>
                  </div>
                )}
                <div>
                  <h3 className="text-[13px] font-bold uppercase tracking-widest text-text-tertiary mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-2">
                    {plan.priceOriginal && (
                      <span className="text-[16px] font-bold text-text-quaternary/60 line-through leading-none">{plan.priceOriginal}</span>
                    )}
                    <span className="text-[28px] font-bold text-text-primary leading-none">{plan.price}</span>
                    {plan.priceNote && (
                      <span className="text-[12px] text-text-tertiary leading-tight">{plan.priceNote}</span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-2.5 flex-1">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-start gap-2.5">
                      <FontAwesomeIcon icon={faCheck} className="w-3 h-3 text-primary shrink-0 mt-0.5" />
                      <span className="text-[13px] text-text-secondary leading-snug">{f}</span>
                    </div>
                  ))}
                </div>
                {plan.featured ? (
                  <AnalyticsButton href={plan.ctaHref} external size="md" gaEvent={{ section: "pricing_teaser", plan: plan.id }}>{plan.cta}</AnalyticsButton>
                ) : (
                  <AnalyticsButton href={plan.ctaHref} external variant="secondary" size="md" gaEvent={{ section: "pricing_teaser", plan: plan.id }}>{plan.cta}</AnalyticsButton>
                )}
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href={content.pricingTeaser.footnoteHref}
              className="inline-flex items-center gap-2 text-[14px] text-primary hover:underline font-semibold"
            >
              {content.pricingTeaser.footnote}
              <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Go Deeper ────────────────────────────────────── */}
      <section className="relative z-10 bg-background py-24 px-6 xl:px-20">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-12 text-center max-w-2xl mx-auto">
            <p className="text-[11px] font-bold uppercase tracking-widest text-primary font-cabin mb-3">
              {content.goDeeper.eyebrow}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              {content.goDeeper.title}
            </h2>
            <p className="text-text-secondary">
              {content.goDeeper.description}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.goDeeper.cards.map((card) => (
              <div
                key={card.title}
                className="bg-layer-1 border border-border rounded-2xl p-6 flex flex-col gap-4 hover:border-border-light transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <FontAwesomeIcon icon={ICONS[card.icon]} className="text-primary w-4 h-4" />
                </div>
                <h3 className="text-[15px] font-bold text-text-primary">{card.title}</h3>
                <p className="text-[13px] text-text-tertiary leading-relaxed flex-1">{card.description}</p>
                <Link
                  href={card.href}
                  target={card.external ? "_blank" : undefined}
                  rel={card.external ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center gap-1.5 text-[12px] text-primary hover:underline font-semibold mt-auto"
                >
                  {card.cta}
                  <FontAwesomeIcon icon={faArrowRight} className="w-2.5 h-2.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Desktop CTA ──────────────────────────────────── */}
      <DesktopCTA />

      {/* ── Community ────────────────────────────────────── */}
      <CommunitySection />
    </PageLayout>
  );
}
