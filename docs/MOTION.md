# TC Motion System

One set of physics for the whole site. The site is treated like a show-control system: sections are cues, page changes fire like a GO, and everything moves with the same easing so it reads as one machine.

If you are adding motion anywhere on the marketing site, use the pieces below. Do not hand-roll new easings, durations, or reveal code.

## Rules

1. **One physics.** Use the tokens. Never the default `ease` keyword, never a one-off `cubic-bezier`.
2. **One reveal vocabulary.** Headings rise, copy fades, photos resolve, dividers draw. Nothing else enters the screen.
3. **One motif.** The cue (mono labels, timecode, scan line) appears on labels and transitions only. Never on body copy.
4. **Content never depends on JS.** Server HTML renders every element in its final, visible state. Motion is layered on top.
5. **Transform and opacity only** for anything that runs every frame. Colour, clip-path and masks are fine for one-shot reveals.
6. **Reduced motion is honoured everywhere.** CSS media query, the reveal script, `MotionConfig reducedMotion="user"`, and every custom rAF loop.

## Tokens

| Token | CSS | JS (`lib/motion.ts`) | Tailwind | Use |
|---|---|---|---|---|
| Expo out | `var(--ease-expo)` | `EASE_EXPO` | `ease-expo` | Default for all entrances, reveals, hovers |
| In/out | `var(--ease-in-out)` | `EASE_IN_OUT` | `ease-in-out` (theme) | Page wipe, mechanical sweeps only |
| Micro | `var(--dur-micro)` 150ms | `DUR.micro` | `duration-150` | Hover, focus, press |
| UI | `var(--dur-ui)` 300ms | `DUR.ui` | `duration-300` | Menus, banners, colour changes, accordion content fade |
| Page | `var(--dur-page)` 400ms | `DUR.page` | | Page transition wipe |
| Reveal | `var(--dur-reveal)` 600ms | `DUR.reveal` | `duration-600` | Scroll reveals, image hovers, accordion height, divider fills |
| Hero | `var(--dur-hero)` 1000ms | `DUR.hero` | | Homepage headline only |
| Stagger | 80ms | `STAGGER` | | Siblings entering together |

## Reveals: `data-reveal`

A tiny vanilla script (`components/motion/reveal-script.ts`, inlined in `<head>`) handles every scroll reveal on the site. Add the attribute; that is all.

```tsx
<h1 data-reveal="rise">Selected work</h1>
<p data-reveal="fade">Every production is different.</p>
<div data-reveal="resolve" className="relative aspect-[16/9] overflow-hidden"><Image fill ... /></div>
<div data-reveal="line" className="h-px bg-zinc-900 origin-left" />
```

| Variant | Effect | Put it on |
|---|---|---|
| `rise` | Mask-rise from below (the hero line reveal) | `h1`, `h2`, short display text |
| `fade` | Opacity plus 16px lift | Paragraphs, cards, list rows, CTAs |
| `resolve` | Photo assembles from a 7px dot grid (echoes the point cloud) | The wrapper around an editorial photo |
| `line` | Scales in from the left | 1px dividers (add `origin-left`) |

- Elements entering in the same frame stagger automatically (80ms, capped at 8).
- `data-reveal-delay="120"` adds extra ms.
- The element must be block or inline-block. Transforms do nothing on inline spans.
- Do not put `data-reveal` on a tall container (a whole article). Mark its children.
- Do not nest reveals of the same kind (a `fade` inside a `fade` double-animates).
- It is safe on server components. No `"use client"` needed.
- It never touches DOM attributes, so it cannot cause hydration mismatches. Elements already on screen at load animate in from first paint; elements below the fold wait for the viewport.

## Labels: `<CueLabel>`

Mono eyebrow labels in the show-control voice. Decodes once through a glyph scramble when it scrolls into view (never scrambles text that was already on screen at a cold load).

```tsx
<CueLabel index="02" cue>SELECTED WORK</CueLabel>   // [ CUE 02 / SELECTED WORK ]   homepage sections
<CueLabel index="02">SERVICES</CueLabel>           // [ 02 / SERVICES ]            inner page eyebrows
<CueLabel>SERVICE / TECHNICAL DIRECTION</CueLabel>  // [ SERVICE / TECHNICAL DIRECTION ]
```

`CUE` is reserved for the homepage sections. Separators are forward slashes, never dashes. Pass `className` to override spacing; the default is `font-mono text-[11px] tracking-[0.2em] text-zinc-400`.

## Page transitions

`components/motion/page-transitions.tsx` intercepts internal link clicks and runs the router inside `document.startViewTransition`. The new page wipes in top to bottom behind a 1px green scan line while the old page dims (400ms, in/out). The active nav underline slides to its new item.

Shared-element morphs, when a link leads to a page that shows the same thing bigger:

