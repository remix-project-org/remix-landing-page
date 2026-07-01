"use client";

import Button from "./Button";
import type { ComponentProps } from "react";

type Props = ComponentProps<typeof Button> & {
  gaEvent: Record<string, string>;
};

export default function AnalyticsButton({ gaEvent, onClick, ...props }: Props) {
  return (
    <Button
      {...props}
      onClick={(e) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).gtag?.("event", "cta_click", gaEvent);
        onClick?.(e);
      }}
    />
  );
}
