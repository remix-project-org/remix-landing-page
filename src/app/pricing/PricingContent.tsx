"use client";

import { useState, Fragment } from "react";
import Button from "@/components/ui/Button";
import PlanPanel, { PlanStrip } from "@/components/sections/PlanPanel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck, faMinus, faChevronDown, faArrowRight,
  faShieldHalved, faGasPump, faGlobe, faWandMagicSparkles, faCode,
  faTag, faCloud, faMicrochip, faKey, faPlug,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import rawContent from "@/content/pricing.json";
import { resolveContent } from "@/lib/urls";

const content = resolveContent(rawContent);

const FEATURE_ICONS: Record<string, IconDefinition> = {
  shield: faShieldHalved,
  gas: faGasPump,
  globe: faGlobe,
  sparkles: faWandMagicSparkles,
  code: faCode,
  tag: faTag,
  cloud: faCloud,
  chip: faMicrochip,
  key: faKey,
  plug: faPlug,
};

function CellValue({ value }: { value: boolean | string }) {
  if (value === true) {
    return <FontAwesomeIcon icon={faCheck} className="w-3.5 h-3.5 text-primary mx-auto block" />;
  }
  if (value === false) {
    return <FontAwesomeIcon icon={faMinus} className="w-3.5 h-3.5 text-text-quaternary/40 mx-auto block" />;
  }
  return <span className="text-[11px] text-text-secondary text-center block leading-tight">{value}</span>;
}

