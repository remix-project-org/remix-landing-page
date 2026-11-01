# Session log

## 2026-11-01
- **Plans:** mirrored app's Lite/Starter/Pro (same features, price = credits); launch offer dropped. Source: `api.remix.live/products/available`.
- **Pricing redesign:** user found card grids dated; picker, ladder and refined-card layouts rejected. Shipped joined `PlanPanel` + Free/Team strips.
- **Design system:** Cabin → JetBrains Mono; h1/h2 weight 800 + tight tracking in base layer; `eyebrow` utility (grey, blue dot).
- **Buttons:** primary now brand blue + dark text like the app (7.99:1 vs 4.84:1). Tried translucent secondary; user preferred solid grey.
- **Legal:** terms/refund say "paid plans"; annual-plan, pilot and 25% refund clauses left untouched for legal.

## 2026-10-29
- **Partners banner:** added TheDAO + second partner logo, recolored to `#959BAD` to match; logos now `{ src, height? }` objects.
- **Logo-6** needed a `viewBox` added (source SVG had none) and 40px height — its ~2:1 ratio looked tiny at 32px.
- **Security:** `npm audit` showed 10 vulns (critical in Next); upgraded next/eslint-config-next to 16.4.3, postcss 8.5.32 → 0 vulns.
- **Removed** unused `@next/third-parties`.
