import content from "@/content/shared/partners-section.json";

export default function PartnersSection() {
  return (
    <section className="relative z-10 bg-layer-1 py-20 px-6 xl:px-20 overflow-hidden">
      <div className="mx-auto max-w-[1280px] flex flex-col items-center gap-12">
        <p className="text-[14px] text-text-quaternary text-center whitespace-nowrap">
          {content.label}
        </p>
        <div className="w-full overflow-hidden">
          <div
            className="flex items-center gap-16"
            style={{
              width: "max-content",
              animation: "marquee-partners linear infinite",
              animationDuration: `${(content.logos.length * 2 * 180) / 24}s`,
            }}
          >
            {[...content.logos, ...content.logos].map((logo, i) => (
              // Local SVGs; next/image would need `dangerouslyAllowSVG` for no real gain here.
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={logo.src}
                alt=""
                width={134}
                height={34}
                className="h-8 w-auto shrink-0"
                // Optional per-logo height (px) for logos with a taller aspect ratio
                style={"height" in logo ? { height: logo.height } : undefined}
              />
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes marquee-partners {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
