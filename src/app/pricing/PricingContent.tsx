"use client";

import { useState, Fragment } from "react";
import Button from "@/components/ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faMinus, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import content from "@/content/pricing.json";

type Billing = "yearly" | "monthly";

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
  const [billing, setBilling] = useState<Billing>("yearly");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      {/* Hero */}
      <section className="py-20 px-6 xl:px-20 border-b border-border">
        <div className="mx-auto max-w-[1280px] flex flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-6 text-center">
            <p className="text-[11px] font-bold uppercase tracking-widest text-primary font-cabin">{content.hero.eyebrow}</p>
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary">
              {content.hero.title}
            </h1>
            <p className="text-text-secondary text-lg">
              {content.hero.description}
            </p>

            {/* Billing toggle */}
            <div className="flex items-center gap-2 p-0.5 rounded-[18px] bg-[#171724]">
              <button
                onClick={() => setBilling("yearly")}
                className={`px-5 py-2 rounded-[16px] text-[12px] font-medium transition-colors w-[122px] ${
                  billing === "yearly" ? "bg-background text-text-primary" : "text-text-secondary"
                }`}
              >
                {content.hero.billingToggle.yearly.label}{" "}
                <span className="text-primary font-semibold">{content.hero.billingToggle.yearly.savings}</span>
              </button>
              <button
                onClick={() => setBilling("monthly")}
                className={`px-5 py-2 rounded-[16px] text-[12px] font-medium transition-colors w-[122px] ${
                  billing === "monthly" ? "bg-background text-text-primary" : "text-text-secondary"
                }`}
              >
                {content.hero.billingToggle.monthly.label}
              </button>
            </div>
          </div>

          {/* Pricing cards — 2×2 grid */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-10">
            {content.plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative flex flex-col gap-6 rounded-2xl px-8 py-6 ${
                  plan.featured
                    ? "bg-layer-1 border-2 border-primary"
                    : "bg-layer-1 border border-border"
                }`}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-4 right-8 z-10 inline-flex items-center whitespace-nowrap bg-[#2d3d56] border border-primary/20 rounded-full px-3 py-1">
                    <span className="text-[12px] font-bold text-primary">{plan.badge}</span>
                  </div>
                )}

                {/* Plan header */}
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-bold text-text-primary">{plan.name}</h2>
                    <p className="text-[14px] text-text-secondary">{plan.tagline}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-[32px] font-bold text-text-primary leading-none">
                      {plan.price[billing]}
                    </span>
                    {plan.priceNote[billing] && (
                      <span className="text-[12px] text-text-tertiary leading-tight flex-1">
                        {plan.priceNote[billing]}
                      </span>
                    )}
                  </div>
                </div>

                {/* CTA */}
                {plan.featured ? (
                  <Button href={plan.ctaHref} external={plan.ctaHref.startsWith("http")} size="md">
                    {plan.cta}
                  </Button>
                ) : (
                  <Button href={plan.ctaHref} external={plan.ctaHref.startsWith("http")} variant="secondary" size="md">
                    {plan.cta}
                  </Button>
                )}

                {/* Features */}
                <div className="flex flex-col gap-2">
                  {plan.featuresHeader && (
                    <p className="text-[14px] font-bold text-text-primary mb-1">{plan.featuresHeader}</p>
                  )}
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-start gap-3">
                      <FontAwesomeIcon icon={faCheck} className="w-3 h-3 text-primary shrink-0 mt-1" />
                      <p className="text-[14px] text-text-primary leading-snug">{f}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compare plans */}
      <section className="py-20 px-6 xl:px-20 border-b border-border">
        <div className="mx-auto max-w-[1280px]">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary text-center mb-12">
            {content.comparison.title}
          </h2>

          <div className="hidden md:block">
            {/* Sticky header — one single div that sticks, with its own grid */}
            <div className="sticky top-16 z-40 bg-background border-b border-border grid grid-cols-[2fr_1fr_1fr_1fr_1fr]">
              <div className="py-4 pr-8 font-bold text-[16px] text-text-primary">{content.comparison.featuresLabel}</div>
              {content.comparison.plans.map((plan) => (
                <div key={plan} className="py-2 px-2 flex flex-col items-center justify-center gap-2">
                  <span className="font-bold text-[14px] text-text-primary whitespace-nowrap">{plan}</span>
                  <a
                    href={content.comparison.tryRemixHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary text-background text-[11px] font-bold rounded px-2 py-0.5 whitespace-nowrap hover:bg-btn-primary-hover transition-colors"
                  >
                    {content.comparison.tryRemixLabel}
                  </a>
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
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary text-center mb-12">{content.faq.title}</h2>

          <div className="max-w-3xl mx-auto flex flex-col divide-y divide-border">
            {content.faq.items.map((faq, i) => (
              <div key={i}>
                <button
                  className="w-full flex items-center justify-between gap-4 py-5 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
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
          <h2 className="text-2xl font-bold text-text-primary">{content.help.title}</h2>
          <p className="text-text-secondary text-[16px] max-w-xl leading-relaxed">
            {content.help.description}
          </p>
          <div className="flex flex-col items-center gap-2">
            <Button href={content.help.cta.href} size="lg">{content.help.cta.label}</Button>
            <span className="text-[14px] text-text-quaternary">{content.help.note}</span>
          </div>
        </div>
      </section>
    </>
  );
}
