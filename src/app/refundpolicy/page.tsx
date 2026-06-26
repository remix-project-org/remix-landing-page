import type { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import { BlockRenderer, type Block } from "@/components/content/RichBlocks";
import content from "@/content/refund.json";

export const metadata: Metadata = {
  ...content.metadata,
  alternates: { canonical: "/refundpolicy" },
};

export default function RefundPolicyPage() {
  return (
    <PageLayout>
      <section className="py-24 px-6 xl:px-20 relative overflow-hidden">
        <div className="mx-auto max-w-[1280px]">
          <div className="max-w-4xl">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight">
              {content.titleStart}{" "}
              <span className="text-primary">{content.titleAccent}</span>
            </h1>
            <p className="text-[14px] text-text-quaternary mb-10">{content.effective}</p>

            {/* Intro */}
            <div className="flex flex-col gap-4 mb-16">
              <h2 className="text-[16px] font-bold text-text-primary uppercase">{content.intro.subhead}</h2>
              {(content.intro.blocks as Block[]).map((block, i) => (
                <BlockRenderer key={i} block={block} />
              ))}
            </div>

            {/* Sections */}
            <div className="flex flex-col gap-16">
              {content.sections.map((section) => (
                <section key={section.id} id={section.id} className="flex flex-col gap-4">
                  <h2 className="text-[16px] font-bold text-text-primary uppercase">
                    {String(section.number).padStart(2, "0")}. {section.title}
                  </h2>
                  {(section.blocks as Block[]).map((block, i) => (
                    <BlockRenderer key={i} block={block} />
                  ))}
                </section>
              ))}
            </div>

            {/* Footer */}
            <p className="text-[13px] text-text-quaternary mt-16 pt-8 border-t border-border">
              {content.footer}
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
