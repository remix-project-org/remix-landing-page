import type { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Support Remix — Donate",
  description: "Remix is free and open source. Support the team behind the world's most-used Web3 development environment.",
};

const HOW_WE_USE = [
  { title: "Core Development", description: "Fund full-time engineers maintaining Remix IDE, the compiler, and integrations." },
  { title: "Open Source Infrastructure", description: "Keep remix.ethereum.org free, fast, and always available." },
  { title: "Education & Tutorials", description: "Produce LearnEth content, video guides, and documentation." },
  { title: "Community Events", description: "Support hackathons, workshops, and developer meetups worldwide." },
];

const DONATION_OPTIONS = [
  {
    title: "Gitcoin Grants",
    description: "Support Remix through Gitcoin's quadratic funding rounds. Every contribution gets matched.",
    cta: "Donate on Gitcoin",
    href: "https://gitcoin.co/grants/",
    external: true,
    accent: "border-primary/40",
  },
  {
    title: "Direct ETH / Crypto",
    description: "Send ETH or ERC-20 tokens directly to the Remix team's multisig wallet.",
    cta: "Get Wallet Address",
    href: "https://github.com/ethereum/remix-project#support",
    external: true,
    accent: "border-border",
  },
  {
    title: "GitHub Sponsors",
    description: "Recurring or one-time sponsorship through GitHub. Perfect for individuals and companies.",
    cta: "Sponsor on GitHub",
    href: "https://github.com/sponsors/ethereum",
    external: true,
    accent: "border-border",
  },
];

export default function DonatePage() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="py-24 px-6 xl:px-20">
        <div className="mx-auto max-w-[1280px]">
          <p className="text-[11px] font-bold uppercase tracking-widest text-primary font-cabin mb-3">Support Us</p>
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6 max-w-3xl">
            Keep Remix Free for Everyone
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mb-8">
            Remix is a public good — free, open source, and maintained by a small team. Your support
            helps us keep shipping features, maintaining infrastructure, and educating the next wave
            of Web3 developers.
          </p>
        </div>
      </section>

      {/* Donation options */}
      <section className="py-4 pb-20 px-6 xl:px-20">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {DONATION_OPTIONS.map((opt) => (
              <div
                key={opt.title}
                className={`bg-layer-1 border rounded-2xl p-8 flex flex-col gap-6 ${opt.accent}`}
              >
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-text-primary mb-3">{opt.title}</h2>
                  <p className="text-[13px] text-text-tertiary leading-relaxed">{opt.description}</p>
                </div>
                <Button href={opt.href} external={opt.external} variant="secondary" size="md">
                  {opt.cta}
                </Button>
              </div>
            ))}
          </div>

          {/* How we use funds */}
          <div className="bg-layer-1 border border-border rounded-2xl p-10">
            <h2 className="text-2xl font-bold text-text-primary mb-2">How We Use Funds</h2>
            <p className="text-text-secondary mb-8">Donations go directly into making Remix better.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {HOW_WE_USE.map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <div>
                    <p className="text-[14px] font-bold text-text-primary mb-1">{item.title}</p>
                    <p className="text-[13px] text-text-tertiary">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
