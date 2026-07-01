"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

function RemixAIIcon({ size = 10 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M58.805 3.20852C59.9657 3.10206 60.8956 4.03088 60.7912 5.19188C60.3375 10.2359 58.3389 23.1957 49.6021 32.0002C58.3389 40.8047 60.3375 53.7646 60.7912 58.8085C60.8956 59.9695 59.9657 60.8983 58.805 60.7919C53.7881 60.3317 40.5066 58.3129 31.7793 49.5182C23.0521 58.3129 10.2103 60.3317 5.19343 60.7919C4.0327 60.8983 3.1028 59.9695 3.20723 58.8085C3.66094 53.7646 5.65953 40.8047 14.3964 32.0002C5.65957 23.1957 3.66095 10.2359 3.20723 5.19188C3.1028 4.03088 4.0327 3.10206 5.19343 3.20852C10.2103 3.66865 23.4919 5.68748 32.2191 14.4822C40.9464 5.68746 53.7881 3.66866 58.805 3.20852ZM32.1668 21.3717C31.6435 21.3717 31.1747 21.6987 30.9893 22.1894L28.6768 28.3516L22.5151 30.6635C22.0245 30.849 21.6975 31.3184 21.6975 31.8419C21.6976 32.3652 22.0246 32.834 22.5151 33.0195L28.6768 35.3314L30.9893 41.4936C31.1747 41.9844 31.6434 42.312 32.1668 42.3121C32.6903 42.3121 33.159 41.9844 33.3444 41.4936L35.6569 35.3314L41.8186 33.0195C42.3091 32.8341 42.6361 32.3653 42.6362 31.8419C42.6362 31.3184 42.3093 30.8489 41.8186 30.6635L35.6569 28.3516L33.3444 22.1894C33.1589 21.6987 32.6902 21.3717 32.1668 21.3717Z" fill="currentColor" />
    </svg>
  );
}

