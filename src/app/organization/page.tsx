import type { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import CommunitySection from "@/components/sections/CommunitySection";
import Button from "@/components/ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faCode, faCodeBranch, faStar, faBook } from "@fortawesome/free-solid-svg-icons";

export const metadata: Metadata = {
  title: "Organization — Remix",
  description: "Remix is the flagship product of Remix Labs UG, a globally distributed, remote-first organization.",
};

const COUNTRIES = [
  "France", "Germany", "India", "Netherlands", "Nigeria", "South Korea", "UK", "USA",
];

const OPEN_SOURCE_STATS = [
  { value: "1,581", label: "Contributors",  icon: faUsers       },
  { value: "22",    label: "Active Devs",   icon: faCode        },
  { value: "4,489", label: "Forks",         icon: faCodeBranch  },
  { value: "9,066", label: "Stars",         icon: faStar        },
  { value: "27",    label: "Repos",         icon: faBook        },
];

export default function OrganizationPage() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="py-24 px-6 xl:px-20 border-b border-border">
        <div className="mx-auto max-w-[1280px] flex flex-col lg:flex-row gap-24 items-center">
          <div className="flex-[2] min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-widest text-primary font-cabin mb-3">Organization</p>
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-8">
              Remix Labs
            </h1>
            <div className="flex flex-col gap-4 text-text-secondary leading-relaxed">
              <p>
                Remix is the flagship product of Remix Labs UG, a globally distributed, remote-first organization.
              </p>
              <p>
                Our team works from various countries including France, Germany, India, Netherlands, Nigeria, South Korea, UK, and USA.
              </p>
              <p>
                We collaborate with a partner org, Soundboard, a US 501(c)(3) charitable organization, to handle Web3 education and outreach programs that use the Remix platform.
              </p>
            </div>

            {/* Country pills */}
            <div className="flex flex-wrap gap-2 mt-8">
              {COUNTRIES.map((c) => (
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
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-primary font-cabin mb-1">Founded</p>
                <p className="text-text-primary font-semibold">2016</p>
              </div>
              <div className="border-t border-border" />
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-primary font-cabin mb-1">Entity</p>
                <p className="text-text-primary font-semibold">Remix Labs UG</p>
              </div>
              <div className="border-t border-border" />
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-primary font-cabin mb-1">License</p>
                <p className="text-text-primary font-semibold">MIT Open Source</p>
              </div>
              <div className="border-t border-border" />
              <div className="flex flex-col gap-2 pt-1">
                <Button href="https://github.com/ethereum/remix-project" external size="md">
                  GitHub
                </Button>
                <Button href="/contact" variant="secondary" size="md">
                  Contact Us
                </Button>
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
              Community
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 leading-tight">
              <span className="text-primary">Open Source</span> Powered Across the World
            </h2>
            <p className="text-text-secondary text-[15px] leading-relaxed">
              Join our community of builders collaborating to shape the future of Web3.
            </p>
          </div>

          {/* Stats grid */}
          <div className="flex-1 w-full grid grid-cols-3 gap-3">
            {OPEN_SOURCE_STATS.slice(0, 3).map((s) => (
              <div key={s.label} className="bg-layer-2 border border-border rounded-2xl px-5 py-4 flex items-center gap-3">
                <FontAwesomeIcon icon={s.icon} className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <p className="text-[11px] text-text-quaternary leading-tight">{s.label}</p>
                  <p className="text-[18px] font-bold text-text-primary leading-tight">{s.value}</p>
                </div>
              </div>
            ))}
            <div className="col-span-2 bg-layer-2 border border-border rounded-2xl px-5 py-4 flex items-center gap-3">
              <FontAwesomeIcon icon={faStar} className="w-5 h-5 text-primary shrink-0" />
              <div>
                <p className="text-[11px] text-text-quaternary leading-tight">Stars</p>
                <p className="text-[18px] font-bold text-text-primary leading-tight">9,066</p>
              </div>
            </div>
            <div className="bg-layer-2 border border-border rounded-2xl px-5 py-4 flex items-center gap-3">
              <FontAwesomeIcon icon={faBook} className="w-5 h-5 text-primary shrink-0" />
              <div>
                <p className="text-[11px] text-text-quaternary leading-tight">Repos</p>
                <p className="text-[18px] font-bold text-text-primary leading-tight">27</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CommunitySection />
    </PageLayout>
  );
}
