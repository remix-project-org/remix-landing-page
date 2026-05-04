const LOGOS = [
  "/assets/partners-logos/Logo.svg",
  "/assets/partners-logos/Logo-1.svg",
  "/assets/partners-logos/Logo-2.svg",
  "/assets/partners-logos/Logo-3.svg",
  "/assets/partners-logos/Logo-4.svg",
];

export default function PartnersSection() {
  return (
    <section className="relative z-10 bg-layer-1 py-20 px-6 xl:px-20 overflow-hidden">
      <div className="mx-auto max-w-[1280px] flex flex-col items-center gap-12">
        <p className="text-[14px] text-text-quaternary text-center whitespace-nowrap">
          Remix Public Good Partners
        </p>
        <div className="w-full overflow-hidden">
          <div
            className="flex items-center gap-16"
            style={{
              width: "max-content",
              animation: "marquee-partners linear infinite",
              animationDuration: `${(LOGOS.length * 2 * 180) / 24}s`,
            }}
          >
            {[...LOGOS, ...LOGOS].map((src, i) => (
              <img key={i} src={src} alt="" className="h-8 w-auto shrink-0" />
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