export default function PricingContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { hero, paidFeatures } = content;

  return (
    <>
      {/* Hero + plans */}
      <section
        className="px-6 xl:px-20 pb-20 border-b border-border bg-no-repeat"
        style={{ backgroundImage: "radial-gradient(900px 420px at 72% 260px, rgba(100,196,255,0.10), transparent 70%), radial-gradient(700px 360px at 18% 120px, rgba(45,231,243,0.05), transparent 70%)" }}
      >
        <div className="mx-auto max-w-[1160px]">
          <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-x-16 gap-y-8 items-end pt-16 lg:pt-20 pb-11">
            <div>
              <p className="eyebrow">{hero.eyebrow}</p>
              <h1 className="mt-3.5 text-[clamp(40px,6vw,68px)] leading-[0.98] text-text-primary">
                {hero.titleStart}
                <br />
                <span className="bg-gradient-to-r from-primary to-remix-ai bg-clip-text text-transparent">{hero.titleAccent}</span>
              </h1>
            </div>
            <div className="flex flex-col gap-3.5 max-w-[44ch]">
              <p className="text-[16px] text-text-secondary">{hero.description}</p>
              <p className="inline-flex items-center gap-2.5 self-start rounded-[10px] border border-border bg-white/[0.02] px-3 py-2 font-mono text-[13px] text-text-primary">
                {hero.rate.usd} <span className="text-text-tertiary">=</span>
                <span className="text-remix-ai">{hero.rate.credits}</span>
                <span className="text-text-tertiary">{hero.rate.label}</span>
              </p>
            </div>
          </div>

          <PlanPanel plans={content.plans} creditsLabel={content.creditsLabel} gaSection="pricing_plans">
            <div className="flex flex-col gap-[18px] px-[30px] pt-[26px] pb-7">
              <div className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-2">
                <h2 className="text-[15px] tracking-normal text-text-primary">
                  {paidFeatures.title} <span className="font-semibold text-text-tertiary">{paidFeatures.titleNote}</span>
                </h2>
                <a
                  href={paidFeatures.compareHref}
                  className="group inline-flex items-center gap-1.5 text-[14px] font-bold text-primary"
                  onClick={(e) => {
                    const target = document.querySelector(paidFeatures.compareHref);
                    if (!target) return;
                    e.preventDefault();
                    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
                    target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
                    history.replaceState(null, "", paidFeatures.compareHref);
                  }}
                >
                  {paidFeatures.compareLabel}
                  <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3 transition-transform group-hover:translate-x-[3px]" />
                </a>
              </div>
              <ul className="grid grid-cols-2 lg:grid-cols-5 gap-x-[22px] gap-y-[18px]">
                {paidFeatures.items.map((f) => (
                  <li key={f.label} className="flex flex-col gap-2 min-w-0 text-[13px] leading-[1.35] text-text-secondary">
                    <span className="grid place-items-center w-[30px] h-[30px] rounded-lg bg-primary/[0.08] border border-primary/15 text-primary">
                      <FontAwesomeIcon icon={FEATURE_ICONS[f.icon]} className="w-3.5 h-3.5" />
                    </span>
                    {f.label}
                  </li>
                ))}
              </ul>
            </div>
          </PlanPanel>

          <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-3.5 mt-3.5">
            <PlanStrip
              name={content.free.name}
              note={content.free.priceNote}
              description={content.free.description}
              cta={content.free.cta}
              href={content.free.ctaHref}
              gaEvent={{ section: "pricing_plans", plan: "free" }}
            />
            <PlanStrip
              name={content.team.name}
              description={content.team.description}
              cta={content.team.cta}
              href={content.team.ctaHref}
              gaEvent={{ section: "pricing_plans", plan: "team" }}
            />
          </div>

          <p className="mt-[22px] flex flex-wrap justify-center gap-x-[18px] gap-y-2 font-mono text-[12px] text-text-tertiary">
            <span>{content.topUps.label}</span>
            {content.topUps.packs.map((pack) => (
              <span key={pack} className="text-text-secondary">{pack}</span>
            ))}
          </p>
        </div>
      </section>

      {/* Compare plans */}
      <section id="compare" className="scroll-mt-16 py-20 px-6 xl:px-20 border-b border-border">
        <div className="mx-auto max-w-[1280px]">
          <h2 className="text-3xl md:text-4xl text-text-primary text-center mb-12">
            {content.comparison.title}
          </h2>

          {/* Mobile: horizontal-scroll table — browser matches row heights automatically */}
          <div className="md:hidden overflow-x-auto -mx-6">
            <table className="w-full min-w-[520px] border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="sticky left-0 z-20 bg-background py-3 pl-6 pr-3 text-left font-bold text-[13px] text-text-primary w-[148px]">
                    {content.comparison.featuresLabel}
                  </th>
                  {content.comparison.plans.map((plan) => (
                    <th key={plan} className="py-3 px-3 text-center font-bold text-[13px] text-text-primary">
                      {plan}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {content.comparison.rows.map((row, i) => (
                  <tr key={row.name}>
                    <td className={`sticky left-0 z-10 py-3 pl-6 pr-3 text-[12px] text-text-primary border-b border-border/50 ${i % 2 !== 0 ? "bg-layer-1" : "bg-background"}`}>
                      {row.name}
                    </td>
                    {row.values.map((val, j) => (
                      <td key={j} className={`py-3 px-3 border-b border-border/50 text-center align-middle ${i % 2 !== 0 ? "bg-layer-1/30" : ""}`}>
                        <CellValue value={val} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="hidden md:block">
            {/* Sticky header — one single div that sticks, with its own grid */}
            <div className="sticky top-16 z-40 bg-background border-b border-border grid grid-cols-[2fr_1fr_1fr_1fr_1fr]">
              <div className="py-4 pr-8 font-bold text-[16px] text-text-primary">{content.comparison.featuresLabel}</div>
              {content.comparison.plans.map((plan) => (
                <div key={plan} className="py-2 px-2 flex flex-col items-center justify-center gap-2">
                  <span className="font-bold text-[14px] text-text-primary whitespace-nowrap">{plan}</span>
                  {/* <a
                    href={content.comparison.tryRemixHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary text-background text-[11px] font-bold rounded px-2 py-0.5 whitespace-nowrap hover:bg-btn-primary-hover transition-colors"
                  >
                    {content.comparison.tryRemixLabel}
                  </a> */}
                </div>
              ))}
            </div>

            {/* Feature rows — separate grid with matching columns */}
            <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr]">
              {content.comparison.rows.map((row, i) => (
                <Fragment key={row.name}>
                  <div className={`py-3 pr-8 text-[14px] text-text-primary border-b border-border/50 flex items-center ${i % 2 !== 0 ? "bg-layer-1/30" : ""}`}>
                    {row.name}
                  </div>
                  {row.values.map((val, j) => (
                    <div key={j} className={`py-3 px-2 border-b border-border/50 flex items-center justify-center ${i % 2 !== 0 ? "bg-layer-1/30" : ""}`}>
                      <CellValue value={val} />
                    </div>
                  ))}
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 xl:px-20 border-b border-border">
        <div className="mx-auto max-w-[1280px]">
          <h2 className="text-3xl md:text-4xl text-text-primary text-center mb-12">{content.faq.title}</h2>

          <div className="max-w-3xl mx-auto flex flex-col divide-y divide-border">
            {content.faq.items.map((faq, i) => (
              <div key={i}>
                <button
                  className="w-full flex items-center justify-between gap-4 py-5 text-left"
                  onClick={() => {
                    const isOpening = openFaq !== i;
                    setOpenFaq(isOpening ? i : null);
                    if (isOpening) {
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      (window as any).gtag?.("event", "faq_open", { question: faq.q });
                    }
                  }}
                >
                  <span className="text-[18px] font-bold text-text-primary leading-snug">{faq.q}</span>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`w-4 h-4 text-text-quaternary shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${openFaq === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-5 text-[14px] text-text-secondary leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* We are here to help */}
      <section className="py-20 px-6 xl:px-20 bg-layer-1">
        <div className="mx-auto max-w-[1280px] flex flex-col items-center gap-6 text-center">
          <h2 className="text-2xl text-text-primary">{content.help.title}</h2>
          <p className="text-text-secondary text-[16px] max-w-xl leading-relaxed">
            {content.help.description}
          </p>
          <div className="flex flex-col items-center gap-2">
            <Button href={content.help.cta.href} size="lg"
              onClick={() => // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (window as any).gtag?.("event", "cta_click", { section: "pricing_help", label: "contact" })}>
              {content.help.cta.label}
            </Button>
            <span className="text-[14px] text-text-quaternary">{content.help.note}</span>
          </div>
        </div>
      </section>
    </>
  );
}
