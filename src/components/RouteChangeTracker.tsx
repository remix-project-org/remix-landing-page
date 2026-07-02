"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function RouteChangeTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).gtag?.("event", "page_view", {
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname]);

  return null;
}
