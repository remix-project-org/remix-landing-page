import type React from "react";

export type Block =
  | { type: "paragraph"; text: string }
  | { type: "inShort"; text: string }
  | { type: "subhead"; text: string }
  | { type: "list"; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] };

/**
 * Renders a string with inline markdown: **bold**, *italic*, [text](url).
 * Email URLs (mailto:) get treated as links too.
 */
export function renderInline(text: string): React.ReactNode {
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

export function BlockRenderer({ block }: { block: Block }) {
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
