"use client";

import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import content from "@/content/pricing.json";

// Shared FAQ: the full list on /pricing (whose help section already covers contact), the first `limit` questions on the home page.
export default function FaqSection({ limit, showContact = true }: { limit?: number; showContact?: boolean }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { faq } = content;
  const items = limit ? faq.items.slice(0, limit) : faq.items;

  return (
    <div className="flex flex-col md:flex-row gap-x-16 gap-y-8 items-start">
      <div className="md:w-[320px] shrink-0 flex flex-col gap-4">
        <p className="eyebrow">{faq.eyebrow}</p>
        <h2 className="text-[clamp(30px,4vw,36px)] leading-[1.04] text-text-primary">
          {faq.titleStart}
          <br />
          {faq.titleEnd}
        </h2>
        {showContact && (
          <>
            <p className="text-[14px] text-text-tertiary">{faq.note}</p>
            <Link href={faq.contact.href} className="group inline-flex items-center gap-1.5 text-[14px] font-bold text-primary">
              {faq.contact.label}
              <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3 transition-transform group-hover:translate-x-[3px]" />
            </Link>
          </>
        )}
      </div>

      <div className="flex-1 min-w-0 w-full flex flex-col divide-y divide-border border-y border-border">
        {items.map((item, i) => (
          <div key={item.q}>
            <button
              className="w-full flex items-center justify-between gap-4 py-5 px-1 text-left cursor-pointer"
              aria-expanded={openFaq === i}
              onClick={() => {
                const isOpening = openFaq !== i;
                setOpenFaq(isOpening ? i : null);
                if (isOpening) {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (window as any).gtag?.("event", "faq_open", { question: item.q });
                }
              }}
            >
              <span className="text-[16px] font-bold text-text-primary leading-snug">{item.q}</span>
              <FontAwesomeIcon
                icon={faPlus}
                className={`w-3.5 h-3.5 text-primary shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-45" : ""}`}
              />
            </button>
            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${openFaq === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
              <div className="overflow-hidden">
                <p className="px-1 pb-5 max-w-[62ch] text-[14px] text-text-tertiary leading-relaxed">{item.a}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
