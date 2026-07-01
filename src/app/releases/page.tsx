import type { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import CommunitySection from "@/components/sections/CommunitySection";
import DesktopCTA from "@/components/sections/DesktopCTA";
import GitHubWebReleases from "@/components/sections/GitHubWebReleases";
import content from "@/content/releases.json";

export const metadata: Metadata = {
  ...content.metadata,
  alternates: { canonical: "/releases" },
};

export default function ReleasesPage() {
  return (
    <PageLayout>
      <GitHubWebReleases />
      <DesktopCTA />
      <CommunitySection />
    </PageLayout>
  );
}
