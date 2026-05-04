import type { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import CommunitySection from "@/components/sections/CommunitySection";
import GitHubReleasesDownload from "@/components/sections/GitHubReleasesDownload";
import Button from "@/components/ui/Button";
export const metadata: Metadata = {
  title: "Remix Desktop — Download",
  description: "Works anywhere, even offline. Native terminals, enhanced security, and live sync with any editor.",
};

const WHATS_NEW = [
  { title: "Maximize Right Panel or Terminal", description: "Give your workspace more room when you need it." },
  { title: "Foundry/Hardhat Compilation Update", description: "Improved compilation support for popular frameworks." },
  { title: "Simulated Blockchain Updates", description: "Enhanced in-browser EVM for faster iteration." },
];

export default function DesktopPage() {
  return (
    <PageLayout>
      {/* GitHub Releases Download */}
      <section className="bg-background">
        <GitHubReleasesDownload />
      </section>

      {/* What's New */}
      <section className="py-20 px-6 xl:px-20 bg-layer-1 border-y border-border">
        <div className="mx-auto max-w-[1280px]">
          <h2 className="text-2xl font-bold text-text-primary mb-2">What&apos;s New in Remix?</h2>
          <p className="text-text-secondary mb-10">Latest updates in the desktop app.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {WHATS_NEW.map((item) => (
              <div key={item.title} className="bg-layer-2 rounded-xl border border-border p-6">
                <h3 className="text-[14px] font-bold text-text-primary mb-2">{item.title}</h3>
                <p className="text-[13px] text-text-tertiary">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-4">
            <Button href="/releases" variant="secondary" size="md">Read Full Release Notes</Button>
            <Button href="/features" variant="tertiary" size="md">Check out All Features</Button>
          </div>
        </div>
      </section>

      <CommunitySection />
    </PageLayout>
  );
}
