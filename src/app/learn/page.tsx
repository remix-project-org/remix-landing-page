import type { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import CommunitySection from "@/components/sections/CommunitySection";
import DesktopCTA from "@/components/sections/DesktopCTA";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Learn — Remix",
  description: "Start your Web3 journey. Explore videos, tutorials, and documentation for smart contract development.",
};

const LEARN_SECTIONS = [
  {
    tag: "Videos",
    title: "Learn by Watching",
    description:
      "Learn by watching a wide range of videos about Remix and Solidity, available in both the online and desktop apps. Covers basic workflows, contract verification, proxy contracts, ZK proofs, and more.",
    cta: "Start Learning with Videos",
    href: "https://remix.ethereum.org/?#activate=remixGuide,LearnEth",
    external: true,
  },
  {
    tag: "LearnEth",
    title: "Interactive Tutorials",
    description:
      "LearnEth is a step-by-step tutorial plugin embedded in Remix. You can follow instructions with code examples and take quizzes. Tutorials are tagged for beginner, intermediate, and advanced users.",
    cta: "Start Learning with LearnEth",
    href: "https://remix.ethereum.org/?#activate=LearnEth",
    external: true,
  },
  {
    tag: "Docs & Articles",
    title: "Articles and Documentation",
    description:
      "Remix's extensive documentation explains how to use every aspect of the tool. Our articles go into more applied use cases for all skill levels.",
    cta: "Read Our Articles",
    href: "https://remix-ide.readthedocs.io/",
    external: true,
  },
];

