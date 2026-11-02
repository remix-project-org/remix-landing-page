"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Button from "@/components/ui/Button";
import rawNavbarContent from "@/content/shared/navbar.json";
import { resolveContent } from "@/lib/urls";

const navbarContent = resolveContent(rawNavbarContent);

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

const isCurrentPage = (pathname: string, href: string) =>
  href.startsWith("/") && pathname.replace(/\/$/, "") === href.replace(/\/$/, "");

function DropdownItem({ child, current }: { child: NavChild; current: boolean }) {
  const shared = (
    <>
      <div className="flex flex-col gap-1 flex-1 min-w-0 whitespace-nowrap">
        <p
          className={`text-[14px] font-bold group-hover:text-text-primary transition-colors leading-normal ${current ? "text-text-primary" : "text-text-tertiary"}`}
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

  const cls = `flex gap-1 items-start px-4 py-2 min-h-[59px] rounded-lg hover:bg-layer-2 transition-colors group cursor-pointer ${current ? "bg-layer-2" : ""}`;

  if (child.external) {
    return (
      <a href={child.href} target="_blank" rel="noopener noreferrer" className={cls}>
        {shared}
      </a>
    );
  }
  return (
    <Link href={child.href} className={cls} aria-current={current ? "page" : undefined}>
      {shared}
    </Link>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState<string | null>(null);
  const [navHovered, setNavHovered] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [, startTransition] = useTransition();
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);
  const navRef = useRef<HTMLElement>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const lastPointerType = useRef("");

  // Close the dropdown after navigating to another page.
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(null);
  }

  // Touch has no mouseleave, so close on a tap outside the nav.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const activeItem = NAV_ITEMS.find((i) => i.label === open);
  const dropdownId = activeItem ? `nav-dropdown-${activeItem.label.toLowerCase().replace(/\W+/g, "-")}` : undefined;
  const showNavBg = navHovered || open !== null;

  const handleTabClick = (label: string) => {
    // Mouse users already opened it on hover — a click shouldn't close it again.
    if (lastPointerType.current === "mouse") setOpen(label);
    else setOpen(open === label ? null : label);
    lastPointerType.current = "";
  };

  const handleTabKeyDown = (e: React.KeyboardEvent, label: string) => {
    if (e.key !== "ArrowDown") return;
    e.preventDefault();
    setOpen(label);
    requestAnimationFrame(() => {
      navRef.current?.querySelector<HTMLElement>("[data-nav-dropdown] a")?.focus();
    });
  };

  const handleNavKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "Escape" || !open) return;
    tabRefs.current[open]?.focus();
    setOpen(null);
  };

  const handleNavBlur = (e: React.FocusEvent) => {
    if (!navRef.current?.contains(e.relatedTarget as Node | null)) setOpen(null);
  };

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
          ref={navRef}
          className={`hidden lg:flex flex-col mt-2 p-2 rounded-xl transition-colors duration-200 ${showNavBg ? "bg-[#2a2c3f]" : ""}`}
          onPointerEnter={(e) => { if (e.pointerType === "mouse") setNavHovered(true); }}
          onPointerLeave={(e) => {
            if (e.pointerType !== "mouse") return;
            setNavHovered(false);
            setOpen(null);
          }}
          onKeyDown={handleNavKeyDown}
          onBlur={handleNavBlur}
        >
          {/* Tabs row */}
          <div className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              if (!item.children) {
                const isCurrent = isCurrentPage(pathname, item.href!);
                return (
                  <Link
                    key={item.label}
                    href={item.href!}
                    aria-current={isCurrent ? "page" : undefined}
                    className={`flex items-center justify-center px-4 py-2 rounded-lg text-[14px] font-bold transition-colors ${
                      isCurrent
                        ? "bg-[rgba(100,196,255,0.08)] text-text-primary"
                        : "text-text-tertiary hover:text-text-primary hover:bg-[rgba(100,196,255,0.08)]"
                    }`}
                    style={FONT_VAR}
                    onPointerEnter={(e) => { if (e.pointerType === "mouse") setOpen(null); }}
                  >
                    {item.label}
                  </Link>
                );
              }

              // Highlight the parent while its dropdown is open or one of its pages is current.
              const isActive = open === item.label || item.children.some((c) => isCurrentPage(pathname, c.href));

              return (
                <button
                  key={item.label}
                  ref={(el) => { tabRefs.current[item.label] = el; }}
                  type="button"
                  aria-expanded={open === item.label}
                  aria-controls={open === item.label ? dropdownId : undefined}
                  className={`flex items-center justify-center px-4 py-2 rounded-lg text-[14px] font-bold transition-colors cursor-pointer ${
                    isActive
                      ? "bg-[rgba(100,196,255,0.08)] text-text-primary"
                      : "text-text-tertiary hover:text-text-primary hover:bg-[rgba(100,196,255,0.08)]"
                  }`}
                  style={FONT_VAR}
                  onPointerEnter={(e) => { if (e.pointerType === "mouse") setOpen(item.label); }}
                  onPointerDown={(e) => { lastPointerType.current = e.pointerType; }}
                  onClick={() => handleTabClick(item.label)}
                  onKeyDown={(e) => handleTabKeyDown(e, item.label)}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Dropdown — in-flow, appears below the tabs row within the same rounded container */}
          {activeItem?.children && (
            <div
              id={dropdownId}
              data-nav-dropdown
              className="flex flex-col mt-2"
              style={{ animation: "nav-dropdown-in 300ms cubic-bezier(0.32, 0, 0, 1) both" }}
            >
              {activeItem.children.map((child) => (
                <DropdownItem key={child.label} child={child} current={isCurrentPage(pathname, child.href)} />
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
            <Button href={navbarContent.cta.href} external size="lg">
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
                    aria-current={isCurrentPage(pathname, item.href!) ? "page" : undefined}
                    className={`block py-4 text-[14px] font-bold ${isCurrentPage(pathname, item.href!) ? "text-primary" : "text-text-primary"}`}
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
                          aria-current={isCurrentPage(pathname, child.href) ? "page" : undefined}
                          className="flex items-start justify-between gap-4 py-2 group"
                          onClick={() => setMobileOpen(false)}
                        >
                          <div>
                            <p className={`text-[14px] font-bold transition-colors ${isCurrentPage(pathname, child.href) ? "text-primary" : "text-text-secondary group-hover:text-text-primary"}`} style={FONT_VAR}>
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
            <div className="border-t border-border mt-2 py-4 flex flex-col gap-3">
              <div className="flex gap-3">
                {navbarContent.actions.map((action) => (
                  <Button key={action.label} href={action.href} external variant="secondary" size="lg" className="flex-1 justify-center">
                    {action.label}
                  </Button>
                ))}
              </div>
              <Button href={navbarContent.cta.href} external size="lg" className="w-full justify-center">
                {navbarContent.cta.label}
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
