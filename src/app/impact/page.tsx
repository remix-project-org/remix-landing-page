import type { Metadata } from "next";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers, faArrowsRotate, faFileArrowUp, faClock, faCodeBranch, faPeopleGroup,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import PageLayout from "@/components/layout/PageLayout";
import CommunitySection from "@/components/sections/CommunitySection";
import DesktopCTA from "@/components/sections/DesktopCTA";
import content from "@/content/impact.json";

export const metadata: Metadata = {
  ...content.metadata,
  alternates: { canonical: "/impact" },
};

const ICONS: Record<string, IconDefinition> = {
  users: faUsers,
  arrowsRotate: faArrowsRotate,
  fileArrowUp: faFileArrowUp,
  clock: faClock,
  codeBranch: faCodeBranch,
  peopleGroup: faPeopleGroup,
};

export default function ImpactPage() {
  return (
    <PageLayout>
      {/* Hero */}
      <section
        className="relative py-28 px-6 xl:px-20 overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 70% 40%, rgba(100, 196, 255, 0.12) 0%, transparent 65%), var(--color-background)",
        }}
      >
        <div className="mx-auto max-w-[1280px]">
          <p className="text-[11px] font-bold uppercase tracking-widest text-primary font-cabin mb-4">{content.hero.eyebrow}</p>
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary leading-tight">
            {content.hero.titleStart}{" "}
            <span className="text-primary">{content.hero.titleAccent}</span>
          </h1>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 xl:px-20 py-16 bg-layer-1 border-y border-border">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {content.stats.map((s) => (
              <div
                key={s.label}
                className="bg-layer-2 border border-border rounded-2xl px-6 py-5 flex items-center gap-5"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <FontAwesomeIcon icon={ICONS[s.icon]} className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-[18px] font-bold text-text-primary leading-tight">{s.value}</p>
                  <p className="text-[12px] text-text-tertiary mt-0.5">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regional growth */}
      <section className="px-6 xl:px-20 py-20">
        <div className="mx-auto max-w-[1280px] flex flex-col gap-12">
          <div>
            <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-text-quaternary bg-layer-2 border border-border rounded-full px-3 py-1 font-cabin mb-5">
              {content.regional.tag}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
              {content.regional.titleStart}{" "}
              <span className="text-primary">{content.regional.titleAccent}</span>
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            {content.regional.regions.map((region) => (
              <div key={region.src}>
                {/* Desktop: full image */}
                <div className={`hidden md:block ${region.className ?? ""}`}>
                  <Image
                    src={region.src}
                    width={region.width}
                    height={region.height}
                    alt={region.alt}
                    className="w-full h-auto"
                  />
                </div>
                {/* Mobile: split double-region images into individual rows */}
                {region.mobile ? (
                  <div className="md:hidden flex flex-col gap-4">
                    {region.mobile.map((half) => (
                      <div
                        key={half.position}
                        className="relative w-full overflow-hidden"
                        style={{ aspectRatio: `${region.width / 2} / ${region.height}` }}
                      >
                        <Image
                          src={region.src}
                          alt={half.alt}
                          fill
                          className={`object-cover ${half.position === "left" ? "object-left" : "object-right"}`}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={`md:hidden ${region.className ?? ""}`}>
                    <Image
                      src={region.src}
                      width={region.width}
                      height={region.height}
                      alt={region.alt}
                      className="w-full h-auto"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Globally diverse */}
      <section className="px-6 xl:px-20 py-20 bg-layer-1 border-t border-border">
        <div className="mx-auto max-w-[1280px] flex flex-col gap-12">
          <div>
            <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-text-quaternary bg-layer-2 border border-border rounded-full px-3 py-1 font-cabin mb-5">
              {content.global.tag}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
              {content.global.titleStart}{" "}
              <span className="text-primary">{content.global.titleAccent}</span>
            </h2>
          </div>

          {/* World map */}
          <div className="w-full">
            <Image
              src={content.global.worldMap.src}
              width={content.global.worldMap.width}
              height={content.global.worldMap.height}
              alt={content.global.worldMap.alt}
              className="w-full h-auto"
            />
            <div className="flex items-center gap-3 mt-2 px-2 max-w-xs mx-auto">
              <span className="text-[11px] text-text-quaternary">{content.global.scaleMin}</span>
              <div className="flex-1 h-1.5 rounded-full bg-gradient-to-r from-layer-3 to-primary" />
              <span className="text-[11px] text-text-quaternary">{content.global.scaleMax}</span>
            </div>
          </div>

          {/* Country table */}
          <div className="max-w-2xl mx-auto w-full">
            <div className="bg-layer-2 border border-border rounded-2xl overflow-hidden">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-6 py-4 text-text-secondary font-bold">{content.global.tableHeaders.country}</th>
                    <th className="text-right px-6 py-4 text-text-secondary font-bold">{content.global.tableHeaders.visits}</th>
                    <th className="text-right px-6 py-4 text-text-secondary font-bold">{content.global.tableHeaders.percentage}</th>
                  </tr>
                </thead>
                <tbody>
                  {content.global.countries.map((row, i) => (
                    <tr
                      key={row.country}
                      className={`${i < content.global.countries.length - 1 ? "border-b border-border/50" : ""}`}
                    >
                      <td className="px-6 py-3 text-text-tertiary">{row.country}</td>
                      <td className="px-6 py-3 text-text-tertiary text-right">{row.visits}</td>
                      <td className="px-6 py-3 text-text-tertiary text-right">{row.pct}</td>
                    </tr>
                  ))}
                  <tr className="border-t border-border">
                    <td className="px-6 py-3 text-text-primary font-bold">{content.global.totals.label}</td>
                    <td className="px-6 py-3 text-text-primary font-bold text-right">{content.global.totals.visits}</td>
                    <td className="px-6 py-3 text-text-primary font-bold text-right">{content.global.totals.pct}</td>
                  </tr>
                </tbody>
              </table>
              <p className="px-6 py-3 text-[11px] text-text-quaternary border-t border-border/50">
                {content.global.footnote}
              </p>
            </div>
          </div>
        </div>
      </section>

      <DesktopCTA />
      <CommunitySection />
    </PageLayout>
  );
}
