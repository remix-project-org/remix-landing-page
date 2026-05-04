import type { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import Button from "@/components/ui/Button";
import CommunitySection from "@/components/sections/CommunitySection";

export const metadata: Metadata = {
  title: "Contact — Remix",
  description: "Get in touch with the Remix team. Report bugs, request features, or reach out for collaborations and partnerships.",
};


export default function ContactPage() {
  return (
    <PageLayout>
      {/* Hero — bug reporting */}
      <section className="py-24 px-6 xl:px-20 border-b border-border">
        <div className="mx-auto max-w-[1280px]">
          <p className="text-[11px] font-bold uppercase tracking-widest text-primary font-cabin mb-3">Contact</p>
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
            Contact us
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mb-8 leading-relaxed">
            Please make an issue in our GitHub repo to report a bug or to make a feature request.
            Your feedback is deeply appreciated by the Remix team.
          </p>
          <div className="flex flex-col md:flex-row gap-4">
            <Button href="https://github.com/ethereum/remix-project/issues/new?labels=bug" external size="lg">
              Report a Bug
            </Button>
            <Button href="https://github.com/ethereum/remix-project/issues/new?labels=feature+request" external variant="secondary" size="lg">
              Request a Feature
            </Button>
          </div>
        </div>
      </section>

      {/* How can we help */}
      <section className="py-20 px-6 xl:px-20">
        <div className="mx-auto max-w-[1280px]">
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">How can we help?</h2>
          <p className="text-text-secondary mb-12 max-w-xl">
            If you have other questions, or want to reach out to us about collaborations or partnerships, use the options below.
          </p>

          <div className="bg-layer-1 border border-border rounded-2xl overflow-hidden max-w-2xl">
            <iframe
              src="https://form.typeform.com/to/UEI48MwH"
              width="100%"
              height="520"
              style={{ border: "none" }}
              title="Contact form"
              allow="camera; microphone; autoplay; encrypted-media;"
            />
          </div>
        </div>
      </section>

      <CommunitySection />
    </PageLayout>
  );
}
