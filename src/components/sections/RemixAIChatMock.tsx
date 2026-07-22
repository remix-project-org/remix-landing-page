"use client";

import type { CSSProperties } from "react";
import { useLoopAnimation } from "@/hooks/useLoopAnimation";

function RemixAIIcon({ size = 10 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M58.805 3.20852C59.9657 3.10206 60.8956 4.03088 60.7912 5.19188C60.3375 10.2359 58.3389 23.1957 49.6021 32.0002C58.3389 40.8047 60.3375 53.7646 60.7912 58.8085C60.8956 59.9695 59.9657 60.8983 58.805 60.7919C53.7881 60.3317 40.5066 58.3129 31.7793 49.5182C23.0521 58.3129 10.2103 60.3317 5.19343 60.7919C4.0327 60.8983 3.1028 59.9695 3.20723 58.8085C3.66094 53.7646 5.65953 40.8047 14.3964 32.0002C5.65957 23.1957 3.66095 10.2359 3.20723 5.19188C3.1028 4.03088 4.0327 3.10206 5.19343 3.20852C10.2103 3.66865 23.4919 5.68748 32.2191 14.4822C40.9464 5.68746 53.7881 3.66866 58.805 3.20852ZM32.1668 21.3717C31.6435 21.3717 31.1747 21.6987 30.9893 22.1894L28.6768 28.3516L22.5151 30.6635C22.0245 30.849 21.6975 31.3184 21.6975 31.8419C21.6976 32.3652 22.0246 32.834 22.5151 33.0195L28.6768 35.3314L30.9893 41.4936C31.1747 41.9844 31.6434 42.312 32.1668 42.3121C32.6903 42.3121 33.159 41.9844 33.3444 41.4936L35.6569 35.3314L41.8186 33.0195C42.3091 32.8341 42.6361 32.3653 42.6362 31.8419C42.6362 31.3184 42.3093 30.8489 41.8186 30.6635L35.6569 28.3516L33.3444 22.1894C33.1589 21.6987 32.6902 21.3717 32.1668 21.3717Z" fill="currentColor" />
    </svg>
  );
}

const DELAYS = [300, 900, 750, 900, 750, 1100];

