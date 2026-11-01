"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import AnalyticsButton from "@/components/ui/AnalyticsButton";

export type PanelPlan = {
  id: string;
  name: string;
  price: string;
  priceNote: string;
  credits: string;
  /** Filled segments out of 10 — relative monthly credits. */
  meter: number;
  cta: string;
  ctaHref: string;
  featured: boolean;
  badge: string | null;
};

function trackClick(event: Record<string, string>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).gtag?.("event", "cta_click", event);
}

const isExternal = (href: string) => href.startsWith("http");

/** Joined Lite / Starter / Pro panel; children render as the shared footer row. */
export default function PlanPanel({
  plans,
  creditsLabel,
  gaSection,
  compact = false,
  children,
}: {
  plans: PanelPlan[];
  creditsLabel: string;
  gaSection: string;
  compact?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className="w-full rounded-[22px] border border-border bg-layer-1/55 backdrop-blur-sm overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3">
        {plans.map((plan, i) => (
          <article
            key={plan.id}
            className={`relative flex flex-col min-w-0 border-border ${i > 0 ? "border-t md:border-t-0 md:border-l" : ""} ${
              compact ? "gap-[18px] p-[26px]" : "gap-[22px] px-[30px] pt-[30px] pb-7"
            } ${
              plan.featured
                ? "bg-[radial-gradient(120%_70%_at_50%_0%,rgba(100,196,255,0.14),transparent_70%)] before:absolute before:inset-x-0 before:top-0 before:h-0.5 before:bg-gradient-to-r before:from-transparent before:via-primary before:to-transparent"
                : ""
            }`}
          >
            <div className="flex items-center justify-between gap-2.5">
              <h3 className="text-[18px] font-extrabold tracking-[-0.01em] text-text-primary">{plan.name}</h3>
              {plan.badge && (
                <span className="rounded-full bg-primary px-2.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-background">
                  {plan.badge}
                </span>
              )}
            </div>

            <div className="flex items-baseline gap-2">
              <strong className={`font-extrabold leading-[0.9] tracking-[-0.04em] tabular-nums text-text-primary ${compact ? "text-[40px]" : "text-[52px]"}`}>
                <sup className="mr-0.5 align-[0.95em] text-[0.42em] font-extrabold tracking-normal">$</sup>
                {plan.price}
              </strong>
              <span className="text-[13px] text-text-tertiary">{plan.priceNote}</span>
            </div>

            <div className="flex flex-col gap-2.5 rounded-[14px] border border-border bg-black/20 px-4 py-3.5">
              <div className="flex items-baseline justify-between gap-2 font-mono">
                <strong className="text-[22px] font-bold tracking-[-0.02em] text-text-primary">{plan.credits}</strong>
                <span className="text-[11px] uppercase tracking-[0.06em] text-text-tertiary">{creditsLabel}</span>
              </div>
              <div className="grid grid-cols-10 gap-[3px]" aria-hidden="true">
                {Array.from({ length: 10 }, (_, i) => (
                  <i
                    key={i}
                    className={`h-1.5 rounded-[2px] ${i < plan.meter ? "bg-gradient-to-b from-remix-ai to-primary" : "bg-text-quaternary/20"}`}
                  />
                ))}
              </div>
            </div>

            <AnalyticsButton
              href={plan.ctaHref}
              external={isExternal(plan.ctaHref)}
              variant={plan.featured ? "primary" : "secondary"}
              className="w-full"
              gaEvent={{ section: gaSection, plan: plan.id }}
            >
              {plan.cta}
            </AnalyticsButton>
          </article>
        ))}
      </div>

      {children && <div className="border-t border-border bg-black/10">{children}</div>}
    </div>
  );
}

/** Slim row under the panel (Free, Team, comparison link). */
export function PlanStrip({
  name,
  note,
  description,
  cta,
  href,
  gaEvent,
}: {
  name: string;
  note?: string;
  description: string;
  cta: string;
  href: string;
  gaEvent: Record<string, string>;
}) {
  return (
    <div className="flex flex-wrap sm:flex-nowrap items-center gap-x-[18px] gap-y-2 rounded-2xl border border-border bg-layer-1/35 px-[22px] py-[18px] min-w-0">
      <div className="flex flex-1 flex-col gap-0.5 min-w-0">
        <strong className="text-[15px] font-extrabold text-text-primary">
          {name}
          {note && <span className="ml-2 font-mono text-[12px] font-medium text-text-tertiary">{note}</span>}
        </strong>
        <p className="text-[13px] text-text-tertiary">{description}</p>
      </div>
      <Link
        href={href}
        target={isExternal(href) ? "_blank" : undefined}
        rel={isExternal(href) ? "noopener noreferrer" : undefined}
        onClick={() => trackClick(gaEvent)}
        className="group inline-flex items-center gap-1.5 whitespace-nowrap text-[14px] font-bold text-primary"
      >
        {cta}
        <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3 transition-transform group-hover:translate-x-[3px]" />
      </Link>
    </div>
  );
}
