import type { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import CommunitySection from "@/components/sections/CommunitySection";
import Button from "@/components/ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faCode, faCodeBranch, faStar, faBook } from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import content from "@/content/organization.json";

export const metadata: Metadata = content.metadata;

const ICONS: Record<string, IconDefinition> = {
  users: faUsers,
  code: faCode,
  codeBranch: faCodeBranch,
  star: faStar,
  book: faBook,
};

export default function OrganizationPage() {
  const stats = content.openSourceSection.stats;
  return (
    <PageLayout>
      {/* Hero */}
      <section className="py-24 px-6 xl:px-20 border-b border-border">
        <div className="mx-auto max-w-[1280px] flex flex-col lg:flex-row gap-24 items-center">
          <div className="flex-[2] min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-widest text-primary font-cabin mb-3">{content.hero.eyebrow}</p>
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-8">
              {content.hero.title}
            </h1>
            <div className="flex flex-col gap-4 text-text-secondary leading-relaxed">
              {content.hero.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* Country pills */}
            <div className="flex flex-wrap gap-2 mt-8">
              {content.hero.countries.map((c) => (
                <span
                  key={c}
                  className="text-[11px] font-semibold text-text-secondary bg-layer-2 border border-border rounded-full px-3 py-1"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Links panel */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="bg-layer-1 border border-border rounded-2xl p-6 flex flex-col gap-4 min-w-[240px]">
              {content.hero.infoCard.items.map((item, i) => (
                <div key={item.label}>
                  {i > 0 && <div className="border-t border-border mb-4" />}
                  <p className="text-[11px] font-bold uppercase tracking-widest text-primary font-cabin mb-1">{item.label}</p>
                  <p className="text-text-primary font-semibold">{item.value}</p>
                </div>
              ))}
              <div className="border-t border-border" />
              <div className="flex flex-col gap-2 pt-1">
                {content.hero.infoCard.actions.map((action) => (
                  <Button
                    key={action.label}
                    href={action.href}
                    external={action.external}
                    variant={action.variant === "secondary" ? "secondary" : undefined}
                    size="md"
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Open Source Powered Across the World */}
      <section
        className="py-20 px-6 xl:px-20 border-b border-border"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 80% 50%, rgba(100,196,255,0.10) 0%, transparent 65%), var(--color-background)",
        }}
      >
        <div className="mx-auto max-w-[1280px] flex flex-col lg:flex-row items-center gap-16">
          {/* Text */}
          <div className="flex-1 max-w-lg">
            <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-text-quaternary bg-layer-2 border border-border rounded-full px-3 py-1 font-cabin mb-5">
              {content.openSourceSection.tag}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 leading-tight">
              <span className="text-primary">{content.openSourceSection.titleAccent}</span> {content.openSourceSection.titleRest}
            </h2>
            <p className="text-text-secondary text-[15px] leading-relaxed">
              {content.openSourceSection.description}
            </p>
          </div>

          {/* Stats grid */}
          <div className="flex-1 w-full grid grid-cols-3 gap-3">
            {stats.slice(0, 3).map((s) => (
              <div key={s.label} className="bg-layer-2 border border-border rounded-2xl px-5 py-4 flex items-center gap-3">
                <FontAwesomeIcon icon={ICONS[s.icon]} className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <p className="text-[11px] text-text-quaternary leading-tight">{s.label}</p>
                  <p className="text-[18px] font-bold text-text-primary leading-tight">{s.value}</p>
                </div>
              </div>
            ))}
            <div className="col-span-2 bg-layer-2 border border-border rounded-2xl px-5 py-4 flex items-center gap-3">
              <FontAwesomeIcon icon={ICONS[stats[3].icon]} className="w-5 h-5 text-primary shrink-0" />
              <div>
                <p className="text-[11px] text-text-quaternary leading-tight">{stats[3].label}</p>
                <p className="text-[18px] font-bold text-text-primary leading-tight">{stats[3].value}</p>
              </div>
            </div>
            <div className="bg-layer-2 border border-border rounded-2xl px-5 py-4 flex items-center gap-3">
              <FontAwesomeIcon icon={ICONS[stats[4].icon]} className="w-5 h-5 text-primary shrink-0" />
              <div>
                <p className="text-[11px] text-text-quaternary leading-tight">{stats[4].label}</p>
                <p className="text-[18px] font-bold text-text-primary leading-tight">{stats[4].value}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CommunitySection />
    </PageLayout>
  );
}
