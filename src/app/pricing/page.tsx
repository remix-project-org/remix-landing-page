import type { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import content from "@/content/pricing.json";

export const metadata: Metadata = content.metadata;

function GiftIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-tertiary shrink-0">
      <path d="M20 12v10H4V12M22 7H2v5h20V7zM12 22V7M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-primary shrink-0">
      <path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5L12 2z"/>
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-tertiary shrink-0">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  );
}

function CoinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-tertiary shrink-0">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 6v2M12 16v2M9.5 9.5c0-1.1.9-1.5 2.5-1.5s2.5.4 2.5 1.5-1.1 2-2.5 2-2.5.9-2.5 2 .9 1.5 2.5 1.5 2.5-.4 2.5-1.5"/>
    </svg>
  );
}

function ComingSoon() {
  return (
    <div className="w-full text-center py-2 text-[12px] font-bold text-text-quaternary uppercase tracking-widest">
      Coming Soon
    </div>
  );
}

export default function PricingPage() {
  const { launchOffer, monthlyPlans, sixMonthPlan, topup } = content;

  return (
    <PageLayout>
      {/* Hero */}
      <section className="py-20 px-6 xl:px-20 text-center bg-background border-b border-border">
        <div className="mx-auto max-w-[1280px]">
          <p className="text-[11px] font-bold uppercase tracking-widest text-primary font-cabin mb-4">
            {content.hero.eyebrow}
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-text-primary">{content.hero.titleStart} </span>
            <span className="text-primary">{content.hero.titleAccent}</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            {content.hero.description}
          </p>
        </div>
      </section>

      <section className="py-16 px-6 xl:px-20">
        <div className="mx-auto max-w-[860px] flex flex-col gap-12">

          {/* 6-month plan — Best Deal on top */}
          <div className="flex flex-col gap-4">
            <p className="text-[11px] font-bold uppercase tracking-widest text-text-quaternary font-cabin">
              LONG-TERM SUBSCRIPTION
            </p>
            <div className="bg-layer-1 border border-primary/40 rounded-2xl p-6 flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <CalendarIcon />
                <span className="text-[15px] font-bold text-text-primary">{sixMonthPlan.label}</span>
                <span className="text-[11px] font-bold bg-primary/20 text-primary px-2.5 py-1 rounded-full uppercase tracking-wide">
                  {sixMonthPlan.badge}
                </span>
                <span className="text-[11px] font-bold bg-green-500/20 text-green-400 px-2.5 py-1 rounded-full uppercase tracking-wide">
                  Best Deal
                </span>
              </div>

              <div className="flex flex-col gap-2">
                {sixMonthPlan.rows.map((row) => (
                  <div key={row.tier} className="flex items-center justify-between">
                    <span className="text-[14px] text-text-secondary">{row.tier}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-[13px] text-text-quaternary line-through">{row.originalPrice}</span>
                      <span className="text-[14px] font-bold text-text-primary">{row.price}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 pt-1 border-t border-border">
                <GiftIcon />
                <span className="text-[13px] text-text-tertiary">{sixMonthPlan.giftLabel}</span>
                <span className="ml-auto text-[13px] font-bold text-primary">{sixMonthPlan.giftValue}</span>
              </div>

              <ComingSoon />
            </div>
          </div>

          {/* Launch Offer */}
          <div className="flex flex-col gap-4">
            <p className="text-[11px] font-bold uppercase tracking-widest text-text-quaternary font-cabin flex items-center gap-2">
              🚀 {launchOffer.heading}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {launchOffer.offers.map((offer) => (
                <div
                  key={offer.id}
                  className={`rounded-2xl p-6 flex flex-col gap-4 border ${
                    offer.theme === "warm"
                      ? "bg-[#2c2800] border-[#5a5000]"
                      : "bg-[#1a2240] border-[#2a3560]"
                  }`}
                >
                  <span className={`self-start text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide ${
                    offer.theme === "warm"
                      ? "bg-amber-400/20 text-amber-300"
                      : "bg-primary/20 text-primary"
                  }`}>
                    {offer.badge}
                  </span>
                  <div className="flex flex-col gap-1">
                    <span className="text-[13px] text-text-quaternary line-through">{offer.originalPrice}</span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-3xl font-bold text-text-primary">{offer.discountedPrice}</span>
                      <span className="text-text-tertiary text-[13px]">{offer.discountedPeriod}</span>
                    </div>
                    <span className={`text-[12px] font-semibold ${offer.theme === "warm" ? "text-amber-300" : "text-primary"}`}>
                      {offer.bonus}
                    </span>
                  </div>
                  <p className="text-[12px] text-text-quaternary">{offer.then}</p>
                  <ComingSoon />
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Plans */}
          <div className="flex flex-col gap-4">
            <p className="text-[11px] font-bold uppercase tracking-widest text-text-quaternary font-cabin">
              {monthlyPlans.heading}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {monthlyPlans.plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`bg-layer-1 rounded-2xl p-6 flex flex-col gap-5 border ${
                    plan.popular ? "border-primary/50" : "border-border"
                  }`}
                >
                  <div className="flex flex-col gap-2">
                    {plan.popular && (
                      <span className="self-start text-[11px] font-bold text-background bg-primary px-2.5 py-1 rounded-full uppercase tracking-wide">
                        Most popular
                      </span>
                    )}
                    <div className="flex items-center gap-2">
                      <SparkleIcon />
                      <span className="text-[15px] font-bold text-text-primary">{plan.name}</span>
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-4xl font-bold text-text-primary">{plan.price}</span>
                      <span className="text-text-tertiary text-[14px]">{plan.period}</span>
                    </div>
                    {plan.summary && (
                      <p className="text-[13px] text-text-secondary leading-relaxed">{plan.summary}</p>
                    )}
                  </div>
                  {plan.features && plan.features.length > 0 && (
                    <ul className="flex flex-col gap-2">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-[12px] text-text-tertiary leading-relaxed">
                          <span className="mt-1 text-primary">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="flex items-center gap-2">
                    <GiftIcon />
                    <span className="text-[13px] text-text-tertiary">{plan.giftLabel}</span>
                    <span className="ml-auto text-[13px] font-bold text-primary">{plan.giftValue}</span>
                  </div>
                  <ComingSoon />
                </div>
              ))}
            </div>
          </div>

          {/* Top-up */}
          <div className="flex flex-col gap-4">
            <p className="text-[11px] font-bold uppercase tracking-widest text-text-quaternary font-cabin">
              {topup.heading}
            </p>
            <div className="bg-layer-1 border border-border rounded-2xl p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-layer-2 border border-border flex items-center justify-center shrink-0">
                <CoinIcon />
              </div>
              <div>
                <p className="text-[14px] font-bold text-text-primary">{topup.title}</p>
                <p className="text-[12px] text-text-tertiary">{topup.description}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {topup.packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="bg-layer-1 border border-border hover:border-border-light rounded-xl p-4 flex flex-col gap-3 transition-colors"
                >
                  <div>
                    <p className="text-[11px] font-bold text-text-quaternary uppercase tracking-wide mb-1">{pkg.label}</p>
                    <p className="text-2xl font-bold text-text-primary">{pkg.credits}</p>
                  </div>
                  <p className="text-[11px] text-text-quaternary leading-relaxed">{pkg.note}</p>
                  <ComingSoon />
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </PageLayout>
  );
}
