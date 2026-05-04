import type { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";

export const metadata: Metadata = {
  title: "Terms & Conditions — Remix",
  description: "Terms and conditions for using Remix IDE and remix.ethereum.org.",
};

const SECTIONS = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    content: `By accessing or using Remix IDE ("Remix", "the Service") at remix.ethereum.org or via the Remix Desktop application, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use the Service.

Remix is provided by the Ethereum Foundation as a free, open-source public good. These terms govern your use of the hosted service; the open-source software itself is governed by the MIT License.`,
  },
  {
    id: "use",
    title: "2. Use of the Service",
    content: `Remix is a development environment for writing, testing, and deploying smart contracts. You may use the Service for any lawful purpose.

You agree not to use the Service to:
• Deploy malicious contracts designed to defraud users
• Conduct denial-of-service attacks against Remix infrastructure
• Attempt to gain unauthorized access to Remix systems
• Violate any applicable laws or regulations

We reserve the right to suspend access for users who violate these terms.`,
  },
  {
    id: "intellectual-property",
    title: "3. Intellectual Property",
    content: `The Remix source code is licensed under the MIT License and is available at github.com/ethereum/remix-project. You are free to use, copy, modify, and distribute the software under the terms of the MIT License.

The Remix name, logo, and branding are owned by the Ethereum Foundation. You may not use these in a way that implies endorsement without written permission.`,
  },
  {
    id: "disclaimer",
    title: "4. Disclaimer of Warranties",
    content: `Remix is provided "as is" without warranty of any kind. The Ethereum Foundation makes no warranties, express or implied, including but not limited to:

• Fitness for a particular purpose
• Accuracy or completeness of the Service
• Uninterrupted or error-free operation
• Security of smart contracts compiled or deployed through the Service

Smart contract development carries significant risk. You are solely responsible for the security and correctness of any contracts you deploy.`,
  },
  {
    id: "liability",
    title: "5. Limitation of Liability",
    content: `To the maximum extent permitted by applicable law, the Ethereum Foundation shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of or inability to use the Service.

This includes, without limitation, loss of funds due to smart contract bugs, exploits, or incorrect deployment. Always audit your contracts and use testnets before deploying to mainnet.`,
  },
  {
    id: "privacy",
    title: "6. Privacy",
    content: `Remix IDE runs primarily in your browser. We do not collect personal data from the IDE itself. Workspace files are stored locally in your browser (IndexedDB) or in your connected file system.

If you use RemixAI features, queries may be sent to third-party AI providers. Please review their respective privacy policies.

We use basic analytics (page views, error tracking) on remix.ethereum.org to improve the service. No personally identifiable information is collected.`,
  },
  {
    id: "changes",
    title: "7. Changes to Terms",
    content: `We may update these Terms from time to time. Continued use of the Service after changes are posted constitutes acceptance of the revised terms. Significant changes will be announced via our GitHub repository and community channels.`,
  },
  {
    id: "contact",
    title: "8. Contact",
    content: `For questions about these Terms, please open an issue on GitHub at github.com/ethereum/remix-project or contact the Remix team through our community channels.`,
  },
];

export default function TermsPage() {
  return (
    <PageLayout>
      <section className="py-24 px-6 xl:px-20">
        <div className="mx-auto max-w-[1280px]">
          <div className="max-w-3xl">
            <p className="text-[11px] font-bold uppercase tracking-widest text-primary font-cabin mb-3">Legal</p>
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
              Terms &amp; Conditions
            </h1>
            <p className="text-text-tertiary text-sm mb-16">Last updated: April 2026</p>

            <div className="flex flex-col gap-12">
              {SECTIONS.map((section) => (
                <div key={section.id} id={section.id}>
                  <h2 className="text-xl font-bold text-text-primary mb-4">{section.title}</h2>
                  <div className="text-[14px] text-text-secondary leading-relaxed whitespace-pre-line">
                    {section.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
