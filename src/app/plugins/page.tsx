import type { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import CommunitySection from "@/components/sections/CommunitySection";
import Button from "@/components/ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faTerminal, faCloudArrowUp, faFileCode } from "@fortawesome/free-solid-svg-icons";

const MANAGER_PLUGINS = [
  { name: "Debugger", desc: "Debug transactions step by step", maintainer: "Remix", active: true },
  { name: "Tenderly", desc: "Advanced simulation & alerting", maintainer: "Tenderly", active: true },
  { name: "Circom Compiler", desc: "Compile ZK circuits", maintainer: "Community", active: false },
  { name: "Noir", desc: "Aztec ZK language compiler", maintainer: "Community", active: false },
  { name: "BuildBear", desc: "Private forkable sandbox", maintainer: "BuildBear", active: false },
  { name: "SolidityScan", desc: "Smart contract security scanner", maintainer: "Community", active: false },
];

function PluginManagerIllustration() {
  return (
    <div className="flex-1 w-full max-w-[480px]">
      <div className="bg-layer-1 rounded-2xl border border-border overflow-hidden shadow-xl">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-layer-2 border-b border-border shrink-0">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
          </div>
          <span className="text-[11px] text-text-quaternary font-mono ml-1">Plugin Manager</span>
        </div>
        {/* Search */}
        <div className="px-4 py-3 border-b border-border">
          <div className="bg-layer-3 border border-border rounded-lg px-3 py-1.5 flex items-center gap-2">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-text-quaternary shrink-0">
              <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
            </svg>
            <span className="text-[11px] text-text-quaternary">Search plugins...</span>
          </div>
        </div>
        {/* Plugin list */}
        {MANAGER_PLUGINS.map((p, i) => (
          <div
            key={p.name}
            className={`flex items-center gap-3 px-4 py-3 ${i < MANAGER_PLUGINS.length - 1 ? "border-b border-border/50" : ""} ${p.active ? "bg-primary/5" : ""}`}
          >
            <div className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 ${p.active ? "bg-primary/15 border-primary/30" : "bg-layer-2 border-border"}`}>
              <div className={`w-2.5 h-2.5 rounded-sm ${p.active ? "bg-primary" : "bg-text-quaternary/30"}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-bold text-text-primary truncate">{p.name}</p>
              <p className="text-[10px] text-text-quaternary truncate">{p.desc}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[9px] text-text-quaternary bg-layer-3 border border-border rounded-full px-1.5 py-0.5">
                {p.maintainer}
              </span>
              <button className={`text-[10px] font-bold px-2.5 py-1 rounded-lg ${p.active ? "bg-primary/10 text-primary border border-primary/20" : "bg-layer-3 text-text-tertiary border border-border"}`}>
                {p.active ? "Active" : "Activate"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Plugins — Remix",
  description: "Extend Remix with 40+ community and first-party plugins. Debuggers, sandboxes, ZK compilers, and more.",
};

const PLUGIN_CATEGORIES = [
  {
    tag: "Debugging",
    title: "Debug & Simulate",
    plugins: [
      { name: "Tenderly", description: "Advanced debugging, simulation, and alerting." },
      { name: "BuildBear Sandbox", description: "Private forkable sandbox with faucet and explorer." },
      { name: "Ganache", description: "Local blockchain for rapid testing." },
    ],
  },
  {
    tag: "ZK & Advanced",
    title: "Zero-Knowledge",
    plugins: [
      { name: "Circom Compiler", description: "Compile Circom circuits for ZK proofs." },
      { name: "Noir", description: "Aztec's ZK language compiler and prover." },
      { name: "Starknet", description: "Cairo contract development in Remix." },
    ],
  },
  {
    tag: "Frameworks",
    title: "Framework Support",
    plugins: [
      { name: "Hardhat", description: "Run Hardhat workflows directly from Remix." },
      { name: "Foundry", description: "Forge testing and scripting inside Remix." },
      { name: "Truffle", description: "Truffle integration for legacy projects." },
    ],
  },
  {
    tag: "Verification",
    title: "Verify & Publish",
    plugins: [
      { name: "Etherscan", description: "One-click source verification on Etherscan." },
      { name: "Sourcify", description: "Decentralized contract verification." },
      { name: "Blockscout", description: "Verify on the open-source Blockscout explorer." },
    ],
  },
  {
    tag: "Ecosystem",
    title: "Ecosystem Integrations",
    plugins: [
      { name: "Gnosis Safe", description: "Create and manage smart accounts (ERC-4337)." },
      { name: "Stylus (Arbitrum)", description: "Write Arbitrum Stylus contracts in Remix." },
      { name: "LearnEth", description: "Interactive tutorial plugin with quizzes." },
    ],
  },
  {
    tag: "Utilities",
    title: "Utilities",
    plugins: [
      { name: "Remix Video Guide", description: "Search and watch embedded feature videos." },
      { name: "DGIT", description: "Full Git integration: push, pull, merge, review." },
      { name: "Contract Flattener", description: "Flatten contracts for single-file verification." },
    ],
  },
];

export default function PluginsPage() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="py-24 px-6 xl:px-20 border-b border-border">
        <div className="mx-auto max-w-[1280px] flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 max-w-xl">
            <p className="text-[11px] font-bold uppercase tracking-widest text-primary font-cabin mb-3">Plugins</p>
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
              Extend Remix with{" "}
              <span className="text-primary">40+ Plugins</span>
            </h1>
            <p className="text-text-secondary text-lg mb-8">
              From ZK proof compilers to debugging sandboxes — the Remix plugin ecosystem puts every tool
              you need inside one environment.
            </p>
            <div className="flex flex-col md:flex-row gap-4">
              <Button href="https://remix.ethereum.org/?#activate=pluginManager" external size="lg">
                Browse Plugin Manager
              </Button>
              <Button href="/features" variant="secondary" size="lg">
                See All Features
              </Button>
            </div>
          </div>
          <PluginManagerIllustration />
        </div>
      </section>

      {/* Plugin grid */}
      <section className="py-16 px-6 xl:px-20">
        <div className="mx-auto max-w-[1280px] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {PLUGIN_CATEGORIES.map((cat) => (
            <div key={cat.tag} className="bg-layer-1 border border-border rounded-2xl p-8 flex flex-col gap-6">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-primary font-cabin block mb-2">
                  {cat.tag}
                </span>
                <h2 className="text-xl font-bold text-text-primary">{cat.title}</h2>
              </div>
              <ul className="space-y-4 flex-1">
                {cat.plugins.map((p) => (
                  <li key={p.name} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <div>
                      <p className="text-[13px] font-semibold text-text-primary">{p.name}</p>
                      <p className="text-[12px] text-text-tertiary">{p.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Build a plugin CTA */}
      <section className="py-20 px-6 xl:px-20 bg-layer-1 border-y border-border">
        <div className="mx-auto max-w-[1280px] flex flex-col lg:flex-row gap-12 items-center">
          <div className="flex-1 max-w-xl">
            <p className="text-[11px] font-bold uppercase tracking-widest text-primary font-cabin mb-3">Developers</p>
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">Build Your Own Plugin</h2>
            <p className="text-text-secondary mb-6">
              The Remix Plugin API lets you embed any web tool directly inside the IDE. Build custom
              panels, add new file types, integrate external services, and publish to the community.
            </p>
            <div className="flex flex-col md:flex-row gap-3">
              <Button href="https://remix-ide.readthedocs.io/en/latest/plugin_manager.html" external size="md">
                Start Building Your Plugin
              </Button>
              <Button href="https://github.com/ethereum/remix-plugin" external variant="secondary" size="md">
                Check an Example Project
              </Button>
            </div>
          </div>
          <div className="flex-1 bg-layer-2 rounded-2xl border border-border p-8 flex flex-col gap-4">
            {[
              { label: "Plugin API (iframe-based)", icon: faCode },
              { label: "Access Remix state and editor", icon: faTerminal },
              { label: "Publish to community plugin list", icon: faCloudArrowUp },
              { label: "TypeScript SDK available", icon: faFileCode },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 text-[13px] text-text-secondary">
                <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <FontAwesomeIcon icon={item.icon} className="w-3 h-3 text-primary" />
                </div>
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CommunitySection />
    </PageLayout>
  );
}
