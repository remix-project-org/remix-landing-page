"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import content from "@/content/shared/hero.json";

function RemixAIIcon({ size = 10 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M58.805 3.20852C59.9657 3.10206 60.8956 4.03088 60.7912 5.19188C60.3375 10.2359 58.3389 23.1957 49.6021 32.0002C58.3389 40.8047 60.3375 53.7646 60.7912 58.8085C60.8956 59.9695 59.9657 60.8983 58.805 60.7919C53.7881 60.3317 40.5066 58.3129 31.7793 49.5182C23.0521 58.3129 10.2103 60.3317 5.19343 60.7919C4.0327 60.8983 3.1028 59.9695 3.20723 58.8085C3.66094 53.7646 5.65953 40.8047 14.3964 32.0002C5.65957 23.1957 3.66095 10.2359 3.20723 5.19188C3.1028 4.03088 4.0327 3.10206 5.19343 3.20852C10.2103 3.66865 23.4919 5.68748 32.2191 14.4822C40.9464 5.68746 53.7881 3.66866 58.805 3.20852ZM32.1668 21.3717C31.6435 21.3717 31.1747 21.6987 30.9893 22.1894L28.6768 28.3516L22.5151 30.6635C22.0245 30.849 21.6975 31.3184 21.6975 31.8419C21.6976 32.3652 22.0246 32.834 22.5151 33.0195L28.6768 35.3314L30.9893 41.4936C31.1747 41.9844 31.6434 42.312 32.1668 42.3121C32.6903 42.3121 33.159 41.9844 33.3444 41.4936L35.6569 35.3314L41.8186 33.0195C42.3091 32.8341 42.6361 32.3653 42.6362 31.8419C42.6362 31.3184 42.3093 30.8489 41.8186 30.6635L35.6569 28.3516L33.3444 22.1894C33.1589 21.6987 32.6902 21.3717 32.1668 21.3717Z" fill="currentColor" />
    </svg>
  );
}

