import type { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import content from "@/content/terms.json";

export const metadata: Metadata = content.metadata;

type Block =
  | { type: "paragraph"; text: string }
  | { type: "inShort"; text: string }
  | { type: "subhead"; text: string }
  | { type: "list"; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] };

/**
 * Renders a string with inline markdown: **bold**, *italic*, [text](url).
 * Email URLs (mailto:) get treated as links too.
 */
function renderInline(text: string): React.ReactNode {
  const out: React.ReactNode[] = [];
  let i = 0;
  let buf = "";
  let key = 0;

  const flush = () => {
    if (buf) {
      out.push(buf);
      buf = "";
    }
  };

  while (i < text.length) {
    // **bold**
    if (text[i] === "*" && text[i + 1] === "*") {
      const end = text.indexOf("**", i + 2);
      if (end !== -1) {
        flush();
        out.push(<strong key={key++} className="text-text-primary font-bold">{text.slice(i + 2, end)}</strong>);
        i = end + 2;
        continue;
      }
    }
    // *italic*
    if (text[i] === "*" && text[i + 1] !== "*") {
      const end = text.indexOf("*", i + 1);
      if (end !== -1) {
        flush();
        out.push(<em key={key++}>{text.slice(i + 1, end)}</em>);
        i = end + 1;
        continue;
      }
    }
    // [text](url)
    if (text[i] === "[") {
      const closeBracket = text.indexOf("]", i + 1);
      if (closeBracket !== -1 && text[closeBracket + 1] === "(") {
        const closeParen = text.indexOf(")", closeBracket + 2);
        if (closeParen !== -1) {
          flush();
          const linkText = text.slice(i + 1, closeBracket);
          const url = text.slice(closeBracket + 2, closeParen);
          const external = !url.startsWith("mailto:");
          out.push(
            <a
              key={key++}
              href={url}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="text-primary underline hover:text-primary/80 transition-colors break-words"
            >
              {linkText}
            </a>
          );
          i = closeParen + 1;
          continue;
        }
      }
    }
    buf += text[i];
    i++;
  }
  flush();
  return out;
}

function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case "paragraph":
      return <p className="text-[14px] text-text-secondary leading-relaxed">{renderInline(block.text)}</p>;
    case "inShort":
      return (
        <p className="text-[14px] italic font-bold text-text-primary leading-relaxed">
          {renderInline(block.text)}
        </p>
      );
    case "subhead":
      return <h3 className="text-[16px] font-bold text-text-primary mt-2">{renderInline(block.text)}</h3>;
    case "list":
      return (
        <ul className="list-disc pl-6 flex flex-col gap-2">
          {block.items.map((item, i) => (
            <li key={i} className="text-[14px] text-text-secondary leading-relaxed">
              {renderInline(item)}
            </li>
          ))}
        </ul>
      );
    case "table":
      return (
        <div className="overflow-x-auto border border-border rounded-xl">
          <table className="w-full text-[13px] min-w-[600px]">
            <thead>
              <tr className="border-b border-border bg-layer-2">
                {block.headers.map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-text-primary font-bold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i} className={i < block.rows.length - 1 ? "border-b border-border/40" : ""}>
                  {row.map((cell, j) => (
                    <td key={j} className="px-4 py-3 text-text-secondary align-top">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

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
