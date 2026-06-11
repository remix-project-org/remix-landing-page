import type { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import Button from "@/components/ui/Button";
import CommunitySection from "@/components/sections/CommunitySection";
import content from "@/content/contact.json";

export const metadata: Metadata = content.metadata;

export default function ContactPage() {
  return (
    <PageLayout>
      {/* Hero — bug reporting */}
      <section className="py-24 px-6 xl:px-20 border-b border-border">
        <div className="mx-auto max-w-[1280px]">
          <p className="text-[11px] font-bold uppercase tracking-widest text-primary font-cabin mb-3">{content.hero.eyebrow}</p>
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
            {content.hero.title}
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mb-8 leading-relaxed">
            {content.hero.description}
          </p>
          <div className="flex flex-col md:flex-row gap-4">
            <Button href={content.hero.primaryCta.href} external size="lg">
              {content.hero.primaryCta.label}
            </Button>
            <Button href={content.hero.secondaryCta.href} external variant="secondary" size="lg">
              {content.hero.secondaryCta.label}
            </Button>
          </div>
        </div>
      </section>

      {/* How can we help */}
      <section className="py-20 px-6 xl:px-20">
        <div className="mx-auto max-w-[1280px]">
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">{content.help.title}</h2>
          <p className="text-text-secondary mb-12 max-w-xl">
            {content.help.description}
          </p>

          <div className="bg-layer-1 border border-border rounded-2xl overflow-hidden max-w-2xl">
            <iframe
              src={content.help.typeformUrl}
              width="100%"
              height="520"
              style={{ border: "none" }}
              title={content.help.typeformTitle}
              allow="camera; microphone; autoplay; encrypted-media;"
            />
          </div>
        </div>
      </section>

      <CommunitySection />
    </PageLayout>
  );
}
