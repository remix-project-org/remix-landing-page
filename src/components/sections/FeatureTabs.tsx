"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import {
  faRobot, faDesktop, faShield, faLock, faPlay, faBug, faCode,
  faCodeBranch, faGears, faServer, faGlobe, faTerminal, faGauge,
  faMagnifyingGlass, faVial, faLayerGroup, faArrowsRotate, faLink,
  faWandMagicSparkles, faHashtag, faUserGear, faCircleCheck,
  faMagnifyingGlassChart,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import featuresContent from "@/content/features.json";

const ICONS: Record<string, IconDefinition> = {
  robot: faRobot,
  desktop: faDesktop,
  shield: faShield,
  lock: faLock,
  play: faPlay,
  bug: faBug,
  code: faCode,
  codeBranch: faCodeBranch,
  gears: faGears,
  server: faServer,
  globe: faGlobe,
  terminal: faTerminal,
  gauge: faGauge,
  magnifyingGlass: faMagnifyingGlass,
  vial: faVial,
  layerGroup: faLayerGroup,
  arrowsRotate: faArrowsRotate,
  link: faLink,
  wandMagicSparkles: faWandMagicSparkles,
  hashtag: faHashtag,
  userGear: faUserGear,
  circleCheck: faCircleCheck,
  magnifyingGlassChart: faMagnifyingGlassChart,
};

interface Card {
  title: string;
  description: string;
  icon: string;
  href?: string;
}

function FeatureCard({ card }: { card: Card }) {
  const inner = (
    <>
      <div className="flex items-start justify-between gap-2">
        <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
          <FontAwesomeIcon icon={ICONS[card.icon]} className="w-4 h-4 text-primary" />
        </div>
        {card.href && (
          <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="w-3 h-3 text-text-quaternary mt-1 shrink-0" />
        )}
      </div>
      <h3 className="text-[15px] font-bold text-text-primary">{card.title}</h3>
      <p className="text-[13px] text-text-tertiary leading-relaxed flex-1">{card.description}</p>
    </>
  );

  const cls = "bg-layer-1 border border-border rounded-2xl p-6 flex flex-col gap-4 transition-colors";

  if (card.href) {
    return (
      <a
        href={card.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${cls} hover:border-primary/40 hover:bg-layer-2 cursor-pointer`}
      >
        {inner}
      </a>
    );
  }

  return <div className={cls}>{inner}</div>;
}

export default function FeatureTabs() {
  const tabs = featuresContent.tabs;
  const [activeId, setActiveId] = useState(tabs[0].id);
  const tab = tabs.find((t) => t.id === activeId)!;

  return (
    <>
      {/* Sticky tab bar */}
      <div className="sticky top-16 z-40 bg-background border-b border-border">
        <div className="mx-auto max-w-[1280px] px-6 xl:px-20">
          <div className="flex justify-center overflow-x-auto -mb-px" style={{ scrollbarWidth: "none" }}>
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveId(t.id)}
                className={`px-5 py-4 text-[13px] font-bold whitespace-nowrap border-b-2 transition-colors shrink-0 ${
                  activeId === t.id
                    ? "border-primary text-primary"
                    : "border-transparent text-text-tertiary hover:text-text-primary"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cards + description */}
      <div className="bg-layer-1 px-6 xl:px-20 py-12">
        <div className="mx-auto max-w-[1280px]">
          <p className="text-[14px] text-text-secondary mb-10 text-center">{tab.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tab.cards.map((card) => (
              <FeatureCard key={card.title} card={card} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