export default function QuickDAppMock() {
  const DELAYS = [600, 500, 700, 300, 800, 200, 150, 150, 200, 150, 150, 200, 400];
  const [step, setStep] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (fading) {
      const t = setTimeout(() => { setFading(false); setStep(0); }, 400);
      return () => clearTimeout(t);
    }
    if (step < DELAYS.length) {
      const t = setTimeout(() => setStep(s => s + 1), DELAYS[step]);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setFading(true), 3000);
    return () => clearTimeout(t);
  }, [step, fading]); // eslint-disable-line react-hooks/exhaustive-deps

  const show = (n: number): CSSProperties => ({
    opacity: fading ? 0 : step >= n ? 1 : 0,
    transform: (fading || step >= n) ? "translateY(0px)" : "translateY(10px)",
    transition: fading ? "opacity 0.35s ease" : "opacity 0.4s ease, transform 0.4s ease",
  });

  return (
    <div
      role="img"
      aria-label="QuickDApp: a text prompt generates a live token swap dApp deployed to IPFS at myswap.remix.eth"
      className="flex-1 bg-layer-1 rounded-2xl border border-border overflow-hidden"
    >
      {/* Title bar */}
      <div aria-hidden="true" className="flex items-center gap-3 px-4 py-3 bg-layer-2 border-b border-border">
        <div className="flex gap-1.5 shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
        </div>
        <span className="text-[11px] text-text-tertiary font-mono flex-1 ml-1">QuickDApp</span>
      </div>

      <div aria-hidden="true" className="flex flex-col">

        {/* ── Prompt input ── */}
        <div className="p-4 flex flex-col gap-3">
          <div className="flex items-center gap-2" style={show(1)}>
            <div className="w-5 h-5 rounded-md bg-remix-ai/20 border border-remix-ai/30 flex items-center justify-center text-remix-ai shrink-0">
              <RemixAIIcon size={10} />
            </div>
            <span className="text-[11px] font-bold text-remix-ai">RemixAI</span>
            <span className="text-[10px] text-text-quaternary">· What do you want to build?</span>
          </div>
          <div className="bg-layer-2 border border-border rounded-xl px-3 py-2.5" style={show(2)}>
            <p className="text-[12px] text-text-primary leading-relaxed">
              Create a token swap interface for{" "}
              <span className="text-primary font-semibold">ETH</span>
              {" "}and{" "}
              <span className="text-primary font-semibold">USDC</span>
              , connected to my Uniswap V3 contract
            </p>
          </div>
          <div className="flex items-center justify-between gap-2" style={show(3)}>
            <span className="text-[10px] text-text-tertiary border border-border rounded-md px-2.5 py-1 cursor-default">
              + Attach contract
            </span>
            <span className="text-[10px] font-bold text-background bg-primary rounded-md px-3 py-1 cursor-default">
              Generate →
            </span>
          </div>
        </div>

        {/* ── Status bar — single-height row, switches from generating to success ── */}
        <div
          className={`flex items-center gap-2.5 px-4 py-2 border-y ${step >= 5 ? "bg-green-400/5 border-green-400/15" : "bg-primary/5 border-primary/15"}`}
          style={show(4)}
        >
          {step < 5 ? (
            <>
              <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 animate-pulse" />
              <span className="text-[10px] font-bold text-primary">Generating…</span>
              <div className="flex-1 h-1 rounded-full bg-primary/10 overflow-hidden ml-2">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: step >= 4 ? "100%" : "0%" , transition: "width 0.8s ease" }}
                />
              </div>
            </>
          ) : (
            <>
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
              <span className="text-[10px] font-bold text-green-400">Generated in 3s</span>
            </>
          )}
        </div>

        {/* ── Generated dApp preview: file explorer | dApp UI ── */}
        <div className="flex min-h-0" style={show(6)}>

          {/* Left — file explorer */}
          <div className="w-36 shrink-0 border-r border-border p-2.5 flex flex-col gap-0.5 font-mono text-[10px] select-none">

            <div className="flex items-center gap-1.5 py-0.5 text-text-tertiary" style={show(6)}>
              <span className="text-[8px]">▾</span>
              <span>src</span>
            </div>

            <div className="flex items-center gap-1.5 py-0.5 pl-3 rounded bg-primary/8 text-text-primary" style={show(7)}>
              <span className="text-remix-ai font-bold">tsx</span>
              <span>App.tsx</span>
            </div>

            <div className="flex items-center gap-1.5 py-0.5 pl-3 text-text-tertiary" style={show(8)}>
              <span className="text-[8px]">▾</span>
              <span>components</span>
            </div>

            <div className="flex items-center gap-1.5 py-0.5 pl-5 text-text-quaternary" style={show(9)}>
              <span className="text-remix-ai/60">tsx</span>
              <span>Transfer.tsx</span>
            </div>

            <div className="flex items-center gap-1.5 py-0.5 pl-5 text-text-quaternary" style={show(10)}>
              <span className="text-remix-ai/60">tsx</span>
              <span>Approve.tsx</span>
            </div>

            <div className="my-1 border-t border-border/40" style={show(11)} />

            <div className="flex items-center gap-1.5 py-0.5 text-text-quaternary" style={show(11)}>
              <span className="text-yellow-400/60">json</span>
              <span>package.json</span>
            </div>

            <div className="flex items-center gap-1.5 py-0.5 text-text-quaternary" style={show(12)}>
              <span className="text-purple-400/60">ts</span>
              <span>vite.config.ts</span>
            </div>

          </div>

          {/* Right — bespoke dApp UI (light, independent brand) */}
          <div className="flex-1 p-3 flex flex-col gap-2 bg-white" style={show(13)}>

            {/* URL + IPFS tag */}
            <div className="flex items-center gap-2 bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1.5">
              <div className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
              <span className="text-[10px] text-slate-500 font-mono flex-1">myswap.remix.eth</span>
              <span className="text-[9px] font-bold text-slate-400 bg-white border border-slate-200 rounded px-1.5 py-0.5">IPFS</span>
            </div>

            <p className="text-[11px] font-bold text-slate-800">Token Swap</p>

            <div className="flex items-center justify-between bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1.5">
              <div className="flex items-center gap-1.5">
                <div className="w-3.5 h-3.5 rounded-full bg-blue-400/50 border border-blue-400/70 shrink-0" />
                <span className="text-[11px] font-bold text-slate-800">ETH</span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">1.0</span>
            </div>

            <div className="flex justify-center text-slate-300 text-[12px]">⇅</div>

            <div className="flex items-center justify-between bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1.5">
              <div className="flex items-center gap-1.5">
                <div className="w-3.5 h-3.5 rounded-full bg-blue-500/40 border border-blue-500/60 shrink-0" />
                <span className="text-[11px] font-bold text-slate-800">USDC</span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">2,480</span>
            </div>

            <div className="w-full bg-violet-600 text-white text-[10px] font-bold rounded-lg py-2 text-center cursor-default">
              Swap Tokens
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
