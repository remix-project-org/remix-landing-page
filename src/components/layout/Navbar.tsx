"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import navbarContent from "@/content/shared/navbar.json";

const FONT_VAR = { fontVariationSettings: "'YTLC' 500, 'wdth' 100" } as const;

type NavChild = {
  label: string;
  subtitle?: string;
  href: string;
  external?: boolean;
};

type NavItem = {
  label: string;
  href?: string;
  children?: NavChild[];
};

const NAV_ITEMS: NavItem[] = navbarContent.items;

function DropdownItem({ child }: { child: NavChild }) {
  const shared = (
    <>
      <div className="flex flex-col gap-1 flex-1 min-w-0 whitespace-nowrap">
        <p
          className="text-[14px] font-bold text-text-tertiary group-hover:text-text-primary transition-colors leading-normal"
          style={FONT_VAR}
        >
          {child.label}
        </p>
        {child.subtitle && (
          <p className="text-[12px] font-normal text-text-quaternary leading-[20px]" style={FONT_VAR}>
            {child.subtitle}
          </p>
        )}
      </div>
      {child.external && (
        <div className="relative shrink-0 size-4 mt-0.5">
          <Image
            src="/assets/nav/189db99c60a28704a3e4c57a7b6b7c1dbdfd618d.svg"
            alt=""
            fill
            sizes="16px"
            className="object-contain"
          />
        </div>
      )}
    </>
  );

  const cls = "flex gap-1 items-start px-4 py-2 min-h-[59px] rounded-lg hover:bg-layer-2 transition-colors group cursor-pointer";

  if (child.external) {
    return (
      <a href={child.href} target="_blank" rel="noopener noreferrer" className={cls}>
        {shared}
      </a>
    );
  }
  return (
    <Link href={child.href} className={cls}>
      {shared}
    </Link>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState<string | null>(null);
  const [navHovered, setNavHovered] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [, startTransition] = useTransition();

  const activeItem = NAV_ITEMS.find((i) => i.label === open);
  const showNavBg = navHovered;

  return (
    <header
      className="sticky top-0 z-50 h-16 w-full"
      style={{ background: "#222336" }}
    >
      <div className="mx-auto flex h-full max-w-[1440px] items-start justify-between px-6 xl:px-20">

        {/* Logo — full-height flex so it stays centered */}
        <Link href="/" className="hidden lg:flex items-center h-full shrink-0">
          <Image
            src="/assets/nav/eae5b60ddeaf8319ac8ba6758b7fd9745712e1c8.svg"
            alt="Remix"
            width={103}
            height={32}
            priority
          />
        </Link>

        {/* Mobile logo */}
        <Link href="/" className="lg:hidden flex items-center h-full shrink-0">
          <Image
            src="/assets/nav/eae5b60ddeaf8319ac8ba6758b7fd9745712e1c8.svg"
            alt="Remix"
            width={103}
            height={32}
            priority
          />
        </Link>

        {/* Desktop nav — flex-col container that expands below the header */}
        <nav
          className={`hidden lg:flex flex-col mt-2 p-2 rounded-xl transition-colors duration-200 ${showNavBg ? "bg-[#2a2c3f]" : ""}`}
          onMouseEnter={() => setNavHovered(true)}
          onMouseLeave={() => { setNavHovered(false); setOpen(null); }}
        >
          {/* Tabs row */}
          <div className="flex items-center">
            {NAV_ITEMS.map((item) => {
              const isActive = open === item.label;

              if (!item.children) {
                return (
                  <Link
                    key={item.label}
                    href={item.href!}
                    className="flex items-center justify-center px-4 py-2 rounded-lg text-[14px] font-bold text-text-tertiary hover:text-text-primary hover:bg-[rgba(100,196,255,0.08)] transition-colors"
                    style={FONT_VAR}
                    onMouseEnter={() => setOpen(null)}
                  >
                    {item.label}
                  </Link>
                );
              }

              return (
                <button
                  key={item.label}
                  className={`flex items-center justify-center px-4 py-2 rounded-lg text-[14px] font-bold transition-colors ${
                    isActive
                      ? "bg-[rgba(100,196,255,0.08)] text-text-primary"
                      : "text-text-tertiary hover:text-text-primary hover:bg-[rgba(100,196,255,0.08)]"
                  }`}
                  style={FONT_VAR}
                  onMouseEnter={() => setOpen(item.label)}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Dropdown — in-flow, appears below the tabs row within the same rounded container */}
          {activeItem?.children && (
            <div
              className="flex flex-col mt-2"
              style={{ animation: "nav-dropdown-in 300ms cubic-bezier(0.32, 0, 0, 1) both" }}
            >
              {activeItem.children.map((child) => (
                <DropdownItem key={child.label} child={child} />
              ))}
            </div>
          )}
        </nav>

        {/* Right side */}
        <div className="hidden lg:flex items-center h-full gap-1">
          {navbarContent.actions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-[14px] font-bold text-text-tertiary hover:text-text-primary rounded-lg hover:bg-[rgba(100,196,255,0.08)] transition-colors"
              style={FONT_VAR}
            >
              <Image
                src={action.icon}
                alt=""
                width={action.iconWidth}
                height={action.iconHeight}
              />
              {action.label}
            </Link>
          ))}
          <div className="ml-2">
            <Button href={navbarContent.cta.href} external size="md">
              {navbarContent.cta.label}
            </Button>
          </div>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden flex items-center h-full px-2 text-text-secondary hover:text-text-primary transition-colors"
          onClick={() => startTransition(() => setMobileOpen(!mobileOpen))}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="lg:hidden border-b border-border max-h-[calc(100vh-64px)] overflow-y-auto"
          style={{ background: "#222336" }}
        >
          <div className="px-6 py-2 flex flex-col">
            {NAV_ITEMS.map((item, i) => (
              <div key={item.label}>
                {i > 0 && <div className="border-t border-border" />}
                {!item.children ? (
                  <Link
                    href={item.href!}
                    className="block py-4 text-[14px] font-bold text-text-primary"
                    style={FONT_VAR}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <div className="py-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-text-quaternary mb-3">
                      {item.label}
                    </p>
                    <div className="flex flex-col">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          target={child.external ? "_blank" : undefined}
                          rel={child.external ? "noopener noreferrer" : undefined}
                          className="flex items-start justify-between gap-4 py-2 group"
                          onClick={() => setMobileOpen(false)}
                        >
                          <div>
                            <p className="text-[14px] font-bold text-text-secondary group-hover:text-text-primary transition-colors" style={FONT_VAR}>
                              {child.label}
                            </p>
                            {child.subtitle && (
                              <p className="text-[12px] font-normal text-text-tertiary mt-0.5 leading-tight">
                                {child.subtitle}
                              </p>
                            )}
                          </div>
                          {child.external && (
                            <div className="relative shrink-0 size-4 mt-1">
                              <Image
                                src="/assets/nav/189db99c60a28704a3e4c57a7b6b7c1dbdfd618d.svg"
                                alt=""
                                fill
                                className="object-contain"
                              />
                            </div>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div className="border-t border-border mt-2 py-4 flex gap-3">
              <Button href={navbarContent.actions[1].href} external variant="secondary" size="md" className="flex-1 justify-center">
                {navbarContent.actions[1].label}
              </Button>
              <Button href={navbarContent.cta.href} external size="md" className="flex-1 justify-center">
                {navbarContent.cta.label}
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
