"use client";

import { useState, Fragment } from "react";
import Button from "@/components/ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faMinus, faChevronDown } from "@fortawesome/free-solid-svg-icons";

type Billing = "yearly" | "monthly";

const PLANS = [
  {
    id: "free",
    name: "Free",
    tagline: "Learning Solidity, deploying to testnets.",
    price: { yearly: "€0", monthly: "€0" },
    priceNote: { yearly: "Free for ever", monthly: "Free for ever" },
    cta: "Start for free",
    ctaHref: "https://remix.ethereum.org/",
    featured: false,
    badge: null,
    featuresHeader: null,
    features: [
      "RemixAI conversation panel activated.",
      "Mistral medium (X credits / month).",
      "Frontend generation activated.",
      "Only Mistral small/medium available (only auto mode).",
      "No top up.",
    ],
  },
  {
    id: "starter",
    name: "Starter",
    tagline: "Supporting open source, shipping to mainnet.",
    price: { yearly: "€1.99", monthly: "€5" },
    priceNote: { yearly: "Per month billed annually. Or €5 billed monthly.", monthly: "Billed monthly. Or €1.99/mo billed annually." },
    cta: "Get Starter",
    ctaHref: "https://remix.ethereum.org/",
    featured: true,
    badge: "Most Popular",
    featuresHeader: "Everything in Free, plus:",
    features: [
      "Load and import AI skills.",
      "RemixAI web3 educator agent.",
      "RemixAI default connector (Websearch, OpenZeppelin, Circle etc…).",
      "Frontend AI generation.",
      "Best models available (Sonnet, Opus).",
      "X credits / month.",
      "Top up: X credits costs $X or use API key.",
      "Local first with Ollama or llama-server.",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "Building your first serious dapps, learning with AI.",
    price: { yearly: "€11.99", monthly: "€15" },
    priceNote: { yearly: "Per month billed annually. Or €15 billed monthly.", monthly: "Billed monthly. Or €11.99/mo billed annually." },
    cta: "Go Pro",
    ctaHref: "https://remix.ethereum.org/",
    featured: false,
    badge: "Best value",
    featuresHeader: "Everything in Starter, plus:",
    features: [
      "RemixAI advanced agents (security, gas consumption check).",
      "RemixAI external connector (TheGraph, Etherscan, Alchemy).",
      "Auto mode (Remix chooses the right model).",
      "Frontend hosting (up to 50 deployed dapps).",
      "X credits / month.",
      "Top up: X credits costs $X.",
    ],
  },
  {
    id: "team",
    name: "Team & more",
    tagline: "Multiple developers, compliance requirements.",
    price: { yearly: "Custom", monthly: "Custom" },
    priceNote: { yearly: null, monthly: null },
    cta: "Contact us",
    ctaHref: "/contact",
    featured: false,
    badge: null,
    featuresHeader: "Everything in Pro, plus:",
    features: [
      "Team collaboration features.",
      "Custom AI model access.",
      "Dedicated support SLA.",
      "Custom integrations & volume pricing.",
    ],
  },
];

const COMPARISON_PLANS = ["Free", "Starter", "Pro", "Team & more"];

// Values order: Free | Starter | Pro | Team & more
const COMPARISON_FEATURES: { name: string; values: (boolean | string)[] }[] = [
  { name: "RemixAI conversation panel", values: [true, true, true, true] },
  { name: "Mistral small/medium models", values: ["Auto only", true, true, true] },
  { name: "Best models (Sonnet, Opus)", values: [false, true, true, true] },
  { name: "AI credits / month", values: ["Limited", "Included", "Included", "Custom"] },
  { name: "Top-up credits", values: [false, true, true, true] },
  { name: "Local first (Ollama / llama-server)", values: [false, true, true, true] },
  { name: "Load & import AI skills", values: [false, true, true, true] },
  { name: "RemixAI web3 educator agent", values: [false, true, true, true] },
  { name: "RemixAI default connectors", values: [false, true, true, true] },
  { name: "Auto mode", values: [false, false, true, true] },
  { name: "RemixAI advanced agents", values: [false, false, true, true] },
  { name: "RemixAI external connectors", values: [false, false, true, true] },
  { name: "Frontend AI generation", values: [true, true, true, true] },
  { name: "Frontend hosting", values: [false, false, "50 dapps", "Unlimited"] },
  { name: "Team collaboration", values: [false, false, false, true] },
  { name: "Custom AI model access", values: [false, false, false, true] },
  { name: "Dedicated support SLA", values: [false, false, false, true] },
  { name: "Custom integrations", values: [false, false, false, true] },
];

const FAQS = [
  {
    q: "What happens at month end if there are credits left?",
    a: "Unused credits expire at the end of each billing period and do not roll over to the next month. Make sure to use your credits before they reset.",
  },
  {
    q: "Are Remix credits refundable if the subscription ends?",
    a: "Credits are non-refundable. When your subscription ends you retain access until the end of the current billing period.",
  },
  {
    q: "What is auto mode?",
    a: "Auto mode is included in the Pro plan. It allows Remix to choose the best AI model depending on the prompt. You can still override this and select the model you want to use.",
  },
  {
    q: "What is the Free tier AI credit limit?",
    a: "The Free tier includes a limited number of Mistral small/medium credits per month. To get more credits or access better models, upgrade to Starter or connect your own API key.",
  },
  {
    q: "What about Frontend generation?",
    a: "Frontend generation uses AI credits. When your monthly credits are exhausted, you can buy additional credits at Anthropic pricing or connect your own API key.",
  },
  {
    q: "What are AI sub-agents?",
    a: "AI sub-agents extend Remix AI functionalities using skills, MCP, and more. The Pro plan includes a learning agent, a security agent, and a gas consumption checker.",
  },
  {
    q: "What is the Frontend hosting limit?",
    a: "The Pro plan supports up to 50 deployed dapps. The Team plan includes unlimited frontend hosting. Contact us for custom domain and enterprise options.",
  },
];

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
            <p className="text-[11px] font-bold uppercase tracking-widest text-primary font-cabin">Pricing</p>
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary">
              Simple, transparent pricing
            </h1>
            <p className="text-text-secondary text-lg">
              Start free. Scale as you build. No surprises.
            </p>

            {/* Billing toggle */}
            <div className="flex items-center gap-2 p-0.5 rounded-[18px] bg-[#171724]">
              <button
                onClick={() => setBilling("yearly")}
                className={`px-5 py-2 rounded-[16px] text-[12px] font-medium transition-colors w-[122px] ${
                  billing === "yearly" ? "bg-background text-text-primary" : "text-text-secondary"
                }`}
              >
                Yearly{" "}
                <span className="text-primary font-semibold">–20%</span>
              </button>
              <button
                onClick={() => setBilling("monthly")}
                className={`px-5 py-2 rounded-[16px] text-[12px] font-medium transition-colors w-[122px] ${
                  billing === "monthly" ? "bg-background text-text-primary" : "text-text-secondary"
                }`}
              >
                Monthly
              </button>
            </div>
          </div>

          {/* Pricing cards — 2×2 grid */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-10">
            {PLANS.map((plan) => (
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
            Compare plans
          </h2>

          <div className="hidden md:block">
            {/* Sticky header — one single div that sticks, with its own grid */}
            <div className="sticky top-16 z-40 bg-background border-b border-border grid grid-cols-[2fr_1fr_1fr_1fr_1fr]">
              <div className="py-4 pr-8 font-bold text-[16px] text-text-primary">Features</div>
              {COMPARISON_PLANS.map((plan) => (
                <div key={plan} className="py-2 px-2 flex flex-col items-center justify-center gap-2">
                  <span className="font-bold text-[14px] text-text-primary whitespace-nowrap">{plan}</span>
                  <a
                    href="https://remix.ethereum.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary text-background text-[11px] font-bold rounded px-2 py-0.5 whitespace-nowrap hover:bg-btn-primary-hover transition-colors"
                  >
                    Try Remix
                  </a>
                </div>
              ))}
            </div>

            {/* Feature rows — separate grid with matching columns */}
            <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr]">
              {COMPARISON_FEATURES.map((row, i) => (
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
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary text-center mb-12">FAQ</h2>

          <div className="max-w-3xl mx-auto flex flex-col divide-y divide-border">
            {FAQS.map((faq, i) => (
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
          <h2 className="text-2xl font-bold text-text-primary">We are here to help!</h2>
          <p className="text-text-secondary text-[16px] max-w-xl leading-relaxed">
            If you have any inquiries regarding our various plans, don&apos;t hesitate to get in touch with our dedicated support team. They are here to provide you with tailored assistance and answer all your questions to ensure you find the best option for your needs.
          </p>
          <div className="flex flex-col items-center gap-2">
            <Button href="/contact" size="lg">Send us a message</Button>
            <span className="text-[14px] text-text-quaternary">We will come back to you within a few hours.</span>
          </div>
        </div>
      </section>
    </>
  );
}
