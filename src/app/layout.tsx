import type { Metadata } from "next";
import { Nunito_Sans, Cabin } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const nunitoSans = Nunito_Sans({
  subsets: ["latin", "latin-ext"],
  axes: ["wdth", "YTLC"],
  weight: "variable",
  variable: "--font-nunito-sans",
  display: "swap",
});

const cabin = Cabin({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cabin",
  display: "swap",
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
        url: "/assets/og/og-global.png",
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
    images: ["/assets/og/og-global.png"],
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
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NRTQT7S2');`}
        </Script>
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NRTQT7S2"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