export default function RemixAIChatMock() {
  const { step, fading, ref } = useLoopAnimation(DELAYS, 3000);

  const show = (n: number): CSSProperties => ({
    opacity: fading ? 0 : step >= n ? 1 : 0,
    transform: (fading || step >= n) ? "translateY(0px)" : "translateY(10px)",
    transition: fading ? "opacity 0.35s ease" : "opacity 0.4s ease, transform 0.4s ease",
  });

  return (
    <div
      ref={ref}
      role="img"
      aria-label="RemixAI chat showing a contract audit finding a reentrancy vulnerability and optimizing gas"
      className="w-full lg:w-[420px] shrink-0 bg-layer-2 rounded-xl border border-border overflow-hidden lg:order-1"
    >
      {/* Header */}
      <div aria-hidden="true" className="flex items-center justify-between px-4 py-3 bg-layer-1 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-remix-ai/20 border border-remix-ai/30 flex items-center justify-center text-remix-ai">
            <RemixAIIcon size={10} />
          </div>
          <span className="text-[12px] font-bold text-text-primary">RemixAI</span>
        </div>
        <span className="text-[10px] font-bold bg-primary/10 border border-primary/20 text-primary rounded-full px-2 py-0.5">Pro</span>
      </div>

      {/* Messages */}
      <div aria-hidden="true" className="flex flex-col gap-4 p-4">

        {/* User */}
        <div className="flex justify-end" style={show(1)}>
          <div className="bg-primary/10 border border-primary/20 rounded-xl rounded-tr-sm px-3 py-2 max-w-[82%]">
            <p className="text-[12px] text-text-primary">Audit this contract for security issues</p>
          </div>
        </div>

        {/* AI — audit result */}
        <div className="flex gap-2.5" style={show(2)}>
          <div className="w-6 h-6 rounded-lg bg-remix-ai/10 border border-remix-ai/20 flex items-center justify-center shrink-0 mt-0.5 text-remix-ai">
            <RemixAIIcon size={11} />
          </div>
          <div className="bg-layer-1 border border-border rounded-xl rounded-tl-sm px-3 py-2.5 flex flex-col gap-2.5">
            <p className="text-[12px] text-text-secondary">Found 2 issues:</p>
            <div className="flex flex-col gap-2">
              <div className="flex items-start gap-2">
                <span className="text-[10px] font-bold text-red-400 bg-red-400/10 border border-red-400/20 rounded px-1.5 py-0.5 shrink-0 mt-px">HIGH</span>
                <p className="text-[11px] text-text-secondary leading-snug">
                  Reentrancy on <span className="font-mono text-primary">withdraw()</span> — add <span className="font-mono text-primary">nonReentrant</span> modifier
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[10px] font-bold text-yellow-400 bg-yellow-400/10 border border-yellow-400/20 rounded px-1.5 py-0.5 shrink-0 mt-px">MED</span>
                <p className="text-[11px] text-text-secondary leading-snug">
                  Missing access control on <span className="font-mono text-primary">mint()</span> — restrict to <span className="font-mono text-primary">onlyOwner</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* User */}
        <div className="flex justify-end" style={show(3)}>
          <div className="bg-primary/10 border border-primary/20 rounded-xl rounded-tr-sm px-3 py-2 max-w-[82%]">
            <p className="text-[12px] text-text-primary">Fix both and optimize for gas</p>
          </div>
        </div>

        {/* AI — fix result */}
        <div className="flex gap-2.5" style={show(4)}>
          <div className="w-6 h-6 rounded-lg bg-remix-ai/10 border border-remix-ai/20 flex items-center justify-center shrink-0 mt-0.5 text-remix-ai">
            <RemixAIIcon size={11} />
          </div>
          <div className="bg-layer-1 border border-border rounded-xl rounded-tl-sm px-3 py-2.5 flex flex-col gap-2">
            <p className="text-[12px] text-text-secondary">
              Both issues fixed. Gas reduced by{" "}
              <span className="text-primary font-semibold">14%</span> — saved 2,840 gas on{" "}
              <span className="font-mono text-primary">withdraw()</span>.
            </p>
            <div className="bg-layer-2 border border-border rounded-lg px-3 py-2">
              <p className="text-[10px] text-text-quaternary font-mono leading-relaxed">
                {"function withdraw() external"}<br />
                {"  "}<span className="text-primary">{"nonReentrant onlyOwner"}</span> {"{"}
                <br />
                {"  // updated contract ready →"}
              </p>
            </div>
          </div>
        </div>

        {/* User */}
        <div className="flex justify-end" style={show(5)}>
          <div className="bg-primary/10 border border-primary/20 rounded-xl rounded-tr-sm px-3 py-2 max-w-[82%]">
            <p className="text-[12px] text-text-primary">Compile and deploy to Sepolia</p>
          </div>
        </div>

        {/* AI — compile and deploy result */}
        <div className="bg-layer-1 border border-border rounded-xl px-3 py-3 flex flex-col gap-2.5" style={show(6)}>
          <div className="flex items-center gap-1.5 mb-0.5">
            <div className="text-remix-ai"><RemixAIIcon size={9} /></div>
            <span className="text-[10px] font-bold text-remix-ai">RemixAI</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-green-400 bg-green-400/10 border border-green-400/20 rounded px-1.5 py-0.5">✓ Compiled</span>
              <span className="text-[11px] text-text-tertiary">0 errors · 0 warnings</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-primary bg-primary/10 border border-primary/20 rounded px-1.5 py-0.5">✓ Deployed</span>
              <span className="text-[11px] text-text-tertiary font-mono">Sepolia</span>
            </div>
          </div>
          <div className="flex items-center justify-between bg-layer-2 border border-border rounded-lg px-3 py-1.5">
            <span className="text-[10px] text-text-quaternary font-mono">0x742d35Cc6634C0532…8f3a</span>
            <span className="text-[11px] font-semibold text-primary cursor-default">Etherscan →</span>
          </div>
        </div>

      </div>
    </div>
  );
}
