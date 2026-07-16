"use client";

import { useRef } from "react";
import Script from "next/script";

declare global {
  interface Window {
    FormBuilder?: {
      render: (opts: { host: string; formCode: string; container: HTMLElement }) => void;
    };
  }
}

type Props = {
  host: string;
  formCode: string;
};

export default function ContactFormEmbed({ host, formCode }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const renderForm = () => {
    if (!ref.current) return;
    window.FormBuilder?.render({ host, formCode, container: ref.current });
  };

  return (
    <>
      <Script src="/formbuilder-embed.js" strategy="afterInteractive" onReady={renderForm} />
      <div ref={ref} className="max-w-2xl" />
    </>
  );
}
