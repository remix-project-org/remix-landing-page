import type { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import Button from "@/components/ui/Button";
import PartnersSection from "@/components/sections/PartnersSection";
import CommunitySection from "@/components/sections/CommunitySection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faCode, faCodeBranch, faStar, faBook } from "@fortawesome/free-solid-svg-icons";

const LISTED_PLUGINS = [
  { name: "Tenderly",     desc: "Advanced simulation & alerting",  maintainer: "Tenderly"  },
  { name: "BuildBear",    desc: "Private forkable sandbox",        maintainer: "BuildBear" },
  { name: "SolidityScan", desc: "Smart contract security scanner", maintainer: "Community" },
];

function FeaturedPartnerIllustration() {
  return (
    <div className="flex-1 w-full max-w-[460px]">
      <div className="bg-layer-1 rounded-2xl border border-border overflow-hidden shadow-xl">

        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-layer-2 border-b border-border shrink-0">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
          </div>
          <span className="text-[11px] text-text-quaternary font-mono ml-1">Plugin Manager</span>
          <div className="ml-auto flex items-center gap-1.5 bg-layer-3 border border-border rounded-md px-2 py-0.5">
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-text-quaternary">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            </svg>
            <span className="text-[10px] text-text-quaternary">Search...</span>
          </div>
        </div>

        {/* Featured section label */}
        <div className="flex items-center gap-2 px-4 py-2 bg-primary/5 border-b border-primary/15">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-400">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Featured Partner</span>
        </div>

        {/* Featured card */}
        <div className="p-4 border-b border-border bg-primary/[0.04]">
          <div className="flex gap-3 mb-3">
            {/* Logo placeholder */}
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-layer-3 to-layer-4 border border-border flex items-center justify-center shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-text-quaternary">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <p className="text-[12px] font-bold text-text-primary">Your Tool</p>
                <span className="text-[9px] font-bold text-primary bg-primary/10 border border-primary/20 rounded-full px-1.5 py-px">
                  Featured by Remix
                </span>
              </div>
              <p className="text-[10px] text-text-quaternary mb-1.5">Maintained by Your Company</p>
              <p className="text-[11px] text-text-tertiary leading-relaxed">
                Connect your protocol directly inside Remix and reach every developer in the ecosystem.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-text-quaternary">
              <span className="text-text-secondary font-semibold">2,341</span> activations this month
            </span>
            <button className="text-[11px] font-bold text-background bg-primary px-3.5 py-1.5 rounded-lg">
              Activate
            </button>
          </div>
        </div>

        {/* Other plugins */}
        <div className="px-4 py-2 border-b border-border/60">
          <span className="text-[9px] font-bold text-text-quaternary uppercase tracking-widest">All Plugins</span>
        </div>
        {LISTED_PLUGINS.map((p, i) => (
          <div
            key={p.name}
            className={`flex items-center gap-3 px-4 py-2.5 ${i < LISTED_PLUGINS.length - 1 ? "border-b border-border/40" : ""}`}
          >
            <div className="w-7 h-7 rounded-md bg-layer-2 border border-border shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-semibold text-text-primary">{p.name}</p>
              <p className="text-[9px] text-text-quaternary">{p.desc}</p>
            </div>
            <span className="text-[9px] text-text-quaternary shrink-0">{p.maintainer}</span>
            <button className="text-[10px] text-text-tertiary border border-border rounded-md px-2 py-0.5 shrink-0">
              Activate
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Partnership — Remix",
  description: "Integrate with Remix, co-market to Web3 developers, or sponsor the most-used Ethereum IDE.",
};

const PARTNERSHIP_TYPES = [
  {
    tag: "Integration",
    title: "Technical Integration",
    description:
      "Build a Remix plugin or native integration. Connect your protocol, RPC provider, indexer, or dev tool directly into Remix's interface and reach millions of developers.",
    items: ["Plugin API access", "Co-development support", "Featured in Plugin Manager", "Promotion to Remix users"],
  },
  {
    tag: "Co-Marketing",
    title: "Co-Marketing",
    description:
      "Reach the Web3 developer community through Remix's channels. Joint blog posts, social campaigns, hackathon sponsorships, and newsletter features.",
    items: ["Blog & newsletter features", "Social media co-promotion", "Hackathon co-sponsorship", "Developer workshop support"],
  },
  {
    tag: "Sponsorship",
    title: "Sponsor Development",
    description:
      "Support specific feature development, infrastructure, or educational content. Named sponsorship with visibility across the platform and community channels.",
    items: ["Named feature sponsorship", "Visibility on remix.ethereum.org", "Community recognition", "Quarterly impact reports"],
  },
];

const OPEN_SOURCE_STATS = [
  { value: "1,581", label: "Contributors", icon: faUsers, wide: false },
  { value: "22", label: "Active Devs", icon: faCode, wide: false },
  { value: "4,489", label: "Forks", icon: faCodeBranch, wide: false },
  { value: "9,066", label: "Stars", icon: faStar, wide: true },
  { value: "27", label: "Repos", icon: faBook, wide: false },
];

export default function PartnershipPage() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="py-24 px-6 xl:px-20 border-b border-border">
        <div className="mx-auto max-w-[1280px] flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 max-w-xl">
            <p className="text-[11px] font-bold uppercase tracking-widest text-primary font-cabin mb-3">Partnership</p>
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
              Build with Remix.{" "}
              <span className="text-primary">Reach Web3 Developers.</span>
            </h1>
            <p className="text-text-secondary text-lg mb-8">
              Remix is used by millions of developers every month. Partner with us to integrate your
              tooling, amplify your reach, or fund the open source infrastructure that powers Ethereum.
            </p>
            <Button href="#contact" variant="primary" size="lg">
              Start a Conversation
            </Button>
          </div>
          <FeaturedPartnerIllustration />
        </div>
      </section>

      {/* Partnership types */}
      <section className="py-16 px-6 xl:px-20 border-t border-border">
        <div className="mx-auto max-w-[1280px] grid grid-cols-1 lg:grid-cols-3 gap-8">
          {PARTNERSHIP_TYPES.map((type) => (
            <div key={type.tag} className="bg-layer-1 border border-border rounded-2xl p-8 flex flex-col gap-6">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-primary font-cabin block mb-2">
                  {type.tag}
                </span>
                <h2 className="text-xl font-bold text-text-primary mb-3">{type.title}</h2>
                <p className="text-[13px] text-text-tertiary leading-relaxed">{type.description}</p>
              </div>
              <ul className="space-y-2 flex-1">
                {type.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[13px] text-text-secondary">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Partners marquee */}
      <PartnersSection />

      {/* Open Source Powered Across the World */}
      <section
        className="py-20 px-6 xl:px-20 border-y border-border"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 80% 50%, rgba(100,196,255,0.10) 0%, transparent 65%), var(--color-background)",
        }}
      >
        <div className="mx-auto max-w-[1280px] flex flex-col lg:flex-row items-center gap-16">
          {/* Text */}
          <div className="flex-1 max-w-lg">
            <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-text-quaternary bg-layer-2 border border-border rounded-full px-3 py-1 font-cabin mb-5">
              Community
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 leading-tight">
              <span className="text-primary">Open Source</span> Powered Across the World
            </h2>
            <p className="text-text-secondary text-[15px] leading-relaxed">
              Join our community of builders collaborating to shape the future of Web3.
            </p>
          </div>

          {/* Stats grid */}
          <div className="flex-1 w-full grid grid-cols-3 gap-3">
            {/* Row 1: 3 equal cards */}
            {OPEN_SOURCE_STATS.filter((_, i) => i < 3).map((s) => (
              <div key={s.label} className="bg-layer-2 border border-border rounded-2xl px-5 py-4 flex items-center gap-3">
                <FontAwesomeIcon icon={s.icon} className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <p className="text-[11px] text-text-quaternary leading-tight">{s.label}</p>
                  <p className="text-[18px] font-bold text-text-primary leading-tight">{s.value}</p>
                </div>
              </div>
            ))}
            {/* Row 2: Stars (col-span-2) + Repos */}
            <div className="col-span-2 bg-layer-2 border border-border rounded-2xl px-5 py-4 flex items-center gap-3">
              <FontAwesomeIcon icon={faStar} className="w-5 h-5 text-primary shrink-0" />
              <div>
                <p className="text-[11px] text-text-quaternary leading-tight">Stars</p>
                <p className="text-[18px] font-bold text-text-primary leading-tight">9,066</p>
              </div>
            </div>
            <div className="bg-layer-2 border border-border rounded-2xl px-5 py-4 flex items-center gap-3">
              <FontAwesomeIcon icon={faBook} className="w-5 h-5 text-primary shrink-0" />
              <div>
                <p className="text-[11px] text-text-quaternary leading-tight">Repos</p>
                <p className="text-[18px] font-bold text-text-primary leading-tight">27</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 px-6 xl:px-20 bg-layer-1 border-b border-border">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-text-primary mb-3">Get in Touch</h2>
          <p className="text-text-secondary mb-8">
            Tell us about your project and what kind of partnership you have in mind. We respond to
            serious enquiries within 3–5 business days.
          </p>
          <div className="flex flex-col md:flex-row gap-4">
            <Button href="https://github.com/ethereum/remix-project/issues" external size="lg">
              Open a GitHub Discussion
            </Button>
            <Button href="/contact" variant="secondary" size="lg">
              Contact Page
            </Button>
          </div>
        </div>
      </section>

      <CommunitySection />
    </PageLayout>
  );
}
