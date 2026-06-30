import type { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import CommunitySection from "@/components/sections/CommunitySection";
import DesktopCTA from "@/components/sections/DesktopCTA";
import HeroSection from "@/components/sections/HeroSection";
import PartnersSection from "@/components/sections/PartnersSection";
import Button from "@/components/ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWandMagicSparkles, faMagnifyingGlass, faGlobe,
  faGraduationCap, faMagnifyingGlassChart, faCube,
  faCheck, faArrowRight, faTags,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import Link from "next/link";
import content from "@/content/home.json";

function RemixAIIcon({ size = 10 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M58.805 3.20852C59.9657 3.10206 60.8956 4.03088 60.7912 5.19188C60.3375 10.2359 58.3389 23.1957 49.6021 32.0002C58.3389 40.8047 60.3375 53.7646 60.7912 58.8085C60.8956 59.9695 59.9657 60.8983 58.805 60.7919C53.7881 60.3317 40.5066 58.3129 31.7793 49.5182C23.0521 58.3129 10.2103 60.3317 5.19343 60.7919C4.0327 60.8983 3.1028 59.9695 3.20723 58.8085C3.66094 53.7646 5.65953 40.8047 14.3964 32.0002C5.65957 23.1957 3.66095 10.2359 3.20723 5.19188C3.1028 4.03088 4.0327 3.10206 5.19343 3.20852C10.2103 3.66865 23.4919 5.68748 32.2191 14.4822C40.9464 5.68746 53.7881 3.66866 58.805 3.20852ZM32.1668 21.3717C31.6435 21.3717 31.1747 21.6987 30.9893 22.1894L28.6768 28.3516L22.5151 30.6635C22.0245 30.849 21.6975 31.3184 21.6975 31.8419C21.6976 32.3652 22.0246 32.834 22.5151 33.0195L28.6768 35.3314L30.9893 41.4936C31.1747 41.9844 31.6434 42.312 32.1668 42.3121C32.6903 42.3121 33.159 41.9844 33.3444 41.4936L35.6569 35.3314L41.8186 33.0195C42.3091 32.8341 42.6361 32.3653 42.6362 31.8419C42.6362 31.3184 42.3093 30.8489 41.8186 30.6635L35.6569 28.3516L33.3444 22.1894C33.1589 21.6987 32.6902 21.3717 32.1668 21.3717Z" fill="currentColor" />
    </svg>
  );
}

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
            <Button href={content.proofBar.cta.href} external={content.proofBar.cta.external} size="lg">
              {content.proofBar.cta.label}
            </Button>
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
              <Button href={content.ai.cta.href} external={content.ai.cta.external} variant="ai">
                {content.ai.cta.label}
              </Button>
              <Button href={content.ai.ctaSecondary.href} external={content.ai.ctaSecondary.external} variant="secondary">
                {content.ai.ctaSecondary.label}
              </Button>
            </div>
          </div>

          {/* AI Chat Mock */}
          <div
            role="img"
            aria-label="RemixAI chat showing a contract audit finding a reentrancy vulnerability and optimizing gas"
            className="w-full lg:w-[420px] shrink-0 bg-layer-2 rounded-xl border border-border overflow-hidden lg:order-1"
          >
            {/* Header */}
            <div aria-hidden="true" className="flex items-center justify-between px-4 py-3 bg-layer-1 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-md bg-remix-ai/20 border border-remix-ai/30 flex items-center justify-center text-remix-ai">
                  <RemixAIIcon size={10} />
                </div>
                <span className="text-[12px] font-bold text-text-primary">RemixAI</span>
              </div>
              <span className="text-[10px] font-bold bg-primary/10 border border-primary/20 text-primary rounded-full px-2 py-0.5">Pro</span>
            </div>

            {/* Messages */}
            <div aria-hidden="true" className="flex flex-col gap-4 p-4">
              {/* User */}
              <div className="flex justify-end">
                <div className="bg-primary/10 border border-primary/20 rounded-xl rounded-tr-sm px-3 py-2 max-w-[82%]">
                  <p className="text-[12px] text-text-primary">Audit this contract for security issues</p>
                </div>
              </div>

              {/* AI — audit result */}
              <div className="flex gap-2.5">
                <div className="w-6 h-6 rounded-lg bg-remix-ai/10 border border-remix-ai/20 flex items-center justify-center shrink-0 mt-0.5 text-remix-ai">
                  <RemixAIIcon size={11} />
                </div>
                <div className="bg-layer-1 border border-border rounded-xl rounded-tl-sm px-3 py-2.5 flex flex-col gap-2.5">
                  <p className="text-[12px] text-text-secondary">Found 2 issues:</p>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-start gap-2">
                      <span className="text-[10px] font-bold text-red-400 bg-red-400/10 border border-red-400/20 rounded px-1.5 py-0.5 shrink-0 mt-px">HIGH</span>
                      <p className="text-[11px] text-text-secondary leading-snug">
                        Reentrancy on <span className="font-mono text-primary">withdraw()</span> — add <span className="font-mono text-primary">nonReentrant</span> modifier
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[10px] font-bold text-yellow-400 bg-yellow-400/10 border border-yellow-400/20 rounded px-1.5 py-0.5 shrink-0 mt-px">MED</span>
                      <p className="text-[11px] text-text-secondary leading-snug">
                        Missing access control on <span className="font-mono text-primary">mint()</span> — restrict to <span className="font-mono text-primary">onlyOwner</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* User */}
              <div className="flex justify-end">
                <div className="bg-primary/10 border border-primary/20 rounded-xl rounded-tr-sm px-3 py-2 max-w-[82%]">
                  <p className="text-[12px] text-text-primary">Fix both and optimize for gas</p>
                </div>
              </div>

              {/* AI — fix result */}
              <div className="flex gap-2.5">
                <div className="w-6 h-6 rounded-lg bg-remix-ai/10 border border-remix-ai/20 flex items-center justify-center shrink-0 mt-0.5 text-remix-ai">
                  <RemixAIIcon size={11} />
                </div>
                <div className="bg-layer-1 border border-border rounded-xl rounded-tl-sm px-3 py-2.5 flex flex-col gap-2">
                  <p className="text-[12px] text-text-secondary">
                    Both issues fixed. Gas reduced by{" "}
                    <span className="text-primary font-semibold">14%</span> — saved 2,840 gas on{" "}
                    <span className="font-mono text-primary">withdraw()</span>.
                  </p>
                  <div className="bg-layer-2 border border-border rounded-lg px-3 py-2">
                    <p className="text-[10px] text-text-quaternary font-mono leading-relaxed">
                      {"function withdraw() external"}<br />
                      {"  "}<span className="text-primary">{"nonReentrant onlyOwner"}</span> {"{"}
                      <br />
                      {"  // updated contract ready →"}
                    </p>
                  </div>
                </div>
              </div>

              {/* User — compile and deploy */}
              <div className="flex justify-end">
                <div className="bg-primary/10 border border-primary/20 rounded-xl rounded-tr-sm px-3 py-2 max-w-[82%]">
                  <p className="text-[12px] text-text-primary">Compile and deploy to Sepolia</p>
                </div>
              </div>

              {/* AI — compile and deploy result (full width) */}
              <div className="bg-layer-1 border border-border rounded-xl px-3 py-3 flex flex-col gap-2.5">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <div className="text-remix-ai"><RemixAIIcon size={9} /></div>
                  <span className="text-[10px] font-bold text-remix-ai">RemixAI</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-green-400 bg-green-400/10 border border-green-400/20 rounded px-1.5 py-0.5">✓ Compiled</span>
                    <span className="text-[11px] text-text-tertiary">0 errors · 0 warnings</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-primary bg-primary/10 border border-primary/20 rounded px-1.5 py-0.5">✓ Deployed</span>
                    <span className="text-[11px] text-text-tertiary font-mono">Sepolia</span>
                  </div>
                </div>
                <div className="flex items-center justify-between bg-layer-2 border border-border rounded-lg px-3 py-1.5">
                  <span className="text-[10px] text-text-quaternary font-mono">0x742d35Cc6634C0532…8f3a</span>
                  <span className="text-[11px] font-semibold text-primary cursor-default">Etherscan →</span>
                </div>
              </div>
            </div>
          </div>
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
              <Button href={content.quickdapp.cta.href} external={content.quickdapp.cta.external} size="lg">
                {content.quickdapp.cta.label}
              </Button>
              <Button href={content.quickdapp.ctaSecondary.href} external={content.quickdapp.ctaSecondary.external} size="lg" variant="secondary">
                {content.quickdapp.ctaSecondary.label}
              </Button>
            </div>
          </div>

          {/* QuickDApp mock — prompt → live dApp on ENS */}
          <div
            role="img"
            aria-label="QuickDApp: a text prompt generates a live token swap dApp deployed to IPFS at myswap.remix.eth"
            className="flex-1 bg-layer-1 rounded-2xl border border-border overflow-hidden"
          >
            {/* Title bar */}
            <div aria-hidden="true" className="flex items-center gap-3 px-4 py-3 bg-layer-2 border-b border-border">
              <div className="flex gap-1.5 shrink-0">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
              </div>
              <span className="text-[11px] text-text-tertiary font-mono flex-1 ml-1">QuickDApp</span>
            </div>

            <div aria-hidden="true" className="flex flex-col">

              {/* ── Prompt input ── */}
              <div className="p-4 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-md bg-remix-ai/20 border border-remix-ai/30 flex items-center justify-center text-remix-ai shrink-0">
                    <RemixAIIcon size={10} />
                  </div>
                  <span className="text-[11px] font-bold text-remix-ai">RemixAI</span>
                  <span className="text-[10px] text-text-quaternary">· What do you want to build?</span>
                </div>
                <div className="bg-layer-2 border border-border rounded-xl px-3 py-2.5">
                  <p className="text-[12px] text-text-primary leading-relaxed">
                    Create a token swap interface for{" "}
                    <span className="text-primary font-semibold">ETH</span>
                    {" "}and{" "}
                    <span className="text-primary font-semibold">USDC</span>
                    , connected to my Uniswap V3 contract
                  </p>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] text-text-tertiary border border-border rounded-md px-2.5 py-1 cursor-default">
                    + Attach contract
                  </span>
                  <span className="text-[10px] font-bold text-background bg-primary rounded-md px-3 py-1 cursor-default">
                    Generate →
                  </span>
                </div>
              </div>

              {/* ── Generation result bar ── */}
              <div className="flex items-center gap-2.5 px-4 py-2 bg-green-400/5 border-y border-green-400/15">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
                <span className="text-[10px] font-bold text-green-400">Generated in 3s</span>
              </div>

              {/* ── Generated dApp preview: file explorer | dApp UI ── */}
              <div className="flex min-h-0">

                {/* Left — file explorer */}
                <div className="w-36 shrink-0 border-r border-border p-2.5 flex flex-col gap-0.5 font-mono text-[10px] select-none">

                  <div className="flex items-center gap-1.5 py-0.5 text-text-tertiary">
                    <span className="text-[8px]">▾</span>
                    <span>src</span>
                  </div>

                  <div className="flex items-center gap-1.5 py-0.5 pl-3 rounded bg-primary/8 text-text-primary">
                    <span className="text-remix-ai font-bold">tsx</span>
                    <span>App.tsx</span>
                  </div>

                  <div className="flex items-center gap-1.5 py-0.5 pl-3 text-text-tertiary">
                    <span className="text-[8px]">▾</span>
                    <span>components</span>
                  </div>

                  <div className="flex items-center gap-1.5 py-0.5 pl-5 text-text-quaternary">
                    <span className="text-remix-ai/60">tsx</span>
                    <span>Transfer.tsx</span>
                  </div>

                  <div className="flex items-center gap-1.5 py-0.5 pl-5 text-text-quaternary">
                    <span className="text-remix-ai/60">tsx</span>
                    <span>Approve.tsx</span>
                  </div>

                  <div className="my-1 border-t border-border/40" />

                  <div className="flex items-center gap-1.5 py-0.5 text-text-quaternary">
                    <span className="text-yellow-400/60">json</span>
                    <span>package.json</span>
                  </div>

                  <div className="flex items-center gap-1.5 py-0.5 text-text-quaternary">
                    <span className="text-purple-400/60">ts</span>
                    <span>vite.config.ts</span>
                  </div>

                </div>

                {/* Right — bespoke dApp UI (light, independent brand) */}
                <div className="flex-1 p-3 flex flex-col gap-2 bg-white">

                  {/* URL + IPFS tag */}
                  <div className="flex items-center gap-2 bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1.5">
                    <div className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
                    <span className="text-[10px] text-slate-500 font-mono flex-1">myswap.remix.eth</span>
                    <span className="text-[9px] font-bold text-slate-400 bg-white border border-slate-200 rounded px-1.5 py-0.5">IPFS</span>
                  </div>

                  <p className="text-[11px] font-bold text-slate-800">Token Swap</p>

                  <div className="flex items-center justify-between bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1.5">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3.5 h-3.5 rounded-full bg-blue-400/50 border border-blue-400/70 shrink-0" />
                      <span className="text-[11px] font-bold text-slate-800">ETH</span>
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono">1.0</span>
                  </div>

                  <div className="flex justify-center text-slate-300 text-[12px]">⇅</div>

                  <div className="flex items-center justify-between bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1.5">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3.5 h-3.5 rounded-full bg-blue-500/40 border border-blue-500/60 shrink-0" />
                      <span className="text-[11px] font-bold text-slate-800">USDC</span>
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono">2,480</span>
                  </div>

                  <div className="w-full bg-violet-600 text-white text-[10px] font-bold rounded-lg py-2 text-center cursor-default">
                    Swap Tokens
                  </div>

                </div>

              </div>

            </div>
          </div>
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
                  <Button href={plan.ctaHref} external size="md">{plan.cta}</Button>
                ) : (
                  <Button href={plan.ctaHref} external variant="secondary" size="md">{plan.cta}</Button>
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