function LearnHeroIllustration() {
  return (
    <div className="flex-1 w-full max-w-[580px]">
      <div className="bg-layer-1 rounded-2xl border border-border overflow-hidden shadow-xl">
        <div className="flex flex-col sm:flex-row" style={{ minHeight: 340 }}>

          {/* Code editor panel */}
          <div className="flex-1 flex flex-col border-b sm:border-b-0 sm:border-r border-border min-w-0">
            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 py-2.5 bg-layer-2 border-b border-border shrink-0">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
              </div>
              <span className="text-[11px] text-text-quaternary font-mono ml-1">Storage.sol</span>
            </div>
            {/* Code */}
            <pre className="flex-1 px-4 py-4 text-[11.5px] leading-[1.7] font-mono overflow-hidden select-none">
              <span className="text-text-quaternary">{"// SPDX-License-Identifier: MIT\n"}</span>
              <span className="text-primary">{"pragma solidity"}</span>
              <span className="text-text-secondary">{" ^0.8.20;\n\n"}</span>
              <span className="text-primary">{"contract"}</span>
              <span className="text-remix-ai">{" Storage"}</span>
              <span className="text-text-secondary">{" {\n"}</span>
              <span className="text-text-secondary">{"  "}</span>
              <span className="text-primary">{"uint256"}</span>
              <span className="text-text-primary">{" number;\n\n"}</span>
              <span className="text-text-secondary">{"  "}</span>
              <span className="text-primary">{"function"}</span>
              <span className="text-remix-ai">{" store"}</span>
              <span className="text-text-secondary">{"("}</span>
              <span className="text-primary">{"uint256"}</span>
              <span className="text-text-primary">{" num"}</span>
              <span className="text-text-secondary">{")"}</span>
              <span className="text-primary">{" public"}</span>
              <span className="text-text-secondary">{" {\n"}</span>
              {/* Highlighted line */}
              <span className="block -mx-4 px-4 bg-remix-ai/10 border-l-2 border-remix-ai">
                <span className="text-text-primary">{"    number"}</span>
                <span className="text-text-secondary">{" = "}</span>
                <span className="text-text-primary">{"num;"}</span>
                {"\n"}
              </span>
              <span className="text-text-secondary">{"  }\n\n"}</span>
              <span className="text-text-secondary">{"  "}</span>
              <span className="text-primary">{"function"}</span>
              <span className="text-remix-ai">{" retrieve"}</span>
              <span className="text-text-secondary">{"() "}</span>
              <span className="text-primary">{"public view\n    returns"}</span>
              <span className="text-text-secondary">{"("}</span>
              <span className="text-primary">{"uint256"}</span>
              <span className="text-text-secondary">{")"}</span>
              <span className="text-text-secondary">{" {\n"}</span>
              <span className="text-primary">{"    return"}</span>
              <span className="text-text-primary">{" number;\n"}</span>
              <span className="text-text-secondary">{"  }\n}"}</span>
            </pre>
          </div>

          {/* RemixAI panel */}
          <div className="sm:w-[210px] flex flex-col bg-layer-2 shrink-0">
            {/* Header */}
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border shrink-0">
              <div className="w-5 h-5 rounded bg-remix-ai/20 border border-remix-ai/30 flex items-center justify-center shrink-0">
                <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1L10.5 6H15L11 9.5L12.5 15L8 12L3.5 15L5 9.5L1 6H5.5L8 1Z" fill="currentColor" className="text-remix-ai" />
                </svg>
              </div>
              <span className="text-[11px] font-bold text-remix-ai tracking-wide">RemixAI</span>
              <span className="ml-auto text-[10px] text-text-quaternary">Explain</span>
            </div>

            {/* Explanation content */}
            <div className="flex-1 p-4 flex flex-col gap-3 overflow-hidden">
              {/* Highlighted snippet */}
              <div className="bg-remix-ai/10 border border-remix-ai/20 rounded-lg px-3 py-2">
                <p className="text-[10px] text-text-quaternary mb-1">Selected line</p>
                <code className="text-[11px] font-mono text-remix-ai">number = num;</code>
              </div>

              {/* Explanation */}
              <div className="flex flex-col gap-2">
                <p className="text-[11px] text-text-secondary leading-[1.6]">
                  This line writes the input value{" "}
                  <code className="text-primary font-mono bg-primary/10 px-1 rounded">num</code>{" "}
                  into the state variable{" "}
                  <code className="text-remix-ai font-mono bg-remix-ai/10 px-1 rounded">number</code>
                  , persisting it on-chain.
                </p>
                <div className="flex items-start gap-2 bg-layer-1 rounded-lg px-3 py-2 border border-border">
                  <span className="text-[10px] text-text-quaternary leading-[1.6]">
                    State writes cost <span className="text-primary font-medium">gas</span> and require a signed transaction.
                  </span>
                </div>
              </div>
            </div>

            {/* Action tabs */}
            <div className="flex border-t border-border shrink-0">
              {[
                { label: "Explain", active: true },
                { label: "Generate", active: false },
                { label: "Debug", active: false },
              ].map((tab) => (
                <button
                  key={tab.label}
                  className={`flex-1 py-2.5 text-[10px] font-bold transition-colors ${
                    tab.active
                      ? "text-remix-ai border-t-2 border-remix-ai -mt-px"
                      : "text-text-quaternary hover:text-text-secondary"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function LearnPage() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="py-24 px-6 xl:px-20 border-b border-border">
        <div className="mx-auto max-w-[1280px] flex flex-col lg:flex-row items-center gap-16">

          {/* Text */}
          <div className="flex-1 max-w-xl">
            <p className="text-[11px] font-bold uppercase tracking-widest text-primary font-cabin mb-3">Learn</p>
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
              Learn Remix, Solidity,{" "}
              <span className="text-primary">and Web3</span>
            </h1>
            <p className="text-text-secondary text-lg mb-8">
              Start your Web3 journey now, or master advanced development with Remix. Explore our videos,
              tutorials, and comprehensive documentation for expert guidance at your own pace. Utilize
              RemixAI to explain errors, fix code, and enhance smart contract functionality.
            </p>
            <Button href="https://remix.ethereum.org/?#activate=remixGuide,LearnEth" external size="lg">
              Start Learning Now
            </Button>
          </div>

          {/* Illustration */}
          <LearnHeroIllustration />
        </div>
      </section>

      {/* Learn sections */}
      <section className="py-16 px-6 xl:px-20">
        <div className="mx-auto max-w-[1280px] grid grid-cols-1 md:grid-cols-3 gap-8">
          {LEARN_SECTIONS.map((s) => (
            <div key={s.tag} className="bg-layer-1 border border-border rounded-2xl p-8 flex flex-col gap-6">
              <span className="text-[11px] font-bold uppercase tracking-widest text-primary font-cabin">
                {s.tag}
              </span>
              <h2 className="text-xl font-bold text-text-primary">{s.title}</h2>
              <p className="text-[13px] text-text-tertiary leading-relaxed flex-1">{s.description}</p>
              <Button href={s.href} external={s.external} variant="secondary" size="md">
                {s.cta}
              </Button>
            </div>
          ))}
        </div>
      </section>

      <DesktopCTA />
      <CommunitySection />
    </PageLayout>
  );
}
