import PageLayout from "@/components/layout/PageLayout";
import CommunitySection from "@/components/sections/CommunitySection";
import DesktopCTA from "@/components/sections/DesktopCTA";
import HeroSection from "@/components/sections/HeroSection";
import PartnersSection from "@/components/sections/PartnersSection";
import Button from "@/components/ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt, faDesktop, faShield, faToolbox, faLightbulb, faWandMagicSparkles, faBug, faPlay, faRobot, faGraduationCap, faCodeBranch, faLayerGroup, faMagnifyingGlassChart, faCube, faLock, faServer, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const KEY_FEATURES = [
  {
    title: "Zero Setup, Instant Start",
    description:
      "No installation, no configuration. Just open Remix in your browser and start building smart contracts in seconds.",
    icon: faBolt,
  },
  {
    title: "Everything You Need, Built In",
    description:
      "Remix comes packed with tools for writing, testing, debugging, analyzing, deploying, and verifying contracts — all in one place.",
    icon: faToolbox,
  },
  {
    title: "Battle-Tested by Millions",
    description:
      "Remix has been used to deploy over 12 million contracts and educate thousands of developers through hackathons, bootcamps, and tutorials.",
    icon: faShield,
  },
  {
    title: "Remix Desktop",
    description:
      "Works anywhere, even offline. Native terminals. Great for larger projects and enhanced security. Live sync with any Editor and Remix for Web3 tools.",
    href: "/desktop",
    icon: faDesktop,
  },
];

const AI_FEATURES = [
  { label: "Explain", description: "Understand errors and code behavior instantly.", icon: faLightbulb },
  { label: "Generate", description: "Create smart contracts from natural language.", icon: faWandMagicSparkles },
  { label: "Debug", description: "Fix issues with AI-guided suggestions.", icon: faBug },
];

const WORKFLOW_FEATURES = [
  {
    title: "Integrated Visual Debugger",
    description:
      "Step through transactions line by line. Inspect state, storage, and events at every point in execution.",
    icon: faMagnifyingGlassChart,
  },
  {
    title: "Git for Collaborative Workflows",
    description:
      "Review PRs, share links, and co-edit with teammates. Remix AI helps speed up your feedback loops.",
    icon: faCodeBranch,
  },
  {
    title: "Extensive Contracts Library",
    description:
      "Jump-start with OpenZeppelin templates, ERC standards, and community-contributed examples.",
    icon: faLayerGroup,
  },
];

const PLUGINS = [
  { name: "RemixAI",          description: "AI code generation & debugging",         icon: faRobot,              active: true,  iconClass: "text-remix-ai",      badgeClass: "bg-remix-ai/10 text-remix-ai border-remix-ai/20" },
  { name: "Debugger",         description: "Step-through EVM transaction debugger",  icon: faBug,                active: true,  iconClass: "text-primary",       badgeClass: "bg-primary/10 text-primary border-primary/20" },
  { name: "Git",              description: "Version control & collaboration",         icon: faCodeBranch,         active: true,  iconClass: "text-primary",       badgeClass: "bg-primary/10 text-primary border-primary/20" },
  { name: "ZK Circuits",      description: "Noir & Circom ZK proof compiler",        icon: faLock,               active: false, iconClass: "text-text-tertiary", badgeClass: "bg-layer-2 text-text-quaternary border-border" },
  { name: "Tenderly",         description: "Real-time simulation & monitoring",       icon: faMagnifyingGlassChart, active: false, iconClass: "text-text-tertiary", badgeClass: "bg-layer-2 text-text-quaternary border-border" },
  { name: "BuildBear Sandbox",description: "Personal forked blockchain environment", icon: faCube,               active: false, iconClass: "text-text-tertiary", badgeClass: "bg-layer-2 text-text-quaternary border-border" },
  { name: "Stylus (Arbitrum)",description: "Write EVM contracts in Rust / C++",      icon: faServer,             active: false, iconClass: "text-text-tertiary", badgeClass: "bg-layer-2 text-text-quaternary border-border" },
];

const ADVANCED_FEATURES = [
  { label: "Fork Any Network In-Browser", accent: "text-primary" },
  { label: "Visual Debugger", accent: "text-primary" },
  { label: "Tenderly Integration", accent: "text-text-secondary" },
  { label: "BuildBear Sandbox", accent: "text-text-secondary" },
  { label: "Noir ZK Circuits", accent: "text-primary" },
  { label: "Circom Compiler", accent: "text-primary" },
  { label: "Stylus (Arbitrum)", accent: "text-text-secondary" },
];

