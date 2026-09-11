"use client";

import { useSyncExternalStore } from "react";

function detectIsMobile(): boolean {
  return /android|iphone|ipad|ipod|mobile/i.test(navigator.userAgent);
}

function subscribe() {
  // Device type never changes mid-session, so there's nothing to subscribe to.
  return () => {};
}

function getServerSnapshot(): boolean {
  return false;
}

/**
 * Whether the visitor is on a mobile device, read from `navigator.userAgent`.
 * Resolves to `false` during SSR and the first client render (avoiding a
 * hydration mismatch), then updates once React can safely diverge from the
 * server-rendered output.
 */
export function useIsMobileDevice(): boolean {
  return useSyncExternalStore(subscribe, detectIsMobile, getServerSnapshot);
}
