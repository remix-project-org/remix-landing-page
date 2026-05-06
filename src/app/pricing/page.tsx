import type { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import CommunitySection from "@/components/sections/CommunitySection";
import PricingContent from "./PricingContent";

export const metadata: Metadata = {
  title: "Pricing — Remix",
  description: "Simple, transparent pricing. Start free. Scale as you build. No surprises.",
};

export default function PricingPage() {
  return (
    <PageLayout>
      <PricingContent />
      <CommunitySection />
    </PageLayout>
  );
}
