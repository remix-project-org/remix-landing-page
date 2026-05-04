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

interface Card {
  title: string;
  description: string;
  icon: IconDefinition;
  href?: string;
}

interface Tab {
  id: string;
  label: string;
  description: string;
  cards: Card[];
}

const TABS: Tab[] = [
  {
    id: "whats-new",
    label: "What's New",
    description: "New features are launched often, keeping Remix working with the latest Web3 technology.",
    cards: [
      {
        title: "RemixAI Features",
        description: "Get compiler errors explained and fixed, AI code generation/completion, and AI code requests using the LLMs you already depend on.",
        icon: faRobot,
        href: "https://remix-ide.readthedocs.io/en/latest/ai.html",
      },
      {
        title: "Remix Desktop",
        description: "Remix with the stability and security of your hard drive. Native terminal. Realtime code syncing with any Editor. Use the wallet and connection of your choice.",
        icon: faDesktop,
        href: "https://github.com/remix-project-org/remix-desktop/releases",
      },
      {
        title: "Account Abstraction with ERC-4337",
        description: "Create a Gnosis Safe Account connected to the Gnosis Chain.",
        icon: faShield,
        href: "https://remix-ide.readthedocs.io/en/latest/account-abstraction-7702.html",
      },
      {
        title: "Smart Accounts with EIP-7702",
        description: "Easily connect an EOA to a smart contract and start experimenting.",
        icon: faUserGear,
        href: "https://remix-ide.readthedocs.io/en/latest/account-abstraction-7702.html",
      },
      {
        title: "ZK Circuit Compilers",
        description: "Circom and Noir integrations. Remix's easy UX will get you understanding ZK proofs and writing circuits as fast as possible.",
        icon: faLock,
        href: "https://remix.ethereum.org?#activate=LearnEth,circuit-compiler,noir-compiler&call=LearnEth//startTutorial//ethereum/remix-workshops//master//circom-intro",
      },
      {
        title: "Remix Video Guide",
        description: "Search and view embedded videos on Remix features and Solidity.",
        icon: faPlay,
        href: "https://remix.ethereum.org/?#activate=remixGuide",
      },
    ],
  },
  {
    id: "coding",
    label: "Coding",
    description: "Code in Solidity, JS/TS, Vyper, and more to get the advantages of building in an integrated Web3 environment.",
    cards: [
      {
        title: "AI in the Editor",
        description: "Code requests, code completion, and code explanations to magnify what you can achieve.",
        icon: faWandMagicSparkles,
        href: "https://remix-ide.readthedocs.io/en/latest/ai.html",
      },
      {
        title: "Integrated Debugger with Editor",
        description: "Input breakpoints and get line-by-line and opcode-by-opcode gas reporting.",
        icon: faBug,
        href: "https://www.youtube.com/watch?v=kn16HOJbKKQ&t=3s",
      },
      {
        title: "Remix Desktop",
        description: "Access to the native terminal. Code in VSCode or Cursor and live sync with Remix Desktop for Web3 tools. Connect with any wallet.",
        icon: faDesktop,
        href: "https://github.com/remix-project-org/remix-desktop/releases",
      },
      {
        title: "ZK Circuits with Circom or Noir",
        description: "With the Remix UX, learn, code and deploy ZK Circuits. Use Remix Desktop to power through larger ZK Proofs.",
        icon: faLock,
        href: "https://remix.ethereum.org/?#activate=LearnEth,circuit-compiler,noir-compiler,templateSelection",
      },
      {
        title: "Code in Multiple Languages",
        description: "Yul, Vyper, and Rust are all available in plugins.",
        icon: faCode,
        href: "https://www.youtube.com/watch?v=vC7alvMe8vY&t=4s",
      },
      {
        title: "Run Free Functions",
        description: "Sometimes a function outside of a contract is needed. In Remix, running Free Functions is easy.",
        icon: faPlay,
      },
    ],
  },
  {
    id: "workflows",
    label: "Integrated Workflows",
    description: "Remix is a toolset that easily integrates with the tools you already use.",
    cards: [
      {
        title: "Git Integration",
        description: "Remix Git integration includes the Git plugin, and extends the File Explorer to clone repos, manage branches, and publish GISTs.",
        icon: faCodeBranch,
        href: "https://remix-ide.readthedocs.io/en/latest/git.html",
      },
      {
        title: "Security Tools",
        description: "Remix integrates Slither, SolHint, SolidityScan, Cookbook, BuildBear and Tenderly.",
        icon: faShield,
        href: "https://remix.ethereum.org/#activate=solidityScan,cookbookdev,tenderly,buildbear,solidityStaticAnalysis",
      },
      {
        title: "Hardhat / Foundry in Remix Desktop",
        description: "Work on Hardhat or Foundry projects within Remix. Use HardHat or Foundry to compile and test, and Remix to debug and deploy.",
        icon: faGears,
      },
      {
        title: "Remix and Cursor",
        description: "Code in your favorite Editor and use Remix Desktop for its Web3 tools.",
        icon: faCode,
      },
      {
        title: "Remix with URL Parameters",
        description: "Load a GitHub folder with the ghfolder= url parameter. Full list of available parameters available here.",
        icon: faLink,
        href: "https://remix-ide.readthedocs.io/en/latest/locations.html",
      },
      {
        title: "Editor / Debugger Integration",
        description: "Input breakpoints and get line-by-line and opcode-by-opcode gas reporting.",
        icon: faBug,
        href: "https://www.youtube.com/watch?v=kn16HOJbKKQ&t=3s",
      },
    ],
  },
  {
    id: "deploying",
    label: "Deploying",
    description: "Remix makes deploying and interacting with contracts clear and tangible.",
    cards: [
      {
        title: "Public Chains",
        description: "Deploy with WalletConnect, a browser wallet, or a node provider and then pin it!",
        icon: faGlobe,
        href: "https://www.youtube.com/watch?v=f8DnHN0v4fw",
      },
      {
        title: "Remix VM",
        description: "Remix's simulated chain is pre-loaded with 10 accounts and can fork other chains, pin contracts, and save and share blockchain state.",
        icon: faServer,
        href: "https://www.youtube.com/watch?v=oYkXApf36wk",
      },
      {
        title: "Contract Verification",
        description: "Verify contracts on Etherscan, Sourcify, Blockscout, and Routescan in one click.",
        icon: faCircleCheck,
        href: "https://remix.ethereum.org/#activate=contract-verification",
      },
      {
        title: "Create a Front-end Dapp",
        description: "QuickDapp can deploy a website with any or all of a contract's functions.",
        icon: faLayerGroup,
        href: "https://www.youtube.com/watch?v=l5qVj1xLm8s",
      },
      {
        title: "Graphic UI for UUPS Proxy Contracts",
        description: "Remix's easy interface for the UUPS proxy pattern can deploy, interact with, and upgrade contracts.",
        icon: faArrowsRotate,
      },
      {
        title: "Scientific Notation",
        description: "Use scientific notation in a deployed contract's function inputs.",
        icon: faHashtag,
      },
    ],
  },
  {
    id: "scripting",
    label: "Scripting",
    description: "Remix is famous for its graphic interface, but running scripts in Remix can speed up your workflow.",
    cards: [
      {
        title: "TS / JS Scripting",
        description: "Run Ethers or any other JS/TS scripts.",
        icon: faCode,
        href: "https://www.youtube.com/watch?v=kc7GJzgi4HU",
      },
      {
        title: "Unit Testing",
        description: "Remix is versatile: Unit test with Mocha tests or Solidity unit tests.",
        icon: faVial,
        href: "https://remix-ide.readthedocs.io/en/latest/unittesting.html",
      },
      {
        title: "Script Dependencies",
        description: "Easily choose the dependencies for your scripts. New options are added consistently.",
        icon: faGears,
      },
      {
        title: "Compile and Run",
        description: "In the Solidity Compiler, the Compile and Run script button sets the state of a contract with a script just after a successful compilation.",
        icon: faPlay,
        href: "https://youtu.be/kc7GJzgi4HU?si=QaHG5SpwY8Am5M34&t=90",
      },
      {
        title: "Transaction Recorder",
        description: "In the Deploy and Run plugin, transactions can be recorded, saved in a JSON file, and replayed in another context.",
        icon: faArrowsRotate,
        href: "https://www.youtube.com/watch?v=GchvmIRSxUo",
      },
      {
        title: "Console.log",
        description: "Console.log is available for printing out variables.",
        icon: faTerminal,
        href: "https://remix-ide.readthedocs.io/en/latest/hardhat.html#console-log-in-remix-ide",
      },
    ],
  },
  {
    id: "debugging",
    label: "Debugging & Optimizations",
    description: "Remix provides best-in-class debugging tools to understand, optimize, and secure your smart contracts.",
    cards: [
      {
        title: "Remix Debugger: Industry Favorite",
        description: "Step through OpCodes, use breakpoints, check gas usage, and debug deployed verified contracts with an intuitive interface.",
        icon: faBug,
      },
      {
        title: "AI-Assisted Debugging",
        description: "Use the power of your favorite LLM to explain and fix errors and catch security holes.",
        icon: faRobot,
      },
      {
        title: "Debug Verified Contracts",
        description: "With just a transaction hash, you can debug a verified contract on Etherscan.",
        icon: faMagnifyingGlass,
        href: "https://remix.ethereum.org/?#activate=debugger",
      },
      {
        title: "Gas Reporting",
        description: "Compiling a contract prints out gas use per function. Stepping through a transaction in the Debugger shows gas use with its OpCode per line.",
        icon: faGauge,
        href: "https://www.youtube.com/watch?v=kn16HOJbKKQ",
      },
      {
        title: "Integrated Analysis Tools",
        description: "Remix integrates Slither, SolHint, SolidityScan, and Tenderly.",
        icon: faMagnifyingGlassChart,
      },
      {
        title: "Get Low Level",
        description: "The Remix Debugger shows everything from global variables, call data, and memory, to the call stack.",
        icon: faLayerGroup,
        href: "https://www.youtube.com/watch?v=kn16HOJbKKQ",
      },
    ],
  },
];

function FeatureCard({ card }: { card: Card }) {
  const inner = (
    <>
      <div className="flex items-start justify-between gap-2">
        <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
          <FontAwesomeIcon icon={card.icon} className="w-4 h-4 text-primary" />
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
  const [activeId, setActiveId] = useState("whats-new");
  const tab = TABS.find((t) => t.id === activeId)!;

  return (
    <>
      {/* Sticky tab bar */}
      <div className="sticky top-16 z-40 bg-background border-b border-border">
        <div className="mx-auto max-w-[1280px] px-6 xl:px-20">
          <div className="flex justify-center overflow-x-auto -mb-px" style={{ scrollbarWidth: "none" }}>
            {TABS.map((t) => (
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
