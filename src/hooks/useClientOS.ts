"use client";

import { useSyncExternalStore } from "react";

export type ClientOS = "mac" | "windows" | "linux" | "unknown";

function detectOS(): ClientOS {
  const p = navigator.platform.toLowerCase();
  if (p.includes("mac")) return "mac";
  if (p.includes("win")) return "windows";
  if (p.includes("linux") || p.includes("x11")) return "linux";
  return "unknown";
}

function subscribe() {
  // The visitor's OS never changes mid-session, so there's nothing to subscribe to.
  return () => {};
}

function getServerSnapshot(): ClientOS {
  return "unknown";
}

/**
 * The visitor's OS, read from `navigator.platform`. Resolves to "unknown" during
 * SSR and the first client render (avoiding a hydration mismatch), then updates
 * to the real value once React can safely diverge from the server-rendered output.
 */
export function useClientOS(): ClientOS {
  return useSyncExternalStore(subscribe, detectOS, getServerSnapshot);
}