export default function HomePage() {
  return (
    <PageLayout>
      <HeroSection />

      {/* ── Key Features — scrolls on top of sticky hero ── */}
      <section className="relative z-10 bg-background py-24 px-6 xl:px-20">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {KEY_FEATURES.map((f) => (
              <div
                key={f.title}
                className="bg-layer-1 border border-border rounded-2xl p-6 flex flex-col gap-4 hover:border-border-light transition-colors"
              >
                <FontAwesomeIcon icon={f.icon} className="text-2xl text-primary w-6 h-6" />
                <h3 className="text-[15px] font-bold text-text-primary">{f.title}</h3>
                <p className="text-[13px] text-text-tertiary leading-relaxed flex-1">{f.description}</p>
                {f.href && (
                  <Link href={f.href} className="text-[12px] text-primary hover:underline font-semibold mt-auto">
                    Learn more →
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
              RemixAI
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Build Smarter with RemixAI
            </h2>
            <p className="text-text-secondary mb-8">
              Compiler errors explained and fixed, AI code generation/completion, and AI code requests
              using the LLMs you already depend on.
            </p>
            <Button href="https://remix.ethereum.org/" external variant="ai">
              Start Coding with AI
            </Button>
          </div>
          <div className="w-full lg:w-[420px] grid grid-cols-1 gap-3 self-start shrink-0">
            {AI_FEATURES.map((f) => (
              <div
                key={f.label}
                className="flex items-center gap-4 bg-layer-2 rounded-xl border border-border px-5 py-4"
              >
                <div className="w-8 h-8 rounded-lg bg-remix-ai/10 border border-remix-ai/20 flex items-center justify-center shrink-0">
                  <FontAwesomeIcon icon={f.icon} className="text-remix-ai w-3.5 h-3.5" />
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
              Learn
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Master the Fundamentals of Web3
            </h2>
            <p className="text-text-secondary mb-4">
              Remix&apos;s graphic and intuitive UI makes it THE gateway to smart contract building and
              Web3 security. Whether you&apos;re a hands-on learner, advanced student, or educator, our
              interactive LearnEth environment and AI agent are your guide.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                { label: "Tutorials, Videos, and Templates", icon: faPlay },
                { label: "Integrated AI Tools", icon: faRobot },
                { label: "Learn Solidity, Vyper, Noir, and More!", icon: faGraduationCap },
              ].map((item) => (
                <li key={item.label} className="flex items-center gap-3 text-[13px] text-text-secondary">
                  <div className="w-6 h-6 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <FontAwesomeIcon icon={item.icon} className="text-primary w-3 h-3" />
                  </div>
                  {item.label}
                </li>
              ))}
            </ul>
            <Button href="/learn" size="lg" variant="secondary">
              Start Learning Now
            </Button>
          </div>
          <div className="flex-1 bg-layer-1 rounded-2xl border border-border overflow-hidden min-h-[320px] flex flex-col">
            <div className="flex items-center gap-2 px-4 py-3 bg-layer-2 border-b border-border">
              <div className="w-3 h-3 rounded-full bg-border" />
              <div className="w-3 h-3 rounded-full bg-border" />
              <div className="w-3 h-3 rounded-full bg-border" />
              <span className="ml-2 text-[11px] text-text-quaternary font-mono">MyToken.sol</span>
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
              Dev Workflow
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Prototype, Iterate, Refine
            </h2>
            <p className="text-text-secondary">
              Move fast from concept to product with Remix&apos;s intuitive and powerful suite of tools.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {WORKFLOW_FEATURES.map((f) => (
              <div key={f.title} className="bg-layer-2 rounded-xl border border-border p-6 flex flex-col gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <FontAwesomeIcon icon={f.icon} className="text-primary w-4 h-4" />
                </div>
                <h3 className="text-[15px] font-bold text-text-primary">{f.title}</h3>
                <p className="text-[13px] text-text-tertiary leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Button href="https://remix.ethereum.org/?#activate=templateSelection" external variant="secondary">
              Start Prototyping
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
              Advanced
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Advanced Features in Remix
            </h2>
            <p className="text-text-secondary mb-8">
              From automation with scripts to compiling ZKProofs, Remix has a huge arsenal of features
              for advanced Web3 developers.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {ADVANCED_FEATURES.map((f) => (
                <span
                  key={f.label}
                  className={`px-3 py-1.5 rounded-full bg-layer-1 border border-border text-[12px] font-semibold ${f.accent}`}
                >
                  {f.label}
                </span>
              ))}
            </div>
            <Button href="https://remix.ethereum.org/?#activate=pluginManager" external variant="secondary">
              Check Out All Plugins
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
              <span className="text-[11px] text-text-quaternary font-mono ml-1">Plugin Manager</span>
            </div>
            {/* Search bar */}
            <div className="px-4 py-2.5 border-b border-border">
              <div className="flex items-center gap-2 bg-layer-2 rounded-lg px-3 py-1.5 border border-border">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="w-3 h-3 text-text-quaternary" />
                <span className="text-[11px] text-text-quaternary font-mono">Search plugins…</span>
              </div>
            </div>
            {/* Plugin rows */}
            <div className="divide-y divide-border">
              {PLUGINS.map((plugin) => (
                <div key={plugin.name} className="flex items-center gap-3 px-4 py-2.5">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${plugin.active ? "bg-layer-2 border border-border" : "bg-layer-2 border border-border"}`}>
                    <FontAwesomeIcon icon={plugin.icon} className={`w-3 h-3 ${plugin.iconClass}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-semibold text-text-primary truncate">{plugin.name}</p>
                    <p className="text-[10px] text-text-tertiary truncate">{plugin.description}</p>
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border shrink-0 ${plugin.badgeClass}`}>
                    {plugin.active ? "Active" : "Install"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Community ────────────────────────────────────── */}
      <CommunitySection />
    </PageLayout>
  );
}
