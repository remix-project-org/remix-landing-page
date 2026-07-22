import type { Metadata } from "next";
import { Nunito_Sans, Cabin } from "next/font/google";
import Script from "next/script";
import { config } from "@fortawesome/fontawesome-svg-core";
import RouteChangeTracker from "@/components/RouteChangeTracker";
import "./globals.css";

// Inline FA SVG styles instead of importing the full CSS file (eliminates render-blocking chunk).
config.autoAddCss = false;

const FA_SVG_CSS = `.svg-inline--fa{box-sizing:content-box;display:var(--fa-display,inline-block);height:1em;overflow:visible;vertical-align:-0.125em;width:var(--fa-width,1.25em)}.svg-inline--fa.fa-2xs{vertical-align:.1em}.svg-inline--fa.fa-xs{vertical-align:0em}.svg-inline--fa.fa-sm{vertical-align:-0.0714285714em}.svg-inline--fa.fa-lg{vertical-align:-0.2em}.svg-inline--fa.fa-xl{vertical-align:-0.25em}.svg-inline--fa.fa-2xl{vertical-align:-0.3125em}.fa-layers{display:inline-block;height:1em;position:relative;text-align:center;vertical-align:-0.125em;width:var(--fa-width,1.25em)}.fa-layers .svg-inline--fa{inset:0;margin:auto;position:absolute;transform-origin:center center}.fa-fw{text-align:center;width:1.25em}.fa-sr-only,.fa-sr-only-focusable:not(:focus){border:0;clip:rect(0,0,0,0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;white-space:nowrap;width:1px}`;

const nunitoSans = Nunito_Sans({
  subsets: ["latin", "latin-ext"],
  axes: ["wdth", "YTLC"],
  weight: "variable",
  variable: "--font-nunito-sans",
  display: "optional",
});

const cabin = Cabin({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cabin",
  display: "optional",
});

export const metadata: Metadata = {
  title: {
    default: "Remix – The Web3 IDE",
    template: "%s — Remix",
  },
  description:
    "Remix is the open-source Web3 IDE to build, test, and deploy smart contracts in your browser. Learn, prototype, and launch blockchain projects with ease.",
  metadataBase: new URL("https://remix.live"),
  openGraph: {
    title: "Remix – The Web3 IDE",
    description:
      "Remix is the open-source Web3 IDE to build, test, and deploy smart contracts in your browser. Learn, prototype, and launch blockchain projects with ease.",
    url: "https://remix.live",
    siteName: "Remix IDE",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/assets/og/og-global.webp",
        width: 1200,
        height: 630,
        alt: "Remix – The Web3 IDE",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Remix – The Web3 IDE",
    description: "Build, test, and deploy smart contracts in your browser with Remix.",
    site: "@EthereumRemix",
    images: ["/assets/og/og-global.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${nunitoSans.variable} ${cabin.variable}`}>
      <head>
        <style dangerouslySetInnerHTML={{ __html: FA_SVG_CSS }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "Remix",
                url: "https://remix.live",
                logo: "https://remix.live/android-chrome-512x512.png",
                sameAs: [
                  "https://twitter.com/EthereumRemix",
                  "https://github.com/ethereum/remix-project",
                ],
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "Remix IDE",
                url: "https://remix.live",
                potentialAction: {
                  "@type": "SearchAction",
                  target: "https://remix.live/?q={search_term_string}",
                  "query-input": "required name=search_term_string",
                },
              },
            ]),
          }}
        />
      </head>
      <body>
        <RouteChangeTracker />
        {children}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="lazyOnload"
        />
        <Script id="ga-init" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
              'storage': 'none',
              'anonymize_ip': true
            });
          `}
        </Script>
      </body>
    </html>
  );
}