function MobileChatMock() {
  const DELAYS = [500, 1100, 650, 650, 800];
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
    const t = setTimeout(() => setFading(true), 3500);
    return () => clearTimeout(t);
  }, [step, fading]); // eslint-disable-line react-hooks/exhaustive-deps

  const show = (n: number): React.CSSProperties => ({
    opacity: fading ? 0 : step >= n ? 1 : 0,
    transform: (fading || step >= n) ? 'translateY(0px)' : 'translateY(10px)',
    transition: fading ? 'opacity 0.35s ease' : 'opacity 0.4s ease, transform 0.4s ease',
  });

  const containerShow = (n: number): React.CSSProperties => ({
    opacity: fading ? 0 : step >= n ? 1 : 0,
    transition: fading ? 'opacity 0.35s ease' : 'opacity 0.45s ease',
  });

  return (
    <div className="w-full rounded-xl overflow-hidden border border-white/10" style={{ background: "#1a1c2e" }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5" style={{ background: "#16182a" }}>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md flex items-center justify-center text-remix-ai" style={{ background: "rgba(45,231,243,0.15)", border: "1px solid rgba(45,231,243,0.25)" }}>
            <RemixAIIcon size={13} />
          </div>
          <span className="text-[13px] font-bold text-remix-ai">RemixAI</span>
        </div>
        <span className="text-[10px] font-bold text-primary bg-primary/10 border border-primary/20 rounded-full px-2.5 py-0.5">Pro</span>
      </div>

      {/* Chat */}
      <div className="flex flex-col gap-3 p-4">

        {/* User */}
        <div className="flex justify-end" style={show(1)}>
          <div className="bg-primary/10 border border-primary/20 rounded-xl rounded-tr-sm px-3 py-2 max-w-[88%]">
            <p className="text-[12px] text-white/80 leading-snug">Audit VaultToken.sol for security issues</p>
          </div>
        </div>

        {/* AI response */}
        <div className="flex gap-2.5" style={containerShow(2)}>
          <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 text-remix-ai" style={{ background: "rgba(45,231,243,0.1)", border: "1px solid rgba(45,231,243,0.2)" }}>
            <RemixAIIcon size={10} />
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <p className="text-[12px] text-white/50">Found 2 issues:</p>

            <div className="flex flex-col gap-1.5 rounded-lg p-2.5 border border-red-400/25" style={{ background: "rgba(248,113,113,0.05)", ...show(3) }}>
              <span className="text-[10px] font-bold text-red-400">HIGH</span>
              <p className="text-[11px] text-white/65 leading-snug">
                Reentrancy on <span className="font-mono text-primary">withdraw()</span> — ETH sent before state is updated
              </p>
            </div>

            <div className="flex flex-col gap-1.5 rounded-lg p-2.5 border border-yellow-400/25" style={{ background: "rgba(250,204,21,0.04)", ...show(4) }}>
              <span className="text-[10px] font-bold text-yellow-400">MED</span>
              <p className="text-[11px] text-white/65 leading-snug">
                No <span className="font-mono text-primary">onlyOwner</span> guard on <span className="font-mono text-primary">mint()</span>
              </p>
            </div>

            <div className="bg-primary/10 border border-primary/20 rounded-lg py-1.5 text-[10px] font-bold text-primary text-center cursor-default" style={show(5)}>
              Fix all issues →
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function IDEMock() {
  const kw = "text-[#64c4ff]";   // keywords
  const ty = "text-[#2de7f3]";   // types
  const st = "text-orange-300/80"; // strings
  const cm = "text-white/25";    // comments
  const pu = "text-white/40";    // punctuation
  const id = "text-white/75";    // identifiers
  const nu = "text-yellow-300/70"; // numbers

  const lines: { el: React.ReactNode; highlight?: "red" | "yellow" }[] = [
    { el: <><span className={cm}>{"// SPDX-License-Identifier: MIT"}</span></> },
    { el: <><span className={kw}>pragma</span>{" "}<span className={id}>solidity</span>{" "}<span className={pu}>^</span><span className={nu}>0.8.20</span><span className={pu}>;</span></> },
    { el: null },
    { el: <><span className={kw}>import</span>{" "}<span className={st}>"@openzeppelin/contracts/token/ERC20/ERC20.sol"</span><span className={pu}>;</span></> },
    { el: <><span className={kw}>import</span>{" "}<span className={st}>"@openzeppelin/contracts/access/Ownable.sol"</span><span className={pu}>;</span></> },
    { el: null },
    { el: <><span className={kw}>contract</span>{" "}<span className={ty}>VaultToken</span>{" "}<span className={kw}>is</span>{" "}<span className={ty}>ERC20</span><span className={pu}>,</span>{" "}<span className={ty}>Ownable</span>{" "}<span className={pu}>{"{"}</span></> },
    { el: <>&nbsp;&nbsp;&nbsp;&nbsp;<span className={kw}>mapping</span><span className={pu}>(</span><span className={ty}>address</span>{" "}<span className={pu}>=&gt;</span>{" "}<span className={ty}>uint256</span><span className={pu}>)</span>{" "}<span className={kw}>public</span>{" "}<span className={id}>stakedAmount</span><span className={pu}>;</span></> },
    { el: <>&nbsp;&nbsp;&nbsp;&nbsp;<span className={kw}>mapping</span><span className={pu}>(</span><span className={ty}>address</span>{" "}<span className={pu}>=&gt;</span>{" "}<span className={ty}>uint256</span><span className={pu}>)</span>{" "}<span className={kw}>public</span>{" "}<span className={id}>ethRewards</span><span className={pu}>;</span></> },
    { el: null },
    { el: <>&nbsp;&nbsp;&nbsp;&nbsp;<span className={kw}>constructor</span><span className={pu}>()</span>{" "}<span className={ty}>ERC20</span><span className={pu}>(</span><span className={st}>"Vault Token"</span><span className={pu}>,</span>{" "}<span className={st}>"VLT"</span><span className={pu}>)</span>{" "}<span className={ty}>Ownable</span><span className={pu}>(</span><span className={kw}>msg</span><span className={pu}>.</span><span className={id}>sender</span><span className={pu}>)</span>{" "}<span className={pu}>{"{"}</span></> },
    { el: <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className={id}>_mint</span><span className={pu}>(</span><span className={kw}>msg</span><span className={pu}>.</span><span className={id}>sender</span><span className={pu}>,</span>{" "}<span className={nu}>10_000_000</span>{" "}<span className={pu}>*</span>{" "}<span className={nu}>10</span><span className={pu}>**</span><span className={nu}>18</span><span className={pu}>);</span></> },
    { el: <>&nbsp;&nbsp;&nbsp;&nbsp;<span className={pu}>{"}"}</span></> },
    { el: null },
    { el: <>&nbsp;&nbsp;&nbsp;&nbsp;<span className={kw}>function</span>{" "}<span className={id}>deposit</span><span className={pu}>(</span><span className={ty}>uint256</span>{" "}<span className={id}>amount</span><span className={pu}>)</span>{" "}<span className={kw}>external</span>{" "}<span className={pu}>{"{"}</span></> },
    { el: <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className={id}>require</span><span className={pu}>(</span><span className={id}>amount</span>{" "}<span className={pu}>&gt;</span>{" "}<span className={nu}>0</span><span className={pu}>,</span>{" "}<span className={st}>"Amount must be &gt; 0"</span><span className={pu}>);</span></> },
    { el: <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className={id}>_transfer</span><span className={pu}>(</span><span className={kw}>msg</span><span className={pu}>.</span><span className={id}>sender</span><span className={pu}>,</span>{" "}<span className={kw}>address</span><span className={pu}>(</span><span className={kw}>this</span><span className={pu}>),</span>{" "}<span className={id}>amount</span><span className={pu}>);</span></> },
    { el: <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className={id}>stakedAmount</span><span className={pu}>[</span><span className={kw}>msg</span><span className={pu}>.</span><span className={id}>sender</span><span className={pu}>]</span>{" "}<span className={pu}>+=</span>{" "}<span className={id}>amount</span><span className={pu}>;</span></> },
    { el: <>&nbsp;&nbsp;&nbsp;&nbsp;<span className={pu}>{"}"}</span></> },
    { el: null },
    { el: <>&nbsp;&nbsp;&nbsp;&nbsp;<span className={kw}>function</span>{" "}<span className={id}>withdraw</span><span className={pu}>(</span><span className={ty}>uint256</span>{" "}<span className={id}>amount</span><span className={pu}>)</span>{" "}<span className={kw}>external</span>{" "}<span className={pu}>{"{"}</span></>, highlight: "red" },
    { el: <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className={id}>require</span><span className={pu}>(</span><span className={id}>stakedAmount</span><span className={pu}>[</span><span className={kw}>msg</span><span className={pu}>.</span><span className={id}>sender</span><span className={pu}>]</span>{" "}<span className={pu}>&gt;=</span>{" "}<span className={id}>amount</span><span className={pu}>);</span></>, highlight: "red" },
    { el: <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className={ty}>uint256</span>{" "}<span className={id}>reward</span>{" "}<span className={pu}>=</span>{" "}<span className={id}>ethRewards</span><span className={pu}>[</span><span className={kw}>msg</span><span className={pu}>.</span><span className={id}>sender</span><span className={pu}>];</span></>, highlight: "red" },
    { el: <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className={pu}>(</span><span className={ty}>bool</span>{" "}<span className={id}>ok</span><span className={pu}>, ) =</span>{" "}<span className={kw}>payable</span><span className={pu}>(</span><span className={kw}>msg</span><span className={pu}>.</span><span className={id}>sender</span><span className={pu}>).</span><span className={id}>call</span><span className={pu}>{"{"}</span><span className={id}>value</span><span className={pu}>:</span>{" "}<span className={id}>reward</span><span className={pu}>{"}"}</span><span className={pu}>(</span><span className={st}>{`""`}</span><span className={pu}>);</span></>, highlight: "red" },
    { el: <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className={id}>require</span><span className={pu}>(</span><span className={id}>ok</span><span className={pu}>,</span>{" "}<span className={st}>"ETH send failed"</span><span className={pu}>);</span></>, highlight: "red" },
    { el: <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className={id}>stakedAmount</span><span className={pu}>[</span><span className={kw}>msg</span><span className={pu}>.</span><span className={id}>sender</span><span className={pu}>]</span>{" "}<span className={pu}>-=</span>{" "}<span className={id}>amount</span><span className={pu}>;</span><span className={cm}>{" // ⚠ state updated after call"}</span></>, highlight: "red" },
    { el: <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className={id}>ethRewards</span><span className={pu}>[</span><span className={kw}>msg</span><span className={pu}>.</span><span className={id}>sender</span><span className={pu}>]</span>{" "}<span className={pu}>=</span>{" "}<span className={nu}>0</span><span className={pu}>;</span></>, highlight: "red" },
    { el: <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className={id}>_transfer</span><span className={pu}>(</span><span className={kw}>address</span><span className={pu}>(</span><span className={kw}>this</span><span className={pu}>),</span>{" "}<span className={kw}>msg</span><span className={pu}>.</span><span className={id}>sender</span><span className={pu}>,</span>{" "}<span className={id}>amount</span><span className={pu}>);</span></>, highlight: "red" },
    { el: <>&nbsp;&nbsp;&nbsp;&nbsp;<span className={pu}>{"}"}</span></>, highlight: "red" },
    { el: null },
    { el: <>&nbsp;&nbsp;&nbsp;&nbsp;<span className={kw}>function</span>{" "}<span className={id}>mint</span><span className={pu}>(</span><span className={ty}>uint256</span>{" "}<span className={id}>amount</span><span className={pu}>)</span>{" "}<span className={kw}>external</span>{" "}<span className={pu}>{"{"}</span></>, highlight: "yellow" },
    { el: <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className={id}>_mint</span><span className={pu}>(</span><span className={kw}>msg</span><span className={pu}>.</span><span className={id}>sender</span><span className={pu}>,</span>{" "}<span className={id}>amount</span><span className={pu}>);</span></>, highlight: "yellow" },
    { el: <>&nbsp;&nbsp;&nbsp;&nbsp;<span className={pu}>{"}"}</span></>, highlight: "yellow" },
    { el: <><span className={pu}>{"}"}</span></> },
  ];

  const IDE_DELAYS = [500, 1100, 650, 650, 800];
  const [step, setStep] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (fading) {
      const t = setTimeout(() => { setFading(false); setStep(0); }, 400);
      return () => clearTimeout(t);
    }
    if (step < IDE_DELAYS.length) {
      const t = setTimeout(() => setStep(s => s + 1), IDE_DELAYS[step]);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setFading(true), 3500);
    return () => clearTimeout(t);
  }, [step, fading]); // eslint-disable-line react-hooks/exhaustive-deps

  const show = (n: number): React.CSSProperties => ({
    opacity: fading ? 0 : step >= n ? 1 : 0,
    transform: (fading || step >= n) ? 'translateY(0px)' : 'translateY(10px)',
    transition: fading ? 'opacity 0.35s ease' : 'opacity 0.4s ease, transform 0.4s ease',
  });

  const containerShow = (n: number): React.CSSProperties => ({
    opacity: fading ? 0 : step >= n ? 1 : 0,
    transition: fading ? 'opacity 0.35s ease' : 'opacity 0.45s ease',
  });

  return (
    <div
      role="img"
      aria-label="Remix IDE showing RemixAI auditing a VaultToken Solidity contract and finding a reentrancy vulnerability and missing access control"
      className="w-full rounded-xl overflow-hidden border border-white/10 shadow-2xl"
      style={{ background: "#1e2130" }}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-3 px-4 py-2.5 border-b border-white/5" style={{ background: "#16182a" }}>
        <div className="flex gap-1.5 shrink-0">
          <div className="w-3 h-3 rounded-full bg-red-500/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <div className="w-3 h-3 rounded-full bg-green-500/60" />
        </div>
        <div className="flex-1 flex items-center gap-2 rounded-md px-3 py-1.5 mx-10 border border-white/5" style={{ background: "#0d0f1a" }}>
          <div className="w-1.5 h-1.5 rounded-full bg-green-400/60 shrink-0" />
          <span className="text-[11px] text-white/30 font-mono">remix.ethereum.org</span>
        </div>
      </div>

      {/* IDE body */}
      <div className="flex h-[600px]" aria-hidden="true">

        {/* Activity bar */}
        <div className="w-12 shrink-0 hidden lg:flex flex-col items-center py-4 gap-4 border-r border-white/5" style={{ background: "#16182a" }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-primary/10 border border-primary/20">
            <div className="flex flex-col gap-[3px]">
              <div className="h-[2px] w-4 bg-primary/70 rounded-full" />
              <div className="h-[2px] w-4 bg-primary/70 rounded-full" />
              <div className="h-[2px] w-3 bg-primary/70 rounded-full" />
            </div>
          </div>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center opacity-25">
            <div className="w-4 h-4 rounded border border-white/40" />
          </div>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center opacity-25">
            <div className="w-3.5 h-3.5 rounded-full border border-white/40" />
          </div>
          <div className="mt-auto w-8 h-8 rounded-lg flex items-center justify-center text-remix-ai">
            <RemixAIIcon size={20} />
          </div>
        </div>

        {/* File explorer */}
        <div className="w-44 shrink-0 hidden md:flex flex-col border-r border-white/5" style={{ background: "#1a1c2e" }}>
          <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-white/30 border-b border-white/5 font-sans">
            File Explorer
          </div>
          <div className="flex flex-col p-2 text-[11px] font-mono gap-0.5">
            <div className="flex items-center gap-1.5 px-2 py-0.5 text-white/40">
              <span className="text-[9px]">▾</span><span>contracts</span>
            </div>
            <div className="flex items-center gap-2 px-2 py-1 rounded-md ml-3 text-white" style={{ background: "#1e2130" }}>
              <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
              VaultToken.sol
            </div>
            <div className="flex items-center gap-2 px-2 py-0.5 ml-3 text-white/30">
              <div className="w-1.5 h-1.5 rounded-full bg-white/20 shrink-0" />
              ERC20Token.sol
            </div>
            <div className="flex items-center gap-1.5 px-2 py-0.5 mt-1 text-white/40">
              <span className="text-[9px]">▸</span><span>scripts</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-0.5 text-white/40">
              <span className="text-[9px]">▸</span><span>tests</span>
            </div>
          </div>
        </div>

        {/* Code editor */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Tabs */}
          <div className="flex items-center border-b border-white/5 text-[11px] font-mono shrink-0" style={{ background: "#1a1c2e" }}>
            <div className="flex items-center gap-2 px-4 py-2 border-b-2 border-primary" style={{ background: "#1e2130", color: "#64c4ff" }}>
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              VaultToken.sol
            </div>
            <div className="px-4 py-2 text-white/30">ERC20Token.sol</div>
          </div>

          {/* Code content */}
          <div className="flex flex-1 overflow-hidden text-[11px] leading-[18px] font-mono select-none">
            {/* Line numbers */}
            <div className="flex flex-col items-end px-3 pt-3 shrink-0 text-[10px] leading-[18px] text-white/20 border-r border-white/5" style={{ background: "#1a1c2e" }}>
              {lines.map((line, i) => {
                const lit = !fading && step >= 2;
                return (
                  <div
                    key={i}
                    className="w-6 text-right"
                    style={{
                      minHeight: "18px",
                      color: line.highlight
                        ? (lit
                            ? (line.highlight === "red" ? "rgba(248,113,113,0.5)" : "rgba(250,204,21,0.5)")
                            : "rgba(255,255,255,0.2)")
                        : "rgba(255,255,255,0.2)",
                      transition: line.highlight
                        ? (fading ? "color 0.35s ease" : "color 0.6s ease")
                        : undefined,
                    }}
                  >
                    {i + 1}
                  </div>
                );
              })}
            </div>

            {/* Code lines */}
            <div className="flex-1 pt-3 overflow-hidden">
              {lines.map((line, i) => {
                const lit = !fading && step >= 2;
                return (
                  <div
                    key={i}
                    className={line.highlight ? "px-3" : "px-4"}
                    style={{
                      minHeight: "18px",
                      background: line.highlight
                        ? (lit
                            ? (line.highlight === "red" ? "rgba(248,113,113,0.06)" : "rgba(250,204,21,0.05)")
                            : "transparent")
                        : undefined,
                      borderLeft: line.highlight
                        ? `2px solid ${lit
                            ? (line.highlight === "red" ? "rgba(248,113,113,0.4)" : "rgba(250,204,21,0.35)")
                            : "transparent"}`
                        : undefined,
                      transition: line.highlight
                        ? (fading ? "background 0.35s ease, border-color 0.35s ease" : "background 0.6s ease, border-color 0.6s ease")
                        : undefined,
                    }}
                  >
                    {line.el ?? <>&nbsp;</>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RemixAI panel */}
        <div className="w-64 shrink-0 hidden sm:flex flex-col border-l border-white/5" style={{ background: "#1a1c2e" }}>
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5 shrink-0">
            <div className="flex items-center gap-2">
              <div className="text-remix-ai"><RemixAIIcon size={15} /></div>
              <span className="text-[12px] font-bold text-remix-ai font-sans">RemixAI</span>
            </div>
            <span className="text-[10px] font-bold text-primary bg-primary/10 border border-primary/20 rounded-full px-2 py-0.5 font-sans">Pro</span>
          </div>

          {/* Chat */}
          <div className="flex flex-col gap-3 p-3.5 font-sans">
            <div className="flex justify-end" style={show(1)}>
              <div className="bg-primary/10 border border-primary/20 rounded-xl rounded-tr-sm px-3 py-2 text-[11px] text-white/80 max-w-[88%] leading-snug">
                Audit VaultToken.sol for security issues
              </div>
            </div>

            <div className="flex gap-2" style={containerShow(2)}>
              <div className="w-5 h-5 rounded-md bg-remix-ai/20 border border-remix-ai/30 flex items-center justify-center text-remix-ai shrink-0 mt-0.5">
                <RemixAIIcon size={9} />
              </div>
              <div className="flex flex-col gap-2.5 min-w-0">
                <p className="text-[11px] text-white/50">Found 2 issues:</p>

                <div className="flex flex-col gap-1.5 rounded-lg p-2.5 border border-red-400/25" style={{ background: "rgba(248,113,113,0.05)", ...show(3) }}>
                  <span className="text-[10px] font-bold text-red-400">HIGH</span>
                  <p className="text-[11px] text-white/65 leading-snug">
                    Reentrancy on <span className="text-primary font-mono">withdraw()</span> — ETH sent before state is updated
                  </p>
                </div>

                <div className="flex flex-col gap-1.5 rounded-lg p-2.5 border border-yellow-400/25" style={{ background: "rgba(250,204,21,0.04)", ...show(4) }}>
                  <span className="text-[10px] font-bold text-yellow-400">MED</span>
                  <p className="text-[11px] text-white/65 leading-snug">
                    No <span className="text-primary font-mono">onlyOwner</span> guard on <span className="text-primary font-mono">mint()</span>
                  </p>
                </div>

                <div className="bg-primary/10 border border-primary/20 rounded-lg py-1.5 text-[10px] font-bold text-primary text-center cursor-default" style={show(5)}>
                  Fix all issues →
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between px-4 py-1 border-t border-white/5 font-sans text-[10px]" style={{ background: "#16182a" }}>
        <div className="flex items-center gap-4 text-white/25">
          <span>Solidity 0.8.20</span>
          <span>VaultToken.sol</span>
          <span>Ln 21, Col 1</span>
        </div>
        <div className="flex items-center gap-1.5 text-remix-ai">
          <RemixAIIcon size={8} />
          <span>AI copilot active</span>
        </div>
      </div>
    </div>
  );
}

export default function HeroSection() {
  const illuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = illuRef.current;
    if (!el) return;

    let rafId: number;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const progress = Math.min(1, window.scrollY / 900);
        el.style.opacity = String(1 - progress * 0.7);
        el.style.transform = `scale(${1 - progress * 0.12})`;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Text content */}
      <section className="relative z-10 px-6 xl:px-20 pt-28 pb-12">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="w-[800px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-[1280px] flex flex-col items-center text-center gap-8">
          {content.announcement ? (
            <Link
              href={content.announcement.href}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-bold font-cabin uppercase tracking-widest hover:bg-primary/15 transition-colors"
            >
              {content.announcement.label}
              <FontAwesomeIcon icon={faArrowRight} className="w-2.5 h-2.5" />
            </Link>
          ) : (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-bold font-cabin uppercase tracking-widest">
              {content.eyebrow}
            </div>
          )}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-text-primary leading-none max-w-4xl">
            {content.titleStart}{" "}
            <span className="text-primary">{content.titleAccent}</span> {content.titleEnd}
          </h1>
          <p className="text-text-secondary text-lg md:text-xl max-w-2xl">
            {content.description}
          </p>
          <div className="flex flex-col md:flex-row gap-4 self-stretch md:self-auto">
            <Button
              href={content.primaryCta.href}
              external={content.primaryCta.external}
              size="lg"
              className="justify-center md:w-52"
            >
              {content.primaryCta.label}
            </Button>
            <Button
              href={content.secondaryCta.href}
              external={content.secondaryCta.external}
              variant="secondary"
              size="lg"
              className="justify-center md:w-52"
            >
              {content.secondaryCta.label}
            </Button>
          </div>
        </div>
      </section>

      {/* Mobile illustration — simplified chat panel */}
      <div className="md:hidden px-6 pb-10">
        <MobileChatMock />
      </div>

      {/* Desktop illustration — sticky with parallax */}
      <div className="hidden md:block sticky top-16 -z-10 px-6 xl:px-20">
        <div
          ref={illuRef}
          className="mx-auto max-w-[1280px]"
          style={{ transformOrigin: "top center", willChange: "transform, opacity" }}
        >
          <IDEMock />
        </div>
      </div>
    </>
  );
}
