"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import content from "@/content/shared/hero.json";

export default function HeroSection() {
  const illuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = illuRef.current;
    if (!el) return;

    let rafId: number;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const progress = Math.min(1, window.scrollY / 900);
        el.style.opacity = String(1 - progress * 0.7);
        el.style.transform = `scale(${1 - progress * 0.12})`;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Text content */}
      <section className="relative z-10 px-6 xl:px-20 pt-28 pb-12">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="w-[800px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-[1280px] flex flex-col items-center text-center gap-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[12px] font-bold font-cabin uppercase tracking-widest">
            {content.eyebrow}
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary leading-tight max-w-4xl">
            {content.titleStart}{" "}
            <span className="text-primary">{content.titleAccent}</span> {content.titleEnd}
          </h1>
          <p className="text-text-secondary text-lg md:text-xl max-w-2xl">
            {content.description}
          </p>
          <div className="flex flex-col md:flex-row gap-4 self-stretch md:self-auto">
            <Button
              href={content.primaryCta.href}
              external
              size="lg"
              className="justify-center md:w-52"
            >
              {content.primaryCta.label}
            </Button>
            <Button
              href={content.secondaryCta.href}
              external
              variant="secondary"
              size="lg"
              className="justify-center md:w-52"
            >
              {content.secondaryCta.label}
            </Button>
          </div>
        </div>
      </section>

      {/* Mobile illustration — static, flows below text */}
      <div className="md:hidden px-6 pb-10">
        <Image
          src="/assets/hero/hero.webp"
          alt="Remix IDE interface"
          width={2556}
          height={1882}
          priority
          sizes="100vw"
          className="w-full h-auto rounded-xl"
        />
      </div>

      {/* Desktop illustration — sticky with parallax */}
      <div className="hidden md:block sticky top-16 -z-10 px-6 xl:px-20">
        <div
          ref={illuRef}
          className="mx-auto max-w-[1280px]"
          style={{ transformOrigin: "top center", willChange: "transform, opacity" }}
        >
          <Image
            src={content.image.src}
            alt={content.image.alt}
            width={content.image.width}
            height={content.image.height}
            priority
            className="w-full h-auto"
          />
        </div>
      </div>
    </>
  );
}
