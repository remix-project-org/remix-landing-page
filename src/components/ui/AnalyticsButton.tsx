"use client";

import { sendGAEvent } from "@next/third-parties/google";
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
        sendGAEvent("event", "cta_click", gaEvent);
        onClick?.(e);
      }}
    />
  );
}
