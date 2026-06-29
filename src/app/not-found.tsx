import Link from "next/link";
import Button from "@/components/ui/Button";

function NotFoundIllustration() {
  return (
    <div
      role="img"
      aria-label="Solidity contract reverting with error code 404"
      className="w-full max-w-[440px]"
    >
      <div aria-hidden="true" className="bg-layer-1 rounded-2xl border border-border overflow-hidden shadow-xl">

        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-layer-2 border-b border-border">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
          </div>
          <span className="ml-1 text-[11px] text-text-tertiary font-mono">NotFound.sol</span>
        </div>

        {/* Code */}
        <pre className="px-5 py-5 text-[11.5px] leading-[1.85] font-mono overflow-hidden select-none">
          <span className="text-text-quaternary">{"// SPDX-License-Identifier: MIT\n"}</span>
          <span className="text-primary">{"pragma solidity"}</span>
          <span className="text-text-secondary">{" ^0.8.20;\n\n"}</span>
          <span className="text-primary">{"error"}</span>
          <span className="text-remix-ai">{" PageNotFound"}</span>
          <span className="text-text-secondary">{"("}</span>
          <span className="text-primary">{"uint256"}</span>
          <span className="text-text-secondary">{" code);\n\n"}</span>
          <span className="text-primary">{"contract"}</span>
          <span className="text-remix-ai">{" NotFound"}</span>
          <span className="text-text-secondary">{" {\n"}</span>
          <span className="text-text-secondary">{"  "}</span>
          <span className="text-primary">{"constructor"}</span>
          <span className="text-text-secondary">{"() {\n"}</span>
          <span className="block -mx-5 px-5 bg-red-500/10 border-l-2 border-red-400/70">
            <span className="text-text-secondary">{"    "}</span>
            <span className="text-primary">{"revert"}</span>
            <span className="text-remix-ai">{" PageNotFound"}</span>
            <span className="text-text-secondary">{"("}</span>
            <span className="text-yellow-400">{"404"}</span>
            <span className="text-text-secondary">{");"}</span>
            {"\n"}
          </span>
          <span className="text-text-secondary">{"  }\n}"}</span>
        </pre>

        {/* Terminal panel */}
        <div className="border-t border-border bg-[#1a1b2e]">
          <div className="flex items-center gap-2 px-4 py-1.5 border-b border-border/50">
            <span className="text-[9px] font-bold uppercase tracking-widest text-text-quaternary">Terminal</span>
          </div>
          <div className="px-4 py-3 font-mono text-[11px] leading-[1.8]">
            <p className="text-text-quaternary">{">"} remix.compile(<span className="text-yellow-400">&quot;NotFound.sol&quot;</span>)</p>
            <p className="text-red-400 font-semibold">TransactionExecutionError: Revert</p>
            <p className="text-text-tertiary">{"  ↳ "}<span className="text-remix-ai">PageNotFound</span>(<span className="text-yellow-400">404</span>)</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center px-6 xl:px-20">
      <div className="mx-auto w-full max-w-[1280px] flex flex-col lg:flex-row items-center justify-center gap-16 py-20">

        {/* Text + CTAs */}
        <div className="w-full max-w-md flex flex-col items-center lg:items-start text-center lg:text-left">
          <p className="text-[11px] font-bold uppercase tracking-widest text-primary font-cabin mb-3">
            404
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Page not found
          </h1>
          <p className="text-text-secondary text-lg mb-10">
            This contract reverted. The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-8 w-full sm:w-auto">
            <Button href="/" size="lg">
              Back to home
            </Button>
            <Button href="https://remix.ethereum.org" external variant="secondary" size="lg">
              Open Remix IDE
            </Button>
          </div>
          <Link
            href="/features"
            className="text-[13px] text-text-quaternary hover:text-text-secondary transition-colors"
          >
            Browse features →
          </Link>
        </div>

        {/* Illustration */}
        <NotFoundIllustration />

      </div>
    </div>
  );
}
