import type { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import CommunitySection from "@/components/sections/CommunitySection";
import DesktopCTA from "@/components/sections/DesktopCTA";
import Button from "@/components/ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLayerGroup, faServer, faCodeBranch, faTerminal, faPlay, faWandMagicSparkles,
} from "@fortawesome/free-solid-svg-icons";

const PROTOTYPE_FEATURES = [
  {
    title: "Start from Templates",
    description:
      "Choose from OpenZeppelin standards, ERC tokens, DeFi primitives, and community-contributed templates. Skip the boilerplate.",
    icon: faLayerGroup,
  },
  {
    title: "In-Browser EVM",
    description:
      "Deploy and test against a full Ethereum node running entirely in your browser. No external RPC, no cost.",
    icon: faServer,
  },
  {
    title: "Fork Any Network",
    description:
      "Fork mainnet, testnets, or any EVM-compatible chain directly in Remix. Test against real on-chain state.",
    icon: faCodeBranch,
  },
  {
    title: "Script Runner",
    description:
      "Automate deployment flows with TypeScript or JavaScript scripts. Compose complex transactions in a single file.",
    icon: faTerminal,
  },
  {
    title: "Compile & Run",
    description:
      "Write a script that compiles, deploys, and calls a contract — run it in one click. Set state as you code.",
    icon: faPlay,
  },
  {
    title: "Workspace Templates",
    description:
      "New workspace modal with Hardhat, Foundry, OpenZeppelin Wizard, and AI-generated boilerplate options.",
    icon: faWandMagicSparkles,
  },
];

const WORKFLOW_STEPS = [
  { step: "01", title: "Pick a Template", description: "Start from an OpenZeppelin standard or blank file." },
  { step: "02", title: "Write & Compile", description: "Edit Solidity with AI autocomplete and inline hints." },
  { step: "03", title: "Test In-Browser", description: "Deploy to Remix VM for instant feedback." },
  { step: "04", title: "Script & Automate", description: "Use the Script Runner to wire up complex flows." },
  { step: "05", title: "Deploy to Testnet", description: "Push to Sepolia, Polygon, or any EVM chain." },
];

const TEMPLATES = [
  { name: "Blank", active: false },
  { name: "ERC-20 Token", active: true },
  { name: "ERC-721 NFT", active: false },
  { name: "OpenZeppelin Wizard", active: false },
  { name: "Foundry Template", active: false },
  { name: "AI Generated", active: false },
];

function ProtoHeroIllustration() {
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
          <span className="text-[11px] text-text-quaternary font-mono ml-1">New Workspace</span>
        </div>

        <div className="flex flex-col md:flex-row" style={{ minHeight: 300 }}>
          {/* Template list */}
          <div className="md:w-[190px] flex flex-col border-b md:border-b-0 md:border-r border-border shrink-0">
            <div className="px-4 py-2.5 border-b border-border">
              <p className="text-[10px] font-bold text-text-quaternary uppercase tracking-widest">Template</p>
            </div>
            {TEMPLATES.map((t) => (
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
              <span className="text-[11px] text-text-quaternary font-mono">MyToken.sol</span>
              <span className="text-[10px] text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full">
                ERC-20
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
          <button className="text-[12px] text-text-tertiary px-4 py-1.5 rounded-lg">Cancel</button>
          <button className="text-[12px] font-bold text-background bg-primary px-4 py-1.5 rounded-lg">
            Create Workspace
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
            <p className="text-[11px] font-bold uppercase tracking-widest text-primary font-cabin mb-3">Prototype</p>
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
              From Idea to Contract{" "}
              <span className="text-primary">in Minutes</span>
            </h1>
            <p className="text-text-secondary text-lg mb-8">
              Remix&apos;s prototyping environment lets you move fast — from blank file to deployed contract
              without leaving your browser.
            </p>
            <div className="flex flex-col md:flex-row gap-4">
              <Button href="https://remix.ethereum.org/?#activate=templateSelection" external size="lg">
                Start Prototyping
              </Button>
              <Button href="/features" variant="secondary" size="lg">
                See All Features
              </Button>
            </div>
          </div>
          <ProtoHeroIllustration />
        </div>
      </section>

      {/* Workflow */}
      <section className="py-20 px-6 xl:px-20 bg-layer-1 border-b border-border">
        <div className="mx-auto max-w-[1280px]">
          <h2 className="text-2xl font-bold text-text-primary mb-2">Prototype Workflow</h2>
          <p className="text-text-secondary mb-12">Five steps from concept to testnet deployment.</p>

          {/* Desktop: horizontal timeline */}
          <div className="hidden lg:flex items-start">
            {WORKFLOW_STEPS.map((s, i) => (
              <div key={s.step} className="flex-1 flex flex-col items-center">
                {/* Connector row */}
                <div className="w-full flex items-center mb-6">
                  <div className={`flex-1 h-px ${i === 0 ? "opacity-0" : "bg-border"}`} />
                  <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0 z-10">
                    <span className="text-[12px] font-bold text-primary font-cabin">{s.step}</span>
                  </div>
                  <div className={`flex-1 h-px ${i === WORKFLOW_STEPS.length - 1 ? "opacity-0" : "bg-border"}`} />
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
            {WORKFLOW_STEPS.map((s) => (
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
          <h2 className="text-2xl font-bold text-text-primary mb-10">Prototyping Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROTOTYPE_FEATURES.map((f) => (
              <div key={f.title} className="bg-layer-1 rounded-2xl border border-border p-6 flex flex-col gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <FontAwesomeIcon icon={f.icon} className="w-4 h-4 text-primary" />
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
