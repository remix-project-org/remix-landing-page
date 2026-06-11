import PageLayout from "@/components/layout/PageLayout";
import CommunitySection from "@/components/sections/CommunitySection";
import DesktopCTA from "@/components/sections/DesktopCTA";
import HeroSection from "@/components/sections/HeroSection";
import PartnersSection from "@/components/sections/PartnersSection";
import Button from "@/components/ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt, faDesktop, faShield, faToolbox, faLightbulb, faWandMagicSparkles,
  faBug, faPlay, faRobot, faGraduationCap, faCodeBranch, faLayerGroup,
  faMagnifyingGlassChart, faCube, faLock, faServer, faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import Link from "next/link";
import content from "@/content/home.json";

const ICONS: Record<string, IconDefinition> = {
  bolt: faBolt,
  desktop: faDesktop,
  shield: faShield,
  toolbox: faToolbox,
  lightbulb: faLightbulb,
  wandMagicSparkles: faWandMagicSparkles,
  bug: faBug,
  play: faPlay,
  robot: faRobot,
  graduationCap: faGraduationCap,
  codeBranch: faCodeBranch,
  layerGroup: faLayerGroup,
  magnifyingGlassChart: faMagnifyingGlassChart,
  cube: faCube,
  lock: faLock,
  server: faServer,
};

const PLUGIN_THEMES = {
  ai:      { icon: "text-remix-ai",      badge: "bg-remix-ai/10 text-remix-ai border-remix-ai/20" },
  primary: { icon: "text-primary",       badge: "bg-primary/10 text-primary border-primary/20" },
  muted:   { icon: "text-text-tertiary", badge: "bg-layer-2 text-text-quaternary border-border" },
} as const;

const BADGE_ACCENTS = {
  primary:   "text-primary",
  secondary: "text-text-secondary",
} as const;

