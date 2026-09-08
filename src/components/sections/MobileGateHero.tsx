import Button from "@/components/ui/Button";
import rawContent from "@/content/mobile.json";
import { resolveContent } from "@/lib/urls";

const content = resolveContent(rawContent);

export default function MobileGateHero() {
  return (
    <section className="relative z-10 px-6 pt-16 pb-20">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="w-[600px] h-[500px] rounded-full bg-primary/5 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-xl flex flex-col items-center text-center gap-8">
        <h1 className="text-4xl font-bold text-text-primary leading-tight">
          {content.titleStart}
          <span className="text-primary">{content.titleAccent}</span>
        </h1>
        <p className="text-text-secondary text-base">
          {content.description}
        </p>
        <div className="flex flex-col gap-4 self-stretch">
          <Button href={content.primaryCta.href} size="lg" className="justify-center">
            {content.primaryCta.label}
          </Button>
          <Button
            href={content.secondaryCta.href}
            external={content.secondaryCta.external}
            variant="secondary"
            size="lg"
            className="justify-center"
          >
            {content.secondaryCta.label}
          </Button>
          <Button
            href={content.tertiaryCta.href}
            external={content.tertiaryCta.external}
            variant="tertiary"
            size="lg"
            className="justify-center"
          >
            {content.tertiaryCta.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
