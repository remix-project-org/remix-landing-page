import type { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import Button from "@/components/ui/Button";
import content from "@/content/donate.json";

export const metadata: Metadata = content.metadata;

export default function DonatePage() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="py-24 px-6 xl:px-20">
        <div className="mx-auto max-w-[1280px]">
          <p className="text-[11px] font-bold uppercase tracking-widest text-primary font-cabin mb-3">{content.hero.eyebrow}</p>
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6 max-w-3xl">
            {content.hero.title}
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mb-8">
            {content.hero.description}
          </p>
        </div>
      </section>

      {/* Donation options */}
      <section className="py-4 pb-20 px-6 xl:px-20">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {content.options.map((opt) => (
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
            <h2 className="text-2xl font-bold text-text-primary mb-2">{content.usage.title}</h2>
            <p className="text-text-secondary mb-8">{content.usage.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {content.usage.items.map((item) => (
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
