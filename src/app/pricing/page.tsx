import type { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import CommunitySection from "@/components/sections/CommunitySection";
import PricingContent from "./PricingContent";
import rawContent from "@/content/pricing.json";
import { resolveContent } from "@/lib/urls";

const content = resolveContent(rawContent);

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