export default function HomePage() {
  return (
    <PageLayout>
      <HeroSection />

      {/* ── Key Features — scrolls on top of sticky hero ── */}
      <section className="relative z-10 bg-background py-24 px-6 xl:px-20">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.keyFeatures.map((f) => (
              <div
                key={f.title}
                className="bg-layer-1 border border-border rounded-2xl p-6 flex flex-col gap-4 hover:border-border-light transition-colors"
              >
                <FontAwesomeIcon icon={ICONS[f.icon]} className="text-2xl text-primary w-6 h-6" />
                <h3 className="text-[15px] font-bold text-text-primary">{f.title}</h3>
                <p className="text-[13px] text-text-tertiary leading-relaxed flex-1">{f.description}</p>
                {"href" in f && f.href && (
                  <Link href={f.href} className="text-[12px] text-primary hover:underline font-semibold mt-auto">
                    {f.linkLabel}
                  </Link>
                )}
              </div>
            ))}
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
          <div className="flex-1 max-w-lg">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-remix-ai/10 border border-remix-ai/20 text-remix-ai text-[12px] font-bold font-cabin uppercase tracking-widest mb-6">
              {content.ai.eyebrow}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              {content.ai.title}
            </h2>
            <p className="text-text-secondary mb-8">
              {content.ai.description}
            </p>
            <Button href={content.ai.cta.href} external variant="ai">
              {content.ai.cta.label}
            </Button>
          </div>
          <div className="w-full lg:w-[420px] grid grid-cols-1 gap-3 self-start shrink-0">
            {content.ai.features.map((f) => (
              <div
                key={f.label}
                className="flex items-center gap-4 bg-layer-2 rounded-xl border border-border px-5 py-4"
              >
                <div className="w-8 h-8 rounded-lg bg-remix-ai/10 border border-remix-ai/20 flex items-center justify-center shrink-0">
                  <FontAwesomeIcon icon={ICONS[f.icon]} className="text-remix-ai w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-[14px] font-bold text-text-primary mb-1">{f.label}</p>
                  <p className="text-[13px] text-text-tertiary">{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Learning ─────────────────────────────────────── */}
      <section className="relative z-10 bg-background py-24 px-6 xl:px-20">
        <div className="mx-auto max-w-[1280px] flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1 max-w-xl">
            <p className="text-[11px] font-bold uppercase tracking-widest text-primary font-cabin mb-3">
              {content.learning.eyebrow}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              {content.learning.title}
            </h2>
            <p className="text-text-secondary mb-4">
              {content.learning.description}
            </p>
            <ul className="space-y-3 mb-8">
              {content.learning.checklist.map((item) => (
                <li key={item.label} className="flex items-center gap-3 text-[13px] text-text-secondary">
                  <div className="w-6 h-6 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <FontAwesomeIcon icon={ICONS[item.icon]} className="text-primary w-3 h-3" />
                  </div>
                  {item.label}
                </li>
              ))}
            </ul>
            <Button href={content.learning.cta.href} size="lg" variant="secondary">
              {content.learning.cta.label}
            </Button>
          </div>
          <div className="flex-1 bg-layer-1 rounded-2xl border border-border overflow-hidden min-h-[320px] flex flex-col">
            <div className="flex items-center gap-2 px-4 py-3 bg-layer-2 border-b border-border">
              <div className="w-3 h-3 rounded-full bg-border" />
              <div className="w-3 h-3 rounded-full bg-border" />
              <div className="w-3 h-3 rounded-full bg-border" />
              <span className="ml-2 text-[11px] text-text-quaternary font-mono">{content.learning.codeFileName}</span>
            </div>
            <pre className="flex-1 p-6 text-[12px] leading-6 font-mono">
{`  `}<span className="text-text-quaternary">{`// SPDX-License-Identifier: MIT`}</span>{`
  `}<span className="text-primary">pragma solidity</span>{` `}<span className="text-remix-ai">^0.8.20</span>{`;

  `}<span className="text-primary">import</span>{` `}<span className="text-text-secondary">"@openzeppelin/contracts/token/ERC20/ERC20.sol"</span>{`;

  `}<span className="text-primary">contract</span>{` `}<span className="text-remix-ai">MyToken</span>{` `}<span className="text-text-secondary">is</span>{` `}<span className="text-remix-ai">ERC20</span>{` {
    `}<span className="text-text-secondary">constructor</span>{`() `}<span className="text-remix-ai">ERC20</span>{`(`}<span className="text-text-secondary">"My Token"</span>{`, `}<span className="text-text-secondary">"MTK"</span>{`) {
      `}<span className="text-text-quaternary">{`// mint 1000 tokens to deployer`}</span>{`
      _mint(msg.sender, `}<span className="text-remix-ai">1000</span>{` * 10 ** decimals());
    }
  }`}
            </pre>
          </div>
        </div>
      </section>

      {/* ── Dev Workflow ─────────────────────────────────── */}
      <section className="relative z-10 py-24 px-6 xl:px-20 bg-layer-1 border-y border-border">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-12 text-center max-w-2xl mx-auto">
            <p className="text-[11px] font-bold uppercase tracking-widest text-primary font-cabin mb-3">
              {content.workflow.eyebrow}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              {content.workflow.title}
            </h2>
            <p className="text-text-secondary">
              {content.workflow.description}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {content.workflow.features.map((f) => (
              <div key={f.title} className="bg-layer-2 rounded-xl border border-border p-6 flex flex-col gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <FontAwesomeIcon icon={ICONS[f.icon]} className="text-primary w-4 h-4" />
                </div>
                <h3 className="text-[15px] font-bold text-text-primary">{f.title}</h3>
                <p className="text-[13px] text-text-tertiary leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Button href={content.workflow.cta.href} external variant="secondary">
              {content.workflow.cta.label}
            </Button>
          </div>
        </div>
      </section>

      {/* ── Desktop CTA ──────────────────────────────────── */}
      <DesktopCTA />

      {/* ── Advanced Features ────────────────────────────── */}
      <section className="relative z-10 bg-background py-24 px-6 xl:px-20">
        <div className="mx-auto max-w-[1280px] flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1 max-w-xl">
            <p className="text-[11px] font-bold uppercase tracking-widest text-primary font-cabin mb-3">
              {content.advanced.eyebrow}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              {content.advanced.title}
            </h2>
            <p className="text-text-secondary mb-8">
              {content.advanced.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {content.advanced.badges.map((b) => (
                <span
                  key={b.label}
                  className={`px-3 py-1.5 rounded-full bg-layer-1 border border-border text-[12px] font-semibold ${BADGE_ACCENTS[b.accent as keyof typeof BADGE_ACCENTS]}`}
                >
                  {b.label}
                </span>
              ))}
            </div>
            <Button href={content.advanced.cta.href} external variant="secondary">
              {content.advanced.cta.label}
            </Button>
          </div>
          <div className="flex-1 bg-layer-1 rounded-2xl border border-border overflow-hidden">
            {/* Title bar */}
            <div className="flex items-center gap-3 px-4 py-3 bg-layer-2 border-b border-border">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
              </div>
              <span className="text-[11px] text-text-quaternary font-mono ml-1">{content.advanced.pluginManagerLabel}</span>
            </div>
            {/* Search bar */}
            <div className="px-4 py-2.5 border-b border-border">
              <div className="flex items-center gap-2 bg-layer-2 rounded-lg px-3 py-1.5 border border-border">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="w-3 h-3 text-text-quaternary" />
                <span className="text-[11px] text-text-quaternary font-mono">{content.advanced.pluginSearchPlaceholder}</span>
              </div>
            </div>
            {/* Plugin rows */}
            <div className="divide-y divide-border">
              {content.advanced.plugins.map((plugin) => {
                const theme = PLUGIN_THEMES[plugin.theme as keyof typeof PLUGIN_THEMES];
                return (
                  <div key={plugin.name} className="flex items-center gap-3 px-4 py-2.5">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 bg-layer-2 border border-border">
                      <FontAwesomeIcon icon={ICONS[plugin.icon]} className={`w-3 h-3 ${theme.icon}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-semibold text-text-primary truncate">{plugin.name}</p>
                      <p className="text-[10px] text-text-tertiary truncate">{plugin.description}</p>
                    </div>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border shrink-0 ${theme.badge}`}>
                      {plugin.active ? "Active" : "Install"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Community ────────────────────────────────────── */}
      <CommunitySection />
    </PageLayout>
  );
}
