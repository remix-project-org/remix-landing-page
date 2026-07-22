"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Drives a step-by-step "typing" animation that loops forever, but only
 * while its attached element is actually visible in the viewport — avoids
 * background setTimeout/setState churn on the main thread when scrolled
 * off-screen (a contributor to poor INP on pages with several of these).
 */
export function useLoopAnimation(delays: number[], holdDuration = 3000, fadeOutDuration = 400) {
  const [step, setStep] = useState(0);
  const [fading, setFading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    if (fading) {
      const t = setTimeout(() => { setFading(false); setStep(0); }, fadeOutDuration);
      return () => clearTimeout(t);
    }
    if (step < delays.length) {
      const t = setTimeout(() => setStep(s => s + 1), delays[step]);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setFading(true), holdDuration);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, fading, isVisible]);

  return { step, fading, ref };
}
