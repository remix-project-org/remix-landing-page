import type { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import MobileGateHero from "@/components/sections/MobileGateHero";
import CommunitySection from "@/components/sections/CommunitySection";

export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default function MobilePage() {
  return (
    <PageLayout>
      <MobileGateHero />
      <CommunitySection />
    </PageLayout>
  );
}
