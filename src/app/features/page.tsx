import type { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import CommunitySection from "@/components/sections/CommunitySection";
import DesktopCTA from "@/components/sections/DesktopCTA";
import FeatureTabs from "@/components/sections/FeatureTabs";
import content from "@/content/features.json";

export const metadata: Metadata = content.metadata;

export default function FeaturesPage() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="py-20 px-6 xl:px-20 text-center bg-background border-b border-border">
        <div className="mx-auto max-w-[1280px]">
          <p className="text-[11px] font-bold uppercase tracking-widest text-primary font-cabin mb-4">
            {content.hero.eyebrow}
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-text-primary">{content.hero.titleStart} </span>
            <span className="text-primary">{content.hero.titleAccent}</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            {content.hero.description}
          </p>
        </div>
      </section>

      {/* Tabbed feature browser */}
      <FeatureTabs />

      <DesktopCTA />
      <CommunitySection />
    </PageLayout>
  );
}
