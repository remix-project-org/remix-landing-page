import type { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import CommunitySection from "@/components/sections/CommunitySection";
import PricingContent from "./PricingContent";
import content from "@/content/pricing.json";

export const metadata: Metadata = {
  ...content.metadata,
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <PageLayout>
      <PricingContent />
      <CommunitySection />
    </PageLayout>
  );
}
