import type { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import { BlockRenderer, type Block } from "@/components/content/RichBlocks";
import content from "@/content/terms.json";

export const metadata: Metadata = {
  ...content.metadata,
  alternates: { canonical: "/termsandconditions" },
};

export default function TermsPage() {
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
            
            <p className="text-[16px] font-bold text-text-primary mb-10">{content.lastUpdated}</p>
            <div className="text-[16px] font-bold text-text-primary mb-10">{content.disclaimer.title}</div>
             <div className="flex flex-col gap-4 mb-16">
               <BlockRenderer block={content.disclaimer.sections} />
             </div>
            
            <div className="text-text-primary mb-10">{content.disclaimer.intro}</div>
            {/* Intro */}
            <div className="flex flex-col gap-4 mb-16">
              {(content.intro as Block[]).map((block, i) => (
                <BlockRenderer key={i} block={block} />
              ))}
            </div>

            {/* Summary of Key Points */}
            <div className="flex flex-col gap-4 mb-16">
              <h2 className="text-[16px] font-bold text-text-primary uppercase">{content.summary.title}</h2>
              {(content.summary.blocks as Block[]).map((block, i) => (
                <BlockRenderer key={i} block={block} />
              ))}
            </div>

            {/* Table of Contents */}
            <div className="flex flex-col gap-4 mb-16">
              <h2 className="text-[16px] font-bold text-text-primary uppercase">{content.tableOfContents.title}</h2>
              <ol className="list-decimal pl-6 flex flex-col gap-1">
                {content.tableOfContents.items.map((item, i) => (
                  <li key={i} className="text-[14px] text-text-secondary leading-relaxed">
                    <a href={`#${content.sections[i]?.id ?? ""}`} className="hover:text-text-primary transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ol>
            </div>

            {/* Sections */}
            <div className="flex flex-col gap-16">
              {content.sections.map((section) => (
                <section key={section.id} id={section.id} className="flex flex-col gap-4">
                  <h2 className="text-[16px] font-bold text-text-primary uppercase">
                    {section.number}. {section.title}
                  </h2>
                  {"subhead" in section && section.subhead && (
                    <h3 className="text-[15px] font-bold text-text-primary">{section.subhead}</h3>
                  )}
                  {(section.blocks as Block[]).map((block, i) => (
                    <BlockRenderer key={i} block={block} />
                  ))}
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
