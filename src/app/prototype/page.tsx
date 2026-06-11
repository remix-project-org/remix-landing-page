import type { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import CommunitySection from "@/components/sections/CommunitySection";
import DesktopCTA from "@/components/sections/DesktopCTA";
import Button from "@/components/ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLayerGroup, faServer, faCodeBranch, faTerminal, faPlay, faWandMagicSparkles,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import content from "@/content/prototype.json";

export const metadata: Metadata = content.metadata;

const ICONS: Record<string, IconDefinition> = {
  layerGroup: faLayerGroup,
  server: faServer,
  codeBranch: faCodeBranch,
  terminal: faTerminal,
  play: faPlay,
  wandMagicSparkles: faWandMagicSparkles,
};

function ProtoHeroIllustration() {
  const ill = content.illustration;
  return (
    <div className="flex-1 w-full max-w-[560px]">
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

        <div className="flex flex-col md:flex-row" style={{ minHeight: 300 }}>
          {/* Template list */}
          <div className="md:w-[190px] flex flex-col border-b md:border-b-0 md:border-r border-border shrink-0">
            <div className="px-4 py-2.5 border-b border-border">
              <p className="text-[10px] font-bold text-text-quaternary uppercase tracking-widest">{ill.templateLabel}</p>
            </div>
            {ill.templates.map((t) => (
              <div
                key={t.name}
                className={`flex items-center gap-2.5 px-4 py-2.5 ${t.active ? "bg-primary/10" : ""}`}
              >
                <div
                  className={`w-3 h-3 rounded-full border-2 shrink-0 flex items-center justify-center ${
                    t.active ? "border-primary" : "border-border"
                  }`}
                >
                  {t.active && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                </div>
                <span className={`text-[11.5px] ${t.active ? "text-primary font-semibold" : "text-text-tertiary"}`}>
                  {t.name}
                </span>
              </div>
            ))}
          </div>

          {/* Code preview */}
          <div className="flex-1 flex flex-col min-w-0">
            <div className="px-4 py-2.5 border-b border-border bg-layer-2 flex items-center justify-between shrink-0">
              <span className="text-[11px] text-text-quaternary font-mono">{ill.fileName}</span>
              <span className="text-[10px] text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full">
                {ill.fileBadge}
              </span>
            </div>
            <pre className="flex-1 px-4 py-4 text-[10.5px] leading-[1.75] font-mono overflow-hidden select-none">
              <span className="text-text-quaternary">{"// SPDX-License-Identifier: MIT\n"}</span>
              <span className="text-primary">{"pragma solidity "}</span>
              <span className="text-text-secondary">{"^0.8.20;\n\n"}</span>
              <span className="text-primary">{"import "}</span>
              <span className="text-yellow-400">{"\"@openzeppelin/\n  contracts/token/\n  ERC20/ERC20.sol\""}</span>
              <span className="text-text-secondary">{";\n\n"}</span>
              <span className="text-primary">{"contract "}</span>
              <span className="text-remix-ai">{"MyToken "}</span>
              <span className="text-primary">{"is "}</span>
              <span className="text-remix-ai">{"ERC20"}</span>
              <span className="text-text-secondary">{" {\n"}</span>
              <span className="text-text-secondary">{"  "}</span>
              <span className="text-primary">{"constructor"}</span>
              <span className="text-text-secondary">{"()\n  "}</span>
              <span className="text-remix-ai">{"ERC20"}</span>
              <span className="text-text-secondary">{"("}</span>
              <span className="text-yellow-400">{"\"MyToken\""}</span>
              <span className="text-text-secondary">{", "}</span>
              <span className="text-yellow-400">{"\"MTK\""}</span>
              <span className="text-text-secondary">{")\n  {\n    "}</span>
              <span className="text-remix-ai">{"_mint"}</span>
              <span className="text-text-secondary">{"("}</span>
              <span className="text-primary">{"msg"}</span>
              <span className="text-text-secondary">{".sender,\n      "}</span>
              <span className="text-yellow-400">{"1000e18"}</span>
              <span className="text-text-secondary">{");\n  }\n}"}</span>
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-4 py-3 border-t border-border bg-layer-2">
          <button className="text-[12px] text-text-tertiary px-4 py-1.5 rounded-lg">{ill.cancelLabel}</button>
          <button className="text-[12px] font-bold text-background bg-primary px-4 py-1.5 rounded-lg">
            {ill.createLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PrototypePage() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="py-24 px-6 xl:px-20 border-b border-border">
        <div className="mx-auto max-w-[1280px] flex flex-col lg:flex-row gap-16 items-center">
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
          <ProtoHeroIllustration />
        </div>
      </section>

      {/* Workflow */}
      <section className="py-20 px-6 xl:px-20 bg-layer-1 border-b border-border">
        <div className="mx-auto max-w-[1280px]">
          <h2 className="text-2xl font-bold text-text-primary mb-2">{content.workflow.title}</h2>
          <p className="text-text-secondary mb-12">{content.workflow.description}</p>

          {/* Desktop: horizontal timeline */}
          <div className="hidden lg:flex items-start">
            {content.workflow.steps.map((s, i) => (
              <div key={s.step} className="flex-1 flex flex-col items-center">
                {/* Connector row */}
                <div className="w-full flex items-center mb-6">
                  <div className={`flex-1 h-px ${i === 0 ? "opacity-0" : "bg-border"}`} />
                  <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0 z-10">
                    <span className="text-[12px] font-bold text-primary font-cabin">{s.step}</span>
                  </div>
                  <div className={`flex-1 h-px ${i === content.workflow.steps.length - 1 ? "opacity-0" : "bg-border"}`} />
                </div>
                {/* Text */}
                <div className="text-center px-3">
                  <h3 className="text-[14px] font-bold text-text-primary mb-1.5">{s.title}</h3>
                  <p className="text-[12px] text-text-tertiary leading-relaxed">{s.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile: vertical list */}
          <div className="lg:hidden flex flex-col gap-4">
            {content.workflow.steps.map((s) => (
              <div key={s.step} className="flex items-start gap-5 bg-layer-2 rounded-xl border border-border p-5">
                <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
                  <span className="text-[11px] font-bold text-primary font-cabin">{s.step}</span>
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-text-primary mb-1">{s.title}</h3>
                  <p className="text-[13px] text-text-tertiary">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature grid */}
      <section className="py-20 px-6 xl:px-20">
        <div className="mx-auto max-w-[1280px]">
          <h2 className="text-2xl font-bold text-text-primary mb-10">{content.features.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.features.items.map((f) => (
              <div key={f.title} className="bg-layer-1 rounded-2xl border border-border p-6 flex flex-col gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <FontAwesomeIcon icon={ICONS[f.icon]} className="w-4 h-4 text-primary" />
                </div>
                <h3 className="text-[15px] font-bold text-text-primary">{f.title}</h3>
                <p className="text-[13px] text-text-tertiary leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <DesktopCTA />
      <CommunitySection />
    </PageLayout>
  );
}
