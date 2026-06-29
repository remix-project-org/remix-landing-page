"use client";

import Button from "@/components/ui/Button";

function ErrorIllustration() {
  return (
    <div
      role="img"
      aria-label="Terminal showing a failed transaction with an execution error"
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
          <span className="ml-1 text-[11px] text-text-tertiary font-mono">Terminal</span>
        </div>

        {/* Terminal output */}
        <div className="px-5 py-5 font-mono text-[11.5px] leading-[1.85] space-y-0.5">
          <p className="text-text-quaternary">{"> remix.deploy()"}</p>
          <p className="text-text-tertiary">Compiling contracts…</p>
          <p className="text-text-tertiary">Broadcasting transaction…</p>
          <p>&nbsp;</p>
          {/* Error block */}
          <div className="-mx-5 px-5 py-2 bg-red-500/10 border-l-2 border-red-400/70 space-y-0.5">
            <p className="text-red-400 font-semibold">ExecutionReverted: Internal error</p>
            <p className="text-text-tertiary">{"  ↳ "}<span className="text-remix-ai">Status</span>{": 500"}</p>
            <p className="text-text-tertiary">{"  ↳ "}<span className="text-text-secondary">Something went wrong on our end.</span></p>
          </div>
          <p>&nbsp;</p>
          <p className="text-text-quaternary">{"// Our engineers have been notified."}</p>
          <p className="text-text-quaternary">{"// Try calling the function again."}</p>
        </div>

      </div>
    </div>
  );
}

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-background flex items-center px-6 xl:px-20">
      <div className="mx-auto w-full max-w-[1280px] flex flex-col lg:flex-row items-center justify-center gap-16 py-20">

        {/* Text + CTAs */}
        <div className="w-full max-w-md flex flex-col items-center lg:items-start text-center lg:text-left">
          <p className="text-[11px] font-bold uppercase tracking-widest text-red-400 font-cabin mb-3">
            500
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Something went wrong
          </h1>
          <p className="text-text-secondary text-lg mb-10">
            An unexpected error occurred. Our team has been notified — try again or head back home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-8 w-full sm:w-auto">
            <button
              onClick={reset}
              className="inline-flex items-center justify-center px-6 h-11 rounded-lg bg-primary text-background font-bold text-[14px] hover:bg-primary/80 transition-colors"
            >
              Try again
            </button>
            <Button href="/" variant="secondary" size="lg">
              Back to home
            </Button>
          </div>
        </div>

        {/* Illustration */}
        <ErrorIllustration />

      </div>
    </div>
  );
}
