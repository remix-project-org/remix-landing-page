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

export const metadata: Metadata = {
  title: "Impact — Remix",
  description: "Remix powers the Web3 ecosystem. Explore our reach, community, and global developer growth.",
};

const STATS: { value: string; label: string; icon: IconDefinition }[] = [
  { value: "400K", label: "Monthly Active Users", icon: faUsers },
  { value: "2,000+ /day", label: "Deployed Contract Interactions", icon: faArrowsRotate },
  { value: "33K /day", label: "Contract Deployments", icon: faFileArrowUp },
  { value: "15 minutes", label: "Average Session Duration", icon: faClock },
  { value: "5,600 /day", label: "Onchain Network Deployments", icon: faCodeBranch },
  { value: "18K+", label: "Community Across all Channels", icon: faPeopleGroup },
];

interface MobileHalf {
  alt: string;
  position: "left" | "right";
}

interface Region {
  src: string;
  width: number;
  height: number;
  alt: string;
  className?: string;
  mobile: MobileHalf[] | null;
}

const REGIONS: Region[] = [
  {
    src: "/assets/impact/image-01.png",
    width: 1860,
    height: 640,
    alt: "Africa and South Asia regional growth maps",
    mobile: [
      { alt: "Africa regional growth", position: "left" },
      { alt: "South Asia regional growth", position: "right" },
    ],
  },
  {
    src: "/assets/impact/image-02.png",
    width: 1886,
    height: 640,
    alt: "Southeast Asia and LATAM regional growth maps",
    mobile: [
      { alt: "Southeast Asia regional growth", position: "left" },
      { alt: "LATAM regional growth", position: "right" },
    ],
  },
  {
    src: "/assets/impact/image-03.png",
    width: 856,
    height: 640,
    alt: "Middle East regional growth map",
    className: "max-w-[640px]",
    mobile: null,
  },
];

const COUNTRY_DATA = [
  { country: "India", visits: "1,190,439", pct: "13.97%" },
  { country: "United States", visits: "666,408", pct: "7.82%" },
  { country: "Hong Kong", visits: "516,484", pct: "6.06%" },
  { country: "Singapore", visits: "399,885", pct: "4.69%" },
  { country: "China", visits: "392,454", pct: "4.61%" },
  { country: "Vietnam", visits: "360,040", pct: "4.23%" },
  { country: "Japan", visits: "318,161", pct: "3.73%" },
  { country: "Nigeria", visits: "316,008", pct: "3.71%" },
  { country: "Germany", visits: "285,270", pct: "3.35%" },
  { country: "Indonesia", visits: "245,867", pct: "2.89%" },
  { country: "United Kingdom", visits: "202,713", pct: "2.38%" },
  { country: "Russia", visits: "201,103", pct: "2.36%" },
  { country: "Other countries", visits: "3,229,650", pct: "37.91%" },
];

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
          <p className="text-[11px] font-bold uppercase tracking-widest text-primary font-cabin mb-4">Impact</p>
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary leading-tight">
            Remix{" "}
            <span className="text-primary">by the Numbers</span>
          </h1>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 xl:px-20 py-16 bg-layer-1 border-y border-border">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="bg-layer-2 border border-border rounded-2xl px-6 py-5 flex items-center gap-5"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <FontAwesomeIcon icon={s.icon} className="w-4 h-4 text-primary" />
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
              Developer Growth
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
              Our usage is{" "}
              <span className="text-primary">growing across key regions</span>
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            {REGIONS.map((region) => (
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
              Developer Growth
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
              Our usage is{" "}
              <span className="text-primary">globally diverse</span>
            </h2>
          </div>

          {/* World map */}
          <div className="w-full">
            <Image
              src="/assets/impact/image-04.png"
              width={1925}
              height={1280}
              alt="World map showing global Remix usage distribution"
              className="w-full h-auto"
            />
            <div className="flex items-center gap-3 mt-2 px-2 max-w-xs mx-auto">
              <span className="text-[11px] text-text-quaternary">194,443</span>
              <div className="flex-1 h-1.5 rounded-full bg-gradient-to-r from-layer-3 to-primary" />
              <span className="text-[11px] text-text-quaternary">1,190,439</span>
            </div>
          </div>

          {/* Country table — constrained width on large screens */}
          <div className="max-w-2xl mx-auto w-full">
            <div className="bg-layer-2 border border-border rounded-2xl overflow-hidden">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-6 py-4 text-text-secondary font-bold">Country</th>
                    <th className="text-right px-6 py-4 text-text-secondary font-bold">Visits</th>
                    <th className="text-right px-6 py-4 text-text-secondary font-bold">Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {COUNTRY_DATA.map((row, i) => (
                    <tr
                      key={row.country}
                      className={`${i < COUNTRY_DATA.length - 1 ? "border-b border-border/50" : ""}`}
                    >
                      <td className="px-6 py-3 text-text-tertiary">{row.country}</td>
                      <td className="px-6 py-3 text-text-tertiary text-right">{row.visits}</td>
                      <td className="px-6 py-3 text-text-tertiary text-right">{row.pct}</td>
                    </tr>
                  ))}
                  <tr className="border-t border-border">
                    <td className="px-6 py-3 text-text-primary font-bold">Total user 2024</td>
                    <td className="px-6 py-3 text-text-primary font-bold text-right">8,518,819</td>
                    <td className="px-6 py-3 text-text-primary font-bold text-right">100%</td>
                  </tr>
                </tbody>
              </table>
              <p className="px-6 py-3 text-[11px] text-text-quaternary border-t border-border/50">
                Top 12 countries with most users for 2024 (Matomo analytics)
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