```tsx
// source: inside the link
<Link href="/insights/some-case-study">
  <div data-vt-source="media">...image...</div>
  <h3 data-vt-source="title">Case study</h3>
</Link>

// destination page: one of each at most
<h1 data-vt="title">Case study</h1>
<div data-vt="media">...hero image...</div>
```

Only kinds with a source morph; the rest wipe in with the page. Opt a link out with `data-transition="off"`. Browsers without the API, reduced motion, and the `/led` tool get plain navigation.

`data-vt` and `data-reveal` can sit on the same element (a page `h1` usually has both). When that element is the landing point of a morph, the reveal script shows it in place, because the morph is its entrance. On every other visit it reveals normally.

## Load-in (no JS)

For things that animate on page load rather than on scroll, use the CSS utilities in `globals.css`. They run from first paint and switch off under reduced motion.

| Class | Effect |
|---|---|
| `tc-load-rise` | The hero line rise (1000ms). Wrap in `overflow-hidden`. |
| `tc-load-fade-up` | Opacity plus 16px lift (800ms) |
| `tc-load-fade` | Opacity only (600ms) |
| `tc-hint` | Scroll hint: a green segment travels down a 1px track. Give it a size, e.g. `h-8 w-px`. |

Stagger with inline `style={{ animationDelay: "300ms" }}`.

## framer-motion

Use it only for scroll-linked values (`useScroll`, `useTransform`) and orchestrated sequences. The app is wrapped in `LazyMotion` (domAnimation), so:

- import `m` not `motion`: `<m.div>`, `<m.span>`. A `motion.*` element pulls the full bundle back in.
- never set `initial` on content that must be visible in the server HTML (it renders the initial state). Use CSS keyframes (`tc-rise`, `tc-fade-up`, `tc-fade` in globals.css) for load-in animation instead.
- transitions use `EASE_EXPO` and `DUR` from `lib/motion.ts`.

## Homepage specifics

- **Hero**: WebGL point cloud (raw WebGL, no three.js). It assembles, morphs between three shots, and disperses as the next section rises over it like a curtain. The grid takes the viewport's shape, so phones get every point on screen, with a 60k-point budget (230k on desktop) and dot size scaled to keep the original density. It stops rendering whenever it is covered, off screen, or the tab is hidden. It is skipped for reduced motion, Save-Data, and devices with fewer than 4 cores or 4GB of memory (they keep the poster photo).
- **Curtain edge and embers** (`app/page.tsx`, `components/v2/embers.tsx`, `components/v2/ember-engine.ts`): the curtain's top is a 40vh eased ramp to black, and the cloud finishes dispersing as it passes (`DISPERSE_END` in `hero-signal.ts` must match its height). The embers are the cloud's own dots: a second WebGL layer starts each one on a bright pixel of the photo, in its colour, with the cloud's live camera (`cloudFrame`, written by `point-cloud.tsx`). As the cloud streams apart they peel off, lunge toward the lens and hang in the air; from there scrolling moves the viewer down and forward through them, all scrubbed by scroll position (scroll back and they fly back onto the photo). They also react to how you scroll: scroll energy makes them flare and swirl and cools off slowly, scroll velocity blows them along with inertia, and the cursor pushes them aside and makes them glow. Each ember flares and burns out at its own point between 1.55 and 2.5 viewports, before the gallery pins. The canvas is fixed at a negative z-index inside the curtain body (`isolate`), so it paints over the body's black and under the sections: sections at the top of the curtain (stats, manifesto, gallery) must keep transparent backgrounds or they hide the embers behind a hard edge. The engine loads at idle; same device gate as the cloud.
- **HUD** (`components/motion/show-hud.tsx`): scroll-scrubbed timecode on the right edge, one pixel of scroll equals one frame at 30fps, with the active cue. Sections opt in with `data-cue="02" data-cue-label="SELECTED WORK"`.

## Cursor

`components/v2/custom-cursor.tsx` draws a green reticle only over interactive elements (`a[href]`, enabled buttons, `[data-cursor='hover']`). The native cursor always stays. `data-cursor-label="VIEW"` grows the reticle and shows the label. Fine pointers only, off under reduced motion.

## Reserved names

`view-transition-name` values `tc-nav-active` (navbar underline), `tc-scan`, `tc-title` and `tc-media` are owned by the transition system. Never set them anywhere else: a duplicate name aborts the page transition.

## Cookie banner

It waits for the visitor's first gesture (wheel, touch, key, pointer), with an 8s fallback, so it never lands on the hero while it is being read. Analytics load only after consent (`components/analytics.tsx`).

## Checklist before shipping motion

- [ ] Uses tokens, not literals
- [ ] Visible with JS disabled
- [ ] Visible and static with reduced motion on
- [ ] Only transform/opacity in per-frame loops
- [ ] Any rAF loop pauses off screen and on hidden tabs
- [ ] No em dashes in labels or copy
